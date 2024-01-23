import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function SavedScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  useEffect(() => {
    const urls = savedArticles.map((item) => item.url);
    setUrlList(urls);
  }, [savedArticles]);

  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
        // console.log("Article is bookmarked");
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
        // console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      // console.log("Error Saving/Removing Article", error);
    }
  };

  // Load saved articles from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // const isArticleBookmarkedList = urlList.map((url) =>
          //   savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          // );

          // Set the bookmark status for all items based on the loaded data
          // setBookmarkStatus(isArticleBookmarkedList);
          setSavedArticles(savedArticlesArray);
        } catch (error) {
          // console.log("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
      // console.log("Pull saved articles from AsyncStorage");
    }, [navigation, urlList]) // Include 'navigation' in the dependencies array if needed
  );

  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      console.log("Clear all saved articles");
    } catch (error) {
      // console.log("Error clearing saved articles", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1 "
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item.author}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Save */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      
      {/* Header  */}
      <View className="flex-row justify-between items-center">
        <Text
          className="font-bold text-xl text-green-800 dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          className="bg-green-800 py-1 px-4 rounded-lg"
        >
          <Text
            className="font-bold text-lg text-white dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: hp(2) }} className="space-y-2 ">
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: hp(2),
          }}
        />
      </View>
    </SafeAreaView>
  );
}
