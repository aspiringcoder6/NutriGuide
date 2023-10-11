import { View } from "react-native";
import Header from "./Header";
import { ScrollView } from "react-native";
import ChoosePeriod from "./choosePeriod";
import React, { useState } from "react";
import { Text } from "react-native";
import SearchList from "./SearchList";
export default function PlanNutrition({ navigation }) {
  const [addMode, setAddMode] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const navigateMenu = () => {
    navigation.navigate("MenusScreen");
  };
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
  const getSearch = (array) => {
    if (array.length === 0) {
      setSearchList([]);
    } else {
      setSearchList(array);
    }
  };
  const searchFood = () => {
    setAddMode((prevMode) => {
      return !prevMode;
    });
    setSearchList([]);
  };
  const DrinkWater = () => {
    navigation.navigate("WaterScreen");
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Header
        searchHandler={searchFood}
        addMode={addMode}
        navigateMenu={navigateMenu}
        getSearch={getSearch}
      />
      {addMode ? (
        <>
          <SearchList searchArr={searchList} detailHandler={detailHandler} />
        </>
      ) : (
        <ChoosePeriod onDrink={DrinkWater} detailHandler={detailHandler} />
      )}
    </ScrollView>
  );
}
