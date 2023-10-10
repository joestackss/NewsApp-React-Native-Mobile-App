import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function NewsSection({ newsMain, activeCategory }) {
  const navigation = useNavigation();
  const [isBookmarked, toggleBookmark] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  // console.log("categories", categories);
  console.log("newsMain Url", urlList);

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

  useEffect(() => {
    const urls = newsMain.map((item) => item.url);
    setUrlList(urls);
  }, [newsMain]);

  // Effect to load saved articles from AsyncStorage when the component mounts

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle bookmark and save article

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
        console.log("Article is bookmarked");
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
        console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles)
          : [];

        // Check if each URL in 'urlList' exists in the bookmarked list
        const isArticleBookmarkedList = urlList.map((url) =>
          savedArticlesArray.some((savedArticle) => savedArticle.url === url)
        );

        // Set the bookmark status for all items based on the loaded data
        setBookmarkStatus(isArticleBookmarkedList);
        console.log("Check if the current article is in bookmarks");
      } catch (error) {
        console.log("Error Loading Saved Articles", error);
      }
    };

    loadSavedArticles();
  }, [urlList]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1"
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
            <Text className="text-xs font-bold text-gray-900">
              {item.author}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] "
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
            <Text className="text-xs text-gray-700">
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Save */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? "green" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: hp(2) }} className="space-y-2">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsMain}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: hp(10),
        }}
      />
    </View>
  );
}
