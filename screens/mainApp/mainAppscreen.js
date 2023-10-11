import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Homescreen from "./mainScreen/InformationScreen";
import ProgressScreen from "./progress";
import { Foundation } from "@expo/vector-icons";
import MenuScreen from "./Menu";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { View } from "react-native";
import { Text } from "react-native";
import PlanNutrition from "./createScreen/planNutrition";
const Tab = createMaterialBottomTabNavigator();
export default function MainAppScreen() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      shifting={true}
      activeColor="#0047D7"
      inactiveColor="rgba(155, 183, 240, 1)"
      barStyle={{
        backgroundColor: "white",
        borderTopWidth: 1,
        position: "absolute",
        borderTopColor: "#d4d4d4",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        style={{ backgroundColor: "white" }}
        component={ProgressScreen}
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color }) => (
            <AntDesign name="areachart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        style={{ backgroundColor: "white" }}
        component={PlanNutrition}
        options={{
          tabBarLabel: "Create Menu",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                top: -10,
                position: "absolute",
                width: 36,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  textAlign: "center",
                  marginLeft: 2,
                  marginBottom: 2,
                }}
              >
                +
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
