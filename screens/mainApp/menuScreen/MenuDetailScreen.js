import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import MealSummary from "../createScreen/MealSummary";
import * as Progress from "react-native-progress";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Modal } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { nutrientActions } from "../../../store/waterStore";
import { useState } from "react";
export default function MenuDetailScreen({ route, navigation }) {
  const menuData = route.params.menuData;
  const [modalVisible, setModalVisible] = useState(false);
  const period = route.params.period;
  const dispatch = useDispatch();
  const detailHandler = (
    foodData,
    edit = false,
    detail = { quantity: 0, measurement: "Gram" },
    defaultPeriod = []
  ) => {
    navigation.navigate("FoodInfo", {
      foodData: foodData,
      edit: edit,
      detail: detail,
      defaultPeriod,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            {menuData.name}
          </Text>
          <TouchableOpacity>
            <Image source={require("../../../assets/icons.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 40,
            marginTop: 5,
          }}
        >
          <Text>
            {" "}
            <FontAwesome5
              name="fire"
              size={18}
              color="rgba(175, 242, 66, 1)"
            />{" "}
            <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
              {menuData.mealData.totalCalories}
            </Text>{" "}
            kcal
          </Text>
          <Text>
            {" "}
            <Feather name="edit" size={18} color="rgba(175, 242, 66, 1)" />{" "}
            <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
              {menuData.mealData.foods.length}
            </Text>{" "}
            dish
          </Text>
        </View>
        <View style={styles.nutrients}>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Carbs</Text>
            <Progress.Bar
              progress={
                (menuData.mealData.totalCarbs * 4) /
                menuData.mealData.totalCalories
              }
              width={50}
              color="rgba(107, 210, 167, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(menuData.mealData.totalCarbs * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Proteins</Text>
            <Progress.Bar
              progress={
                (menuData.mealData.totalProteins * 4) /
                menuData.mealData.totalCalories
              }
              width={50}
              color="rgba(147, 202, 252, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(menuData.mealData.totalProteins * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Fats</Text>
            <Progress.Bar
              progress={
                (menuData.mealData.totalFats * 9) /
                menuData.mealData.totalCalories
              }
              width={50}
              color="rgba(249, 187, 249, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(menuData.mealData.totalFats * 10) / 10}g
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ width: "90%", alignSelf: "center" }}>
        {menuData.mealData.foods.map((item, index) => {
          return (
            <MealSummary
              meal={{
                header: item.foodData.food.label,
                image: { uri: item.foodData.food.image },
                currentCalories: item.calories,
                currentCarbs: item.carbs,
                currentProteins: item.proteins,
                currentFats: item.fats,
                foodNum: item.quantity,
              }}
              period={period}
              foodData={item.foodData}
              foodId={item.foodData.food.foodId}
              summary={false}
              key={index}
              detailHandler={detailHandler}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          height: 30,
          width: 160,
          backgroundColor: "rgba(0, 71, 215, 1)",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 30,
          marginBottom: 30,
          borderRadius: 20,
        }}
        onPress={() => {
          setModalVisible(true);
          dispatch(nutrientActions.updateDay({ [period]: menuData.mealData }));
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Apply Menu
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
  nutrients: {
    display: "flex",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutrientText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    marginBottom: 3,
  },
});
