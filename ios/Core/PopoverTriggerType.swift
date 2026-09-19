import UIKit

/// The gesture on the trigger that opens the popover. Mirrors `TriggerType` in JS.
enum PopoverTriggerType: String, CaseIterable {
    case tap = "tap"
    case longPress = "longpress"
    case doubleTap = "doubletap"

    /// Parses the value sent from JS, falling back to `.tap` when it is missing or unknown.
    init(_ value: String?) {
        self = PopoverTriggerType(rawValue: value?.lowercased() ?? "") ?? .tap
    }

    func makeGestureRecognizer(target: Any, action: Selector) -> UIGestureRecognizer {
        switch self {
        case .tap:
            return UITapGestureRecognizer(target: target, action: action)
        case .longPress:
            return UILongPressGestureRecognizer(target: target, action: action)
        case .doubleTap:
            let recognizer = UITapGestureRecognizer(target: target, action: action)
            recognizer.numberOfTapsRequired = 2
            return recognizer
        }
    }
}
