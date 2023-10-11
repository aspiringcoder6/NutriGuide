import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { MyContext } from "../../myContext";
export default function SignUpscreen({ navigation }) {
  const context = useContext(MyContext);
  const [gmail, setGmail] = useState("");
  const [pass, setPass] = useState("");
  const [on, setOn] = useState(false);
  const [emailRequired, setEmailRequired] = useState("Email");
  const [passRequired, setPassRequired] = useState("Password");
  const [emailmessagecolor, setEmailMessageColor] = useState("#ADA4A5");
  const [passmessagecolor, setPassMessageColor] = useState("#ADA4A5");

  const [EmailIconColor, setEmailIconColor] = useState("#7B6F72");
  const [PassIconColor, setPassIconColor] = useState("#7B6F72");

  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Black.ttf"),
    Montserrat_light: require("../../assets/fonts/Montserrat-Light.ttf"),
    Poppins: require("../../assets/fonts/Poppins-Black.ttf"),
    Montserrat_medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const resetScreen = () => {
    navigation.dispatch(StackActions.replace("SignUp"));
  };
  const handleLogin = () => {
    if (gmail == "") {
      setEmailRequired("Invalid Email!");
      setEmailMessageColor("#f54c4c");
      setEmailIconColor("#f54c4c");
    }
    if (pass == "") {
      setPassRequired("Invalid Password!");
      setPassMessageColor("#f54c4c");
      setPassIconColor("#f54c4c");
    }
    setTimeout(() => {
      setEmailRequired("Email");
      setEmailMessageColor("#ADA4A5");
      setEmailIconColor("#7B6F72");
      setPassRequired("Password");
      setPassMessageColor("#ADA4A5");
      setPassIconColor("#7B6F72");
    }, 3000);
    if (gmail != "" && pass != "") {
      signInWithEmailAndPassword(auth, gmail, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("mainAppScreen");
        })
        .catch((err) => {
          console.log(err);
        });
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
        <Text style={styles.formName}>Sign In</Text>
        {/* Email */}
        <TextInput
          style={[styles.input, { borderColor: emailmessagecolor }]}
          onChangeText={setGmail}
          value={gmail}
          placeholder={emailRequired}
          placeholderTextColor={emailmessagecolor}
        />
        <MaterialCommunityIcons
          name="gmail"
          size={24}
          color={EmailIconColor}
          style={styles.gmailIcon}
        />
        {/* Password */}
        <TextInput
          style={[styles.input, { borderColor: passmessagecolor }]}
          onChangeText={setPass}
          value={pass}
          placeholder={passRequired}
          placeholderTextColor={passmessagecolor}
          secureTextEntry={!on}
        />
        <AntDesign
          name="lock1"
          size={24}
          color={PassIconColor}
          style={styles.lockIcon}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={on ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={24}
            color={PassIconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
          Don't have an account?
          <Text
            style={styles.toLoginText2}
            onPress={() => {
              navigation.navigate("SignUp"), resetScreen();
            }}
          >
            {" "}
            Sign Up
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
    marginBottom: 51,
    textAlign: "center",
    color: "#00113D",
  },
  input: {
    height: 48,
    width: 315,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 30,
    paddingLeft: 43,
  },
  gmailIcon: {
    position: "absolute",
    top: 241,
    left: 15,
  },
  lockIcon: {
    position: "absolute",
    top: 318,
    left: 16,
  },
  eyeIcon: {
    position: "absolute",
    top: 318,
    right: 15,
    width: 25,
    height: 20,
  },
  LoginButton: {
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
    fontWeight: "200",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
  seperator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
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
