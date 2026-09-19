//
//  ExpoPopoverView.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import ExpoModulesCore
import UIKit

public final class ExpoPopoverView: ExpoPopoverContainerView {
    var arrowDirection: PopoverArrowDirection = .any {
        didSet {
            presentedController?.popoverPresentationController?.permittedArrowDirections =
                arrowDirection.permittedArrowDirections
        }
    }

    var animated: Bool = true
    var transition: PopoverTransition = .standard

    var background: PopoverBackground = .system {
        didSet { presentedController?.background = background }
    }

    var sheet: SheetConfiguration = .standard {
        didSet { presentedController?.sheet = sheet }
    }

    var animations: PopoverAnimations = .standard {
        didSet { presentedController?.animations = animations }
    }

    var triggerType: PopoverTriggerType = .tap {
        didSet { installTriggerGesture() }
    }

    let onOpenChange = EventDispatcher()

    private var triggerView: ExpoPopoverTriggerView?
    private var contentView: ExpoPopoverContentView?
    private var triggerGesture: UIGestureRecognizer?
    private weak var presentedController: PopoverController?

    public override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        super.mountChildComponentView(childComponentView, index: index)

        switch childComponentView {
        case let trigger as ExpoPopoverTriggerView:
            triggerView = trigger
            installTriggerGesture()
        case let content as ExpoPopoverContentView:
            contentView = content
        default:
            break
        }
    }

    public override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        if childComponentView === triggerView {
            triggerView = nil
        } else if childComponentView === contentView {
            contentView = nil
        }
        super.unmountChildComponentView(childComponentView, index: index)
    }

    private func installTriggerGesture() {
        guard let trigger = triggerView else { return }

        if let existing = triggerGesture {
            trigger.removeGestureRecognizer(existing)
        }

        let gesture = triggerType.makeGestureRecognizer(
            target: self,
            action: #selector(handleTriggerGesture(_:))
        )

        trigger.addGestureRecognizer(gesture)
        trigger.isUserInteractionEnabled = true
        triggerGesture = gesture
    }

    @objc private func handleTriggerGesture(_ recognizer: UIGestureRecognizer) {
        if let longPress = recognizer as? UILongPressGestureRecognizer, longPress.state != .began {
            return
        }
        presentPopover()
    }

    private func presentPopover() {
        guard presentedController == nil,
              let trigger = triggerView,
              let content = contentView,
              let parent = nearestViewController else { return }

        let mode = resolvedPresentationMode()
        let controller = PopoverController(
            contentView: content,
            mode: mode,
            background: background,
            sheet: sheet
        )

        controller.animations = animations

        controller.onDismiss = { [weak self] in
            guard let self else { return }
            self.presentedController = nil
            self.contentView?.onDismiss([:])
            self.onOpenChange(["isOpen": false])
        }

        switch mode {
        case .popover:
            configurePopoverPresentation(for: controller, anchoredTo: trigger)
        case .sheet:
            configureSheetPresentation(for: controller, zoomingFrom: trigger)
        }

        presentedController = controller
        parent.present(controller, animated: animated) { [weak self] in
            self?.onOpenChange(["isOpen": true])
        }
    }

    private func resolvedPresentationMode() -> PopoverPresentationMode {
        guard transition == .matched else { return .popover }

        if #available(iOS 18.0, *) {
            return .sheet
        }
        return .popover
    }

    private func configurePopoverPresentation(
        for controller: PopoverController,
        anchoredTo trigger: UIView
    ) {
        controller.modalPresentationStyle = .popover

        guard let presentation = controller.popoverPresentationController else { return }

        presentation.sourceView = trigger
        presentation.sourceRect = trigger.bounds
        presentation.permittedArrowDirections = arrowDirection.permittedArrowDirections
        presentation.delegate = controller
    }

    private func configureSheetPresentation(
        for controller: PopoverController,
        zoomingFrom trigger: UIView
    ) {
        controller.modalPresentationStyle = .pageSheet

        if #available(iOS 18.0, *) {
            let options = UIViewController.Transition.ZoomOptions()
            options.interactiveDismissShouldBegin = { [weak controller] context in
                guard let controller else { return context.willBegin }
                return controller.shouldBeginInteractiveDismiss(
                    at: context.location,
                    systemAllows: context.willBegin
                )
            }

            controller.preferredTransition = .zoom(options: options) { [weak trigger] _ in
                trigger
            }
        }

        controller.presentationController?.delegate = controller
        controller.configureSheet()
    }
}
