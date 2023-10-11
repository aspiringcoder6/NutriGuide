import styled from "styled-components";
import { useState } from "react";
import { Animated } from "react-native";
import { Image } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Activity = styled.View`
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 90%;
  align-self: center;
  margin-top: 20px;
  padding: 5px;
  display: flex;
  flex-direction: row;
`;
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { nutrientActions } from "../../../store/waterStore";
import { Modal } from "react-native";
const FoodItem = ({ image, name, nutrients, quantity, time, id }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.foodItem}>
      <Image source={{ uri: image }} style={styles.FoodImage} />
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
                      time: time,
                      foodId: id,
                      nutrients: nutrients,
                    })
                  );
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
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: 5,
          padding: 2,
          right: 6,
        }}
      >
        <Ionicons name="md-trash" size={16} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          color: "rgba(0, 17, 61, 1)",
          fontSize: 11,
          width: 80,
          height: 30,
          fontFamily: "Montserrat_light",
          textAlign: "center",
        }}
      >
        {name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "rgba(177, 177, 177, 1)",
            fontFamily: "Montserrat_light",
            fontSize: 9,
          }}
        >
          {nutrients.calories} kcal
        </Text>
        <Text
          style={{
            color: "rgba(177, 177, 177, 1)",
            fontFamily: "Montserrat_light",
            fontSize: 9,
          }}
        >
          {quantity}
        </Text>
      </View>
    </View>
  );
};

export default function Meal(props) {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const PanelHeight = useRef(new Animated.Value(0)).current;
  const togglePanelVisibility = () => {
    if (isPanelVisible) {
      Animated.timing(PanelHeight, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(PanelHeight, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
    setIsPanelVisible((prevIsVisible) => {
      return !prevIsVisible;
    });
  };
  return (
    <>
      <Activity>
        <Image source={props.image} />
        <Text style={{ fontFamily: "Montserrat_light", marginLeft: 10 }}>
          <Text style={{ color: "#00113D", fontFamily: "Montserrat" }}>
            {props.mealName}
            {"\n"}
          </Text>
          {props.calories}
          {props.neededCalories && `/${props.neededCalories}`} kcal
        </Text>
        <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }}>
          <Image source={require("../../../assets/plus.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", top: 45, right: 12 }}
          onPress={togglePanelVisibility}
        >
          <Image
            source={require("../../../assets/arrowhead.png")}
            style={{
              transform: [{ rotate: isPanelVisible ? "180deg" : "0deg" }],
            }}
          />
        </TouchableOpacity>
      </Activity>
      <Animated.View
        style={{
          height: PanelHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 120],
          }),
          overflow: "hidden",
          display: "flex",
          backgroundColor: "white",
          borderWidth: isPanelVisible ? 1 : 0,
          borderColor: "#e0e0e0",
          width: "90%",
          borderRadius: 10,
          marginTop: 10,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {props.mealItems.length === 0 ? (
          <Text style={styles.text}>No plans yet, add one?</Text>
        ) : (
          <ScrollView horizontal={true}>
            {props.mealItems.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  image={item.foodData.food.image}
                  name={item.foodData.food.label}
                  nutrients={{
                    calories: item.calories,
                    fats: item.fats,
                    carbs: item.carbs,
                    proteins: item.proteins,
                  }}
                  quantity={item.quantity}
                  time={props.mealName}
                  id={item.foodData.food.foodId}
                  triggerModal={() => {
                    setModalVisible(true);
                  }}
                />
              );
            })}
          </ScrollView>
        )}
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "grey",
    fontFamily: "Montserrat",
    textAlign: "center",
    margin: "auto",
    fontSize: 20,
  },
  FoodImage: {
    width: 70,
    alignSelf: "center",
    height: 70,
    borderRadius: 10,
  },
  foodItem: {
    marginLeft: 3,
    marginTop: 3,
  },
});
