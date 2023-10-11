import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { searchActions } from "../../../store/waterStore";
export default function SearchItem(props) {
  const dispatch = useDispatch();
  const showDetails = () => {
    if (!props.history) {
      dispatch(searchActions.addToSearch({ foodData: props.foodData }));
    }
    props.detailHandler(props.foodData);
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={showDetails}>
      <Text style={{ fontWeight: 600, fontSize: 14 }}>
        {props.foodData.food.label}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: "rgba(196, 196, 196, 0.5)",
    marginLeft: 30,
    width: "83%",
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
});
