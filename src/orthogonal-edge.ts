import { AbstractArrow, Rect } from './abstract-arrow.js';

export class OrthogonalEdge extends AbstractArrow {
  static tagName = 'orthogonal-edge';

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render(sourceRect: Rect, targetRect: Rect, sourceElement: Element, targetElement: Element): void {
    if (!(sourceElement instanceof HTMLElement) || !(targetElement instanceof HTMLElement)) return;

    // If the right side of the target is to the left of the right side of the source then swap them
    if (sourceRect.x + sourceRect.width > targetRect.x + targetRect.width) {
      const temp = sourceRect;
      sourceRect = targetRect;
      targetRect = temp;
    }

    const x = sourceRect.x + sourceRect.width;
    const y = Math.min(sourceRect.y + sourceRect.height / 2, targetRect.y + targetRect.width);
    const w = targetRect.x + targetRect.width / 2 - x;
    const h = Math.max(
      targetRect.y - y,
      sourceRect.y + sourceRect.height / 2 - (targetRect.y + targetRect.height)
    );

    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    this.style.width = `${w}px`;
    this.style.height = `${h}px`;
  }
}