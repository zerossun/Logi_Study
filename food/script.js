const searchBtn = document.getElementById('search_btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal_details_content');
const recipteCloseBtn = document.getElementById('recipe_close_btn');
const searchInput = document.getElementById('search_input');
const mealDetails = document.getElementsByClassName('meal_details_content');
const mealChoice = document.getElementById('meal_choice');
const meal_options = document.getElementById('meal_options');
const mealCategory = document.getElementById('meal_category');
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);

fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let html4 = ``;
    if (data.categories) {
      data.categories.forEach((meal) => {
        html4 += `
        <div class="meal_option">
          <div class="meal_item" data-id="${meal.idCategory}">
            <div class="meal_img">
              <img src="${meal.strCategoryThumb}"/>
            </div>
            <div class="meal_name">
              <h3>${meal.strCategory}</h3>
            </div>
          </div>
        </div>`;
      });
      localStorage.setItem('today2', JSON.stringify(data));
    } else {
      html4 = `sorry I can't find it :(`;
    }
    mealCategory.innerHTML = html4;
  });

fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let html3 = ``;
    if (data.meals) {
      data.meals.forEach((meal) => {
        html3 = `
        <div class="meal_today">
          <div class="meal_item" data-id="${meal.idMeal}">
            <div class="meal_img">
              <img src="${meal.strMealThumb}"/>
            </div>
            <div class="meal_name">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        </div>
        `;
        let menuObj = {
          'name' : `${meal.strMeal}`,
          'img' : `${meal.strMealThumb}`,
          'category' : `${meal.strCategory}`,
          'area' : `${meal.strArea}`,
          'instruct' : `${meal.strInstructions}`,
          'ingredient1' : `${meal.strIngredient1}`,
          'ingredient2' : `${meal.strIngredient2}`,
        }
        localStorage.setItem('today', JSON.stringify(menuObj));
      });
    } else {
      html3 = `sorry I can't find it :(`;
    }
    mealChoice.innerHTML = html3;
    // let menu =  data.meals[0].strMeal;
  });

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

mealChoice.addEventListener('click', function () {
  console.log('1234');
  location.href = 'Detail/Today/Today.html';
});
