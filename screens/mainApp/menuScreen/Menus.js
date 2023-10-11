import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Category from "./Category";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import Menu from "./Menu";

export default function MenusScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const user = auth.currentUser;
  const [searchCategory, setSearchCategory] = useState(false);
  const [searchData, setSearchData] = useState(false);
  const handleSearch = (name) => {
    setSearchCategory(name);
  };
  const navigateDetail = (menuData) => {
    navigation.navigate("MenuDetailScreen", {
      menuData: menuData,
      period: searchCategory,
    });
  };
  useEffect(() => {
    if (searchCategory) {
      const menuDocRef = doc(
        db,
        "users",
        user.uid,
        "savedMenus",
        searchCategory
      );
      getDoc(menuDocRef).then((docSnapShot) => {
        if (docSnapShot.exists()) {
          setSearchData(docSnapShot.data().menus);
        }
      });
    }
  }, [searchCategory]);
  return (
    <>
      <View
        style={{
          backgroundColor: "rgba(238, 242, 252, 1)",
          paddingBottom: 20,
          borderRadius: 30,
        }}
      >
        <View style={styles.firstLine}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>Saved</Text>
          <TouchableOpacity>
            <Image source={require("../../../assets/icons.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarContainer}>
          <AntDesign
            name="search1"
            size={24}
            color="rgb(180,180,180)"
            style={{ marginLeft: 10, marginRight: 10 }}
          />

          <TextInput
            style={{ color: "black" }}
            placeholder="Search For Menus"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          ></TextInput>
        </View>
      </View>
      {searchData ? (
        <>
          <ScrollView>
            {searchData.map((menu) => (
              <Menu
                images={menu.mealData.foods.map((food) => {
                  return food.foodData.food.image;
                })}
                navigateDetail={navigateDetail}
                menuData={menu}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.categories}>
          <Category
            image={require("../../../assets/breakfast.png")}
            categoryName={"breakfast"}
            handleSearch={handleSearch}
          />
          <Category
            image={require("../../../assets/lunch.png")}
            categoryName={"lunch"}
            handleSearch={handleSearch}
          />
          <Category
            image={require("../../../assets/dinner.png")}
            categoryName={"dinner"}
            handleSearch={handleSearch}
          />
          <Category
            image={require("../../../assets/snack.png")}
            categoryName={"snacks"}
            handleSearch={handleSearch}
          />
          <Category
            image={require("../../../assets/pho.png")}
            categoryName={"diet"}
            handleSearch={handleSearch}
          />
          <TouchableOpacity
            style={{
              width: 140,
              height: 140,
              borderColor: "gray",
              borderRadius: 30,
              borderWidth: 1,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                borderRadius: "50%",
                backgroundColor: "grey",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  color: "white",
                  fontSize: 25,
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  categories: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchBarContainer: {
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: -1,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: 45,
    borderRadius: 15,
    alignSelf: "center",
  },
  firstLine: {
    marginTop: 40,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  backContainer: {
    backgroundColor: "white",
    fontSize: 40,
    alignSelf: "base-line",
    with: "auto",
    borderRadius: 5,
    padding: 3,
  },
});
