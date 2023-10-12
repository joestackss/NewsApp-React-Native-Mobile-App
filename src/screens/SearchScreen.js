import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { fetchSearchNews, searchNews } from "../../utils/NewsApi";
import { debounce, set } from "lodash";
import NewsSection from "../components/NewsSection/NewsSection";
var { width, height } = Dimensions.get("window");
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SearchScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);

      try {
        const data = await fetchSearchNews(search);

        console.log("We got our search results");
        setLoading(false);

        // console.log("Search query", search);
        // console.log("data", data);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  console.log("results", results.length);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {/* Search Input */}

      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your Favorite news"
          placeholderTextColor={"gray"}
          className=" font-medium text-black tracking-wider p-3 "
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="green" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View className="mx-4 mb-4 ">
        <Text
          className="text-xl dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results.length} News
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection newsMain={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}
