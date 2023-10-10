import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories, newsData } from "../../constants";

import TrendingNews from "../../components/TrendingNews";
import Header from "../../components/Header/Header";
import CategoriesCard from "../../components/CategoriesCard";
import NewsSection from "../../components/NewsSection/NewsSection";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState("Architecture"); // Default category title

  const [newsMain, setNewsMain] = useState([]); // Default category title

  const handleChangeCategory = (category) => {
    // getRecipes(category);
    setActiveCategory(category);
    setNewsMain([]);
    console.log("category", category);
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
    <SafeAreaView className="">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Trending News */}
        {newsData?.length > 0 && <TrendingNews data={newsData} />}

        {/* Categories */}
        <View className="flex-row pl-2 mb-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        <ScrollView
          className=""
          contentContainerStyle={{
            paddingTop: 1,
            paddingBottom: 550,
          }}
        >
          {/* News */}
          <View className="flex-row pl-2">
            <NewsSection categories={categories} newsMain={newsData} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
