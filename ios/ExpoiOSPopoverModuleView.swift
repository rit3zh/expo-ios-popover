import UIKit
import ExpoModulesCore


public final class ExpoPopoverView: ExpoView {
    var arrowDirection: String = "any"
    
    
    private var triggerView: ExpoPopoverTriggerView?
    private var contentView: ExpoPopoverContentView?
    private var tapGesture: UITapGestureRecognizer?
    private weak var presentedController: PopoverController?
    
    let onOpenChange = EventDispatcher()
    
    public required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
    }
    
    public override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        insertSubview(childComponentView, at: index)
        
        if let trigger = childComponentView as? ExpoPopoverTriggerView {
            self.triggerView = trigger
            setupTapGesture(on: trigger)
        } else if let content = childComponentView as? ExpoPopoverContentView {
            self.contentView = content
        }
    }
    
    public override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        if childComponentView === triggerView {
            triggerView = nil
        } else if childComponentView === contentView {
            contentView = nil
        }
        childComponentView.removeFromSuperview()
    }
    
    private func setupTapGesture(on view: UIView) {
        if let existing = tapGesture {
            view.removeGestureRecognizer(existing)
        }
        
        let gesture = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        view.addGestureRecognizer(gesture)
        view.isUserInteractionEnabled = true
        tapGesture = gesture
    }
    
    @objc private func handleTap() {
        guard presentedController == nil,
              let trigger = triggerView,
              let content = contentView,
              let parentVC = findViewController() else { return }
        
        let controller = PopoverController(contentView: content)
        controller.modalPresentationStyle = .popover
        controller.onDismiss = { [weak self] in
            self?.presentedController = nil
            self?.contentView?.onDismiss([:])
            self?.onOpenChange(["isOpen": false])
        }
        
        if let ppc = controller.popoverPresentationController {
            ppc.sourceView = trigger
            ppc.sourceRect = trigger.bounds
            ppc.permittedArrowDirections = mapArrowDirection(arrowDirection)
            ppc.delegate = controller
            
            if let bgColor = content.popoverBackgroundColor, !bgColor.isEmpty {
                ppc.backgroundColor = UIColor(hex: bgColor)
            }
        }
        
        presentedController = controller
        parentVC.present(controller, animated: true) { [weak self] in
            self?.onOpenChange(["isOpen": true])
        }
    }
    
    private func findViewController() -> UIViewController? {
        var responder: UIResponder? = self
        while let next = responder?.next {
            if let vc = next as? UIViewController { return vc }
            responder = next
        }
        return nil
    }
    
    private func mapArrowDirection(_ dir: String) -> UIPopoverArrowDirection {
        switch dir.lowercased() {
        case "up": return .up
        case "down": return .down
        case "left": return .left
        case "right": return .right
        case "none": return []
        default: return .any
        }
    }
}

// MARK: - Trigger View
public final class ExpoPopoverTriggerView: ExpoView {
    public required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
    }
    
    public override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        insertSubview(childComponentView, at: index)
    }
    
    public override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        childComponentView.removeFromSuperview()
    }
}

// MARK: - Content View
public final class ExpoPopoverContentView: ExpoView {
    var popoverBackgroundColor: String?
    
    let onDismiss = EventDispatcher()
    weak var popoverController: PopoverController?
    
    public required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
    }
    
    public override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
        insertSubview(childComponentView, at: index)
    }
    
    public override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
        childComponentView.removeFromSuperview()
    }
    
    public override func layoutSubviews() {
        super.layoutSubviews()
        DispatchQueue.main.async { [weak self] in
            self?.popoverController?.contentLayoutDidChange()
        }
    }
    
    func getContentSize() -> CGSize {
        var maxX: CGFloat = 0
        var maxY: CGFloat = 0
        
        func measureView(_ view: UIView, offsetX: CGFloat, offsetY: CGFloat) {
            let frame = view.frame
            maxX = max(maxX, offsetX + frame.maxX)
            maxY = max(maxY, offsetY + frame.maxY)
            
            for subview in view.subviews {
                measureView(subview, offsetX: offsetX + frame.origin.x, offsetY: offsetY + frame.origin.y)
            }
        }
        
        for subview in subviews {
            measureView(subview, offsetX: 0, offsetY: 0)
        }
        
        if maxX > 0 && maxY > 0 {
            return CGSize(width: maxX, height: maxY)
        }
        
        if bounds.size.width > 0 && bounds.size.height > 0 {
            return bounds.size
        }
        
        return CGSize(width: 44, height: 44)
    }
}

// MARK: - Popover Controller
final class PopoverController: UIViewController, UIPopoverPresentationControllerDelegate {
    
    private weak var contentView: ExpoPopoverContentView?
    private var originalSuperview: UIView?
    private var originalIndex: Int = 0
    private var originalFrame: CGRect = .zero
    private var originalTransform: CGAffineTransform = .identity
    
    
    private var widthConstraint: NSLayoutConstraint?
    private var heightConstraint: NSLayoutConstraint?
    
    var onDismiss: (() -> Void)?
    
