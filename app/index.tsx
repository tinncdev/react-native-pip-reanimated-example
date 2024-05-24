import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "~/components/primitives/button";
import {
  EdgeConfig,
  PictureInPictureView,
  ToggleableOverlay,
} from "react-native-pip-reanimated";
import { Text } from "~/components/primitives/text";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { cssInterop } from "nativewind";
import {
  PlayCircleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react-native";

const StyledPictureInPictureView = cssInterop(PictureInPictureView, {
  className: "style",
});

const StyledToggleableOverlay = cssInterop(ToggleableOverlay, {
  className: "style",
});

function ButtonControls() {
  return (
    <View className="w-full h-full flex items-center justify-center">
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          onPress={() => {
            console.log("Button clicked", Date.now());
          }}
        >
          <Button className="rounded-full" variant="outline" size="icon">
            <SkipBackIcon size={16} />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Play", Date.now());
          }}
        >
          <Button className="rounded-full" variant="outline" size="icon">
            <PlayCircleIcon size={16} />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Next", Date.now());
          }}
        >
          <Button className="rounded-full" variant="outline" size="icon">
            <SkipForwardIcon size={16} />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Screen() {
  const [isPiPVisible, setPiPVisible] = useState<boolean>(false);

  const onPressShowPiP = () => {
    setPiPVisible(true);
  };

  const onDissmissPiP = () => {
    setPiPVisible(false);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center gap-4">
          <Button onPress={onPressShowPiP}>
            <Text>Show PiP</Text>
          </Button>

          {isPiPVisible && (
            <StyledPictureInPictureView
              className="w-1/2 border rounded-lg aspect-video shadow-lg bg-muted"
              edgeConfig={{
                top: PIP_VERTICAL_EDGE_CONFIG,
                bottom: PIP_VERTICAL_EDGE_CONFIG,
                left: PIP_HORIZONTAL_EDGE_CONFIG,
                right: PIP_HORIZONTAL_EDGE_CONFIG,
              }}
              initialPosition="bottom-right"
              deceleration={0.985}
              minimumGlideVelocity={120}
              destroyOverlayColor="rgba(255,0,0,0.5)"
              onDestroy={onDissmissPiP}
            >
              <View className="p-4">
                <Text>Some PiP content</Text>
              </View>
              <StyledToggleableOverlay className="bg-foreground/20">
                <ButtonControls />
              </StyledToggleableOverlay>
            </StyledPictureInPictureView>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const PIP_VERTICAL_EDGE_CONFIG: EdgeConfig = {
  margin: 8,
  spring: {
    stiffness: 600,
    damping: 15,
    mass: 0.2,
  },
  resistance: 0.8,
};

const PIP_HORIZONTAL_EDGE_CONFIG: EdgeConfig = {
  margin: 8,
  spring: {
    stiffness: 500,
    damping: 40,
    mass: 0.8,
  },
  destroyByFling: {
    minimumVelocity: 2400,
    maximumAngle: 30 * (Math.PI / 180),
    lockAxis: true,
    fadeDuration: 200,
  },
  destroyByDrag: {
    minimumOutOfBounds: 0.5,
    animateVelocity: 1000,
  },
};
