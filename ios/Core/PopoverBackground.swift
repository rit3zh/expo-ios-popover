import UIKit

enum PopoverBackground: String, CaseIterable {
    case system = "default"

    case blur = "blur"
    case glass = "glass"
    case clearGlass = "clearGlass"

    init(_ value: String?) {
        self = PopoverBackground(rawValue: value ?? "")
            ?? PopoverBackground(caseInsensitive: value)
            ?? .system
    }

    private init?(caseInsensitive value: String?) {
        guard let value = value?.lowercased() else { return nil }
        guard let match = PopoverBackground.allCases.first(where: {
            $0.rawValue.lowercased() == value
        }) else { return nil }
        self = match
    }

    @MainActor
    func makeEffect() -> UIVisualEffect? {
        switch self {
        case .system:
            return nil
        case .blur:
            return UIBlurEffect(style: .systemMaterial)
        case .glass:
            if #available(iOS 26.0, *) {
                return UIGlassEffect(style: .regular)
            }
            return UIBlurEffect(style: .systemMaterial)
        case .clearGlass:
            if #available(iOS 26.0, *) {
                return UIGlassEffect(style: .clear)
            }
            return UIBlurEffect(style: .systemThinMaterial)
        }
    }

    var tintsRatherThanFills: Bool {
        self != .system
    }
}
