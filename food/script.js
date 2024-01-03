const searchBtn = document.getElementById('search_btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal_details_content');
const recipteCloseBtn = document.getElementById('recipe_close_btn');
const searchInput = document.getElementById('search_input');
const mealDetails = document.getElementsByClassName('meal_details_content');
// searchBtn.addEventListener('click', getMealList);

// function getMealList() {
//   let searchInputTxt = searchInput.value.trim();
//   fetch(
//     `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       let html = '';
//       if (data.meals) {
//         data.meals.forEach((meal) => {
//           html += `
//               <div class="meal_item" data-id="${meal.idMeal}">
//                 <div class="meal_img">
//                   <img src="${meal.strMealThumb}" alt="food" />
//                 </div>
//                 <div class="meal_name">
//                   <h3>${meal.strMeal}</h3>
//                   <a href="#" class="recipe_btn">Get a Recipe</a>
//                 </div>
//               </div>
//           `;
//         });
//       }
//       mealList.innerHTML = html;
//     });
// }

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);

function getMealList() {
  let searchInputTxt = searchInput.value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let html = ``;
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          
          <div class="meal_item" data-id="${meal.idMeal}">
            <div class="meal_img">
              <img src="${meal.strMealThumb}"/>
            </div>
            <div class="meal_name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe_btn">Get a Recipe</a>
            </div>
          </div>
          `;
        });
      } else {
        html += `sorry I can't find it :(`;
      }
      mealList.innerHTML = html;
    });
}

function getRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe_btn')) {
    let mainItem = e.target.parentElement.parentElement;
    console.log(mainItem);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mainItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealReicipeModal(data.meals));
  }
}
function mealReicipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html2 = `
  <h2 class="recipe_title">${meal.strMeal}</h2>
  <p class="recipe_category">${meal.strCategory}</p>
  <div class="recipe_intruct">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe_meal_img">
    <img src="${meal.strMealThumb}">
  </div>
  <div class="recipe_link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html2;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}
recipteCloseBtn.addEventListener('click', function () {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});
