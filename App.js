import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpscreen from "./screens/start_screens/sign_up";
import LoginScreen from "./screens/start_screens/login";
import HiScreen from "./screens/start_screens/HiScreen";
import AskScreen1 from "./screens/start_screens/askscreen/askscreen1";
import AskScreen2 from "./screens/start_screens/askscreen/askscreen2";
import AskScreen3 from "./screens/start_screens/askscreen/askscreen3";
import AskScreen4 from "./screens/start_screens/askscreen/askscreen4";
import AskScreen5 from "./screens/start_screens/askscreen/askscreen5";
import AskScreen6 from "./screens/start_screens/askscreen/asksceen6";
import AskScreen7 from "./screens/start_screens/askscreen/askscreen7";
import SeeResultScreen from "./screens/start_screens/askscreen/seeresultscreen";
import AskScreen8 from "./screens/start_screens/askscreen/askscreen8";
import ResultScreen from "./screens/start_screens/askscreen/resultscreen";
import MainAppScreen from "./screens/mainApp/mainAppscreen";
import WaterScreen from "./screens/mainApp/mainScreen/drinkWater";
import { MyContext } from "./myContext";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/waterStore";
import "firebase/auth";
import FoodScreen from "./screens/information_screens/FoodScreen";
import MenuScreen from "./screens/mainApp/Menu";
import MenusScreen from "./screens/mainApp/menuScreen/Menus";
import MenuDetailScreen from "./screens/mainApp/menuScreen/MenuDetailScreen";
import DietDetailScreen from "./screens/mainApp/DietDetailScreen";
import UpdateInfoScreen from "./screens/UpdateInfoScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
export default function App() {
  const [currentUser, setCurrentUser] = useState();
  return (
    <Provider store={store}>
      <MyContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignUp"
              component={SignUpscreen}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="WaterScreen"
              component={WaterScreen}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="FoodInfo"
              component={FoodScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="HiScreen"
              component={HiScreen}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Askscreen1"
              component={AskScreen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen2"
              component={AskScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen3"
              component={AskScreen3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen4"
              component={AskScreen4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen5"
              component={AskScreen5}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen6"
              component={AskScreen6}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen7"
              component={AskScreen7}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Askscreen8"
              component={AskScreen8}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SeeResultscreen"
              component={SeeResultScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResultScreen"
              component={ResultScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="mainAppScreen"
              component={MainAppScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MenusScreen"
              component={MenusScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MenuDetailScreen"
              component={MenuDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DietDetailScreen"
              component={DietDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UpdateInfoScreen"
              component={UpdateInfoScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
