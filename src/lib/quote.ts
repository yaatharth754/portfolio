/**
 * Show the field-note quote card near a point (defaults to viewport centre).
 * The card is mounted once in <App> and listens for this event.
 */
export const QUOTE_EVENT = 'yb:quote';

export type QuoteEventDetail = { x: number; y: number };

export function showQuote(x: number, y: number) {
  window.dispatchEvent(
    new CustomEvent<QuoteEventDetail>(QUOTE_EVENT, { detail: { x, y } }),
  );
}

/** Convenience: show the quote at the centre of a clicked element. */
export function showQuoteForElement(element: Element) {
  const rect = element.getBoundingClientRect();
  showQuote(rect.left + rect.width / 2, rect.top + rect.height / 2);
}
