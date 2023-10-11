import { View, Text, ImageBackground, ScrollView } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { TextInput } from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { calculateTotalNutrition } from "../../store/utils";
import { nutrientActions } from "../../store/waterStore";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
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
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
export default function FoodScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const currentNutritions = useSelector((state) => {
    return state.nutritions;
  });
  const [defaultNutritionData, setDefaultNutritionData] = useState(false);
  const totalNutrition = calculateTotalNutrition(currentNutritions);
  const { foodData, edit, detail, defaultPeriod } = route.params;
  const [quantity, setQuantity] = useState(detail.quantity);
  const [nutritionData, setNutritionData] = useState(false);
  const [periods, setPeriods] = useState(defaultPeriod);
  const quantifiers = foodData.measures.map((item) => {
    return item.label;
  });
  const [measurement, setMeasurement] = useState(detail.measurement);
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const addPeriod = (period) => {
    if (periods.includes(period)) {
      setPeriods((prev) => {
        return prev.filter((value) => {
          return value !== period;
        });
      });
    } else {
      setPeriods((prev) => {
        return [...prev, period];
      });
    }
  };
  const addFood = () => {
    if (quantity && periods.length !== 0) {
      for (let i = 0; i < periods.length; i++) {
        dispatch(
          nutrientActions.eatFood({
            time: periods[i],
            quantity: `${quantity} ${measurement}`,
            calories: nutritionData.calories,
            proteins: nutritionData.totalNutrients.PROCNT.quantity,
            fats: nutritionData.totalNutrients.FAT.quantity,
            carbs: nutritionData.totalNutrients.CHOCDF.quantity,
            foodData: foodData,
          })
        );
      }
    }
  };
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
    });
  }, []);
  useEffect(() => {
    const measureData = foodData.measures.find((item) => {
      return item.label === measurement;
    });
    const nutrientData = {
      ingredients: [
        {
          quantity: parseInt(quantity),
          measureURI: measureData.uri,
          qualifiers: measureData.qualified
            ? measureData.qualified.qualifiers
            : [],
          foodId: foodData.food.foodId,
        },
      ],
    };
    axios
      .post(
        "https://api.edamam.com/api/food-database/v2/nutrients",
        nutrientData,
        { params, config }
      )
      .then((response) => {
        setNutritionData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [quantity, measurement, periods]);
  useEffect(() => {
    const measureData = foodData.measures.find((item) => {
      return item.label === measurement;
    });
    const nutrientData = {
      ingredients: [
        {
          quantity: parseInt(quantity),
          measureURI: measureData.uri,
          qualifiers: measureData.qualified
            ? measureData.qualified.qualifiers
            : [],
          foodId: foodData.food.foodId,
        },
      ],
    };
    axios
      .post(
        "https://api.edamam.com/api/food-database/v2/nutrients",
        nutrientData,
        { params, config }
      )
      .then((response) => {
        setDefaultNutritionData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    defaultNutritionData && (
      <View style={{ backgroundColor: "white", height: 1000 }}>
        <TouchableOpacity
          style={[styles.backContainer]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={{
            uri: foodData.food.image,
          }}
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
        />
        {detail.quantity !== 0 && (
          <View
            style={{
              backgroundColor: "rgba(255, 212, 228, 1)",
              position: "absolute",
              top: 133,
              width: "100%",
              display: "flex",
              alignContent: "center",
              height: 100,
              paddingTop: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat_light",
                fontSize: 16,
              }}
            >
              Edit
            </Text>
          </View>
        )}
        <ScrollView style={[styles.foodCard, { borderRadius: edit ? 0 : 20 }]}>
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "Montserrat",
              fontSize: 20,
              paddingTop: 10,
            }}
          >
            {foodData.food.label}
          </Text>
          <FontAwesome
            name="bookmark"
            size={24}
            color="black"
            style={{ position: "absolute", right: 20, top: 10 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
              alignItems: "baseline",
              marginTop: 5,
            }}
          >
            <Text>
              <FontAwesome5
                name="fire"
                size={18}
                color="rgba(175, 242, 66, 1)"
              />{" "}
              <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
                {Math.round(foodData.food.nutrients.ENERC_KCAL)}
              </Text>{" "}
              kcal
            </Text>
            <Text>
              <Image
                source={require("../../assets/todo_green.png")}
                style={{ height: 18, width: 18 }}
              />{" "}
              <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
                100
              </Text>{" "}
              g
            </Text>
          </View>
          <View style={styles.nutrients}>
            <View style={styles.nutrient}>
              <Text
                style={[
                  styles.nutrientText,
                  { color: "black", fontFamily: "Montserrat" },
                ]}
              >
                Carbs
              </Text>
              <Progress.Bar
                progress={
                  (foodData.food.nutrients.CHOCDF * 4) /
                  foodData.food.nutrients.ENERC_KCAL
                }
                width={60}
                color="rgba(107, 210, 167, 1)"
              />
              <Text style={styles.amountText}>
                {Math.round(foodData.food.nutrients.CHOCDF * 10) / 10}g
              </Text>
            </View>
            <View style={styles.nutrient}>
              <Text
                style={[
                  styles.nutrientText,
                  { color: "black", fontFamily: "Montserrat" },
                ]}
              >
                Proteins
              </Text>
              <Progress.Bar
                progress={
                  (foodData.food.nutrients.PROCNT * 4) /
                  foodData.food.nutrients.ENERC_KCAL
                }
                width={60}
                color="rgba(147, 202, 252, 1)"
              />
              <Text style={styles.amountText}>
                {Math.round(foodData.food.nutrients.PROCNT * 10) / 10}g
              </Text>
            </View>
            <View style={styles.nutrient}>
              <Text
                style={[
                  styles.nutrientText,
                  { color: "black", fontFamily: "Montserrat" },
                ]}
              >
                Fats
              </Text>
              <Progress.Bar
                progress={
                  (foodData.food.nutrients.FAT * 9) /
                  foodData.food.nutrients.ENERC_KCAL
                }
                width={60}
                color="rgba(249, 187, 249, 1)"
              />
              <Text style={styles.amountText}>
                {Math.round(foodData.food.nutrients.FAT * 10) / 10}g
              </Text>
            </View>
          </View>
          <View style={styles.quantControl}>
            <TouchableOpacity
              style={styles.decreaseButton}
              onPress={() => {
                if (quantity != 0) {
                  setQuantity((prevQuantity) => {
                    return (parseInt(prevQuantity) - 1).toString();
                  });
                }
              }}
            >
              <Text
                style={{
                  color: "rgba(75, 106, 185, 1)",
                  fontSize: 14,
                  fontFamily: "Montserrat",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{
                fontSize: 20,
                fontFamily: "Montserrat",
                color: "black",
                textAlign: "right",
                width: 40,
                height: 20,
              }}
              defaultValue={quantity.toString()}
              value={quantity.toString()}
              onChangeText={(text) => {
                setQuantity(text);
              }}
            />
            <SelectDropdown
              data={quantifiers}
              defaultValue={measurement}
              defaultButtonText="Gram"
              buttonStyle={{
                width: 60,
                height: 20,
                paddingHorizontal: 0,
                borderRadius: 5,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
              }}
              buttonTextStyle={{
                fontSize: 12,
              }}
              rowTextStyle={{
                fontSize: 14,
              }}
              onSelect={(selectedItem, index) => {
                setMeasurement(selectedItem);
              }}
            />
            <TouchableOpacity
              style={styles.increaseButton}
              onPress={() => {
                setQuantity((prev) => {
                  return (parseInt(prev) + 1).toString();
                });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Montserrat",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>

          {userData && nutritionData && (
            <View style={[styles.dailyNutritions]}>
              <Text
                style={{
                  fontFamily: "Montserrat",
                  marginLeft: 10,
                  marginTop: 20,
                  color: "white",
                }}
              >
                EFFECTS ON DAILY NEEDS:
              </Text>
              <View style={{ alignSelf: "center", marginBottom: 10 }}>
                <Text style={styles.nutrientText}>
                  {Math.round(totalNutrition.totalCalories * 10) / 10}
                  {defaultNutritionData.calories * defaultPeriod.length !==
                    nutritionData.calories * periods.length &&
                    (defaultNutritionData.calories * defaultPeriod.length <
                    nutritionData.calories * periods.length ? (
                      <Text style={{ color: "#42f563" }}>
                        {nutritionData.calories * periods.length !== 0 &&
                          "+" +
                            (nutritionData.calories * periods.length -
                              (defaultNutritionData.calories !== 0 &&
                                defaultNutritionData.calories *
                                  defaultPeriod.length))}{" "}
                      </Text>
                    ) : (
                      <Text style={{ color: "#d40e00" }}>
                        {"-" +
                          (defaultNutritionData.calories *
                            defaultPeriod.length -
                            nutritionData.calories * periods.length)}{" "}
                      </Text>
                    ))}
                  /{userData.calories} kcal
                </Text>
                <View>
                  {defaultNutritionData.calories * defaultPeriod.length <
                  nutritionData.calories * periods.length ? (
                    <>
                      <Progress.Bar
                        progress={
                          totalNutrition.totalCalories / userData.calories
                        }
                        width={160}
                        borderRadius={0}
                        color="white"
                      />
                      <Progress.Bar
                        progress={
                          (totalNutrition.totalCalories +
                            (nutritionData.calories
                              ? nutritionData.calories * periods.length -
                                (defaultNutritionData.calories !== 0 &&
                                  defaultNutritionData.calories *
                                    defaultPeriod.length)
                              : 0)) /
                          userData.calories
                        }
                        width={160}
                        style={{ position: "absolute", zIndex: -1 }}
                        borderRadius={0}
                        color="#42f563"
                      />
                    </>
                  ) : (
                    <>
                      <Progress.Bar
                        progress={
                          totalNutrition.totalCalories / userData.calories
                        }
                        width={160}
                        borderRadius={0}
                        color="#d40e00"
                      />
                      <Progress.Bar
                        progress={
                          (totalNutrition.totalCalories -
                            defaultNutritionData.calories *
                              defaultPeriod.length +
                            nutritionData.calories * periods.length) /
                          userData.calories
                        }
                        width={160}
                        style={{ position: "absolute", zIndex: 1 }}
                        borderRadius={0}
                        color="white"
                      />
                    </>
                  )}
                </View>
                <Text style={styles.nutrientText}>Calories</Text>
              </View>
              <View style={styles.dailyNutrients}>
                <View style={styles.dailyNutrient}>
                  <Text style={styles.nutrientText}>
                    {Math.round(totalNutrition.totalCarbs * 10) / 10}{" "}
                    {defaultNutritionData.calories * defaultPeriod.length !==
                      nutritionData.calories * periods.length &&
                      (defaultNutritionData.calories * defaultPeriod.length <
                      nutritionData.calories * periods.length ? (
                        <Text style={{ color: "#42f563" }}>
                          {nutritionData.calories * periods.length !== 0 &&
                            "+" +
                              Math.round(
                                nutritionData.totalNutrients.CHOCDF.quantity *
                                  10 *
                                  periods.length -
                                  (defaultNutritionData.calories !== 0 &&
                                    defaultNutritionData.totalNutrients.CHOCDF
                                      .quantity) *
                                    defaultPeriod.length *
                                    10
                              ) /
                                10}{" "}
                        </Text>
                      ) : (
                        <Text style={{ color: "#d40e00" }}>
                          {"-" +
                            Math.round(
                              defaultNutritionData.totalNutrients.CHOCDF
                                .quantity *
                                defaultPeriod.length *
                                10 -
                                (nutritionData.totalCalories
                                  ? nutritionData.totalNutrients.CHOCDF
                                      .quantity *
                                    10 *
                                    periods.length
                                  : 0)
                            ) /
                              10}
                        </Text>
                      ))}
                    /{userData.carbs} g
                  </Text>
                  <View>
                    {defaultNutritionData.calories * defaultPeriod.length <
                    nutritionData.calories * periods.length ? (
                      <>
                        <Progress.Bar
                          progress={totalNutrition.totalCarbs / userData.carbs}
                          width={83}
                          borderRadius={0}
                          color="white"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalCarbs +
                              Math.round(
                                (defaultNutritionData.calories &&
                                  -defaultNutritionData.totalNutrients.CHOCDF
                                    .quantity *
                                    10 *
                                    periods.length) +
                                  (nutritionData.calories * periods.length !==
                                    0 &&
                                    nutritionData.totalNutrients.CHOCDF
                                      .quantity *
                                      10 *
                                      periods.length)
                              ) /
                                10) /
                            userData.carbs
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: -1 }}
                          borderRadius={0}
                          color="#42f563"
                        />
                      </>
                    ) : (
                      <>
                        <Progress.Bar
                          progress={totalNutrition.totalCarbs / userData.carbs}
                          width={83}
                          borderRadius={0}
                          color="#d40e00"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalCarbs +
                              Math.round(
                                (defaultNutritionData.calories &&
                                  defaultNutritionData.totalNutrients.CHOCDF
                                    .quantity *
                                    10 *
                                    periods.length) -
                                  (nutritionData.calories * periods.length !==
                                    0 &&
                                    nutritionData.totalNutrients.CHOCDF
                                      .quantity *
                                      10 *
                                      periods.length)
                              ) /
                                10) /
                            userData.carbs
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: 1 }}
                          borderRadius={0}
                          color="white"
                        />
                      </>
                    )}
                  </View>
                  <Text style={styles.nutrientText}>Carbs</Text>
                </View>
                <View style={styles.dailyNutrient}>
                  <Text style={styles.nutrientText}>
                    {Math.round(totalNutrition.totalFats * 10) / 10}
                    {defaultNutritionData.calories * defaultPeriod.length !==
                      nutritionData.calories * periods.length &&
                      (defaultNutritionData.calories * defaultPeriod.length <
                      nutritionData.calories * periods.length ? (
                        <Text style={{ color: "#42f563" }}>
                          {"+" +
                            Math.round(
                              (nutritionData.calories * periods.length !== 0 &&
                                nutritionData.totalNutrients.FAT.quantity *
                                  10 *
                                  periods.length) -
                                (defaultNutritionData.calories &&
                                  defaultNutritionData.totalNutrients.FAT
                                    .quantity *
                                    10 *
                                    defaultPeriod.length)
                            ) /
                              10}{" "}
                        </Text>
                      ) : (
                        <Text style={{ color: "#d40e00" }}>
                          {"-" +
                            Math.round(
                              (nutritionData.calories * periods.length !== 0 &&
                                -nutritionData.totalNutrients.FAT.quantity *
                                  10 *
                                  periods.length) +
                                (defaultNutritionData.calories &&
                                  defaultNutritionData.totalNutrients.FAT
                                    .quantity *
                                    10 *
                                    defaultPeriod.length)
                            ) /
                              10}{" "}
                        </Text>
                      ))}
                    /{userData.fats} g
                  </Text>
                  <View>
                    {defaultNutritionData.calories * defaultPeriod.length <=
                    nutritionData.calories * periods.length ? (
                      <>
                        <Progress.Bar
                          progress={totalNutrition.totalFats / userData.fats}
                          width={83}
                          borderRadius={0}
                          color="white"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalFats -
                              (defaultNutritionData.calories &&
                                defaultNutritionData.totalNutrients.FAT
                                  .quantity * defaultPeriod.length) +
                              (nutritionData.calories &&
                                nutritionData.totalNutrients.FAT.quantity *
                                  periods.length)) /
                            userData.fats
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: -1 }}
                          borderRadius={0}
                          color="#42f563"
                        />
                      </>
                    ) : (
                      <>
                        <Progress.Bar
                          progress={totalNutrition.totalFats / userData.fats}
                          width={83}
                          borderRadius={0}
                          color="#d40e00"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalFats -
                              (defaultNutritionData.calories &&
                                defaultNutritionData.totalNutrients.FAT
                                  .quantity * defaultPeriod.length) +
                              (nutritionData.calories &&
                                nutritionData.totalNutrients.FAT.quantity *
                                  periods.length)) /
                            userData.fats
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: 1 }}
                          borderRadius={0}
                          color="white"
                        />
                      </>
                    )}
                    <Text style={styles.nutrientText}>Fats</Text>
                  </View>
                </View>
                <View style={styles.dailyNutrient}>
                  <Text style={styles.nutrientText}>
                    {Math.round(totalNutrition.totalProteins * 10) / 10}
                    {defaultNutritionData.calories * defaultPeriod.length !==
                      nutritionData.calories * periods.length &&
                      (defaultNutritionData.calories * defaultPeriod.length <
                      nutritionData.calories * periods.length ? (
                        <Text style={{ color: "#42f563" }}>
                          {"+" +
                            Math.round(
                              (nutritionData.calories * periods.length !== 0 &&
                                nutritionData.totalNutrients.PROCNT.quantity *
                                  10 *
                                  periods.length) -
                                (defaultNutritionData.calories &&
                                  defaultNutritionData.totalNutrients.PROCNT
                                    .quantity *
                                    10 *
                                    defaultPeriod.length)
                            ) /
                              10}{" "}
                        </Text>
                      ) : (
                        <Text style={{ color: "#d40e00" }}>
                          {"-" +
                            Math.round(
                              (nutritionData.calories * periods.length !== 0 &&
                                -nutritionData.totalNutrients.PROCNT.quantity *
                                  10 *
                                  periods.length) +
                                (defaultNutritionData.calories &&
                                  defaultNutritionData.totalNutrients.PROCNT
                                    .quantity *
                                    10 *
                                    defaultPeriod.length)
                            ) /
                              10}{" "}
                        </Text>
                      ))}
                    /{userData.proteins}g{" "}
                  </Text>
                  <View>
                    {defaultNutritionData.calories * defaultPeriod.length <=
                    nutritionData.calories * periods.length ? (
                      <>
                        <Progress.Bar
                          progress={
                            totalNutrition.totalProteins / userData.proteins
                          }
                          width={83}
                          borderRadius={0}
                          color="white"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalProteins +
                              Math.round(
                                (nutritionData.calories &&
                                  nutritionData.totalNutrients.PROCNT.quantity *
                                    10 *
                                    periods.length) -
                                  (defaultNutritionData.calories &&
                                    defaultNutritionData.totalNutrients.PROCNT
                                      .quantity *
                                      10 *
                                      defaultPeriod.length)
                              ) /
                                10) /
                            userData.proteins
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: -1 }}
                          borderRadius={0}
                          color="#42f563"
                        />
                      </>
                    ) : (
                      <>
                        <Progress.Bar
                          progress={
                            totalNutrition.totalProteins / userData.proteins
                          }
                          width={83}
                          borderRadius={0}
                          color="#d40e00"
                        />
                        <Progress.Bar
                          progress={
                            (totalNutrition.totalProteins +
                              Math.round(
                                (nutritionData.calories &&
                                  nutritionData.totalNutrients.PROCNT.quantity *
                                    10 *
                                    periods.length) -
                                  (defaultNutritionData.calories &&
                                    defaultNutritionData.totalNutrients.PROCNT
                                      .quantity *
                                      10 *
                                      defaultPeriod.length)
                              ) /
                                10) /
                            userData.proteins
                          }
                          width={83}
                          style={{ position: "absolute", zIndex: 1 }}
                          borderRadius={0}
                          color="white"
                        />
                      </>
                    )}
                  </View>
                  <Text style={styles.nutrientText}>Proteins</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.choosePeriod}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat",
                fontSize: 12,
              }}
            >
              CHOOSE PERIOD(S) TO ADD:
            </Text>
            <View style={styles.periods}>
              <View>
                <ImageBackground
                  source={require("../../assets/breakfast_2.png")}
                  style={styles.period}
                >
                  <View
                    style={[
                      styles.periodName,
                      { backgroundColor: "rgba(249, 187, 249, 1)" },
                    ]}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>
                      Breakfast
                    </Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  style={styles.tickBox}
                  onPress={() => {
                    addPeriod("breakfast");
                  }}
                >
                  {periods.includes("breakfast") && (
                    <Entypo name="check" size={18} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <ImageBackground
                  source={require("../../assets/lunch_2.png")}
                  style={styles.period}
                >
                  <View
                    style={[
                      styles.periodName,
                      { backgroundColor: "rgba(147, 202, 252, 1)" },
                    ]}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>Lunch</Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  style={styles.tickBox}
                  onPress={() => {
                    addPeriod("lunch");
                  }}
                >
                  {periods.includes("lunch") && (
                    <Entypo name="check" size={18} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <ImageBackground
                  source={require("../../assets/dinner_2.png")}
                  style={styles.period}
                >
                  <View
                    style={[
                      styles.periodName,
                      { backgroundColor: "rgba(107, 210, 167, 1)" },
                    ]}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>Dinner</Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  style={styles.tickBox}
                  onPress={() => {
                    addPeriod("dinner");
                  }}
                >
                  {periods.includes("dinner") && (
                    <Entypo name="check" size={18} color="black" />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <ImageBackground
                  source={require("../../assets/snacks_2.png")}
                  style={styles.period}
                >
                  <View
                    style={[
                      styles.periodName,
                      { backgroundColor: "rgba(75, 106, 185, 1)" },
                    ]}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>Snacks</Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  style={styles.tickBox}
                  onPress={() => {
                    addPeriod("snacks");
                  }}
                >
                  {periods.includes("snacks") && (
                    <Entypo name="check" size={18} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {detail.quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={addFood}>
              <Text style={{ color: "white", fontFamily: "Montserrat" }}>
                Add Food
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.editButton} onPress={addFood}>
                <Text style={{ color: "black", fontFamily: "Montserrat" }}>
                  Edit Food
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={addFood}>
                <Text
                  style={{
                    color: "rgba(75, 106, 185, 1)",
                    fontFamily: "Montserrat",
                  }}
                >
                  Delete Food
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(75, 106, 185, 1)",
    alignSelf: "center",
    borderRadius: 10,
    width: "70%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "rgba(175, 242, 66, 1)",
    alignSelf: "center",
    borderRadius: 10,
    width: "70%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "rgba(75, 106, 185, 1)",
    alignSelf: "center",
    borderRadius: 10,
    width: "70%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  tickBox: {
    alignSelf: "center",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 7,
  },
  periodName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "70%",
    borderRadius: 5,
    alignSelf: "center",
  },
  periods: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  period: {
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    textAlign: "center",
  },
  dailyNutrients: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  dailyNeeds: {
    backgroundColor: "rgba(0, 17, 61, 1)",
  },
  dailyNutritions: {
    backgroundColor: "rgba(0, 17, 61, 1)",
    borderRadius: 20,
    marginTop: 10,
    paddingBottom: 10,
  },
  foodCard: {
    marginTop: -30,
    backgroundColor: "white",
    width: "104%",
    alignSelf: "center",
  },
  backContainer: {
    backgroundColor: "white",
    position: "absolute",
    zIndex: 10,
    top: 30,
    left: 10,
    borderRadius: 5,
    padding: 2,
  },
  nutrients: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  nutrientText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    textAlign: "center",
    color: "white",
    marginBottom: 3,
  },
  decreaseButton: {
    borderColor: "rgba(75, 106, 185, 1)",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 7,
    borderRadius: 5,
  },
  quantControl: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
    justifyContent: "center",
  },
  increaseButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    borderRadius: 5,
    backgroundColor: "rgba(75, 106, 185, 1)",
  },
});
