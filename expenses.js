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


      import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

      const db = getDatabase();

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

        
        set(ref(db, 'Expenses/'), expenses)
          .then(() => {
            alert("Data was added");
          })
          .catch((error) => {
            alert("Unsuccessful");
            console.log(error);
          });


        console.log(budgetArray);
        console.log(budgetCVS);
      }
