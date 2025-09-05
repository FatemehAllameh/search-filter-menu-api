// ELEMENTS
const menuList = document.querySelector(".menu");
const loading = document.querySelector(".loading");
const errorText = document.querySelector(".err-text");

let menuItems = null;

// FETCHING DATA FROM API
const getItems = async () => {
  try {
    const response = await axios.get(
      "https://wwww.themealdb.com/api/json/v1/1/search.php?s"
    );
    const data = await response.data;
    menuItems = data.meals;
    // HIDE LOADING TEXT
    loading.style.display = "none";
    displayMenuItems(menuItems);
  } catch (err) {
    // HIDE LOADING TEXT
    loading.style.display = "none";
    // SHOW ERROR MESSAGE
    errorText.style.display = "block";
    errorText.textContent = `${err.message}`;
  }
};

// DISPLAY MENU ITEMS
const displayMenuItems = () => {
  menuItems.map((item) => {
    const cardItem = `
        <div class="menu-item">
            <img src="${item.strMealThumb}" class="item-img" alt="${item.strMeal}">
            <h3 class="item-name">${item.strMeal}</h3>
        </div>
        `;
    menuList.innerHTML += cardItem;
  });
};

getItems();
