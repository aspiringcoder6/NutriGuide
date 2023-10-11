export function calculateTotalNutrition(state) {
  const meals = ["breakfast", "lunch", "dinner", "snacks"];
  const totalNutrition = {
    totalCalories: 0,
    totalCarbs: 0,
    totalProteins: 0,
    totalFats: 0,
  };

  meals.forEach((meal) => {
    totalNutrition.totalCalories += state[meal].totalCalories;
    totalNutrition.totalCarbs += state[meal].totalCarbs;
    totalNutrition.totalProteins += state[meal].totalProteins;
    totalNutrition.totalFats += state[meal].totalFats;
  });

  return totalNutrition;
}
