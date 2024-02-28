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

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const db = getDatabase();

updateData();

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
    "transportationFrom",
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
    budgetCVS = "Category,Value\n";
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
function updateData(){

    const dbRef = ref(db);
    get(child(dbRef, 'budget/')).then((snapshot) => {
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
            } else {
                console.error("Category not found in data:", currCategory);
            }
        }
    })
        .catch((error) => {
            console.error("Error fetching data from Firebase:", error);
        });
}