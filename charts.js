const categories = [
    'Housing',
    'Transportation',
    'Food',
    'Healthcare',
    'Utilities',
    'Entertainment',
    'Clothing and Personal Care',
    'Debt Payments',
    'Savings and Investments',
    'Education',
    'Travel',
    'Donations',
    'Insurance',
    'Taxes',
    'Miscellaneous'
];

const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "indigo",
    "brown",
    "black",
    "white",
    "gray",
    "lightgray",
    "darkgray"
  ];

// Initialize Pie Chart 1
var ctx1 = document.getElementById('pieChart1').getContext('2d');
generatePieChart(ctx1, [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 40, 100, 20, 50, 120])


// Initialize Pie Chart 2
var ctx2 = document.getElementById('pieChart2').getContext('2d');
generatePieChart(ctx2, [200, 10, 300, 200, 250, 30, 330, 200, 600, 500, 40, 100, 20, 50, 120]);

function generatePieChart(loc, data) {
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
                enabled: true // Hide the tooltips
            }
        }
    }
})
}

function generateHorizontalBar(budget, expenses) {
    // Calculate width percentage
    var widthPercentage = (budget / expenses) * 50;

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

    var filledBar = document.createElement('div');
    filledBar.classList.add('horizontal-bar');
    filledBar.style.width = widthPercentage + '%';
    filledBar.style.height = '20px';
    filledBar.style.backgroundColor = color;

    var text = document.createElement('div');
    text.textContent = 'Budget: ' + budget + ', Expenses: ' + expenses;

    // Append filled bar to container
    container.appendChild(filledBar);
    container.appendChild(text);


    return container;
}


var horizontalBarsContainer = document.getElementById('horizontalBarChart');

// Generate horizontal bars with different values
var bar1 = generateHorizontalBar(40, 50);
var bar2 = generateHorizontalBar(70, 50);
var bar3 = generateHorizontalBar(100, 50);

// Append bars to container
horizontalBarsContainer.appendChild(bar1);
horizontalBarsContainer.appendChild(bar2);
horizontalBarsContainer.appendChild(bar3);

console.log(horizontalBarsContainer);

