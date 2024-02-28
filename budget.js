// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

const db = getDatabase();
const dbReft = ref(db);

get(child(dbReft, 'expenses')).then((snapshot1) => {
    let expensesData = snapshot1.val();
    get(child(dbReft, 'budget')).then((snapshot2) => {
        let budgetData = snapshot2.val();
        updateCharts(expensesData, budgetData);
    });    
});

    let colors = [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
        "#aec7e8",
        "#ffbb78",
        "#98df8a",
        "#ff9896",
        "#c5b0d5",
        "#c49c94"
      ]

function updateCharts(expensesJSON, budgetJSON) {

    var horizontalBarsContainer = document.getElementById('horizontalBarChart');

    for (let key in expensesJSON) {
        var bar = generateHorizontalBar(budgetJSON[key], expensesJSON[key], key);
        horizontalBarsContainer.appendChild(bar);

    }

    // Initialize Pie Chart 1
    var ctx1 = document.getElementById('pieChart1').getContext('2d');
    let budget = [];
    for (let key in budgetJSON) {
        budget.push(budgetJSON[key]);
    }
    generatePieChart(ctx1, budget, Object.keys(budgetJSON), colors)


    // Initialize Pie Chart 2
    var ctx2 = document.getElementById('pieChart2').getContext('2d');
    let expenses = [];
    for (let key in expensesJSON) {
        expenses.push(expensesJSON[key]);
    }
    generatePieChart(ctx2, expenses, Object.keys(expensesJSON), colors);

}



function generatePieChart(loc, data, categories, colors) {
    return new Chart(loc, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    display: true, // Display labels
                    color: 'black', // Set label color
                    formatter: (value, ctx) => {
                        var label = ctx.chart.data.labels[ctx.dataIndex];
                        return label + ': ' + value;
                    }
                }
            },
            responsive: true // Make chart responsive
        }


    });
}



function generateHorizontalBar(budget, expenses, name) {
    // Calculate width percentage
    var widthPercentage = Math.min((expenses / budget) * 50, 100);

    let color;
    if (widthPercentage <= 50) {
        color = 'green';
    } else if (widthPercentage <= 75) {
        color = 'yellow';
    } else {
        color = 'red';
    }


    // Create the HTML elements
    var container = document.createElement('div');
    container.classList.add('horizontal-bar');

    var categoryName = document.createElement('div');
    categoryName.textContent = `${name}:`;

    var filledBar = document.createElement('div');
    filledBar.classList.add('horizontal-bar');
    filledBar.style.width = widthPercentage + '%';
    filledBar.style.height = '20px';
    filledBar.style.backgroundColor = color;

    var text = document.createElement('div');
    text.textContent = `Expenses: ${expenses} Budget: ${budget}`;

    var space = document.createElement('br');



    // Append filled bar to container
    container.appendChild(categoryName);
    container.appendChild(filledBar);
    container.appendChild(text);
    container.appendChild(space);


    return container;
}


