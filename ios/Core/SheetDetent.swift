//
//  SheetDetent.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import UIKit

enum SheetDetent: Equatable {
    case fitted
    case medium
    case large
    case fraction(CGFloat)
    case height(CGFloat)

    init?(_ raw: String) {
        let value = raw.trimmingCharacters(in: .whitespaces)

        switch value.lowercased() {
        case "fitted": self = .fitted; return
        case "medium": self = .medium; return
        case "large": self = .large; return
        default: break
        }

        if value.hasSuffix("%"), let percent = Double(value.dropLast()) {
            self = .fraction(CGFloat(percent / 100))
            return
        }

        let parts = value.split(separator: ":", maxSplits: 1).map(String.init)
        guard parts.count == 2, let number = Double(parts[1]) else { return nil }

        switch parts[0].lowercased() {
        case "fraction": self = .fraction(CGFloat(number))
        case "height": self = .height(CGFloat(number))
        default: return nil
        }
    }

    static func parse(_ raw: [String]) -> [SheetDetent] {
        raw.compactMap(SheetDetent.init)
    }

    @available(iOS 16.0, *)
    var identifier: UISheetPresentationController.Detent.Identifier {
        switch self {
        case .fitted: return .init("fitted")
        case .medium: return .medium
        case .large: return .large
        case .fraction(let value): return .init("fraction:\(value)")
        case .height(let value): return .init("height:\(value)")
        }
    }

    @available(iOS 16.0, *)
    func resolve(fittedHeight: CGFloat) -> UISheetPresentationController.Detent {
        switch self {
        case .medium:
            return .medium()
        case .large:
            return .large()
        case .fitted:
            return .custom(identifier: identifier) { context in
                min(fittedHeight, context.maximumDetentValue)
            }
        case .fraction(let value):
            let clamped = min(max(value, 0.05), 1)
            return .custom(identifier: identifier) { context in
                context.maximumDetentValue * clamped
            }
        case .height(let value):
            return .custom(identifier: identifier) { context in
                min(value, context.maximumDetentValue)
            }
        }
    }
}
