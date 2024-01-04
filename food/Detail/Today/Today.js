const Menu = document.getElementById('today_menu')
const todayMenu = localStorage.getItem('today');
const menuObjectList = JSON.parse(todayMenu);
let menuSet = document.createElement('div');
Menu.appendChild(menuSet);
console.log(todayMenu);
console.log(menuObjectList.name);





if (menuObjectList) {
    let html3 = ``;
      html3 = `
      <div class="meal_today">
        <div class="meal_item">
            <div class="meal_name">
                <h3>${menuObjectList.name}</h3>
            </div>
            <div class="meal_category">${menuObjectList.category}</div>
            <div class="meal_area">${menuObjectList.area}</div>
            <div class="meal_img">
                <img src="${menuObjectList.img}"/>
            </div>
            <div class="mael_instruct">
            <blockquote>${menuObjectList.instruct}</blockquote>
            </div>
        </div>
      </div>
      `;
      menuSet.innerHTML = html3;
} else {
    html3 = `sorry I can't find it :(`;
}
