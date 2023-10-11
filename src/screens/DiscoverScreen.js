import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories, newsData } from "../constants";

import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState("Architecture");
  const [newsMain, setNewsMain] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  const handleChangeCategory = (category) => {
    // getRecipes(category);
    setActiveCategory(category);
    setNewsMain([]);
    // console.log("category", category);
  };

  // console.log(newsData);

  // Categories
  // const { isLoading: isCategoriesLoading } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: () =>
  //     client.fetch(
  //       `*[_type =='category']{
  //         ...
  //       }`
  //     ),
  //   onSuccess: (data) => {
  //     setCategory(data);
  //   },
  //   onError: (error) => {
  //     console.log("Error fetching categories", error);
  //   },
  // });

  return (
    <SafeAreaView className="pt-8 bg-white">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>

          <Text
            className="text-base text-gray-600 "
            style={{
              fontFamily: "SpaceGroteskMedium",
            }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            // onChangeText={handleTextDebounce}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <View className="">
          {/* News */}
          <View className="flex-row">
            <NewsSection
              categories={categories}
              newsMain={newsData}
              label="Discovery"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
