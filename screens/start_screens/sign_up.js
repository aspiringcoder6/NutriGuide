import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { auth } from "../../firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Image } from "react-native";
export default function SignUpscreen({ navigation }) {
  const [name, setName] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [gmail, setGmail] = useState("");
  const [pass, setPass] = useState("");
  const [on, setOn] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Black.ttf"),
    Montserrat_light: require("../../assets/fonts/Montserrat-Light.ttf"),
    Poppins: require("../../assets/fonts/Poppins-Black.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const handleSignUp = async () => {
    if (name == "") {
      setNameError(true);
    }
    if (gmail == "") {
      setMailError(true);
    }
    if (pass == "") {
      setPassError(true);
    }
    if (!isChecked) {
      setCheckError("#f54c4c");
    }
    setTimeout(() => {
      setNameError(false);
      setMailError(false);
      setPassError(false);
      setCheckError(false);
    }, 2000);

    if (gmail != "" && pass != "" && name != "" && isChecked) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          gmail,
          pass
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: name,
        });
        navigation.navigate("HiScreen");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setOn(!on);
  };
  return (
    <View style={styles.bigcontainer}>
      <Image source={require("../../assets/bao.png")} style={styles.bao} />
      <Image
        source={require("../../assets/avocado.png")}
        style={styles.avocado}
      />
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>NutriGuide</Text>
        <Text style={styles.quote}>Your way to fitness</Text>
        <Text style={styles.formName}>Create an account</Text>
        {/* Name */}
        <TextInput
          style={[
            styles.input,
            { borderColor: nameError ? "#f54c4c" : "grey" },
          ]}
          onChangeText={setName}
          value={name}
          placeholder={nameError ? "invalid name!" : "Name"}
          placeholderTextColor={nameError ? "#f54c4c" : "grey"}
        />
        <AntDesign
          name="user"
          size={24}
          color={nameError ? "#f54c4c" : "grey"}
          style={styles.userIcon}
        />
        {/* Email */}
        <TextInput
          style={[
            styles.input,
            { borderColor: !mailError ? "grey" : "#f54c4c" },
          ]}
          onChangeText={setGmail}
          value={gmail}
          placeholder={mailError ? "Invalid gmail" : "Email"}
          placeholderTextColor={!mailError ? "grey" : "#f54c4c"}
        />
        <MaterialCommunityIcons
          name="gmail"
          size={24}
          color={mailError ? "#f54c4c" : "grey"}
          style={styles.gmailIcon}
        />
        {/* Password */}
        <TextInput
          style={[
            styles.input,
            { borderColor: passError ? "#f54c4c" : "grey" },
          ]}
          onChangeText={setPass}
          value={pass}
          placeholder={passError ? "Invalid Password!" : "Password"}
          placeholderTextColor={passError ? "#f54c4c" : "grey"}
          secureTextEntry={!on}
        />
        <AntDesign
          name="lock1"
          size={24}
          color={passError ? "#f54c4c" : "grey"}
          style={styles.lockIcon}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={on ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={24}
            color={passError ? "#f54c4c" : "grey"}
          />
        </TouchableOpacity>
        <View style={styles.terms}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={"grey"}
          />
          <Text
            style={{
              width: "90%",
              marginLeft: 10,
              color: checkError ? "#f54c4c" : "grey",
            }}
          >
            By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.seperator}>
          <View style={styles.line}></View>
          <Text style={{ marginLeft: 10, marginRight: 10 }}>Or</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.other}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/facebook.png")}
              style={styles.socialIcon}
            />
          </View>
        </View>
        <Text style={styles.toLoginText}>
          Already have an account?
          <Text
            style={styles.toLoginText2}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            {" "}
            Sign in
          </Text>
        </Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    position: "absolute",
    left: "8%",
    zIndex: 2,
  },
  bigcontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 48,
    letterSpacing: 0,
    textAlign: "center",
    color: "#3E445F",
    marginTop: 20,
    marginBottom: 11,
  },
  quote: {
    fontFamily: "Montserrat_light",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
    marginBottom: 20,
    color: "#3E445F",
  },
  formName: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "center",
    color: "#00113D",
  },
  input: {
    height: 48,
    width: 315,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#F7F8F8",
    borderRadius: 14,
    marginTop: 30,
    paddingLeft: 43,
  },
  userIcon: {
    position: "absolute",
    zIndex: 10,
    top: 190,
    left: 13,
  },
  gmailIcon: {
    position: "absolute",
    top: 268,
    left: 15,
  },
  lockIcon: {
    position: "absolute",
    top: 346,
    left: 16,
  },
  eyeIcon: {
    position: "absolute",
    top: 346,
    right: 15,
    width: 25,
    height: 20,
  },
  terms: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 315,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  signUpButton: {
    height: 60,
    width: 315,
    borderRadius: 99,
    marginTop: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B6AB9",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
  seperator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    height: 1,
    width: "35%",
    backgroundColor: "#DDDADA",
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    padding: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  other: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  toLoginText: {
    marginTop: 10,
    fontSize: 16,
  },
  toLoginText2: {
    fontSize: 16,
    color: "#3C8F7C",
  },
  bao: {
    position: "absolute",
    zIndex: 1,
    top: 70,
  },
  avocado: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    bottom: -10,
  },
});
