(async function () {

    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn")
    const listElem = document.getElementById("recipe-list")
    const detailsElem = document.getElementById("recipeDetails")

    function loadRecipeDetails(recipe){
        detailsElem.innerHTML = `
            <h2 class= "title"> ${recipe.title} </h2>
            <ul> ${recipe.ingredients.map(function(ingredients){
                return "<li>" + ingredients + "</li>"
            }).join(" ") }
            </ul>
            <h3>Instructions</h3>
            <div> ${recipe.instructions} </div>
                    `
    }



    function displaySearchResults(results) {
        listElem.innerHTML = " ";
        results.forEach((recipe) => {
            const li = document.createElement('li');
            li.innerHTML = recipe.title;
            li.addEventListener("click", function(){
            loadRecipeDetails(recipe)})

            listElem.appendChild(li);

        });


    }



    function search() {
        const queryy = inputElem.value;
        const results = recipes.filter(function (recipe) {
            return (recipe.title.toLowerCase().includes(queryy) ||
                recipe.ingredients.join(" ").toLowerCase().includes(queryy)
            )
        });

        displaySearchResults(results)
        // console.log(results)

    }


    btnElem.addEventListener("click", search);
})();