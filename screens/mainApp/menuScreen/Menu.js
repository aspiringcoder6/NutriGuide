import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, ImageBackground, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Menu(props) {
  const [imageIndex, setIndex] = useState(0);
  return (
    <View
      style={{
        backgroundColor: "rgba(204, 233, 242, 1)",
        width: "90%",
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        alignSelf: "center",
      }}
    >
      <Text
        style={{ fontSize: 16, fontFamily: "Montserrat", marginBottom: 40 }}
      >
        {props.menuData.name}
      </Text>
      <Text style={{ fontFamily: "Montserrat_light" }}>
        {props.menuData.mealData.foods.length} Dishes
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 40,
          width: 100,
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          borderRadius: 20,
          alignContent: "center",
        }}
        onPress={() => {
          props.navigateDetail(props.menuData);
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: 500 }}>See more</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", top: 63, right: 155 }}
        onPress={() => {
          if (imageIndex > 0) {
            setIndex((prev) => prev - 1);
          }
        }}
      >
        <Ionicons name="arrow-back-circle" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", top: 63, right: 18 }}
        onPress={() => {
          if (imageIndex < props.images.length - 1) {
            setIndex((prev) => prev + 1);
          }
        }}
      >
        <Ionicons
          name="arrow-back-circle"
          size={30}
          color="white"
          style={{ transform: [{ scaleX: -1 }] }}
        />
      </TouchableOpacity>
      <Image
        source={{
          uri: props.images[imageIndex],
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          position: "absolute",
          right: 50,
          top: 30,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 5,
          paddingVertical: 4,
          paddingHorizontal: 6,
          right: 12,
          top: 8,
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({});
