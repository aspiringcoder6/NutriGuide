import { Image, ImageBackground, View, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import Menu from "./menuScreen/Menu";
import { Modal } from "react-native";
import { useDispatch } from "react-redux";
import { nutrientActions } from "../../store/waterStore";
export default function DietDetailScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const dietData = route.params.dietData;
  const [menus, setMenus] = useState(false);
  const navigateDetail = (menuData) => {
    navigation.navigate("MenuDetailScreen", {
      menuData: menuData,
      period: "diet",
    });
  };
  const params = {
    app_id: "43df7168",
    app_key: "72ce1a7651b3a6c7ffad672876040425",
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const getFoods = async (foodArr, period) => {
    const arr = [];
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFats = 0;

    try {
      for (let i = 0; i < foodArr.length; i++) {
        const response = await axios.get(
          `https://api.edamam.com/api/food-database/v2/parser`,
          {
            params: {
              app_id: params.app_id,
              app_key: params.app_key,
              ingr: foodArr[i],
              "nutrition-type": "cooking",
            },
          }
        );

        const data = response.data;
        const foodData = data.hints[0];
        const measureData = foodData.measures.find((item) => {
          return item.label === "Serving";
        });
        if (measureData) {
          const nutrientData = {
            ingredients: [
              {
                quantity: 1,
                measureURI: measureData.uri,
                qualifiers: measureData.qualified
                  ? measureData.qualified.qualifiers
                  : [],
                foodId: foodData.food.foodId,
              },
            ],
          };

          const nutrientResponse = await axios.post(
            "https://api.edamam.com/api/food-database/v2/nutrients",
            nutrientData,
            { params }
          );
          const nutritionData = nutrientResponse.data;
          arr.push({
            time: period,
            quantity: `1 Serving`,
            calories: nutritionData.calories,
            proteins: nutritionData.totalNutrients.PROCNT.quantity,
            fats: nutritionData.totalNutrients.FAT.quantity,
            carbs: nutritionData.totalNutrients.CHOCDF.quantity,
            foodData: foodData,
          });
          totalCalories += nutrientResponse.data.calories;
          totalProteins += nutrientResponse.data.totalNutrients.PROCNT.quantity;
          totalCarbs += nutrientResponse.data.totalNutrients.CHOCDF.quantity;
          totalFats += nutrientResponse.data.totalNutrients.FAT.quantity;
        }
      }

      return {
        foods: arr,
        totalCalories,
        totalProteins,
        totalCarbs,
        totalFats,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchBreakfastData = async () => {
      const weekArr = [];
      for (let i = 0; i < dietData.requestedFood.length; i++) {
        const day = {
          breakfast: {
            mealData: await getFoods(
              dietData.requestedFood[i].breakfast,
              "breakfast"
            ),
          },
          lunch: {
            mealData: await getFoods(dietData.requestedFood[i].lunch, "lunch"),
          },
          dinner: {
            mealData: await getFoods(
              dietData.requestedFood[i].dinner,
              "dinner"
            ),
          },
          snacks: {
            mealData: await getFoods(
              dietData.requestedFood[i].snacks,
              "snacks"
            ),
          },
        };
        weekArr.push(day);
      }
      setMenus(weekArr);
    };
    fetchBreakfastData();
  }, []);
  return (
    <View style={{ backgroundColor: "white", paddingBottom: 100 }}>
      <ImageBackground
        source={dietData.image}
        style={{ paddingTop: 30, paddingLeft: 20, paddingBottom: 30 }}
      >
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Montserrat",
            marginBottom: 10,
          }}
        >
          {dietData.dietName}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontFamily: "Montserrat_light",
          }}
        >
          {dietData.shortDesc}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
          }}
        >
          <View style={styles.timeTag}>
            <Text style={{ fontSize: 10, fontFamily: "Montserrat" }}>
              Time:{" "}
              <Text style={{ fontFamily: "Montserrat_light" }}>
                {dietData.time}
              </Text>
            </Text>
          </View>
          <View style={styles.goalTag}>
            <Text style={{ fontSize: 9, fontFamily: "Montserrat" }}>
              Goal:{" "}
              <Text style={{ fontFamily: "Montserrat_light" }}>
                {dietData.goal}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={styles.dietCard}>
        <View style={styles.descriptionCard}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons name="chatbox-ellipses-outline" size={24} color="white" />
            <Text
              style={{
                width: "87%",
                color: "white",
                fontFamily: "Montserrat",
                fontSize: 13,
              }}
            >
              {dietData.detailDesc}
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              width: "98%",
              alignSelf: "center",
              marginTop: 10,
              lineHeight: 18,
            }}
          >
            {dietData.detailGoal}
          </Text>
          <Text
            style={{ color: "white", fontFamily: "Montserrat", marginTop: 20 }}
          >
            <AntDesign name="exclamationcircleo" size={24} color="white" />
            {"  "} Warning
          </Text>
          <Text style={styles.warning}>
            1.Hydration: Stay well-hydrated to counteract water loss.
          </Text>
          <Text style={styles.warning}>
            2.Physical Activity: Consider higher protein needs if you exercise
            regularly.
          </Text>
          <Text style={styles.warning}>
            3.Potential Side Effects: Be aware of possible side effects like bad
            breath or constipation.
          </Text>
        </View>
        <Text
          style={{
            color: "black",
            fontFamily: "Montserrat",
            marginTop: 20,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Ionicons name="document-text" size={24} color="black" />
          {"  "} 7 days plan
        </Text>
        {menus ? (
          <View>
            {menus.map((menu, index) => {
              return (
                <>
                  <Text
                    style={{
                      width: "90%",
                      alignSelf: "center",
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      marginTop: 10,
                    }}
                  >
                    Day {index + 1}
                  </Text>
                  <Menu
                    menuData={{ ...menu.breakfast, name: "Breakfast" }}
                    key={Math.random()}
                    images={menu.breakfast.mealData.foods.map((food) => {
                      return food.foodData.food.image;
                    })}
                    navigateDetail={navigateDetail}
                  />
                  <Menu
                    menuData={{ ...menu.lunch, name: "Lunch" }}
                    key={Math.random()}
                    images={menu.lunch.mealData.foods.map((food) => {
                      return food.foodData.food.image;
                    })}
                    navigateDetail={navigateDetail}
                  />
                  <Menu
                    menuData={{ ...menu.dinner, name: "Dinner" }}
                    key={Math.random()}
                    images={menu.dinner.mealData.foods.map((food) => {
                      return food.foodData.food.image;
                    })}
                    navigateDetail={navigateDetail}
                  />
                  <Menu
                    menuData={{ ...menu.snacks, name: "Snacks" }}
                    key={Math.random()}
                    images={menu.snacks.mealData.foods.map((food) => {
                      return food.foodData.food.image;
                    })}
                    navigateDetail={navigateDetail}
                  />
                </>
              );
            })}
          </View>
        ) : (
          <View>
            <Text style={{ alignSelf: "center", color: "black", fontSize: 18 }}>
              Loading...
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(0, 71, 215, 1)",
          width: "70%",
          alignSelf: "center",
          borderRadius: 20,
          height: 40,
          marginBottom: 100,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 10,
        }}
        onPress={() => {
          setModalVisible(true);
          dispatch(
            nutrientActions.updateDay({
              breakfast: menus[0].breakfast.mealData,
              lunch: menus[0].lunch.mealData,
              dinner: menus[0].dinner.mealData,
              snacks: menus[0].snacks.mealData,
            })
          );
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Montserrat",
            alignSelf: "center",
          }}
        >
          Apply Diet
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 5,
              borderRadius: "50%",
              borderWidth: 3,
              borderColor: "rgba(204, 233, 242, 1)",
            }}
          >
            <Entypo name="check" size={40} color="rgba(204, 233, 242, 1)" />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Montserrat",
                color: "rgba(204, 233, 242, 1)",
                marginTop: 5,
              }}
            >
              Apply Successfully!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              backgroundColor: "rgba(204, 233, 242, 1)",
              borderRadius: 20,
              width: 200,
              borderColor: "rgba(175, 242, 66, 1)",
              borderWidth: 2,
              height: 30,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ textAlign: "center", fontFamily: "Montserrat" }}>
              Let's Continue!
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  warning: {
    color: "white",
    marginTop: 10,
    fontSize: 12,
  },
  dietCard: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingTop: 20,
    height: 420,
    marginTop: -15,
  },
  descriptionCard: {
    backgroundColor: "rgba(0, 17, 61, 1)",
    padding: 10,
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
  backContainer: {
    backgroundColor: "white",
    fontSize: 40,
    alignSelf: "base-line",
    with: "auto",
    marginBottom: 30,
    borderRadius: 5,
    padding: 3,
  },
  timeTag: {
    backgroundColor: "#CCE9F2",
    borderRadius: 5,
    padding: 5,
  },
  goalTag: {
    backgroundColor: "#AFF242",
    borderRadius: 5,
    padding: 5,
  },
});
