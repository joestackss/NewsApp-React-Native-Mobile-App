import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);

  console.log(savedArticles.length);

  console.log("savedArticles", savedArticles);

  // Load saved articles from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];
          setSavedArticles(savedArticlesArray);
          console.log("Pull saved articles from AsyncStorage");
        } catch (error) {
          console.log("Error loading saved articles", error);
        }
      };
      loadSavedArticles();
    }, [navigation]) // Include 'navigation' in the dependencies array if needed
  );

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      console.log("Clear all saved articles");
    } catch (error) {
      console.log("Error clearing saved articles", error);
    }
  };

  return (
    <SafeAreaView>
      {/* Header  */}
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-xl text-white ">Saved Articles</Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          className="bg-blue-800 py-2 px-4 rounded-lg"
        >
          <Text className="font-bold text-lg text-white">Clear</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
