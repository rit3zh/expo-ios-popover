# Native iOS sources

Swift implementation behind `expo-ios-popover`. The podspec picks up every
`.swift` file recursively, so new files only need to land in the right folder.

```
ios/
├── Module/        Expo module definition: the JS ↔ native bridge
├── Views/         The view classes each JS component renders
├── Presentation/  The controller that hosts content while it is on screen
├── Core/          Prop value types and layout helpers, no UIKit ownership
└── Extensions/    Small UIKit conveniences
```

## How a popover opens

1. `ExpoPopoverView` is the root of the `<Popover>` tree. It collects its
   trigger and content children as Fabric mounts them.
2. It installs a gesture on the trigger, chosen by `PopoverTriggerType`.
3. On fire, it resolves a `PopoverPresentationMode`, builds a
   `PopoverController` for it, and presents.
4. `PopoverController` borrows the content view from React, pins it with
   constraints sized by `PopoverContentSize`, and hands it back on dismiss.

## Two presentation modes

`PopoverTransition` picks between them, and `ExpoPopoverView` resolves the
request against what the OS can actually do.

| Mode      | Presentation                        | When                            |
| --------- | ----------------------------------- | ------------------------------- |
| `popover` | `UIPopoverPresentationController`   | The default, and every fallback |
| `sheet`   | Page sheet with the zoom transition | `matched` on iOS 18 and newer   |

The split exists because UIKit runs its zoom transition for sheet, full screen
and custom presentations, but not for popovers. A transition that matches the
trigger to the content therefore cannot stay a popover. Both modes share one
controller, which branches on `mode` for pinning, background and sizing.

## Sheet options and backgrounds

`SheetConfiguration.swift` holds two types. `SheetOptions` is the Expo `Record`
the `sheet` prop arrives as, and `SheetConfiguration` is the validated form the
controller applies. Splitting them keeps the bridge shape out of the rest of the
code and guarantees the detent list is never empty.

Detents cross the bridge as strings so the prop stays a plain `[String]`. The
TypeScript union is encoded in `src/utils/sheet.ts` and parsed by
`SheetDetent.swift`: `fitted`, `medium`, `large`, `50%`, `fraction:0.4`,
`height:420`.

`PopoverBackground.swift` builds the material. Liquid Glass needs iOS 26, and
both glass styles degrade to a blur below that rather than vanishing.

## Things worth knowing

**The content view is on loan.** React owns `ExpoPopoverContentView` and keeps
it mounted off-screen. `PopoverController` records where it came from before
reparenting it, and restores that placement on dismiss. Skipping the restore
leaves React with a detached subtree.

**Sizing is measured, not inferred.** React lays children out with absolute
frames, so Auto Layout cannot size the popover. `PopoverContentSize` walks the
subtree and takes the furthest point any descendant reaches.

**Sizing runs one way or the other, never both.** A `fitted` sheet takes its
height from the content, so `contentLayoutDidChange` drives the detent. Any
other detent has a height of its own, so the content is edge-pinned to fill it
and `PopoverController` reports that size to React through
`onAvailableSizeChange`. Mixing the two would loop: the content would size the
sheet, which would resize the content. `contentFillsSheet` is the switch.

**The walk stops at anything that clips.** A view that clips cannot be made
bigger by its children, so its own frame is the answer. This is what makes a
scroll view work: without it the measurement returns the full scroll content and
the sheet grows to fit what the caller meant to scroll.

**Unknown prop values never crash.** `PopoverArrowDirection`,
`PopoverTriggerType` and `PopoverTransition` all fall back to a default, so a
newer JS release stays safe on an older native build.

**The sheet only knows the detents next to it.** UIKit picks where a flung
sheet lands from its speed, so given every detent a quick swipe skips the middle
ones. `applyDetents` hands it only the detents either side of the resting one,
and the sheet delegate re-centres that list after every move. Two things follow.
A swipe below the shortest detent UIKit knows of would close the sheet, so it is
held modal above the configured shortest, with its own tap recognizer to keep
tap-outside-to-close. And `largestUndimmedDetent` is clamped to the detents on
offer, because UIKit dims everything for an identifier it cannot find.

**A list only scrolls at the tallest detent.** Below it, `isScrollEnabled` is
off, so the sheet's own pan takes every drag instead of UIKit handing a drag
from the sheet to the list partway through. It is turned back on at the tallest
detent and on dismiss, and a list React made unscrollable is never turned on.

**The zoom's dismiss gesture can only be narrowed.** The zoom transition
runs its own drag to close, next to the sheet's. `interactiveDismissShouldBegin`
may turn down a drag UIKit would start, but must never start one UIKit turned
down: that steals drags between detents, and the sheet moves under the finger
while the list scrolls with it. When the zoom does take over, the list's own
pan is cancelled so it stops scrolling.

**The delegate is mode aware.** `adaptivePresentationStyle` returns `.none` to
stop a popover adapting into a sheet on compact widths. Returning that in sheet
mode would break the sheet, so it defers to the default there.
