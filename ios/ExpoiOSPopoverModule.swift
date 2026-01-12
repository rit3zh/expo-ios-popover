import ExpoModulesCore
import UIKit

// MARK: - Module Definition
public class ExpoiOSPopoverModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoiOSPopoverModule")
        
        View(ExpoPopoverView.self) {
                Prop("arrowDirection") { (view: ExpoPopoverView, direction: String?) in
                    view.arrowDirection = direction ?? "any"
                }
                Events("onOpenChange")
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
