
let categories = [
    "Housing",
    "Transportation",
    "Food",
    "Healthcare",
    "Utilities",
    "Entertainment",
    "Clothing and Personal Care",
    "Debt Payments",
    "Savings and Investments",
    "Education",
    "Travel",
    "Donations",
    "Insurance",
    "Taxes",
    "Miscellaneous"];

fetch("./data.JSON")
    .then(response => response.json())
    .then(myImages => loadImages(myImages));
    
function loadImages(myImages) {
    for (let j = 0; j < categories.length; j++) {
        let currentCat = categories[j];

        console.log(currentCat);

        for (let i = 0; i < myImages[currentCat].length; i++) {
            let image = myImages[currentCat][i].img;
            let text = myImages[currentCat][i].text + " - " + myImages[currentCat][i].desc;
            let alt = myImages[currentCat][i].alt;

            // Create a container div for each category
            let categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category');
            categoryContainer.style.display = 'flex'; // Ensure elements are displayed in a row

            // Create an image element
            let imageElement = document.createElement('img');
            imageElement.src = image;
            imageElement.style.width = "50px";
            imageElement.style.height = "50px";
            imageElement.style.alt = alt;
            categoryContainer.appendChild(imageElement);

            // Create a div for text to ensure it's displayed next to the image
            let textContainer = document.createElement('div');
            textContainer.style.marginLeft = "10px"; // Add some space between the image and text
            let textElement = document.createElement('p');
            textElement.textContent = text;
            textElement.style.fontFamily = "cursive";
            textContainer.appendChild(textElement);
            categoryContainer.appendChild(textContainer);

            // Append the category container to the categories list
            let formElement = document.getElementById("categories-list");
            formElement.appendChild(categoryContainer);
        }
    }
}
