#import "PopoverReactTouches.h"

#if __has_include(<React/RCTSurfaceTouchHandler.h>)
#import <React/RCTSurfaceTouchHandler.h>
#define EXPO_POPOVER_HAS_SURFACE_TOUCH_HANDLER 1
#endif

@implementation ExpoPopoverReactTouches {
#if EXPO_POPOVER_HAS_SURFACE_TOUCH_HANDLER
  RCTSurfaceTouchHandler *_handler;
#endif
  __weak UIView *_view;
}

- (void)attachToView:(UIView *)view pageOrigin:(CGPoint)pageOrigin
{
  [self detach];

#if EXPO_POPOVER_HAS_SURFACE_TOUCH_HANDLER
  RCTSurfaceTouchHandler *handler = [RCTSurfaceTouchHandler new];
  handler.viewOriginOffset = pageOrigin;
  [handler attachToView:view];
  _handler = handler;
#endif
  _view = view;
}

- (void)detach
{
#if EXPO_POPOVER_HAS_SURFACE_TOUCH_HANDLER
  UIView *view = _view;
  if (_handler != nil && view != nil) {
    [_handler detachFromView:view];
  }
  _handler = nil;
#endif
  _view = nil;
}

- (void)dealloc
{
  [self detach];
}

@end
