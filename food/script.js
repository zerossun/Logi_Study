const searchBtn = document.getElementById('search_btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal_details_content');
const recipteCloseBtn = document.getElementById('recipe_close_btn');
const searchInput = document.getElementById('search_input');
const mealDetails = document.getElementsByClassName('meal_details_content');
const mealChoice = document.getElementById('meal_choice');
const meal_options = document.getElementById('meal_options');
const mealCategory = document.getElementById('meal_category');
const mealmenu = document.getElementsByClassName('meal_list')

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);

// 카테고리 화면 코드 및 해당 페이지로 이동
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
              <h3 class="meal_name2">${meal.strCategory}</h3>
            </div>
          </div>
        </div>`;
        
      });
    } else {
      html4 = `sorry I can't find it :(`;
    }
    mealCategory.innerHTML = html4;

    
// 자식요소 "meal_option"지정, HtmlCollection으로 반환     
const liElements = mealCategory.children;
console.log(liElements)

// Array.from으로 유사 배열 객체에서 유사 배열로 변환
const liElementsArray = Array.from(liElements); 
console.log(liElementsArray)
//배열 형태이므로 for문으로 각 요소에 접근하기
for(let i= 0;i<liElementsArray.length; i++){
  liElementsArray[i].addEventListener('click',function(){
    let menuObj2 = {
        'name' : liElementsArray[i].innerText
      }
      localStorage.setItem('type', JSON.stringify(menuObj2));
      location.href = 'Detail/Type/Type.html';
  })
}
  });

  // 오늘의 메뉴 화면 코드 및 해당 페이지로 이동
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
        // 저장할 api 정보들 객체로 정리
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

// 재료 검색 시, 해당 재료 음식 리스트 나오게
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

// 음식 클릭 시, 상세 정보 나오게
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
