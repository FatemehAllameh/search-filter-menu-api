// ELEMENTS
const menuList = document.querySelector(".menu");

let menuItems = null;

// FETCHING DATA FROM API
const getItems = async() => {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s");
    const data = await response.data;
    menuItems = data.meals;
    displayMenuItems();  
}

const displayMenuItems = () => {
    menuItems.map((item) => {
        const cardItem = `
        <div class="menu-item">
            <img src="${item.strMealThumb}" class="item-img" alt="${item.strMeal}">
            <h3 class="item-name">${item.strMeal}</h3>
        </div>
        `;
        menuList.innerHTML += cardItem;
    })
}

getItems();