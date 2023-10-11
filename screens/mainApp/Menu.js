import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import Diet from "./Diet";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView } from "react-native";
export default function MenuScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState();
  const navigateDetail = (dietData) => {
    navigation.navigate("DietDetailScreen", { dietData: dietData });
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.header}>
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
            Diet Plans
          </Text>
          <TouchableOpacity>
            <Image source={require("../../assets/icons.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarContainer}>
          <AntDesign
            name="search1"
            size={24}
            color="rgb(180,180,180)"
            style={{ marginLeft: 10, marginRight: 10 }}
          />

          <TextInput
            style={{ color: "black" }}
            placeholder="Search For Diets"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.recommended}>
        <Text
          style={{
            width: "90%",
            alignSelf: "center",
            fontFamily: "Montserrat",
            color: "white",
          }}
        >
          <FontAwesome name="heartbeat" size={24} color="white" /> Popular Diet
          Choice
        </Text>
        <ScrollView>
          <Diet
            image={require("../../assets/protein.png")}
            dietName={"Protein Diet"}
            shortDesc={"Protein-rich diet"}
            longDesc={"Use protein-rich foods in your meal"}
            time={"7 days"}
            detailDesc={
              "A high-protein diet focuses on protein-rich foods like lean meats and legumes"
            }
            detailGoal={
              "-Known for its potential benefits in muscle building, appetite control, weight management, blood sugar stabilization, and supporting overall health.\n\n-The primary goal vary, including muscle gain, weight loss, blood sugar management, or general health improvement."
            }
            requestedFood={[
              {
                breakfast: ["Scrambled eggs", "Spinach", "Tomato"],
                lunch: ["Greek yogurt", "Honey", "Berries"],
                dinner: ["Baked Salmon", "Asparagus", "Salad"],
                snacks: ["Almond"],
              },
              {
                breakfast: ["Oatmeal", "Protein powder", "Banana", "Almonds"],
                lunch: ["Tofu stir-fry", "Mixed vegetables", "Brown rice"],
                dinner: [
                  "Lean beef steak",
                  "Brussels sprouts",
                  "Sweet potatoes",
                ],
                snacks: ["Cottage cheese", "Pineapple chunks"],
              },
              {
                breakfast: ["Greek yogurt", "Granola", "Fresh berries"],
                lunch: ["Turkey and avocado lettuce wraps", "Mixed greens"],
                dinner: ["Baked cod", "Quinoa", "Roasted zucchini"],
                snacks: ["Hard-boiled eggs"],
              },
              {
                breakfast: ["Spinach and feta omelette"],
                lunch: ["Lentil soup", "Whole-grain bread"],
                dinner: ["Grilled shrimp skewers", "Quinoa salad"],
                snacks: ["Edamame"],
              },
              {
                breakfast: [
                  "Protein smoothie",
                  "Spinach",
                  "Banana",
                  "Whey protein",
                ],
                lunch: ["Chickpea and vegetable curry", "Brown rice"],
                dinner: ["Grilled chicken breast", "Asparagus", "Quinoa"],
                snacks: ["Sliced turkey or chicken breast"],
              },
              {
                breakfast: ["Cottage cheese pancakes", "Berries"],
                lunch: ["Beef and vegetable stir-fry", "Brown rice"],
                dinner: ["Baked tilapia", "Green beans", "Mashed cauliflower"],
                snacks: ["Mixed nuts", "Dried fruit"],
              },
              {
                breakfast: [
                  "Scrambled tofu",
                  "Spinach",
                  "Mushrooms",
                  "Bell peppers",
                ],
                lunch: [
                  "Quinoa salad",
                  "Grilled chicken",
                  "Cherry tomatoes",
                  "Cucumbers",
                ],
                dinner: [
                  "Turkey meatballs",
                  "Zucchini noodles",
                  "Marinara sauce",
                ],
                snacks: ["Sliced turkey or ham roll-ups", "Cheese"],
              },
            ]}
            goal={"Increase muscle , weight loss"}
            navigateDetail={navigateDetail}
          />
          <Diet
            image={require("../../assets/keto.png")}
            dietName={"Keto"}
            shortDesc={"Keep eating the fat off"}
            longDesc={
              "Cutting carbs, increase in fats to supplies calories for body"
            }
            time={"7 days"}
            goal={"Reduce weight, healthy"}
            navigateDetail={navigateDetail}
          />
          <Diet
            image={require("../../assets/vegetarian.png")}
            dietName={"Vegetarian"}
            shortDesc={"Vegan diet"}
            longDesc={"Get rid of animal-orignated foods out of daily lives"}
            time={"7 days"}
            goal={"Healthy"}
            navigateDetail={navigateDetail}
          />
        </ScrollView>
      </View>
      <View style={styles.other}>
        <Text
          style={{
            width: "90%",
            alignSelf: "center",
            fontFamily: "Montserrat",
            color: "black",
          }}
        >
          <AntDesign name="staro" size={24} color="black" /> Other Diet Plans
        </Text>
        <Diet
          image={require("../../assets/Mediterranean.jpg")}
          dietName={"Medinettarean"}
          shortDesc={"Heart-Healthy Foods"}
          longDesc={
            "Emphasizes whole foods, fruits, vegetables, fish, olive oil"
          }
          time={"7 days"}
          goal={"Improve heart health"}
          navigateDetail={navigateDetail}
        />
        <Diet
          image={require("../../assets/Intermittent.jpg")}
          dietName={"Intermittent Fasting"}
          shortDesc={"Eating and fasting cycles"}
          longDesc={
            "Alternates eating and fasting periods using methods like 16/8 or 5:2."
          }
          time={"7 days"}
          goal={"Metabolic Health,longevity"}
          navigateDetail={navigateDetail}
        />
        <Diet
          image={require("../../assets/gluten.jpg")}
          dietName={"Gluten-Free diet"}
          shortDesc={"Eliminates gluten-containing foods"}
          longDesc={
            "Excludes wheat, barley, rye, and derivatives for celiac disease or gluten sensitivity"
          }
          time={"7 days"}
          goal={"Manage celiac disease"}
          navigateDetail={navigateDetail}
        />
        <Diet
          image={require("../../assets/paleo.jpg")}
          dietName={"Paleo Diet"}
          shortDesc={"Focuses on ancient-style foods"}
          longDesc={
            "Early human diets, lean meats, fish, fruits, vegetables, nuts, and seeds."
          }
          time={"7 days"}
          goal={"Reduce processed foods"}
          navigateDetail={navigateDetail}
        />
        <Text
          style={{
            color: "gray",
            textAlign: "center",
            marginTop: 10,
            borderTopWidth: 1,
            fontFamily: "Montserrat_light",
          }}
        >
          See more
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  other: {
    marginBottom: 100,
  },
  recommended: {
    backgroundColor: "rgba(75, 106, 185, 1)",
    borderRadius: 20,
    marginTop: -25,
    paddingBottom: 20,
    paddingTop: 30,
    zIndex: -1,
  },
  header: {
    backgroundColor: "white",
    paddingBottom: 30,
    borderRadius: 10,
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
});
