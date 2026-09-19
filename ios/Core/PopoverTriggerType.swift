import UIKit

enum PopoverTriggerType: String, CaseIterable {
    case tap = "tap"
    case longPress = "longpress"
    case doubleTap = "doubletap"

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
