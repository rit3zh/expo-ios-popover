import { useCallback, useState } from "react";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { INVOICE_HEADER } from "../constants";

const EASING = Easing.bezier(0.22, 1, 0.36, 1);

export const useCollapsibleHeader = () => {
  const { top } = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);
  const [collapsed, setCollapsed] = useState(false);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      // contentInsetAdjustmentBehavior="automatic" offsets the resting
      // position by the top safe area, so normalize it back to 0.
      scrollY.value = event.contentOffset.y + top;
    },
  });

  useAnimatedReaction(
    () => scrollY.value > INVOICE_HEADER.collapseThreshold,
    (isCollapsed, previous) => {
      if (isCollapsed === previous) return;
      progress.value = withTiming(isCollapsed ? 1 : 0, {
        duration: INVOICE_HEADER.duration,
        easing: EASING,
      });
      scheduleOnRN(setCollapsed, isCollapsed);
    },
  );

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: -top, animated: true });
  }, [scrollRef, top]);

  return { scrollRef, onScroll, progress, collapsed, scrollToTop, top };
};
