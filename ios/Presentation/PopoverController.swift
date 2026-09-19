//
//  PopoverController.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import UIKit

final class PopoverController: UIViewController {
    private enum Layout {
        static let sheetTopInset: CGFloat = 28
        static let sheetBottomInset: CGFloat = 24
    }

    private weak var contentView: ExpoPopoverContentView?

    let mode: PopoverPresentationMode

    var background: PopoverBackground {
        didSet {
            guard background != oldValue else { return }
            applyBackground()
        }
    }

    var sheet: SheetConfiguration {
        didSet {
            guard sheet != oldValue else { return }
            sheetDidChange(from: oldValue)
        }
    }

    var animations: PopoverAnimations = .standard {
        didSet { updateTransitioningDelegate() }
    }

    private var effectView: UIVisualEffectView?

    private weak var trackedScrollView: UIScrollView?

    private var isEdgeToEdge = false

    private weak var insetScrollView: UIScrollView?
    private var insetScrollViewBehavior: UIScrollView.ContentInsetAdjustmentBehavior = .never

    private var needsInitialScrollOffset = false

    private weak var lockedScrollView: UIScrollView?

    private var outsideTap: UITapGestureRecognizer?

    private var originalSuperview: UIView?
    private var originalIndex: Int = 0
    private var originalFrame: CGRect = .zero
    private var originalTransform: CGAffineTransform = .identity

    private var appliedContentSize: CGSize = .zero

    private var availableSizeReport: DispatchWorkItem?

    private var lastAvailableSizeReport: CFTimeInterval = 0

    private var reportedAvailableSize: CGSize = .zero

    private var contentFillsSheet: Bool {
        mode == .sheet && !sheet.isContentSized
    }

    private let reactTouches = PopoverReactTouches()

    var onDismiss: (() -> Void)?

    private var hasFinishedDismissal = false

    init(
        contentView: ExpoPopoverContentView,
        mode: PopoverPresentationMode,
        background: PopoverBackground,
        sheet: SheetConfiguration
    ) {
        self.contentView = contentView
        self.mode = mode
        self.background = background
        self.sheet = sheet
        super.init(nibName: nil, bundle: nil)
        contentView.popoverController = self
    }

    private func updateTransitioningDelegate() {
        let isCustom = animations.present != .system || animations.dismiss != .system
        transitioningDelegate = mode == .popover && isCustom ? self : nil
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        guard let content = contentView else { return }

        rememberPlacement(of: content)
        applyBackground()

        let contentSize = content.measuredContentSize()
        if mode == .popover {
            preferredContentSize = contentSize
        }

        appliedContentSize = contentSize
        adopt(content)

        if !contentFillsSheet {
            content.onAvailableSizeChange(["width": 0, "height": 0])
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        presentingViewController?.view.tintAdjustmentMode = .normal
        if let contentView { makeViewTreeVisible(contentView) }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if let contentView { makeViewTreeVisible(contentView) }
        installOutsideTap()
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)

        presentingViewController?.view.tintAdjustmentMode = .automatic

        if isBeingDismissed {
            finishDismissal()
        }
    }

    func dismissPresentation() {
        guard presentingViewController != nil, !isBeingDismissed else { return }
        dismiss(animated: true)
    }

    private func finishDismissal() {
        guard !hasFinishedDismissal else { return }
        hasFinishedDismissal = true

        availableSizeReport?.cancel()

        insetScrollView?.contentInsetAdjustmentBehavior = insetScrollViewBehavior
        insetScrollView = nil
        lockedScrollView?.isScrollEnabled = true
        lockedScrollView = nil

        restoreContent()
        onDismiss?()
    }

    func applyBackground() {
        guard isViewLoaded else { return }

        let requestedColor = contentView?.resolvedBackgroundColor

        if mode == .popover, let presentation = popoverPresentationController {
            presentation.backgroundColor = background.tintsRatherThanFills ? nil : requestedColor
        }

        guard let effect = background.makeEffect() else {
            effectView?.removeFromSuperview()
            effectView = nil
            view.backgroundColor = requestedColor ?? (mode == .sheet ? .systemBackground : .clear)
            return
        }

        view.backgroundColor = .clear

        if #available(iOS 26.0, *),
           let glass = effect as? UIGlassEffect,
           let requestedColor {
            glass.tintColor = requestedColor
        }

        if let effectView {
            UIView.animate(withDuration: 0.25) {
                effectView.effect = effect
            }
            return
        }

        let effectView = UIVisualEffectView(effect: effect)
        effectView.translatesAutoresizingMaskIntoConstraints = false
        view.insertSubview(effectView, at: 0)
        self.effectView = effectView

        NSLayoutConstraint.activate([
            effectView.topAnchor.constraint(equalTo: view.topAnchor),
            effectView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            effectView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            effectView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ])
    }

