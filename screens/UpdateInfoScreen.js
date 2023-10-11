import { auth } from "../firebase";
import { db } from "../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function UpdateInfoScreen({ navigation }) {
  const user = auth.currentUser;
  const [weight, setWeight] = useState();
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const updateChanges = async () => {
    setModalVisible(true);
    const calories = Math.round(
      userData.gender == "Male"
        ? userData.rate *
            userData.excerciseFactor *
            (13.397 * userData.weight +
              4.799 * userData.height -
              5.677 * userData.age +
              88.632)
        : userData.rate *
            userData.excerciseFactor *
            (9.247 * userData.weight +
              3.098 * userData.height -
              4.33 * userData.age +
              447.593)
    );
    const carbs = Math.round((calories * 0.55) / 4);
    const proteins = Math.round(0.25 * calories) / 4;
    const fats = Math.round((0.2 * calories) / 9);
    const saturatedFats = Math.round(0.07 * calories);
    await updateDoc(doc(db, "users", user.uid), {
      weight: parseInt(weight),
      calories: calories,
      carbs: carbs,
      proteins: proteins,
      fats: fats,
      saturatedFats: saturatedFats,
      water: Math.round(66 * 1.1 * 0.03 * 10) / 10,
    });
  };
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
      setWeight(res.data().weight);
    });
  }, []);
  return (
    userData && (
      <View style={styles.container}>
        <Modal
          transparent={true}
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
              style={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: "50%",
                borderWidth: 3,
                borderColor: "rgba(204, 233, 242, 1)",
              }}
            >
              <Entypo name="check" size={40} color="rgba(204, 233, 242, 1)" />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Montserrat",
                  color: "rgba(204, 233, 242, 1)",
                  marginTop: 5,
                }}
              >
                Update Successfully!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                backgroundColor: "rgba(204, 233, 242, 1)",
                borderRadius: 20,
                width: 200,
                borderColor: "rgba(175, 242, 66, 1)",
                borderWidth: 2,
                height: 30,
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontFamily: "Montserrat" }}>
                Let's Continue!
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ImageBackground
          source={require("../assets/girl.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={styles.arrow}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.header}>Your current Profile</Text>
          <View style={styles.smallcontainer}>
            <Text style={styles.information}>
              <AntDesign
                name="user"
                size={24}
                color="gray"
                style={styles.userIcon}
              />
              Gender: {userData.gender}
            </Text>
            <Text style={styles.information}>
              <Feather name="target" size={24} color="grey" />
              Goal:{" "}
              <SelectDropdown
                buttonStyle={{
                  width: 150,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "transparent",
                }}
                buttonTextStyle={{
                  color: "black",
                  fontSize: 12,
                  width: "100%",
                }}
                data={[
                  "Increase Weight",
                  "Decrease Weight",
                  "Get In Shape",
                  "Improve Health",
                ]}
                defaultValue={userData.goal}
              />
            </Text>
            <View style={styles.lineContainer}>
              <Text style={styles.information}>
                <AntDesign name="clockcircleo" size={24} color="grey" /> Age:
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder={`${userData.age}`}
                placeholderTextColor={"black"}
              />
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.information}>
                <MaterialCommunityIcons
                  name="human-male-height"
                  size={24}
                  color="grey"
                />{" "}
                Height:
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder={`${userData.height}`}
                placeholderTextColor={"black"}
              />
              <Text style={styles.information}>cm</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.information}>
                <MaterialCommunityIcons name="weight" size={24} color="grey" />{" "}
                Current Weight :
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder={`${userData.weight}`}
                value={weight}
                onChangeText={setWeight}
                placeholderTextColor={"black"}
              />
              <Text style={styles.information}>kg</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.information}>
                <MaterialCommunityIcons name="weight" size={24} color="grey" />{" "}
                Desired Weight :
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder={`${userData.desireWeight}`}
                placeholderTextColor={"black"}
              />
              <Text style={styles.information}>kg</Text>
            </View>
            <Text style={styles.information}>
              <AntDesign name="clockcircleo" size={24} color="grey" />
              Rate of change :
              <SelectDropdown
                data={[0, 0.25, 0.5]}
                defaultValue={userData.change}
                buttonStyle={{
                  width: 80,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "transparent",
                }}
                buttonTextStyle={{
                  color: "black",
                  fontSize: 12,
                  width: "100%",
                }}
              />
              kg/tuần
            </Text>
            <Text style={styles.information}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="grey"
              />
              Excercise Level :
              <SelectDropdown
                data={["No Excercise", "Light", "Medium", "Heavy", "Athelete"]}
                buttonStyle={{
                  width: 150,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  backgroundColor: "transparent",
                }}
                buttonTextStyle={{
                  color: "black",
                  fontSize: 12,
                  width: "100%",
                }}
                defaultValue={userData.exercise}
              />
            </Text>
            <TouchableOpacity style={styles.button} onPress={updateChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  lineContainer: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "row",
    gap: 10,
  },
  inputField: {
    paddingHorizontal: 10,
    color: "black",
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    borderColor: "grey",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    marginTop: 87,
    fontFamily: "Montserrat",
    color: "#3E445F",
    fontSize: 20,
  },
  button: {
    height: 60,
    width: 315,
    borderRadius: 99,
    marginTop: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B6AB9",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
  information: {
    fontSize: 18,
    fontFamily: "Montserrat_light",
    marginTop: 20,
  },
});
