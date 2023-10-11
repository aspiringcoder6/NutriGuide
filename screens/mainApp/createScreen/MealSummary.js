import { TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { nutrientActions } from "../../../store/waterStore";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { auth } from "../../../firebase";
import { useState } from "react";
import { Modal } from "react-native";
export default function MealSummary(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const currentNutritions = useSelector((state) => {
    return state.nutritions[props.period];
  });

  const saveMenu = async () => {
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
      console.log("success");
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(menuDocRef, {
          [props.period]: {
            mealData: currentNutritions,
          },
        });
      } else {
        console.error("Error updating document:", error);
      }
    }
  };
  return (
    <TouchableOpacity
      style={styles.summary}
      disabled={props.summary}
      onPress={() => {
        props.detailHandler(
          props.foodData,
          true,
          {
            quantity: parseInt(props.meal.foodNum.split(" ")[0]),
            measurement: props.meal.foodNum.split(" ")[1],
          },
          [props.period]
        );
      }}
    >
      <Modal
        transparent={true}
        animationType="slide"
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
            style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
          >
            <Text
              style={{
                color: "rgba(75, 106, 185, 1)",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Confirm
            </Text>
            <Text style={{ fontSize: 12 }}>
              Do you want to delete this from the menu?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(75, 106, 185, 1)",
                  width: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: 30,
                  borderRadius: 12,
                }}
                onPress={() => {
                  setModalVisible(false);
                  dispatch(
                    nutrientActions.deleteFood({
                      foodId: props.foodId,
                      time: props.period,
                      nutrients: {
                        calories: props.meal.currentCalories,
                        carbs: props.meal.currentCarbs,
                        proteins: props.meal.currentProteins,
                        fats: props.meal.currentFats,
                      },
                    })
                  );
                  if (currentNutritions.foods.length === 0) {
                    saveMenu();
                  }
                }}
              >
                <Text
                  style={{
                    color: "rgba(75, 106, 185, 1)",
                    alignSelf: "center",
                  }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(75, 106, 185, 1)",
                  width: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  height: 30,
                  borderRadius: 12,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {!props.summary && (
        <TouchableOpacity
          style={{ position: "absolute", right: 20, top: 10 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ fontFamily: "Montserrat" }}>X</Text>
        </TouchableOpacity>
      )}
      <Image
        source={props.meal.image}
        style={{ height: "100%", borderRadius: 12, width: 80 }}
      />
      <View style={styles.summaryText}>
        <Text style={styles.summaryHeader}>{props.meal.header}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          <FontAwesome5 name="fire" size={18} color="rgba(175, 242, 66, 1)" />{" "}
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {Math.round(props.meal.currentCalories)}
          </Text>
          {props.summary && (
            <Text style={{ fontFamily: "Montserrat_light" }}>
              /{props.meal.neededCalories}
            </Text>
          )}
          kcal
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <Text style={{ fontFamily: "Montserrat_light", fontSize: 12 }}>
            <Feather name="edit" size={18} color="rgba(175, 242, 66, 1)" />{" "}
            {props.meal.foodNum} {props.summary ? "dishes" : ""}
          </Text>
        </View>
        <View style={styles.nutrients}>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Carbs</Text>
            <Progress.Bar
              progress={
                Math.round(props.meal.currentCarbs * 10) /
                10 /
                (props.summary
                  ? props.meal.neededCarbs
                  : props.meal.currentCalories / 4)
              }
              width={50}
              color="rgba(107, 210, 167, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(props.meal.currentCarbs * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Proteins</Text>
            <Progress.Bar
              progress={
                props.meal.currentProteins /
                (props.summary
                  ? props.meal.neededProteins
                  : props.meal.currentCalories / 4)
              }
              width={50}
              color="rgba(147, 202, 252, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(props.meal.currentProteins * 10) / 10}g
            </Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Fats</Text>
            <Progress.Bar
              progress={
                props.meal.currentFats /
                (props.summary
                  ? props.meal.neededFats
                  : props.meal.currentCalories / 9)
              }
              width={50}
              color="rgba(249, 187, 249, 1)"
            />
            <Text style={styles.amountText}>
              {Math.round(props.meal.currentFats * 10) / 10}g
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  allDayContainer: {
    width: "85%",
    alignSelf: "center",
  },
  summary: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(29, 22, 23, 0.3)",
    borderRadius: 20,
  },
  summaryText: {
    width: "60%",
  },
  summaryHeader: {
    fontFamily: "Montserrat",
    marginTop: 10,
    marginBottom: 10,
  },
  nutrients: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutrientText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    marginBottom: 3,
  },
  amountText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    color: "rgba(177, 177, 177, 1)",
    marginTop: 3,
  },
});
