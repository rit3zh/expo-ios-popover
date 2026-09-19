import UIKit

enum PopoverContentSize {
    static let fallback = CGSize(width: 44, height: 44)

    static func measure(_ view: UIView) -> CGSize {
        var furthest: CGPoint = .zero

        func visit(_ view: UIView, origin: CGPoint) {
            let frame = view.frame
            furthest.x = max(furthest.x, origin.x + frame.maxX)
            furthest.y = max(furthest.y, origin.y + frame.maxY)

            guard !clipsContent(view) else { return }

            let childOrigin = CGPoint(x: origin.x + frame.origin.x, y: origin.y + frame.origin.y)
            for subview in view.subviews {
                visit(subview, origin: childOrigin)
            }
        }

        for subview in view.subviews {
            visit(subview, origin: .zero)
        }

        if furthest.x > 0, furthest.y > 0 {
            return CGSize(width: furthest.x, height: furthest.y)
        }

        if view.bounds.width > 0, view.bounds.height > 0 {
            return view.bounds.size
        }

        return fallback
    }

    private static func clipsContent(_ view: UIView) -> Bool {
        view is UIScrollView || view.clipsToBounds
    }
}
