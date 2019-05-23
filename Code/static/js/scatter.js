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

function getHappinessScore(){
      var queryURL = "/api/2017";
  return d3.json(queryURL, function(data){
    happinessScore = [];

    for(i = 0; i < data.length; i++){
       happinessScore.push(parseFloat(data[i]["Happiness Score"]));
     };

console.log(happinessScore);

return happinessScore;
})


}

  window.onload = function gdpAnalysis () {

happyScore = getHappinessScore();


    var queryURL = "/api/2017";

    d3.json(queryURL, function(data){

 
  var chart = new CanvasJS.Chart("scatter-view", {
    animationEnabled: true,
    title:{
      text: "GDP Per Capita vs Happiness"
    },
    axisX: {
      title:"Happiness"
    },
    axisY:{
      title: "GDP Per Capita"
    },

    data:
        [

        {type: "scatter",
        name: "Country",
        showInLegend: true,
        dataPoints: [
          {x: parseFloat(data[i]["Happiness Score"]), y: parseFloat(data[i]["Economy"])

        }

          ]


  
  });
  chart.render();
   });
  }                              