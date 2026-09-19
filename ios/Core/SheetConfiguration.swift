import ExpoModulesCore
import UIKit

struct SheetOptions: Record {
    @Field var detents: [String] = []
    @Field var grabber: Bool = true
    @Field var cornerRadius: Double?
    @Field var dismissible: Bool = true
    @Field var expandsWhenScrolledToEdge: Bool = true
    @Field var largestUndimmedDetent: String?

    init() {}
}

struct SheetConfiguration: Equatable {
    var detents: [SheetDetent]
    var grabber: Bool
    var cornerRadius: CGFloat?
    var dismissible: Bool
    var expandsWhenScrolledToEdge: Bool
    var largestUndimmedDetent: SheetDetent?

    static let standard = SheetConfiguration(
        detents: [.fitted],
        grabber: true,
        cornerRadius: nil,
        dismissible: true,
        expandsWhenScrolledToEdge: true,
        largestUndimmedDetent: nil
    )

    init(
        detents: [SheetDetent],
        grabber: Bool,
        cornerRadius: CGFloat?,
        dismissible: Bool,
        expandsWhenScrolledToEdge: Bool,
        largestUndimmedDetent: SheetDetent?
    ) {
        self.detents = detents.isEmpty ? [.fitted] : detents
        self.grabber = grabber
        self.cornerRadius = cornerRadius
        self.dismissible = dismissible
        self.expandsWhenScrolledToEdge = expandsWhenScrolledToEdge
        self.largestUndimmedDetent = largestUndimmedDetent
    }

    init(_ options: SheetOptions?) {
        guard let options else {
            self = .standard
            return
        }

        self.init(
            detents: SheetDetent.parse(options.detents),
            grabber: options.grabber,
            cornerRadius: options.cornerRadius.map { CGFloat($0) },
            dismissible: options.dismissible,
            expandsWhenScrolledToEdge: options.expandsWhenScrolledToEdge,
            largestUndimmedDetent: options.largestUndimmedDetent.flatMap { SheetDetent($0) }
        )
    }

    var isContentSized: Bool {
        detents == [.fitted]
    }
}
