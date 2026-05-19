import {
  getCanvasDragTransition,
  getCanvasInitialPosition,
  getDimmedCanvasItemStyle,
  getWheelPanDelta,
  shouldPreventCanvasContextMenu,
  stopCanvasAnimations,
} from '@/widgets/home-archive/lib/canvas-motion';

describe('home archive canvas motion', () => {
  it('stops active inertia animations before a new gesture changes canvas position', () => {
    const stopX = jest.fn();
    const stopY = jest.fn();

    stopCanvasAnimations({
      x: { stop: stopX },
      y: { stop: stopY },
    });

    expect(stopX).toHaveBeenCalledTimes(1);
    expect(stopY).toHaveBeenCalledTimes(1);
  });

  it('keeps a vertical mouse wheel gesture on the vertical axis', () => {
    expect(getWheelPanDelta({ deltaX: 0, deltaY: 120 })).toEqual({
      x: 0,
      y: -120,
    });
  });

  it('keeps horizontal wheel gestures available for trackpads', () => {
    expect(getWheelPanDelta({ deltaX: 80, deltaY: 0 })).toEqual({
      x: -80,
      y: 0,
    });
  });

  it('dims neighboring cards without blur or scale movement', () => {
    expect(getDimmedCanvasItemStyle(true)).toEqual({
      filter: 'blur(0px)',
      opacity: 0.82,
      scale: 1,
    });
  });

  it('prevents the browser context menu from interrupting right-button canvas drags', () => {
    expect(shouldPreventCanvasContextMenu()).toBe(true);
  });

  it('exposes a Framer Motion inertia transition for drag release', () => {
    expect(getCanvasDragTransition()).toEqual({
      power: 0.8,
      timeConstant: 700,
      modifyTarget: expect.any(Function),
    });
  });

  it('starts the draggable archive near the curated project cluster', () => {
    expect(getCanvasInitialPosition()).toEqual({
      x: -1460,
      y: -1060,
    });
  });
});
