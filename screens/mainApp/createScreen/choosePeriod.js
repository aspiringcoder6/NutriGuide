import { View } from "react-native";
import { StyleSheet } from "react-native";
import Period from "./Period";
import styled from "styled-components";
import { useState } from "react";
import AllDay from "./AllDay";
import PeriodDetail from "./PeriodDetail";
const GoalContainer = styled.View`
  background: #ffffff;
  box-shadow: -1px 4px 11px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: -10px;
  padding-top: 15px;
  align-self: center;
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  gap: 10px;
  flex-direction: row;
  width: 100%;
`;
export default function ChoosePeriod(props) {
  const [active, setActive] = useState("rgba(0, 17, 61, 1)");
  const changeActive = (color) => {
    setActive(color);
  };
  const DrinkWater = () => {
    props.onDrink();
  };
  return (
    <>
      <GoalContainer>
        <Period
          color={"rgba(0, 17, 61, 1)"}
          name={"All Day"}
          active={active == "rgba(0, 17, 61, 1)"}
          onChoose={changeActive}
        />
        <Period
          color={"rgba(249, 187, 249, 1)"}
          name={"Breakfast"}
          active={active == "rgba(249, 187, 249, 1)"}
          onChoose={changeActive}
        />
        <Period
          color={"rgba(147, 202, 252, 1)"}
          name={"Lunch"}
          active={active == "rgba(147, 202, 252, 1)"}
          onChoose={changeActive}
        />
        <Period
          color={"rgba(107, 210, 167, 1)"}
          name={"Dinner"}
          active={active == "rgba(107, 210, 167, 1)"}
          onChoose={changeActive}
        />
        <Period
          color={"rgba(75, 106, 185, 1)"}
          name={"Snacks"}
          active={active == "rgba(75, 106, 185, 1)"}
          onChoose={changeActive}
        />
        <Period
          color={"rgba(143, 204, 232, 1)"}
          name={"Excercise"}
          active={active == "rgba(143, 204, 232, 1)"}
          onChoose={changeActive}
        />
      </GoalContainer>
      {active == "rgba(0, 17, 61, 1)" && <AllDay onDrink={DrinkWater} />}
      {active == "rgba(249, 187, 249, 1)" && (
        <PeriodDetail period="breakfast" detailHandler={props.detailHandler} />
      )}
      {active == "rgba(147, 202, 252, 1)" && (
        <PeriodDetail period="lunch" detailHandler={props.detailHandler} />
      )}
      {active == "rgba(107, 210, 167, 1)" && (
        <PeriodDetail period="dinner" detailHandler={props.detailHandler} />
      )}
      {active == "rgba(75, 106, 185, 1)" && (
        <PeriodDetail period="snacks" detailHandler={props.detailHandler} />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  periodContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
