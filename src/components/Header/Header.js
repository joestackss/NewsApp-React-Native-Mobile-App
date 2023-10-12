import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="font-spaceGroteskBold text-2xl text-green-800 font-extrabold uppercase"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          stack news
        </Text>
      </View>

      {/* Notification and Search Icon */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <View className="bg-gray-200 rounded-full p-2">
          <BellIcon size={25} strokeWidth={2} color="green" />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 rounded-full p-2"
        >
          <MagnifyingGlassIcon size={25} strokeWidth={2} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
