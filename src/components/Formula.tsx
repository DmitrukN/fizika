import katex from 'katex';

interface TexProps {
  latex: string;
  display?: boolean;
}

function render(latex: string, display: boolean): string {
  return katex.renderToString(latex, {
    throwOnError: true,
    displayMode: display,
  });
}

export function Tex({ latex, display = false }: TexProps) {
  let html: string | null = null;
  let error = '';

  try {
    html = render(latex, display);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause);
  }

  if (html === null) {
    return (
      <span className="formula-error" role="alert" title={error}>
        ошибка в формуле
      </span>
    );
  }

  return (
    <span
      className={display ? 'formula' : 'tex-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function Formula({ latex }: { latex: string }) {
  return <Tex latex={latex} display />;
}

export function InlineFormula({ latex }: { latex: string }) {
  return <Tex latex={latex} />;
}