    private func rememberPlacement(of content: ExpoPopoverContentView) {
        originalSuperview = content.superview
        originalFrame = content.frame
        originalTransform = content.transform
        originalIndex = originalSuperview?.subviews.firstIndex(of: content) ?? 0
    }

    private func adopt(_ content: ExpoPopoverContentView) {
        let pageOrigin = Self.reactPageOrigin(of: content)

        content.removeFromSuperview()
        content.translatesAutoresizingMaskIntoConstraints = true
        view.addSubview(content)

        content.reactPageOrigin = pageOrigin
        reactTouches.attach(to: content, pageOrigin: pageOrigin)

        makeViewTreeVisible(content)
        placeContent()
    }

    private static let reactRootViewClass: AnyClass? = NSClassFromString("RCTRootComponentView")

    private static func reactPageOrigin(of view: UIView) -> CGPoint {
        var ancestor = view.superview

        while let current = ancestor {
            if let presented = current as? ExpoPopoverContentView,
               let origin = presented.reactPageOrigin {
                let offset = view.convert(view.bounds.origin, to: presented)
                return CGPoint(x: origin.x + offset.x, y: origin.y + offset.y)
            }

            if let rootClass = reactRootViewClass, current.isKind(of: rootClass) {
                return view.convert(view.bounds.origin, to: current)
            }

            ancestor = current.superview
        }

        return view.convert(view.bounds.origin, to: nil)
    }

    private var contentFrame: CGRect {
        let bounds = view.bounds

        switch mode {
        case .popover:
            let insets = view.safeAreaInsets
            return CGRect(
                origin: CGPoint(x: insets.left, y: insets.top),
                size: appliedContentSize
            )

        case .sheet:
            if isEdgeToEdge {
                return bounds
            }

            let top = view.safeAreaInsets.top + Layout.sheetTopInset

            if contentFillsSheet {
                return CGRect(
                    x: 0,
                    y: top,
                    width: bounds.width,
                    height: max(bounds.height - top, 0)
                )
            }

            return CGRect(
                x: ((bounds.width - appliedContentSize.width) / 2).rounded(),
                y: top,
                width: appliedContentSize.width,
                height: appliedContentSize.height
            )
        }
    }

    private func placeContent() {
        contentView?.place(at: contentFrame)
    }

    override func viewSafeAreaInsetsDidChange() {
        super.viewSafeAreaInsetsDidChange()
        placeContent()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        trackScrollView()
        updateEdgeToEdge()
        placeContent()
        settleInitialScrollOffset()
        reportAvailableSizeIfNeeded()
    }

    private static let availableSizeInterval: CFTimeInterval = 0.1

    private func reportAvailableSizeIfNeeded() {
        guard contentFillsSheet, let content = contentView else { return }

        let size = content.bounds.size
        guard size.width > 0, size.height > 0, isNewAvailableSize(size) else { return }

        availableSizeReport?.cancel()

        let elapsed = CACurrentMediaTime() - lastAvailableSizeReport
        guard elapsed < Self.availableSizeInterval else {
            reportAvailableSize(size)
            return
        }

        let report = DispatchWorkItem { [weak self] in
            guard let self, let content = self.contentView else { return }
            self.reportAvailableSize(content.bounds.size)
        }
        availableSizeReport = report

        DispatchQueue.main.asyncAfter(
            deadline: .now() + (Self.availableSizeInterval - elapsed),
            execute: report
        )
    }

    private func reportAvailableSize(_ size: CGSize) {
        guard size.width > 0, size.height > 0, isNewAvailableSize(size) else { return }

        reportedAvailableSize = size
        lastAvailableSizeReport = CACurrentMediaTime()
        contentView?.onAvailableSizeChange([
            "width": size.width,
            "height": size.height,
        ])
    }

