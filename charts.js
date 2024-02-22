// Initialize Pie Chart 1
var ctx1 = document.getElementById('pieChart1').getContext('2d');
var myPieChart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['red', 'blue', 'yellow']
        }]
    }
});

// Initialize Pie Chart 2
var ctx2 = document.getElementById('pieChart2').getContext('2d');
var myPieChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Green', 'Purple', 'Orange'],
        datasets: [{
            data: [200, 100, 150],
            backgroundColor: ['green', 'purple', 'orange']
        }]
    }
});

function generateHorizontalBar(value, maxValue, color) {
    // Calculate width percentage
    var widthPercentage = (value / maxValue) * 100;

    // Create the HTML elements
    var container = document.createElement('div');
    container.classList.add('horizontal-bar');

    var filledBar = document.createElement('div');
    filledBar.classList.add('horizontal-bar');
    filledBar.style.width = widthPercentage + '%';
    filledBar.style.height = '20px';
    filledBar.style.backgroundColor = color;

    // Append filled bar to container
    container.appendChild(filledBar);

    return container;
}


var horizontalBarsContainer = document.getElementById('horizontalBarChart');

// Generate horizontal bars with different values
var bar1 = generateHorizontalBar(50, 100, 'green');
console.log(bar1);
var bar2 = generateHorizontalBar(75, 100, 'yellow');
console.log(bar2)
var bar3 = generateHorizontalBar(90, 100, 'red');
console.log(bar3);

// Append bars to container
horizontalBarsContainer.appendChild(bar1);
horizontalBarsContainer.appendChild(bar2);
horizontalBarsContainer.appendChild(bar3);

console.log(horizontalBarsContainer);

