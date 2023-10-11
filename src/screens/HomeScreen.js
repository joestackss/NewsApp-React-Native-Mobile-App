import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { categories, newsData } from "../constants";

import TrendingNews from "../components/TrendingNews";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";

import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, SetBreakingNews] = useState([]);
  const [recommendedNews, SetRecommendedNews] = useState([]);

  // Breaking News
  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      SetBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching breaking news", error);
    },
  });

  const { isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      SetRecommendedNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching recommended news", error);
    },
  });

  // console.log("breakingNews", breakingNews);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        
        <Header />

        {/* Trending News */}

        {isTrendingLoading ? (
          <Loading />
        ) : (
          <View>
            <MiniHeader label="Breaking News" />
            <TrendingNews label="Breaking News" data={breakingNews} />
          </View>
        )}

        {/* News */}
        <View className="">
          <MiniHeader label="Recommended" />

          <NewsSection
            label="Recommendation"
            categories={categories}
            newsMain={recommendedNews}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
