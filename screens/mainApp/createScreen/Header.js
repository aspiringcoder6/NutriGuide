import { Touchable, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { nutrientActions } from "../../../store/waterStore";
import { getDoc, doc, updateDoc } from "firebase/firestore";
export default function Header(props) {
  const date = new Date();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(date);
  const [healthFilters, setHealthFilters] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const dropdownRef = useRef();
  const searchFood = () => {
    setSearchTerm("");
    props.searchHandler();
  };
  useEffect(() => {
    let debounceTimeout;
    if (healthFilters.length !== 0) {
      dropdownRef.current.reset();
    }
    if (searchTerm) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(async () => {
        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?app_id=43df7168&app_key=72ce1a7651b3a6c7ffad672876040425&ingr=${searchTerm}&nutrition-type=cooking${healthFilters.reduce(
            (accumulator, currentvalue) => {
              return `&health=${accumulator}` + currentvalue;
            },
            ""
          )}${categoryFilter && `&category=${categoryFilter}`}`
        );
        const data = await response.json();
        props.getSearch(data.hints);
      }, 1500);
    } else {
      props.getSearch([]);
    }
  }, [searchTerm, healthFilters, categoryFilter]);
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    const menuDocRef = doc(db, "users", user.uid, "menus", formattedDate);
    const defaultState = {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    };
    getDoc(menuDocRef).then((res) => {
      if (res.data()) {
        dispatch(
          nutrientActions.updateDay({
            breakfast: res.data().breakfast
              ? res.data().breakfast.mealData
              : defaultState,
            lunch: res.data().lunch ? res.data().lunch.mealData : defaultState,
            snacks: res.data().snacks
              ? res.data().snacks.mealData
              : defaultState,
            dinner: res.data().dinner
              ? res.data().dinner.mealData
              : defaultState,
          })
        );
      }
    });
  }, [currentDate]);
  return (
    <View
      style={{
        backgroundColor: props.addMode
          ? "rgba(255, 255, 255, 1)"
          : "rgba(204, 233, 242, 1)",
        with: "100%",
        borderRadius: props.addMode ? 20 : 0,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: -1,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 11,
        paddingBottom: 40,
      }}
    >
      <View style={styles.firstLine}>
        <TouchableOpacity
          style={[
            styles.backContainer,
            {
              backgroundColor: props.addMode
                ? "rgba(247, 248, 248, 1)"
                : "white",
            },
          ]}
          onPress={searchFood}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          {props.addMode ? "Create A Menu" : "Nutrition Diary"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigateMenu();
          }}
        >
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
        <TouchableOpacity onPress={searchFood}>
          {props.addMode ? (
            <TextInput
              style={{ color: "black" }}
              placeholder="Search For Food"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            ></TextInput>
          ) : (
            <Text style={styles.searchBar}>Search For Food</Text>
          )}
        </TouchableOpacity>
      </View>
      {props.addMode && (
        <>
          <View style={styles.filtersContainer}>
            <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
              Labels:
            </Text>
            {healthFilters.map((filter, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.filterContainer}
                  onPress={() => {
                    setHealthFilters((prev) => {
                      const updatedButtons = [
                        ...prev.slice(0, index),
                        ...prev.slice(index + 1),
                      ];
                      return updatedButtons;
                    });
                  }}
                >
                  <Text style={{ color: "white" }}>{filter}</Text>
                </TouchableOpacity>
              );
            })}
            <SelectDropdown
              data={[
                "alcohol-free",
                "celery-free",
                "crustacean-free",
                "dairy-free",
                "egg-free",
                "fish-free",
                "fodmap-free",
                "gluten-free",
                "immuno-supportive",
                "keto-friendly",
                "kidney-friendly",
                "kosher",
                "low-fat-abs",
                "low-potassium",
                "low-sugar",
                "lupine-free",
                "mustard-free",
                "no-oil-added",
                "paleo",
                "peanut-free",
                "pescatarian",
                "pork-free",
                "red-meat-free",
                "sesame-free",
                "shellfish-free",
                "soy-free",
                "sugar-concious",
                "tree-nut-free",
                "vegan",
                "vegetarian",
                "wheat-free",
              ]}
              buttonStyle={{
                width: 80,
                height: "100%",
                borderRadius: 5,
                backgroundColor: "pink",
              }}
              buttonTextStyle={{ color: "white" }}
              rowTextStyle={{ fontSize: 10 }}
              ref={dropdownRef}
              onSelect={(selectedItem, index) => {
                setHealthFilters((prev) => {
                  const updatedList = [...prev];
                  updatedList.push(selectedItem);
                  return updatedList;
                });
              }}
              defaultButtonText="+"
            />
          </View>
          <View style={styles.filtersContainer}>
            <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
              Category:
            </Text>
            <SelectDropdown
              data={[
                "generic-foods",
                "generic-meals",
                "packaged-foods",
                "fast-foods",
              ]}
              buttonStyle={{
                width: 120,
                height: 20,
                borderRadius: 5,
                backgroundColor: "#21c8ff",
              }}
              buttonTextStyle={{ color: "white", fontSize: 12 }}
              rowTextStyle={{ fontSize: 12 }}
              defaultButtonText="+"
              onSelect={(selectedItem, index) => {
                setCategoryFilter(selectedItem);
              }}
            />
          </View>
        </>
      )}
      {!props.addMode && (
        <View style={styles.dates}>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 1);
              setCurrentDate(newDate);
            }}
          >
            <Ionicons name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.dateName}>
            <MaterialIcons name="date-range" size={24} color="black" />
            <Text style={{ fontFamily: "Montserrat_light", fontSize: 16 }}>
              {currentDate.getDate() === date.getDate() && "Today,"}{" "}
              {currentDate.getDate()} th {date.getMonth() + 1}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 1);
              setCurrentDate(newDate);
            }}
          >
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="black"
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  filtersContainer: {
    display: "flex",
    marginLeft: 10,
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  filterContainer: {
    display: "flex",
    backgroundColor: "pink",
    padding: 4,
    borderRadius: 4,
  },
  searchBar: {
    color: "rgba(196, 196, 196, 1)",
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
  dates: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    alignSelf: "center",
    marginTop: 20,
  },
  dateName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