    private func isNewAvailableSize(_ size: CGSize) -> Bool {
        abs(size.width - reportedAvailableSize.width) > 0.5
            || abs(size.height - reportedAvailableSize.height) > 0.5
    }

    private func restoreContent() {
        guard let content = contentView,
              let originalSuperview else { return }

        reactTouches.detach()
        content.reactPageOrigin = nil

        content.removeFromSuperview()
        content.releasePlacement()
        content.transform = originalTransform
        content.frame = originalFrame
        content.popoverController = nil
        content.isUserInteractionEnabled = false

        originalSuperview.insertSubview(content, at: originalIndex)
    }

    private func makeViewTreeVisible(_ view: UIView) {
        view.alpha = 1
        view.isHidden = false
        view.isUserInteractionEnabled = true
        view.transform = .identity
        view.layer.transform = CATransform3DIdentity

        for subview in view.subviews {
            makeViewTreeVisible(subview)
        }
    }

    func configureSheet() {
        applySheetOptions(animated: false)
    }

    @available(iOS 16.0, *)
    private var sheetController: UISheetPresentationController? {
        mode == .sheet ? sheetPresentationController : nil
    }

    private func applySheetOptions(animated: Bool) {
        guard mode == .sheet else { return }
        guard #available(iOS 16.0, *), let presentation = sheetController else { return }

        let apply = {
            presentation.prefersGrabberVisible = self.sheet.grabber
            presentation.prefersScrollingExpandsWhenScrolledToEdge = self.sheet.expandsWhenScrolledToEdge
            presentation.preferredCornerRadius = self.sheet.cornerRadius
        }

        if animated {
            presentation.animateChanges(apply)
        } else {
            apply()
        }

        restingDetentDidChange(animated: animated)
    }

    private func sheetDidChange(from oldValue: SheetConfiguration) {
        guard isViewLoaded, mode == .sheet, let content = contentView else { return }

        let wasFilled = !oldValue.isContentSized
        if wasFilled != contentFillsSheet {
            availableSizeReport?.cancel()
            reportedAvailableSize = .zero
            appliedContentSize = content.measuredContentSize()

            if !contentFillsSheet {
                content.onAvailableSizeChange(["width": 0, "height": 0])
            }
        }

        applySheetOptions(animated: true)
        view.setNeedsLayout()
    }

    private func fittedSheetHeight() -> CGFloat {
        let contentHeight = contentView?.measuredContentSize().height ?? appliedContentSize.height
        let bottomInset = max(Layout.sheetBottomInset - bottomSafeArea, 0)
        return contentHeight + Layout.sheetTopInset + bottomInset
    }

    private var bottomSafeArea: CGFloat {
        let window = view.window ?? presentingViewController?.view.window ?? contentView?.window
        return window?.safeAreaInsets.bottom ?? 0
    }

    @available(iOS 16.0, *)
    private func applyDetents(
        to sheet: UISheetPresentationController,
        fittedHeight: CGFloat,
        animated: Bool
    ) {
        let all = self.sheet.detents
        let identifiers = all.map(\.identifier)

        let resting = sheet.selectedDetentIdentifier.flatMap { identifiers.firstIndex(of: $0) } ?? 0
        let reachable = max(resting - 1, 0)...min(resting + 1, all.count - 1)

        let detents = all[reachable].map { $0.resolve(fittedHeight: fittedHeight) }
        let undimmed = largestUndimmedIdentifier(among: reachable)

        let apply = {
            sheet.detents = detents
            sheet.selectedDetentIdentifier = identifiers[resting]
            sheet.largestUndimmedDetentIdentifier = undimmed
        }

        if animated {
            sheet.animateChanges(apply)
        } else {
            apply()
        }
    }

    @available(iOS 16.0, *)
    private func largestUndimmedIdentifier(
        among reachable: ClosedRange<Int>
    ) -> UISheetPresentationController.Detent.Identifier? {
        guard let undimmed = sheet.largestUndimmedDetent else { return nil }
        guard let index = sheet.detents.firstIndex(of: undimmed) else { return undimmed.identifier }
        guard index >= reachable.lowerBound else { return nil }
        return sheet.detents[min(index, reachable.upperBound)].identifier
    }

