import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading(props) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
}
