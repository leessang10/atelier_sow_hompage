interface CanvasAnimationControls {
  stop: () => void;
}

interface CanvasAnimations {
  x?: CanvasAnimationControls | null;
  y?: CanvasAnimationControls | null;
}

interface WheelDelta {
  deltaX: number;
  deltaY: number;
}

export const CANVAS_DRAG_BOUNDS = {
  left: -3100,
  right: 240,
  top: -2240,
  bottom: 260,
};

export const CANVAS_INITIAL_POSITION = {
  x: -1460,
  y: -1060,
};

function invertDelta(value: number) {
  return value === 0 ? 0 : -value;
}

export function clampCanvasX(value: number) {
  return Math.min(Math.max(value, CANVAS_DRAG_BOUNDS.left), CANVAS_DRAG_BOUNDS.right);
}

export function clampCanvasY(value: number) {
  return Math.min(Math.max(value, CANVAS_DRAG_BOUNDS.top), CANVAS_DRAG_BOUNDS.bottom);
}

export function stopCanvasAnimations(animations: CanvasAnimations) {
  animations.x?.stop();
  animations.y?.stop();
}

export function getWheelPanDelta({ deltaX, deltaY }: WheelDelta) {
  return {
    x: invertDelta(deltaX),
    y: invertDelta(deltaY),
  };
}

export function getDimmedCanvasItemStyle(isDimmed: boolean) {
  return {
    filter: isDimmed ? 'blur(0px)' : 'blur(0px)',
    opacity: isDimmed ? 0.82 : 1,
    scale: 1,
  };
}

export function getCanvasDragTransition() {
  return {
    power: 0.8,
    timeConstant: 700,
    modifyTarget: (target: number) => target,
  };
}

export function getCanvasInitialPosition() {
  return { ...CANVAS_INITIAL_POSITION };
}

export function shouldPreventCanvasContextMenu() {
  return true;
}
