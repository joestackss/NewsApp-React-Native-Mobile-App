import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

var { width, height } = Dimensions.get("window");

export default function TrendingCard({ item, handleClick }) {
  // console.log("Movie Image", item.poster_path);

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative">
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <View className="absolute bottom-6 left-4 justify-between h-[80%]">
          <View className="bg-white rounded-full p-1 w-1/2">
            {item.title.includes("-") && (
              <Text className="text-green-700 text-sm font-medium">
                {item.title.split("-")[1].trim().slice(0, 18)}
              </Text>
            )}
          </View>

          <View className=" space-y-1">
            <View className=" max-w-[98%]">
              <Text className="text-white text-base font-semibold">
                {item.title.length > 60
                  ? item.title.split("-")[0].slice(0, 60) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <View className="">
              <Text className="text-neutral-300 text-sm font-medium">
                {item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
