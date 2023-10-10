import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Loading from "../../components/Loading";
import {
  BookmarkSquareIcon,
  ChevronLeftIcon,
  HeartIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function NewsDetails() {
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  console.log("item URL", item.url);

  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="green" />
          </TouchableOpacity>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={25} color="green" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <BookmarkSquareIcon size={25} color="green" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"green"}
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </>
  );
}
