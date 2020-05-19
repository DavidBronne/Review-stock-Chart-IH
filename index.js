const key = 'demo';
const symbol = 'IBM';
const functionName = 'TIME_SERIES_DAILY';
const url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${key}`;


axios.get(url)
    .then(APIResponse => {
        console.log('APIResponse', APIResponse.data);
        transfertToChartJS(APIResponse.data);                   // Call the function which transfert de data from API to chartjs
    })
    .catch(err => {
        console.log('err while getting data', err)
    })

    function transfertToChartJS(stockData) {                    // Declare the function which transfert de data from API to chartjs
        const dailyData = stockData["Time Series (Daily)"];     // dailyData is an 
       
        const stockDates = Object.keys(dailyData);              // define labels from chart --> array
        const stockPrices = stockDates.map(date => {            // define data from chart
          return dailyData[date]["4. close"];
        });
       
        const ctx = document.getElementById("myChart").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: stockDates,                                 // labels needs to be an array acc. to chartjs doc
            datasets: [
              {
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: stockPrices                               // data needs to be an array acc. to chartjs doc
              }
            ]
          }
        }); // closes chart = new Chart()
      } // closes printTheChart()