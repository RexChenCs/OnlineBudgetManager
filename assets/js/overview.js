// Chart.js scripts
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


var ctx = document.getElementById("budgetAreaChart");
var myAreaChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: "Expense",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 31
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});



// -- Area Chart

function updateBudgetAreaChart(label,data,max) {
  var ctx = document.getElementById("budgetAreaChart");
  myAreaChart= new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: "Expense",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: data,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 31
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: max,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}


// -- Bar Chart
var ctx = document.getElementById("budgetBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "Expense",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10,
          maxTicksLimit: 12
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});



function updateBudgetBarChart(label_value,data_value, max_number) {
  var ctx = document.getElementById("budgetBarChart");

  myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label_value,
      datasets: [{
        label: "Expense",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: data_value,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 6
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: max_number,
            maxTicksLimit: 12
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}


// -- Pie Chart

var ctx = document.getElementById("budgetPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Expense", "Remainder"],
    datasets: [{
      data: [0,100],
      backgroundColor: ['#dc3545', '#ffc107'],
    }],
  },
});


function updateBudgetPieChart(expense,remainder) {
  var ctx = document.getElementById("budgetPieChart");
  myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Expense", "Remainder"],
      datasets: [{
        data: [expense,remainder],
        backgroundColor: ['#dc3545', '#ffc107'],
      }],
    },
  });
}



$(document).ready(function() {

  // search action handler
  $(document).on("click", "#search_action", function(){
    update_budget_area_chart();
    update_budget_bar_chart();
    update_budget_Pie_chart();

  });

  $("#search_year").find("option").each(function (i, e) {

    var current_year = new Date().getFullYear();

    if ($(e).val() == current_year) {

      $("#search_year").prop('selectedIndex', i);

    }

  });

  $("#search_month").find("option").each(function (i, e) {

    var current_month = new Date().getMonth();

    if ($(e).val() == (current_month + 1)) {

      $("#search_month").prop('selectedIndex', i);

    }

  });


  update_budget_area_chart();
  update_budget_bar_chart();
  update_budget_Pie_chart();
  setup();


});

