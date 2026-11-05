import katex from 'katex';

interface FormulaProps {
  latex: string;
}

export function Formula({ latex }: FormulaProps) {
  let html: string | null = null;
  let error = '';

  try {
    html = katex.renderToString(latex, {
      throwOnError: true,
      displayMode: true,
    });
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause);
  }

  if (html === null) {
    return (
      <p className="formula-error" role="alert">
        Не удалось нарисовать формулу. {error}
      </p>
    );
  }

  return (
    <div
      className="formula"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
