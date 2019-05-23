// window.onload = function () {

//   var chart = new CanvasJS.Chart("scatter-view", {
//     animationEnabled: true,
//     title:{
//       text: "VARIABLE vs Happiness"
//     },
//     axisX: {
//       title:"Server Load (in TPS)"
//     },
//     axisY:{
//       title: "Response Time (in ms)"
//     },
//     data: [{
//       type: "scatter",
//       toolTipContent: "<span style=\"color:#4F81BC \"><b>COUNTRY</b></span><br/><b> Happiness:</b> {x} TPS<br/><b>VARIABLE:</b></span> {y} ms",
//       name: "REGION1",
//       showInLegend: true,
//       dataPoFloats: [
//         { x: 23, y: 330 },
//         { x: 28, y: 390 },
//         { x: 39, y: 400 },
//         { x: 34, y: 430 },
//         { x: 24, y: 321 },
//         { x: 29, y: 250 },
//         { x: 29, y: 370 },
//         { x: 23, y: 290 },
//         { x: 27, y: 250 },
//         { x: 34, y: 380 },
//         { x: 36, y: 320 },
//         { x: 33, y: 405 },
//         { x: 32, y: 453 },
//         { x: 21, y: 292 }
//       ]
//     },
//     {
//       type: "scatter",
//       name: "REGION 2",
//       showInLegend: true, 
//       toolTipContent: "<span style=\"color:#C0504E \"><b>COUNTRY</b></span><br/><b> Happiness:</b> {x} TPS<br/><b> VARIABLE:</b></span> {y} ms",
//       dataPoFloats: [
//         { x: 19, y: 200 },
//         { x: 27, y: 300 },
//         { x: 35, y: 330 },
//         { x: 32, y: 190 },
//         { x: 29, y: 189 },
//         { x: 22, y: 150 },
//         { x: 27, y: 200 },
//         { x: 26, y: 190 },
//         { x: 24, y: 225 },
//         { x: 33, y: 330 },
//         { x: 34, y: 250 },
//         { x: 30, y: 120 },
//         { x: 37, y: 153 },
//         { x: 24, y: 196 }
//       ]
//     }]
//   });
//   chart.render();

//   }    


// function getData(){
//   var queryURL = "/api/2017";
//   d3.json(queryURL, function(data){

//     var country = [],
//     happinessScore = [],
//     economy = [],
//     family = [],
//     freedom = [],
//     generosity = [],
//     lifeExpectancy = [];

//  for(i = 0; i < data.length; i++){
//     country.push(JSON.stringify(data[i]["Country"]));

//         happinessScore.push(parseFloat(JSON.stringify(data[i]["Happiness Score"])));
//         economy.push(parseFloat(JSON.stringify(data[i]["Economy"])));
//         family.push(parseFloat(JSON.stringify(data[i]["Family"])));
//         freedom.push(parseFloat(JSON.stringify(data[i]["Freedom"])));
//         generosity.push(parseFloat(JSON.stringify(data[i]["Generosity"])));
//         lifeExpectancy.push(parseFloat(JSON.stringify(data[i]["Health (Life Expectancy)"])));
// };        


//   return country, happinessScore, economy, family, freedom, generosity, lifeExpectancy;
//         })
//     }

// function getHappinessScore() {
//   var queryURL = "/api/2017";
//   return d3.json(queryURL, function(data) {
//     var happinessScore = [];

//     for (i = 0; i < data.length; i++) {
//       happinessScore.push(parseFloat(data[i]["Happiness Score"]));
//     };

//     console.log(happinessScore);

//     return happinessScore;
//   })


// }

// function getCountry() {
//   var queryURL = "/api/2017";
//   return d3.json(queryURL, function(data) {
//     var countries = [];

//     for (i = 0; i < data.length; i++) {
//       countries.push(parseFloat(data[i]["Country"]));
//     };

//     return countries;
//   })


// }

// function getEconomy() {
//   var queryURL = "/api/2017";
//   return d3.json(queryURL, function(data) {
//     var economies = [];

//     for (i = 0; i < data.length; i++) {
//       economies.push(parseFloat(data[i]["Economy"]));
//     };

//     return economies;
//   })


// }

//declare arrays

var country = [],
  happinessScore = [],
  economy = [],
  family = [],
  freedom = [],
  generosity = [],
  lifeExpectancy = [];

//declare access url
var queryURL = "/api/2017";

window.onload = function getData() {

  Promise.all(

    [
      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          country.push(data[i]["Country"]);
        }
        console.log(country);
      }),
      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          happinessScore.push(parseFloat(data[i]["Happiness Score"]));

        }
        console.log(happinessScore);
      }),

      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          economy.push(parseFloat(data[i]["Economy"]));

        }
        console.log(economy);
      }),


      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          family.push(parseFloat(JSON.stringify(data[i]["Family"])));
        }
        console.log(family);

      }),

      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          freedom.push(parseFloat(JSON.stringify(data[i]["Freedom"])));
        }
        console.log(freedom);
      }),

      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          generosity.push(parseFloat(JSON.stringify(data[i]["Generosity"])));
        }
        console.log(generosity);
      }),
      d3.json(queryURL, function(data) {
        for (i = 0; i < data.length; i++) {
          lifeExpectancy.push(parseFloat(JSON.stringify(data[i]["Health (Life Expectancy)"])));
        }
      })

    ]

  ).then(function(data) {
    //potentially leave this to not happen, confirm
    chart = new CanvasJS.Chart("scatter-view", {
        animationEnabled: true,
        title: {
          text: "GDP Per Capita vs Happiness"
        },
        axisX: {
          title: "Happiness"
        },
        axisY: {
          title: "GDP Per Capita"
        },

        data: [

          {
            type: "scatter",
            name: "Country",
            showInLegend: true,
            dataPoints: happinessScore.map(function(elt, index) {
              return {
                x: elt,
                y: economy[index]
              }
            })

          }
        ]

      }

    );
    chart.render(); //maybe comment this out???????? so it's not there? and is blank???

  });


  //Updating per drop down
  $('.dropdown-menu li > a').click(function(e) {
    console.log(chart);
    switch (this.innerHTML) {

      case "Freedom":
        //update graph with freedom data
        break;

      case "GDP per Capita":
        chart.options.title.text = "SAMPLE";
        chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
              return {
                x: elt,
                y: economy[index]
              }
            });

        //UPDATE AXISES ETC.

        //update text - do this for all - with write ups [d3.select]

        chart.render();


        break;

      case "Family":
        //update 
        break;

      case "Life Expectancy":
        //update 
        break;

      case "Generosity":
        //update 
        break;

      case "Trust (Government Corruptions)":
        //update 
        break;

      default:
      //basically nothing
        //whatever is your whatever
    }


  });

}
// dropdown.event(function(){

// }
// )



// happyScore = getHappinessScore();
// country = getCountry();
// economy = getEconomy();


//   var queryURL = "/api/2017";
//   d3.json(queryURL, function(data) {

//     var chart = new CanvasJS.Chart("scatter-view", {
//         animationEnabled: true,
//         title: {
//           text: "GDP Per Capita vs Happiness"
//         },
//         axisX: {
//           title: "Happiness"
//         },
//         axisY: {
//           title: "GDP Per Capita"
//         },

//         data: [

//           {
//             type: "scatter",
//             name: "Country",
//             showInLegend: true,
//             dataPoints: happyScore.map(function(elt, index) {
//               return {
//                 x: elt,
//                 y: economy[index]
//               }
//             })

//           }
//         ]

//       }



//     );
//     chart.render();
//   });
// }