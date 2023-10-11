import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
export default function Period(props) {
  const changeColor = () => {
    props.onChoose(props.color);
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.active ? props.color : "transparent",
        borderWidth: 1,
        borderColor: props.color,
        paddingVertical: 3,
        borderRadius: 5,
      }}
      onPress={changeColor}
    >
      <Text style={{ color: props.active ? "white" : props.color }}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
