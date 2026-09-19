//
//  ExpoPopoverContentView.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import ExpoModulesCore
import UIKit

public final class ExpoPopoverContentView: ExpoPopoverContainerView {
    var popoverBackgroundColor: String? {
        didSet {
            guard popoverBackgroundColor != oldValue else { return }
            popoverController?.applyBackground()
        }
    }

    var resolvedBackgroundColor: UIColor? {
        guard let hex = popoverBackgroundColor, !hex.isEmpty else { return nil }
        return UIColor(hex: hex)
    }

    let onDismiss = EventDispatcher()

    let onAvailableSizeChange = EventDispatcher()

    weak var popoverController: PopoverController?

    var reactPageOrigin: CGPoint?

    public override var isUserInteractionEnabled: Bool {
        get { super.isUserInteractionEnabled }
        set { super.isUserInteractionEnabled = popoverController != nil ? true : newValue }
    }

    func measuredContentSize() -> CGSize {
        PopoverContentSize.measure(self)
    }

    private var presentedFrame: CGRect?

    func place(at frame: CGRect) {
        presentedFrame = frame
        super.center = CGPoint(x: frame.midX, y: frame.midY)
        super.bounds = CGRect(origin: super.bounds.origin, size: frame.size)
    }

    func releasePlacement() {
        presentedFrame = nil
    }

    public override var center: CGPoint {
        get { super.center }
        set {
            guard let presentedFrame else {
                super.center = newValue
                return
            }
            super.center = CGPoint(x: presentedFrame.midX, y: presentedFrame.midY)
        }
    }

    public override var bounds: CGRect {
        get { super.bounds }
        set {
            guard let presentedFrame else {
                super.bounds = newValue
                return
            }
            super.bounds = CGRect(origin: newValue.origin, size: presentedFrame.size)

            if newValue.size != presentedFrame.size {
                setNeedsLayout()
            }
        }
    }

    public override var frame: CGRect {
        get { super.frame }
        set { super.frame = presentedFrame ?? newValue }
    }

    public override func layoutSubviews() {
        super.layoutSubviews()
        DispatchQueue.main.async { [weak self] in
            self?.popoverController?.contentLayoutDidChange()
        }
    }
}