    private var restingDetentIndex: Int {
        guard #available(iOS 16.0, *),
              let selected = sheetController?.selectedDetentIdentifier else { return 0 }
        return sheet.detents.firstIndex { $0.identifier == selected } ?? 0
    }

    private func restingDetentDidChange(animated: Bool = false) {
        guard mode == .sheet else { return }

        if #available(iOS 16.0, *), let presentation = sheetController {
            applyDetents(to: presentation, fittedHeight: fittedSheetHeight(), animated: animated)
        }

        isModalInPresentation = !sheet.dismissible || restingDetentIndex > 0

        updateScrollLock()
    }

    func contentLayoutDidChange() {
        guard let content = contentView else { return }

        trackScrollView()
        updateEdgeToEdge()
        settleInitialScrollOffset()

        guard !contentFillsSheet else { return }

        let newSize = content.measuredContentSize()
        guard newSize.width > 0, newSize.height > 0, newSize != appliedContentSize else { return }

        appliedContentSize = newSize
        view.setNeedsLayout()

        let resize = animations.resize

        switch mode {
        case .popover:
            preferredContentSize = newSize

            resize.perform(fallback: Self.standardResize) {
                self.view.layoutIfNeeded()
                self.popoverPresentationController?.containerView?.layoutIfNeeded()
            }

        case .sheet:
            if #available(iOS 16.0, *), let presentation = sheetPresentationController {
                applyDetents(
                    to: presentation,
                    fittedHeight: fittedSheetHeight(),
                    animated: resize == .system
                )
            }

            resize.perform(fallback: Self.standardResize) {
                self.view.layoutIfNeeded()
                self.sheetPresentationController?.containerView?.layoutIfNeeded()
            }
        }
    }
}

extension PopoverController {
    fileprivate static func standardResize(_ animations: @escaping () -> Void) {
        UIView.animate(withDuration: 0.2, animations: animations)
    }
}

extension PopoverController: UIViewControllerTransitioningDelegate {
    func animationController(
        forPresented presented: UIViewController,
        presenting: UIViewController,
        source: UIViewController
    ) -> UIViewControllerAnimatedTransitioning? {
        guard animations.present != .system else { return nil }
        return PopoverTransitionAnimator(animation: animations.present, isPresenting: true)
    }

    func animationController(
        forDismissed dismissed: UIViewController
    ) -> UIViewControllerAnimatedTransitioning? {
        guard animations.dismiss != .system else { return nil }
        return PopoverTransitionAnimator(animation: animations.dismiss, isPresenting: false)
    }
}

extension PopoverController {
    fileprivate func trackScrollView() {
        guard mode == .sheet, let content = contentView else { return }

        if let tracked = trackedScrollView, tracked.isDescendant(of: content) {
            return
        }

        let scrollView = Self.primaryScrollView(in: content)
        trackedScrollView = scrollView

        if #available(iOS 15.0, *) {
            setContentScrollView(scrollView, for: .top)
            setContentScrollView(scrollView, for: .bottom)
        }

        updateScrollLock()

        guard let scrollView else { return }

