    const mealResult = document.getElementById('meal_result')
    const mealName = document.querySelector('.type_name')

    //함수 차이
    const mealName1 = document.querySelector('.type_name')
    const mealName2 = document.getElementsByClassName('type_name')
    //
    // scripty에서 보낸 함수 받기
    const todayMenu = localStorage.getItem('type');
    // 받은 함수 객체로 변환
    const menuObjectList = JSON.parse(todayMenu);
    const menuCategory = document.getElementById('meal');
    const mealDetailsContent = document.querySelector('.meal_details_content');
    const recipteCloseBtn = document.getElementById('recipe_close_btn');
    const back = document.querySelector('.back');
    
    // 제목
    mealName.innerText = menuObjectList.name;
    menuCategory.addEventListener('click', getRecipe);
    
    console.log(mealName1) // <p>pasta</p>
    console.log(mealName2) // HTMLCollection [div.type_name.title, innerText: 'Pasta']

    // 받아온 이름의 해당하는 카테고리 api 받기
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${menuObjectList.name}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let html = ``;
        if(data.meals){
            data.meals.forEach((meal) => {
                html += `
                <div class="meal_item"  data-id="${meal.idMeal}">
                    <div class="meal_name">
                    <p>${meal.strMeal}</p>
                    </div>
                    <div class="meal_img">
                    <img src="${meal.strMealThumb}">
                    </div>
                    <a href="#" class="recipe_btn">Get a Recipe</a>
                </div>
                `                
            });
        } else {
            html += `sorry I can't find it :(`;
          }
        menuCategory.innerHTML = html;
    });

    function getRecipe(e) {
        e.preventDefault();
        if (e.target.classList.contains('recipe_btn')) {
          let mainItem = e.target.parentElement;
          console.log(mainItem);
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mainItem.dataset.id}`
          )
            .then((response) => response.json())
            .then((data) => mealReicipeModal(data.meals));
        }
      }
      function mealReicipeModal(meal2) {
        console.log(meal2);
        meal2 = meal2[0];
        let html2 = `
        <h2 class="recipe_title">${meal2.strMeal}</h2>
        <p class="recipe_category">${meal2.strCategory}</p>
        <div class="recipe_intruct">
          <h3>Instructions</h3>
          <p>${meal2.strInstructions}</p>
        </div>
        <div class="recipe_meal_img">
          <img src="${meal2.strMealThumb}">
        </div>
        <div class="recipe_link">
          <a href="${meal2.strYoutube}" target="_blank">Watch Video</a>
        </div>
        `;
        mealDetailsContent.innerHTML = html2;
        mealDetailsContent.parentElement.classList.add('showRecipe');
      }
      recipteCloseBtn.addEventListener('click', function () {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
      });



    back.addEventListener('click', function () {
        window.history.back();
    });