#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

NS_SWIFT_NAME(PopoverReactTouches)
@interface ExpoPopoverReactTouches : NSObject

- (void)attachToView:(UIView *)view
          pageOrigin:(CGPoint)pageOrigin NS_SWIFT_NAME(attach(to:pageOrigin:));

- (void)detach;

@end

NS_ASSUME_NONNULL_END