        scrollView.isDirectionalLockEnabled = true
        scrollView.showsHorizontalScrollIndicator = false
    }

    fileprivate func updateScrollLock() {
        let ownsDrags = sheet.expandsWhenScrolledToEdge && restingDetentIndex < sheet.detents.count - 1
        let target = ownsDrags ? trackedScrollView : nil
        guard target !== lockedScrollView else { return }

        lockedScrollView?.isScrollEnabled = true
        lockedScrollView = nil

        guard let target, target.isScrollEnabled else { return }
        target.isScrollEnabled = false
        lockedScrollView = target
    }

    fileprivate func updateEdgeToEdge() {
        let scrollView = trackedScrollView
        let edgeToEdge = contentFillsSheet && (scrollView.map(isFlushWithContentTop) ?? false)
        let insetTarget = edgeToEdge ? scrollView : nil

        if insetScrollView !== insetTarget {
            insetScrollView?.contentInsetAdjustmentBehavior = insetScrollViewBehavior
            insetScrollView = insetTarget

            if let insetTarget {
                insetScrollViewBehavior = insetTarget.contentInsetAdjustmentBehavior
                insetTarget.contentInsetAdjustmentBehavior = .always
                needsInitialScrollOffset = true
            }
        }

        guard edgeToEdge != isEdgeToEdge else { return }
        isEdgeToEdge = edgeToEdge
        additionalSafeAreaInsets.top = edgeToEdge ? Layout.sheetTopInset : 0
        view.setNeedsLayout()
    }

    private func isFlushWithContentTop(_ scrollView: UIScrollView) -> Bool {
        guard let content = contentView, let superview = scrollView.superview else { return false }
        return superview.convert(scrollView.frame.origin, to: content).y <= 1
    }

    fileprivate func settleInitialScrollOffset() {
        guard needsInitialScrollOffset, let scrollView = insetScrollView else { return }

        let top = scrollView.adjustedContentInset.top
        guard top > 0 else { return }
        needsInitialScrollOffset = false

        guard !scrollView.isDragging, !scrollView.isDecelerating,
              scrollView.contentOffset.y <= 0 else { return }
        scrollView.contentOffset.y = -top
    }

    private static func primaryScrollView(in root: UIView) -> UIScrollView? {
        var queue: [UIView] = root.subviews

        while !queue.isEmpty {
            let view = queue.removeFirst()

            if let scrollView = view as? UIScrollView,
               !(scrollView is UITextView),
               !isHorizontalScroller(scrollView) {
                return scrollView
            }

            queue.append(contentsOf: view.subviews)
        }

        return nil
    }

    private static func isHorizontalScroller(_ scrollView: UIScrollView) -> Bool {
        let size = scrollView.contentSize
        let bounds = scrollView.bounds.size
        return size.width > bounds.width + 1 && size.height <= bounds.height + 1
    }

    func shouldBeginInteractiveDismiss(at location: CGPoint, systemAllows: Bool) -> Bool {
        guard systemAllows, allowsInteractiveDismiss(at: location) else { return false }

        holdScrollViewStill()
        return true
    }

    private func allowsInteractiveDismiss(at location: CGPoint) -> Bool {
        guard sheet.dismissible, restingDetentIndex == 0 else { return false }
        guard let scrollView = trackedScrollView, scrollView.window != nil else { return true }

        let frame = scrollView.convert(scrollView.bounds, to: view)
        guard frame.contains(location) else { return true }

        let top = -scrollView.adjustedContentInset.top
        return scrollView.contentOffset.y <= top + 0.5
    }

    private func holdScrollViewStill() {
        guard let scrollView = trackedScrollView else { return }

        let pan = scrollView.panGestureRecognizer
        if pan.isEnabled {
            pan.isEnabled = false
            pan.isEnabled = true
        }

        let top = -scrollView.adjustedContentInset.top
        if scrollView.contentOffset.y < top {
            scrollView.setContentOffset(CGPoint(x: scrollView.contentOffset.x, y: top), animated: false)
        }
    }
}

extension PopoverController: UIPopoverPresentationControllerDelegate {
    func adaptivePresentationStyle(for controller: UIPresentationController) -> UIModalPresentationStyle {
        switch mode {
        case .popover: return .none
        case .sheet: return controller.presentationStyle
        }
    }

    func presentationControllerDidDismiss(_ presentationController: UIPresentationController) {
        finishDismissal()
    }
}

extension PopoverController: UISheetPresentationControllerDelegate {
    func sheetPresentationControllerDidChangeSelectedDetentIdentifier(
        _ sheetPresentationController: UISheetPresentationController
    ) {
        restingDetentDidChange()
    }
}

extension PopoverController: UIGestureRecognizerDelegate {
    fileprivate func installOutsideTap() {
        guard mode == .sheet, outsideTap == nil,
              let container = presentationController?.containerView else { return }

        let tap = UITapGestureRecognizer(target: self, action: #selector(handleOutsideTap))
        tap.delegate = self
        tap.cancelsTouchesInView = false
        container.addGestureRecognizer(tap)
        outsideTap = tap
    }

    @objc private func handleOutsideTap() {
        dismiss(animated: true)
    }

    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        guard gestureRecognizer === outsideTap else { return true }

        guard sheet.dismissible, restingDetentIndex > 0 else { return false }
        return !view.bounds.contains(touch.location(in: view))
    }

    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        gestureRecognizer === outsideTap
    }
}
