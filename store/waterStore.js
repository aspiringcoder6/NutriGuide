import { createSlice, configureStore } from "@reduxjs/toolkit";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    currentWater: 0,
  },
  reducers: {
    drinkWater(state, action) {
      state.currentWater = state.currentWater + action.payload;
    },
  },
});
const searchSlice = createSlice({
  name: "searchHistory",
  initialState: {
    searchHistory: [],
  },
  reducers: {
    addToSearch(state, action) {
      if (state.searchHistory.length > 5) {
        state.searchHistory.shift();
      }
      state.searchHistory.push(action.payload);
    },
  },
});
const nutrientSlice = createSlice({
  name: "nutritions",
  initialState: {
    breakfast: {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    },
    lunch: {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    },
    dinner: {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    },
    snacks: {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    },
  },
  reducers: {
    eatFood(state, action) {
      const mealType = action.payload.time;
      const meal = state[mealType];

      meal.foods.push(action.payload);
      meal.totalCalories += Math.round(action.payload.calories * 10) / 10;
      meal.totalFats += Math.round(action.payload.fats * 10) / 10;
      meal.totalProteins += Math.round(action.payload.proteins * 10) / 10;
      meal.totalCarbs += Math.round(action.payload.carbs * 10) / 10;
    },
    deleteFood(state, action) {
      console.log(action.payload.foodId);
      const mealType = action.payload.time;
      const meal = state[mealType];
      meal.foods = meal.foods.filter((item) => {
        return item.foodData.food.foodId !== action.payload.foodId;
      });
      meal.totalCalories -= Math.round(action.payload.nutrients.calories);
      meal.totalFats -= Math.round(action.payload.nutrients.fats * 10) / 10;
      meal.totalProteins -=
        Math.round(action.payload.nutrients.proteins * 10) / 10;
      meal.totalCarbs -= Math.round(action.payload.nutrients.carbs * 10) / 10;
    },
    updateDay(state, action) {
      if (action.payload.breakfast) {
        state["breakfast"] = action.payload.breakfast;
      }
      if (action.payload.lunch) {
        state["lunch"] = action.payload.lunch;
      }
      if (action.payload.dinner) {
        state["dinner"] = action.payload.dinner;
      }
      if (action.payload.snacks) {
        state["snacks"] = action.payload.snacks;
      }
    },
  },
});
const store = configureStore({
  reducer: {
    water: waterSlice.reducer,
    nutritions: nutrientSlice.reducer,
    searchHistory: searchSlice.reducer,
  },
});
export default store;
export const waterActions = waterSlice.actions;
export const searchActions = searchSlice.actions;
export const nutrientActions = nutrientSlice.actions;
