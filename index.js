

const searchBtn = document.getElementById('searchbtn');
const mealList = document.getElementById('resultlist');
const mealDetailsContent = document.querySelector('.content');
const recipeCloseBtn = document.getElementById('closebtn');

searchBtn.addEventListener('click', getList);
mealList.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getList(){
    let searchInputTxt = document.getElementById('input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "mealitem" data-id = "${meal.idMeal}">
                        <div class = "mimg">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "mname">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "rbtn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('rbtn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "title">${meal.strMeal}</h2>
        <p class = "category">${meal.strCategory}</p>
        <div class = "instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "rmealimg">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}