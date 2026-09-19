import ExpoModulesCore
import UIKit

public final class ExpoPopoverPressableView: ExpoPopoverContainerView {
    let onTap = EventDispatcher()
    let onTapIn = EventDispatcher()
    let onTapOut = EventDispatcher()

    var dismissOnPress = false

    public required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        isUserInteractionEnabled = true

        let tap = UITapGestureRecognizer(target: self, action: #selector(handleTap))
        tap.cancelsTouchesInView = false
        addGestureRecognizer(tap)
    }

    @objc private func handleTap() {
        onTap([:])

        if dismissOnPress {
            presentingPopover?.dismissPresentation()
        }
    }

    private var presentingPopover: PopoverController? {
        var view = superview
        while let current = view {
            if let content = current as? ExpoPopoverContentView {
                return content.popoverController
            }
            view = current.superview
        }
        return nil
    }

    public override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)
        onTapIn([:])
    }

    public override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        onTapOut([:])
    }

    public override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesCancelled(touches, with: event)
        onTapOut([:])
    }
}
