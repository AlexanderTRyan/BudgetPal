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
    "gray",
    "lightgray",
    "darkgray"
];

// Initialize Pie Chart 1
var ctx1 = document.getElementById('pieChart1').getContext('2d');
generatePieChart(ctx1, [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 40, 100, 20, 50, 120])


// Initialize Pie Chart 2
var ctx2 = document.getElementById('pieChart2').getContext('2d');
generatePieChart(ctx2, [200, 10, 300, 200, 250, 30, 330, 200, 600, 0, 40, 100, 20, 50, 120]);

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
    var widthPercentage = (expenses / budget) * 50;

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


var horizontalBarsContainer = document.getElementById('horizontalBarChart');

for (let i = 0; i < categories.length; i++) {
    var bar = generateHorizontalBar(100, 100, categories[i]);
    horizontalBarsContainer.appendChild(bar);
}


