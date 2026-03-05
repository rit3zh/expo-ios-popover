import ExpoModulesCore
import UIKit

public class ExpoiOSPopoverModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoiOSPopoverModule")
        
        View(ExpoPopoverView.self) {
                Prop("arrowDirection") { (view: ExpoPopoverView, direction: String?) in
                    view.arrowDirection = direction ?? "any"
                }
                Prop("animated") { (view: ExpoPopoverView, value: Bool?) in
                    view.animated = value ?? true
                }
                Prop("triggerType") { (view: ExpoPopoverView, value: String?) in
                    view.triggerType = value ?? "tap"
                }
                Events("onOpenChange")
            }
            
            View(ExpoPopoverPressableView.self) {
                Events("onTap", "onTapIn", "onTapOut")
            }

            View(ExpoPopoverTriggerView.self) {}
            
            View(ExpoPopoverContentView.self) {
                Prop("backgroundColor") { (view: ExpoPopoverContentView, color: String?) in
                    view.popoverBackgroundColor = color
                }
                
                Events("onDismiss")
            }
        }
}
