import UIKit

enum PopoverTransition: String, CaseIterable {
    case standard = "default"

    case matched = "matched"

    init(_ value: String?) {
        self = PopoverTransition(rawValue: value?.lowercased() ?? "") ?? .standard
    }
}
