//
//  PopoverAnimation.swift
//  Pods
//
//  Created by rit3zh CX on 9/19/26.
//

import ExpoModulesCore
import UIKit

struct AnimationOptions: Record {
    @Field var type: String = "system"
    @Field var duration: Double?
    @Field var bounce: Double?
    @Field var stiffness: Double?
    @Field var damping: Double?
    @Field var mass: Double?
    @Field var velocity: Double?
    @Field var easing: String?
    @Field var controlPoints: [Double]?

    init() {}
}

struct AnimationSetOptions: Record {
    @Field var present: AnimationOptions?
    @Field var dismiss: AnimationOptions?
    @Field var resize: AnimationOptions?

    init() {}
}

enum PopoverAnimation: Equatable {
    case system
    case none
    case spring(duration: TimeInterval, bounce: CGFloat, velocity: CGFloat)
    case physicalSpring(stiffness: CGFloat, damping: CGFloat, mass: CGFloat, velocity: CGFloat)
    case timing(duration: TimeInterval, curve: TimingCurve)

    enum TimingCurve: Equatable {
        case linear, easeIn, easeOut, easeInOut
        case bezier(CGPoint, CGPoint)
    }

    private enum Defaults {
        static let springDuration: TimeInterval = 0.35
        static let springBounce: CGFloat = 0.15
        static let timingDuration: TimeInterval = 0.25
        static let mass: CGFloat = 1
        static let physicalDuration: TimeInterval = 0.5
    }

    init(_ options: AnimationOptions?) {
        guard let options else {
            self = .system
            return
        }

        let velocity = CGFloat(options.velocity ?? 0)

        switch options.type.lowercased() {
        case "none":
            self = .none

        case "spring":
            if let stiffness = options.stiffness, let damping = options.damping,
               stiffness > 0, damping > 0 {
                self = .physicalSpring(
                    stiffness: CGFloat(stiffness),
                    damping: CGFloat(damping),
                    mass: CGFloat(max(options.mass ?? Defaults.mass, 0.01)),
                    velocity: velocity
                )
            } else {
                self = .spring(
                    duration: max(options.duration ?? Defaults.springDuration, 0.01),
                    bounce: min(max(CGFloat(options.bounce ?? Defaults.springBounce), 0), 0.95),
                    velocity: velocity
                )
            }

        case "timing":
            self = .timing(
                duration: max(options.duration ?? Defaults.timingDuration, 0),
                curve: TimingCurve(easing: options.easing, controlPoints: options.controlPoints)
            )

        default:
            self = .system
        }
    }

    var duration: TimeInterval {
        switch self {
        case .system: return Defaults.timingDuration
        case .none: return 0
        case .spring(let duration, _, _): return duration
        case .physicalSpring(let stiffness, let damping, let mass, let velocity):
            let spring = CASpringAnimation()
            spring.stiffness = stiffness
            spring.damping = damping
            spring.mass = mass
            spring.initialVelocity = velocity
            return spring.settlingDuration
        case .timing(let duration, _): return duration
        }
    }

    func makeAnimator(_ animations: @escaping () -> Void) -> UIViewPropertyAnimator? {
        let animator: UIViewPropertyAnimator

        switch self {
        case .system:
            return nil

        case .none:
            animator = UIViewPropertyAnimator(duration: 0, curve: .linear)

        case .spring(let duration, let bounce, let velocity):
            let vector = CGVector(dx: velocity, dy: velocity)
            let parameters: UISpringTimingParameters
            if #available(iOS 17.0, *) {
                parameters = UISpringTimingParameters(
                    duration: duration,
                    bounce: bounce,
                    initialVelocity: vector
                )
            } else {
                parameters = UISpringTimingParameters(
                    dampingRatio: 1 - bounce,
                    initialVelocity: vector
                )
            }
            animator = UIViewPropertyAnimator(duration: duration, timingParameters: parameters)

        case .physicalSpring(let stiffness, let damping, let mass, let velocity):
            let parameters = UISpringTimingParameters(
                mass: mass,
                stiffness: stiffness,
                damping: damping,
                initialVelocity: CGVector(dx: velocity, dy: velocity)
            )
            animator = UIViewPropertyAnimator(
                duration: Defaults.physicalDuration,
                timingParameters: parameters
            )

        case .timing(let duration, let curve):
            animator = UIViewPropertyAnimator(
                duration: duration,
                timingParameters: curve.parameters
            )
        }

        animator.addAnimations(animations)
        return animator
    }

    func perform(
        fallback: (@escaping () -> Void) -> Void,
        _ animations: @escaping () -> Void
    ) {
        guard let animator = makeAnimator(animations) else {
            fallback(animations)
            return
        }
        animator.startAnimation()
    }
}

extension PopoverAnimation.TimingCurve {
    init(easing: String?, controlPoints: [Double]?) {
        if let points = controlPoints, points.count == 4 {
            self = .bezier(
                CGPoint(x: points[0], y: points[1]),
                CGPoint(x: points[2], y: points[3])
            )
            return
        }

        switch easing?.lowercased() {
        case "linear": self = .linear
        case "easein": self = .easeIn
        case "easeout": self = .easeOut
        default: self = .easeInOut
        }
    }

    var parameters: UICubicTimingParameters {
        switch self {
        case .linear: return UICubicTimingParameters(animationCurve: .linear)
        case .easeIn: return UICubicTimingParameters(animationCurve: .easeIn)
        case .easeOut: return UICubicTimingParameters(animationCurve: .easeOut)
        case .easeInOut: return UICubicTimingParameters(animationCurve: .easeInOut)
        case .bezier(let first, let second):
            return UICubicTimingParameters(controlPoint1: first, controlPoint2: second)
        }
    }
}

struct PopoverAnimations: Equatable {
    var present: PopoverAnimation
    var dismiss: PopoverAnimation
    var resize: PopoverAnimation

    static let standard = PopoverAnimations(present: .system, dismiss: .system, resize: .system)

    init(present: PopoverAnimation, dismiss: PopoverAnimation, resize: PopoverAnimation) {
        self.present = present
        self.dismiss = dismiss
        self.resize = resize
    }

    init(_ options: AnimationSetOptions?) {
        self.init(
            present: PopoverAnimation(options?.present),
            dismiss: PopoverAnimation(options?.dismiss),
            resize: PopoverAnimation(options?.resize)
        )
    }
}
