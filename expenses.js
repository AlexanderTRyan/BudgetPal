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

function getInputValue() {
    let budgetArray =[];
    let form = document.forms["budgetUpdateForm"];
    for(let i in categories){
        let currCategory = categories[i];
        let categoryValue = form.elements[currCategory];


        if (!categoryValue) {
            console.error("Input element not found for category:", categories[i]);
            continue;
        }
        budgetArray.push(categoryValue.value);
    }

    console.log(budgetArray);
}