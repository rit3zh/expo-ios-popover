//
//  UIColor+Hex.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import UIKit

extension UIColor {
    convenience init?(hex: String) {
        let value = hex
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .lowercased()
            .replacingOccurrences(of: "#", with: "")

        if let named = UIColor.namedColorComponents[value] {
            self.init(red: named.red, green: named.green, blue: named.blue, alpha: named.alpha)
            return
        }

        var packed: UInt64 = 0
        guard Scanner(string: value).scanHexInt64(&packed) else { return nil }

        switch value.count {
        case 6:
            self.init(
                red: CGFloat((packed >> 16) & 0xFF) / 255,
                green: CGFloat((packed >> 8) & 0xFF) / 255,
                blue: CGFloat(packed & 0xFF) / 255,
                alpha: 1
            )
        case 8:
            self.init(
                red: CGFloat((packed >> 24) & 0xFF) / 255,
                green: CGFloat((packed >> 16) & 0xFF) / 255,
                blue: CGFloat((packed >> 8) & 0xFF) / 255,
                alpha: CGFloat(packed & 0xFF) / 255
            )
        default:
            return nil
        }
    }

    private typealias RGBA = (red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat)

    private static let namedColorComponents: [String: RGBA] = [
        "black": (0, 0, 0, 1),
        "white": (1, 1, 1, 1),
        "red": (1, 0, 0, 1),
        "green": (0, 0.8, 0, 1),
        "blue": (0, 0, 1, 1),
        "yellow": (1, 1, 0, 1),
        "orange": (1, 0.5, 0, 1),
        "purple": (0.5, 0, 0.5, 1),
        "pink": (1, 0.75, 0.8, 1),
        "gray": (0.5, 0.5, 0.5, 1),
        "grey": (0.5, 0.5, 0.5, 1),
        "clear": (0, 0, 0, 0),
        "transparent": (0, 0, 0, 0),
    ]
}
