// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnE2w_gRYor0QojhhwdJsgYRdhHNSAFKo",
    authDomain: "budgetpal-d5300.firebaseapp.com",
    projectId: "budgetpal-d5300",
    storageBucket: "budgetpal-d5300.appspot.com",
    messagingSenderId: "239286381091",
    appId: "1:239286381091:web:da422f4475d4a9bd9b5f96"
};
let totalSpending = 0;

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const db = getDatabase();

updateData('budget').then(() => {
    calculateTotal();
});

const updateBudgetBtn = document.getElementById("updateBudgetBtn");
updateBudgetBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getInputValue();
});


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

let categoriesFroms = [
    "housingForm",
    "transportationForm",
    "foodForm",
    "healthcareForm",
    "utilitiesForm",
    "entertainmentForm",
    "clothingPersonalCareForm",
    "debtPaymentsForm",
    "savingsInvestmentsForm",
    "educationFrom",
    "travelForm",
    "donationsForm",
    "insuranceForm",
    "taxesForm",
    "miscellaneousForm"];

let budgetArray = [];
let budgetCVS = "";

function getInputValue() {
    budgetArray = [];
    const expenses = {};

    for (let i = 0; i < categories.length; i++) {
        let currCategory = categories[i];
        let currForm = categoriesFroms[i];

        console.log(currCategory);
        console.log(currForm);

        let categoryValue = document.forms[currForm][currCategory];

        console.log(categoryValue);
        let currValue = categoryValue.value;

        console.log(currValue);

        if (!currValue) {
            console.error("Input element not found for category:", categories[i]);
            continue;
        }
        budgetArray.push(categoryValue.value);
        expenses[currCategory] = currValue;
    }


    set(ref(db, 'budget/'), expenses)
        .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
        });


    console.log(budgetArray);
    console.log(budgetCVS);

}


//Calls from the database and populates that input fields with the value. 
function updateData(field) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db);
        get(child(dbRef, field)).then((snapshot) => {
            let data = snapshot.val();
            console.log(data);

            // Loop through categories
            for (let i = 0; i < categories.length; i++) {
                let currCategory = categories[i];
                let currForm = categoriesFroms[i];

                // Get input field corresponding to the category
                let inputField = document.forms[currForm][currCategory];

                // Update the input field value with data from Firebase
                if (data.hasOwnProperty(currCategory)) {
                    inputField.value = data[currCategory];
                    console.log(inputField.value);
                    totalSpending += parseInt(inputField.value);
                } else {
                    console.error("Category not found in data:", currCategory);
                }
            }
            resolve(); // Resolve the promise after updating the data
        })
            .catch((error) => {
                console.error("Error fetching data from Firebase:", error);
                reject(error); // Reject the promise if there's an error
            });
    });
}

function calculateTotal() {
    let initialTotalDiv = document.getElementById("total");

    initialTotalDiv.textContent = "Total: $" + totalSpending.toFixed(2);
}


document.addEventListener("DOMContentLoaded", function () {
    // Select all input elements
    const inputFields = document.querySelectorAll("input[type='number']");

    // Select the total div
    const totalDiv = document.getElementById("total");

    // Function to update total
    function updateTotal() {
        let total = 0;
        inputFields.forEach((input) => {
            if (!isNaN(input.value) && input.value !== "") {
                total += parseInt(input.value);
            }
        });
        totalDiv.textContent = "Total: $" + total.toFixed(2); // Display total in the format you want
    }

    // Add event listeners to all input fields
    inputFields.forEach((input) => {
        input.addEventListener("input", updateTotal);
    });

});



fetch("./data.JSON")
    .then(response => response.json())
    .then(myImages => loadImages(myImages));

function loadImages(myImages) {
    for (let j = 0; j < categories.length; j++) {
        let currentCat = categories[j];
        console.log(currentCat);

        for (let i = 0; i < myImages[currentCat].length; i++) {

                let image = myImages[currentCat][i].img;
                let text = myImages[currentCat][i].text;
                let width = myImages[currentCat][i].width;
                let alt = myImages[currentCat][i].width.alt;

                let formElement = document.getElementById(categoriesFroms[j]);
                let imageElement = document.createElement('img');
                imageElement.src = image;
                imageElement.style.width = width;
                imageElement.style.height = "50px";
                imageElement.style.alt = alt;

                // Construct the HTML Element
                formElement.insertAdjacentElement('beforebegin', imageElement);

                let textElement = document.createElement('p');
                textElement.textContent = text;
                textElement.style.paddingTop = "10px";
                textElement.style.fontFamily = "cursive"
                formElement.insertAdjacentElement('beforebegin', textElement);
                
            }
        }
    }

    document.getElementById("dropdownBtn").addEventListener("click", function() {
        var dropdownContent = document.getElementById("dropdownContent");
        if (dropdownContent.style.display === "none") {
          dropdownContent.style.display = "block";
        } else {
          dropdownContent.style.display = "none";
        }
      });

      document.getElementById("preset1").addEventListener("click", function() {
        totalSpending = 0;
        updateData('preset1').then(() => {
            calculateTotal();
        });
    });
    
    document.getElementById("preset2").addEventListener("click", function() {
        totalSpending = 0;
        updateData('preset2').then(() => {
            calculateTotal();
        });
    });
    
    document.getElementById("preset3").addEventListener("click", function() {
        totalSpending = 0;
        updateData('preset3').then(() => {
            calculateTotal();
        });
    });




      