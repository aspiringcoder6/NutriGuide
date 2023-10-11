import { View, Text } from "react-native";
import { nutrientActions } from "../../../store/waterStore";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import * as Progress from "react-native-progress";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import MealSummary from "./MealSummary";
import { Modal } from "react-native";
import { TextInput } from "react-native";
export default function PeriodDetail(props) {
  const user = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [menuName, setMenuName] = useState("Input Name");
  const currentNutritions = useSelector((state) => {
    return state.nutritions[props.period];
  });
  const updateMenu = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    const menuDocRef = doc(db, "users", user.uid, "menus", formattedDate);

    try {
      await updateDoc(menuDocRef, {
        [props.period]: {
          mealData: currentNutritions,
        },
      });
      setMenuModalVisible(true);
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(menuDocRef, {
          [props.period]: {
            mealData: currentNutritions,
          },
        });
        setMenuModalVisible(true);
      } else {
        console.error("Error updating document:", error);
      }
    }
  };
  const saveMenu = async () => {
    const menuDocRef = doc(db, "users", user.uid, "savedMenus", props.period);
    getDoc(menuDocRef).then((docSnapShot) => {
      let menus = [];
      if (docSnapShot.exists()) {
        const currentData = docSnapShot.data();
        menus = currentData.menus;
      }
      menus.push({ name: menuName, mealData: currentNutritions });
      setDoc(menuDocRef, { menus: menus });
      setMenuModalVisible(false);
      setModalVisible(true);
    });
  };
  if (currentNutritions.totalCalories === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.heading}>Sorry.</Text>
        <Text style={styles.noPlanText}>
          You haven't made plans for {props.period} yet.
        </Text>
        <Text style={styles.noPlanText}>
          Let's create the best meals for it!
        </Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <Image source={require("../../../assets/grocery.png")} />
      </View>
    );
  } else {
    return (
      <View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={menuModalVisible}
          onRequestClose={() => {
            setMenuModalVisible(false);
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
                backgroundColor: "rgba(0, 17, 61, 1)",
                padding: 20,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  color: "white",
                  width: 150,
                  marginBottom: 10,
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                Name for the menu
              </Text>
              <TextInput
                value={menuName}
                onChangeText={setMenuName}
                style={{
                  backgroundColor: "white",
                  height: 30,
                  width: 180,
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  saveMenu();
                }}
                style={{
                  height: 30,
                  width: 180,
                  borderRadius: 10,
                  backgroundColor: "rgba(204, 233, 242, 1)",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontSize: 12,
                  }}
                >
                  Create
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMenuModalVisible(false);
                }}
                style={{
                  height: 30,
                  width: 180,
                  borderRadius: 10,
                  backgroundColor: "white",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontSize: 12,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
                Update Successfully!
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
        <Text
          style={{
            alignSelf: "center",
            marginTop: 15,
            fontFamily: "Montserrat",
            fontSize: 16,
          }}
        >
          {props.period.toUpperCase()}
        </Text>
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
              {currentNutritions.totalCalories}
            </Text>{" "}
            kcal
          </Text>
          <Text>
            {" "}
            <Feather name="edit" size={18} color="rgba(175, 242, 66, 1)" />{" "}
            <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
              {currentNutritions.foods.length}
            </Text>{" "}
            dish
          </Text>
        </View>
        <View style={styles.nutrients}>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Carbs</Text>
            <Progress.Bar
              progress={
                (currentNutritions.totalCarbs * 4) /
                currentNutritions.totalCalories
              }
              width={50}
              color="rgba(107, 210, 167, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(currentNutritions.totalCarbs * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Proteins</Text>
            <Progress.Bar
              progress={
                (currentNutritions.totalProteins * 4) /
                currentNutritions.totalCalories
              }
              width={50}
              color="rgba(147, 202, 252, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(currentNutritions.totalProteins * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Fats</Text>
            <Progress.Bar
              progress={
                (currentNutritions.totalFats * 9) /
                currentNutritions.totalCalories
              }
              width={50}
              color="rgba(249, 187, 249, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(currentNutritions.totalFats * 10) / 10}g
            </Text>
          </View>
        </View>
        <View style={{ width: "90%", alignSelf: "center" }}>
          {currentNutritions.foods.map((item, index) => {
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
                period={props.period}
                foodData={item.foodData}
                foodId={item.foodData.food.foodId}
                summary={false}
                key={index}
                detailHandler={props.detailHandler}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "rgba(175, 242, 66, 1)",
            height: 40,
            borderRadius: 20,
          }}
          onPress={updateMenu}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "Montserrat",
              alignSelf: "center",
            }}
          >
            Save Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "white",
            borderColor: "rgba(175, 242, 66, 1)",
            borderWidth: 1,
            height: 40,
            borderRadius: 20,
            marginBottom: 100,
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "Montserrat",
              alignSelf: "center",
            }}
          >
            Delete Menu
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  amountText: {
    color: "rgba(177, 177, 177, 1)",
  },
  heading: {
    alignSelf: "center",
    fontFamily: "Montserrat",
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: "rgba(217, 227, 249, 1)",
    alignSelf: "center",
    padding: 10,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 50,
    fontWeight: 600,
    paddingHorizontal: 12,
    textAlign: "center",
    color: "rgba(155, 183, 240, 1)",
  },
  noPlanText: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "Montserrat_light",
    marginBottom: 10,
  },
  emptyContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    zIndex: -1,
    marginTop: -20,
    paddingTop: 20,
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
