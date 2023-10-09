import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

export default function NewsDetails() {
  const { params: item } = useRoute();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      <WebView source={{ uri: item.url }} onLoad={() => setIsLoading(false)} />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 16, color: "blue" }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
