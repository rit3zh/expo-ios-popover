import ExpoModulesCore
import UIKit

public class ExpoPopoverContainerView: ExpoView {
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
