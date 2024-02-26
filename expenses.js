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

function getInputValue() {
    let budgetArray = [];

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
    }

    console.log(budgetArray);

    createJSONFile(budgetArray);
}

function createJSONFile(budgetArray) {
  // Convert array to JSON string
  const jsonData = JSON.stringify(budgetArray);

  // Send JSON data to server
  fetch('/save', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: jsonData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to save JSON data on server');
      }
      console.log('JSON data saved successfully');
  })
  .catch(error => {
      console.error('Error saving JSON data:', error);
  });
}
