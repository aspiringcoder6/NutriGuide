import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import SearchItem from "./SearchItem";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
export default function SearchList(props) {
  const searchHistory = useSelector((state) => {
    return state.searchHistory.searchHistory;
  });
  return (
    <>
      {props.searchArr.length !== 0 && (
        <>
          <Text
            style={{
              fontFamily: "Montserrat",
              marginLeft: 20,
              marginTop: 20,
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            Search Results
          </Text>
          <View styles={styles.allDayContainer}>
            <ScrollView style={{ height: 200 }}>
              {props.searchArr.map((item, index) => {
                return (
                  <SearchItem
                    foodData={item}
                    key={index}
                    detailHandler={props.detailHandler}
                  />
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
      <Text style={styles.heading}>Search History</Text>
      {searchHistory.length === 0 ? (
        <Text style={{ color: "rgba(177, 177, 177, 1)", alignSelf: "center" }}>
          None currently
        </Text>
      ) : (
        searchHistory.map((item, index) => {
          return (
            <SearchItem
              foodData={item.foodData}
              key={index}
              detailHandler={props.detailHandler}
              history={true}
            />
          );
        })
      )}
    </>
  );
}
const styles = StyleSheet.create({
  allDayContainer: {
    paddingBottom: 100,
    backgroundColor: "white",
  },
  heading: {
    fontFamily: "Montserrat",
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    marginBottom: 20,
  },
});
