import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View className="">
        <Text
          className="font-spaceGroteskBold text-2xl text-green-800 dark:text-white font-extrabold uppercase"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          stack news
        </Text>
      </View>

      {/* Switch and Search Icon */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-green-800  rounded-full p-2"
        >
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color={colorScheme == "dark" ? "white" : "green"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
