//
//  ExpoiOSPopoverModule.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import ExpoModulesCore

public class ExpoiOSPopoverModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoiOSPopoverModule")
        View(ExpoPopoverView.self) {
            Prop("arrowDirection") { (view: ExpoPopoverView, direction: String?) in
                view.arrowDirection = PopoverArrowDirection(direction)
            }
            Prop("animated") { (view: ExpoPopoverView, animated: Bool?) in
                view.animated = animated ?? true
            }
            Prop("triggerType") { (view: ExpoPopoverView, triggerType: String?) in
                view.triggerType = PopoverTriggerType(triggerType)
            }

            Prop("transition") { (view: ExpoPopoverView, transition: String?) in
                view.transition = PopoverTransition(transition)
            }

            Prop("background") { (view: ExpoPopoverView, background: String?) in
                view.background = PopoverBackground(background)
            }
            Prop("sheet") { (view: ExpoPopoverView, options: SheetOptions?) in
                view.sheet = SheetConfiguration(options)
            }
            Prop("animation") { (view: ExpoPopoverView, options: AnimationSetOptions?) in
                view.animations = PopoverAnimations(options)
            }
            Events("onOpenChange")
        }

        View(ExpoPopoverTriggerView.self) {}
        View(ExpoPopoverContentView.self) {
            Prop("backgroundColor") { (view: ExpoPopoverContentView, color: String?) in
                view.popoverBackgroundColor = color
            }

            Events("onDismiss", "onAvailableSizeChange")
        }
        
        View(ExpoPopoverPressableView.self) {
            Prop("dismissOnPress") { (view: ExpoPopoverPressableView, dismiss: Bool?) in
                view.dismissOnPress = dismiss ?? false
            }
            Events("onTap", "onTapIn", "onTapOut")
        }
    }
}
