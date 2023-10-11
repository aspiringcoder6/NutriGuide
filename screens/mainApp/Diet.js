import { View, ImageBackground, Text, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
export default function Diet(props) {
  return (
    <TouchableOpacity
      style={styles.diet}
      onPress={() => {
        const filteredObject = Object.fromEntries(
          Object.entries(props).filter(
            ([key]) => !["navigateDetail"].includes(key)
          )
        );

        props.navigateDetail(filteredObject);
      }}
    >
      <ImageBackground source={props.image} resizeMode="cover">
        <LinearGradient
          colors={[
            "rgba(2, 2, 2, 0.62)",
            "rgba(73, 73, 73, 0.446521)",
            "rgba(73, 73, 73, 0.446521)",
          ]}
          style={styles.linearGradient}
          start={{ x: 0.7, y: 0 }}
          locations={[0.085, 0.4751, 1.129]}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              fontFamily: "Montserrat_medium",
              marginTop: 10,
              marginLeft: 18,
            }}
          >
            {props.dietName}
          </Text>
          <Text
            style={{
              fontFamily: "Montserrat_light",
              fontSize: 10,
              color: "white",
              width: "40%",
              marginLeft: 18,
            }}
          >
            {props.shortDesc}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontStyle: "italic",
              fontWeight: 200,
              width: "40%",
              marginTop: 40,
              marginLeft: 18,
              marginBottom: 15,
            }}
          >
            {props.longDesc}
          </Text>
          <FontAwesome5
            name="bookmark"
            size={24}
            color="black"
            style={styles.bookMark}
          />
          <View style={styles.timeTag}>
            <Text style={{ fontSize: 10, fontFamily: "Montserrat" }}>
              Time:{" "}
              <Text style={{ fontFamily: "Montserrat_light" }}>
                {props.time}
              </Text>
            </Text>
          </View>
          <View style={styles.goalTag}>
            <Text style={{ fontSize: 9, fontFamily: "Montserrat" }}>
              Goal:{" "}
              <Text style={{ fontFamily: "Montserrat_light" }}>
                {props.goal}
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  diet: {
    width: "90%",
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 20,
  },
  bookMark: {
    position: "absolute",
    color: "white",
    right: 18,
    top: 10,
  },
  timeTag: {
    position: "absolute",
    backgroundColor: "#CCE9F2",
    borderRadius: 5,
    padding: 5,
    right: 18,
    bottom: 40,
  },
  goalTag: {
    position: "absolute",
    backgroundColor: "#AFF242",
    borderRadius: 5,
    padding: 5,
    right: 18,
    bottom: 15,
  },
});
