import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Category(props) {
  return (
    <TouchableOpacity
      style={{ display: "flex", width: 140, height: 140 }}
      onPress={() => {
        props.handleSearch(props.categoryName);
      }}
    >
      <ImageBackground
        source={props.image}
        style={{ width: "100%", height: "100%", borderRadius: 30 }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Montserrat",
            }}
          >
            {props.categoryName}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
