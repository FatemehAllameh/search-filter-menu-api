// ELEMENTS
const menuList = document.querySelector(".menu");
const loading = document.querySelector(".loading");
const errorText = document.querySelector(".err-text");
const searchBar = document.querySelector(".search-bar");

let menuItems = null;

// FETCHING DATA FROM API
const getItems = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
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

// SEARCH ITEMS(EVENT LISTENER)
searchBar.addEventListener("input", () => {
  searchItems();
});

// DISPLAY MENU ITEMS
const displayMenuItems = (items) => {
  menuList.innerHTML = "";
  items.map((item) => {
    const cardItem = `
        <div class="menu-item">
            <img src="${item.strMealThumb}" class="item-img" alt="${item.strMeal}">
            <h3 class="item-name">${item.strMeal}</h3>
        </div>
        `;
    menuList.innerHTML += cardItem;
  });
};

// SEARCH ITEMS(FUNCTION)
function searchItems() {
  errorText.style.display = "none";
  const searchedText = searchBar.value.toLowerCase().trim();
  const filterNams = menuItems.filter((item) =>
    item.strMeal.toLowerCase().includes(searchedText)
  );
  // SHOW ERROR MESSAGE WHEN SEARCHED ITEM IS NOT FOUND
  if (filterNams.length === 0) {
    errorText.style.display = "block";
    errorText.textContent = "Item doesn't exist!";
  }
  displayMenuItems(filterNams);
}

// GET MENU ITEMS FROM API WHEN PAGE LOADS
getItems();
