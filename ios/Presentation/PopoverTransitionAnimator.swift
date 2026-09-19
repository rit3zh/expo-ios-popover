import UIKit

final class PopoverTransitionAnimator: NSObject, UIViewControllerAnimatedTransitioning {
    private static let collapsedScale: CGFloat = 0.85

    private let animation: PopoverAnimation
    private let isPresenting: Bool

    init(animation: PopoverAnimation, isPresenting: Bool) {
        self.animation = animation
        self.isPresenting = isPresenting
    }

    func transitionDuration(using context: UIViewControllerContextTransitioning?) -> TimeInterval {
        animation.duration
    }

    func animateTransition(using context: UIViewControllerContextTransitioning) {
        let key: UITransitionContextViewControllerKey = isPresenting ? .to : .from
        guard let controller = context.viewController(forKey: key) else {
            context.completeTransition(false)
            return
        }

        let container = context.containerView
        let viewKey: UITransitionContextViewKey = isPresenting ? .to : .from

        let target = context.view(forKey: viewKey)
            ?? controller.presentationController?.presentedView
            ?? controller.view!

        if isPresenting, target.superview == nil {
            container.addSubview(target)
            target.frame = context.finalFrame(for: controller)
        }

        container.layoutIfNeeded()

        let collapsed = collapsedTransform(for: target, in: container, controller: controller)

        if isPresenting {
            target.transform = collapsed
            target.alpha = 0
        }

        let animator = animation.makeAnimator { [isPresenting] in
            target.transform = isPresenting ? .identity : collapsed
            target.alpha = isPresenting ? 1 : 0
        } ?? UIViewPropertyAnimator(duration: animation.duration, curve: .easeInOut) {
            target.transform = self.isPresenting ? .identity : collapsed
            target.alpha = self.isPresenting ? 1 : 0
        }

        animator.addCompletion { _ in
            let finished = !context.transitionWasCancelled
            if self.isPresenting || !finished {
                target.transform = .identity
                target.alpha = 1
            }
            context.completeTransition(finished)
        }

        animator.startAnimation()
    }

    private func collapsedTransform(
        for view: UIView,
        in container: UIView,
        controller: UIViewController
    ) -> CGAffineTransform {
        let scale = Self.collapsedScale
        let center = CGPoint(x: view.frame.midX, y: view.frame.midY)

        guard let popover = controller.popoverPresentationController,
              let source = popover.sourceView else {
            return CGAffineTransform(scaleX: scale, y: scale)
        }

        let sourceRect = source.convert(popover.sourceRect, to: container)
        let anchor = CGPoint(x: sourceRect.midX, y: sourceRect.midY)

        let offset = CGPoint(
            x: (anchor.x - center.x) * (1 - scale),
            y: (anchor.y - center.y) * (1 - scale)
        )

        return CGAffineTransform(translationX: offset.x, y: offset.y)
            .scaledBy(x: scale, y: scale)
    }
}
