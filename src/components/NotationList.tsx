import { Fragment } from 'react';
import type { Notation } from '../content/sections';
import { InlineFormula } from './Formula';

export function NotationList({ items }: { items: Notation[] }) {
  return (
    <dl className="notation">
      {items.map((item) => (
        <Fragment key={`${item.symbol}|${item.text}`}>
          <dt>
            <InlineFormula latex={item.symbol} />
          </dt>
          <dd>{item.text}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
