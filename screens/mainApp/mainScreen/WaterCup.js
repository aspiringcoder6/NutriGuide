import { useEffect } from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { StyleSheet } from "react-native";
export default function WaterCup(props) {
  const onDrink = () => {
    props.DrinkWater();
  };
  const loadedCups = [];

  for (let i = 1; i <= 8; i++) {
    loadedCups.push(
      props.fullCups >= i ? (
        <Image source={require("../../../assets/full.png")} key={i} />
      ) : (
        <TouchableOpacity onPress={onDrink} key={i}>
          <Image source={require("../../../assets/empty.png")} />
        </TouchableOpacity>
      )
    );
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {loadedCups}
    </View>
  );
}
