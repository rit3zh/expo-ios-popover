import UIKit

enum PopoverArrowDirection: String, CaseIterable {
    case up = "up"
    case down = "down"
    case left = "left"
    case right = "right"
    case none = "none"
    case any = "any"

    init(_ value: String?) {
        self = PopoverArrowDirection(rawValue: value?.lowercased() ?? "") ?? .any
    }

    var permittedArrowDirections: UIPopoverArrowDirection {
        switch self {
        case .up: return .up
        case .down: return .down
        case .left: return .left
        case .right: return .right
        case .none: return []
        case .any: return .any
        }
    }
}
