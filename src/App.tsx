import { useState, type ReactNode } from 'react';
import {
  SECTIONS,
  sectionById,
  sectionTitle,
  type Card,
  type SectionId,
} from './content/sections';
import { today } from './domain/date';
import {
  applyAnswer,
  isDue,
  requeueIndex,
  type Answer,
} from './domain/scheduler';
import { progressOf } from './domain/stats';
import {
  clear,
  emptyStore,
  load,
  markDay,
  save,
  type LoadResult,
  type SessionRecord,
  type Store,
} from './storage/store';
import { EmptyScreen } from './screens/EmptyScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SessionScreen } from './screens/SessionScreen';
import { StartScreen } from './screens/StartScreen';
import { SummaryScreen } from './screens/SummaryScreen';

type Screen = 'start' | 'session' | 'summary' | 'progress' | 'empty' | 'error';

interface SessionState {
  section: SectionId;
  queue: Card[];
  revealed: boolean;
  startedAt: number;
  answeredIds: string[];
  know: number;
  forgot: number;
  total: number;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function readStore(): LoadResult {
  try {
    return load(localStorage);
  } catch {
    return {
      ok: false,
      reason: 'Браузер не дал доступ к локальному хранилищу.',
    };
  }
}

export function App() {
  const [initial] = useState(readStore);
  const [store, setStore] = useState<Store | null>(
    initial.ok ? initial.store : null,
  );
  const [loadError, setLoadError] = useState<string | null>(
    initial.ok ? null : initial.reason,
  );
  const [screen, setScreen] = useState<Screen>(
    initial.ok ? 'start' : 'error',
  );
  const [session, setSession] = useState<SessionState | null>(null);
  const [emptySection, setEmptySection] = useState<SectionId>(
    SECTIONS[0].id,
  );
  const [result, setResult] = useState<SessionRecord | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const day = today();

  function persist(next: Store) {
    setStore(next);
    try {
      save(localStorage, next);
      setSaveError(null);
    } catch (cause) {
      console.error('Не удалось сохранить прогресс', cause);
      setSaveError(
        'Не удалось сохранить прогресс в браузере. Ответы могут потеряться.',
      );
    }
  }

  function startSession(sectionId: SectionId, repeatAll = false) {
    if (!store) return;

    const section = sectionById(sectionId);
    const due = repeatAll
      ? section.cards
      : section.cards.filter((card) =>
          isDue(progressOf(store, card.id), day),
        );

    if (due.length === 0) {
      setEmptySection(sectionId);
      setScreen('empty');
      return;
    }

    setSession({
      section: sectionId,
      queue: shuffle(due),
      revealed: false,
      startedAt: Date.now(),
      answeredIds: [],
      know: 0,
      forgot: 0,
      total: section.cards.length,
    });
    setScreen('session');
  }

  function reveal() {
    setSession((current) =>
      current ? { ...current, revealed: true } : current,
    );
  }

  function finish(state: SessionState, baseStore: Store) {
    if (state.answeredIds.length === 0) {
      setSession(null);
      setScreen('start');
      return;
    }

    const record: SessionRecord = {
      startedAt: state.startedAt,
      endedAt: Date.now(),
      section: state.section,
      answered: state.know + state.forgot,
      know: state.know,
      forgot: state.forgot,
    };

    setResult(record);
    setSession(null);
    setScreen('summary');
    persist({ ...baseStore, sessions: [...baseStore.sessions, record] });
  }

  function answer(value: Answer) {
    if (!session || !store) return;

    const card = session.queue[0];
    if (!card) return;

    const currentDay = today();
    const progress = progressOf(store, card.id);
    const nextStore = markDay(
      {
        ...store,
        cards: {
          ...store.cards,
          [card.id]: applyAnswer(progress, value, currentDay),
        },
      },
      currentDay,
    );

    const queue = session.queue.slice(1);
    if (value === 'forgot') {
      queue.splice(requeueIndex(queue.length), 0, card);
    }

    const answeredIds = session.answeredIds.includes(card.id)
      ? session.answeredIds
      : [...session.answeredIds, card.id];

    const nextSession: SessionState = {
      ...session,
      queue,
      revealed: false,
      answeredIds,
      know: session.know + (value === 'know' ? 1 : 0),
      forgot: session.forgot + (value === 'forgot' ? 1 : 0),
    };

    if (queue.length === 0) {
      finish(nextSession, nextStore);
    } else {
      setSession(nextSession);
      persist(nextStore);
    }
  }

  function finishNow() {
    if (!session || !store) return;
    finish(session, store);
  }

  function resetProgress() {
    try {
      clear(localStorage);
    } catch (cause) {
      console.error('Не удалось очистить хранилище', cause);
    }

    const fresh = emptyStore();
    setStore(fresh);
    setLoadError(null);
    setSaveError(null);
    setSession(null);
    setResult(null);
    setScreen('start');
    persist(fresh);
  }

  if (!store) {
    return (
      <ErrorScreen
        reason={loadError ?? 'Неизвестная ошибка чтения прогресса.'}
        onReset={resetProgress}
      />
    );
  }

  let content: ReactNode = null;

  switch (screen) {
    case 'start':
      content = (
        <StartScreen
          store={store}
          day={day}
          onStart={startSession}
          onProgress={() => setScreen('progress')}
        />
      );
      break;
    case 'session':
      if (session && session.queue.length > 0) {
        content = (
          <SessionScreen
            sectionTitle={sectionTitle(session.section)}
            card={session.queue[0]}
            revealed={session.revealed}
            answered={session.answeredIds.length}
            total={session.total}
            onReveal={reveal}
            onAnswer={answer}
            onFinish={finishNow}
          />
        );
      }
      break;
    case 'summary':
      if (result) {
        content = (
          <SummaryScreen
            result={result}
            onRepeat={() => startSession(result.section, true)}
            onProgress={() => setScreen('progress')}
            onHome={() => setScreen('start')}
          />
        );
      }
      break;
    case 'progress':
      content = (
        <ProgressScreen
          store={store}
          day={day}
          onBack={() => setScreen('start')}
        />
      );
      break;
    case 'empty':
      content = (
        <EmptyScreen
          sectionTitle={sectionTitle(emptySection)}
          onRepeatAll={() => startSession(emptySection, true)}
          onHome={() => setScreen('start')}
        />
      );
      break;
    case 'error':
      content = (
        <ErrorScreen
          reason={loadError ?? 'Неизвестная ошибка чтения прогресса.'}
          onReset={resetProgress}
        />
      );
      break;
  }

  return (
    <>
      {saveError && (
        <p className="save-error" role="alert">
          {saveError}
        </p>
      )}
      {content}
    </>
  );
}
