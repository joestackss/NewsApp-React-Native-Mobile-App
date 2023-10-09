import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../../fonts/SpaceGrotesk-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    // setTimeout(() => {
    //   navigation.navigate("HomeTabs"); // Navigate to HomeTab
    // }, 3000); // 3 seconds delay
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/welcome/reporter.jpg")}
      className="flex-1 justify-center items-center pb-6"
      onLayout={onLayoutRootView}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View className="flex-1 items-center justify-end max-w-[85%]  space-y-4 ">
        <Text
          className="font-bold text-4xl shadow-2xl text-white text-center tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Stay Informed from Day One
        </Text>
        <Text
          className="font-bold text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: wp(4),
            fontFamily: "SpaceGroteskMedium",
          }}
        >
          Discover the Latest News with our Seamless Onboarding Experience.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#3953f5] rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text className="text-base text-white">Getting Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
