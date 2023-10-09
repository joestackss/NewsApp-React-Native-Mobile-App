import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function NewsSection({ newsMain, activeCategory }) {
  // console.log("categories", categories);

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

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity className="mb-4 space-y-1" key={index}>
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
            <TouchableOpacity>
              <BookmarkSquareIcon color="gray" />
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