    init(contentView: ExpoPopoverContentView) {
        self.contentView = contentView
        super.init(nibName: nil, bundle: nil)
        contentView.popoverController = self
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let content = contentView else { return }
        
        
        originalSuperview = content.superview
        originalFrame = content.frame
        originalTransform = content.transform
        if let superview = originalSuperview {
            originalIndex = superview.subviews.firstIndex(of: content) ?? 0
        }
        if let bgColor = content.popoverBackgroundColor, !bgColor.isEmpty {
            view.backgroundColor = UIColor(hex: bgColor)
        } else {
            
            view.backgroundColor = .clear
        }
        
        
        let contentSize = content.getContentSize()
        preferredContentSize = contentSize
        
        
        content.removeFromSuperview()
        
        
        makeViewTreeVisible(content)
        
        
        content.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(content)
        
        
        let wConstraint = content.widthAnchor.constraint(equalToConstant: contentSize.width)
        let hConstraint = content.heightAnchor.constraint(equalToConstant: contentSize.height)
        widthConstraint = wConstraint
        heightConstraint = hConstraint
        
        NSLayoutConstraint.activate([
            content.topAnchor.constraint(equalTo: view.topAnchor),
            content.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            wConstraint,
            hConstraint
        ])
    }
    
    
    private func makeViewTreeVisible(_ view: UIView) {
        view.alpha = 1.0
        view.isHidden = false
        view.transform = .identity
        view.layer.transform = CATransform3DIdentity
        for subview in view.subviews {
            makeViewTreeVisible(subview)
        }
    }
    
    func contentLayoutDidChange() {
        guard let content = contentView else { return }
        
        let newSize = content.getContentSize()
        
        guard newSize.width > 0 && newSize.height > 0 else { return }
        
        
        if let wConstraint = widthConstraint, wConstraint.constant != newSize.width {
            wConstraint.constant = newSize.width
        }
        if let hConstraint = heightConstraint, hConstraint.constant != newSize.height {
            hConstraint.constant = newSize.height
        }
        
        
        if preferredContentSize != newSize {
            preferredContentSize = newSize
            
            
            UIView.animate(withDuration: 0.2) {
                self.view.layoutIfNeeded()
                self.popoverPresentationController?.containerView?.layoutIfNeeded()
            }
        }
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        if isBeingDismissed {
            restoreContent()
        }
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        presentingViewController?.view.tintAdjustmentMode = .normal
    }
    
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        presentingViewController?.view.tintAdjustmentMode = .automatic
        
        if isBeingDismissed {
            onDismiss?()
        }
    }
    
    private func restoreContent() {
        guard let content = contentView,
              let originalSuperview = originalSuperview else { return }
        
        content.removeFromSuperview()
        content.translatesAutoresizingMaskIntoConstraints = true
        content.transform = originalTransform
        content.frame = originalFrame
        
        originalSuperview.insertSubview(content, at: originalIndex)
        content.popoverController = nil
    }
    
    // MARK: - UIPopoverPresentationControllerDelegate
    
    func adaptivePresentationStyle(for controller: UIPresentationController) -> UIModalPresentationStyle {
        return .none
    }
    
    func presentationControllerDidDismiss(_ presentationController: UIPresentationController) {
        restoreContent()
        onDismiss?()
    }
}

// MARK: - UIColor Hex Extension
extension UIColor {
    convenience init?(hex: String) {
        var str = hex.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        str = str.replacingOccurrences(of: "#", with: "")
        
        switch str {
        case "black": self.init(white: 0, alpha: 1); return
        case "white": self.init(white: 1, alpha: 1); return
        case "red": self.init(red: 1, green: 0, blue: 0, alpha: 1); return
        case "green": self.init(red: 0, green: 0.8, blue: 0, alpha: 1); return
        case "blue": self.init(red: 0, green: 0, blue: 1, alpha: 1); return
        case "yellow": self.init(red: 1, green: 1, blue: 0, alpha: 1); return
        case "orange": self.init(red: 1, green: 0.5, blue: 0, alpha: 1); return
        case "purple": self.init(red: 0.5, green: 0, blue: 0.5, alpha: 1); return
        case "pink": self.init(red: 1, green: 0.75, blue: 0.8, alpha: 1); return
        case "gray", "grey": self.init(white: 0.5, alpha: 1); return
        case "clear", "transparent": self.init(white: 0, alpha: 0); return
        default: break
        }
        
        var rgb: UInt64 = 0
        guard Scanner(string: str).scanHexInt64(&rgb) else { return nil }
        
        switch str.count {
        case 6:
            self.init(
                red: CGFloat((rgb >> 16) & 0xFF) / 255,
                green: CGFloat((rgb >> 8) & 0xFF) / 255,
                blue: CGFloat(rgb & 0xFF) / 255,
                alpha: 1
            )
        case 8:
            self.init(
                red: CGFloat((rgb >> 24) & 0xFF) / 255,
                green: CGFloat((rgb >> 16) & 0xFF) / 255,
                blue: CGFloat((rgb >> 8) & 0xFF) / 255,
                alpha: CGFloat(rgb & 0xFF) / 255
            )
        default:
            return nil
        }
    }
}




