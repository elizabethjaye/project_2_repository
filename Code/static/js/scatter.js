//declare arrays

var economy = [],
	family = [],
	freedom = [],
	generosity = [],
	govtTrust = [],
	lifeExpectancy = [];

//declare access url
var queryURL = "/api/2017";

window.onload = function getData() {

	Promise.all(

		[
			d3.json(queryURL, function(data) {
				for (i = 0; i < data.length; i++) {
					let dat1 = {},
						dat2 = {},
						dat3 = {},
						dat4 = {},
						dat5 = {},
						dat6 = {};
					dat1["name"] = data[i]["Country"];
					dat1["x"] = parseFloat(data[i]["Happiness Score"]);
					dat1["y"] = parseFloat(data[i]["Economy"]);
					economy.push(dat1);

					dat2["name"] = data[i]["Country"];
					dat2["x"] = parseFloat(data[i]["Happiness Score"]);
					dat2["y"] = parseFloat(data[i]["Family"]);
					family.push(dat2);

					dat3["name"] = data[i]["Country"];
					dat3["x"] = parseFloat(data[i]["Happiness Score"]);
					dat3["y"] = parseFloat(data[i]["Freedom"]);
					freedom.push(dat3);

					dat4["name"] = data[i]["Country"];
					dat4["x"] = parseFloat(data[i]["Happiness Score"]);
					dat4["y"] = parseFloat(data[i]["Generosity"]);
					generosity.push(dat4);

					dat5["name"] = data[i]["Country"];
					dat5["x"] = parseFloat(data[i]["Happiness Score"]);
					dat5["y"] = parseFloat(data[i]["Trust in Government"]);
					govtTrust.push(dat5);

					dat6["name"] = data[i]["Country"];
					dat6["x"] = parseFloat(data[i]["Happiness Score"]);
					dat6["y"] = parseFloat(data[i]["Health (Life Expectancy"]);
					lifeExpectancy.push(dat6);
					
				}
				console.log(economy);
				console.log(family);
				console.log(freedom);
				console.log(generosity);
				console.log(govtTrust);
				console.log(lifeExpectancy);
			}),


		]

	).then(function(data) {
		//sets up chart but does not display it til a drop down is selected
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
						showInLegend: false,
						dataPoints: economy,
						
					}
				]

			}

		);
		// chart.render(); //--> commented out so that this display is initially and purposefully left blank

	});


	//Updating per drop down
	$('.dropdown-menu li > a').click(function(e) {
		console.log(chart);
		switch (this.innerHTML) {

			case "Freedom":
				//update chart
				chart.options.title.text = "Freedom vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>Freedom:</b></span> {y}";
				chart.options.data[0].dataPoints = freedom;
				chart.options.axisY.title = "Freedom";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Freedom contributed to the calculation of the Happiness Score.");
				break;

			case "GDP per Capita":
				//update chart
				chart.options.title.text = "GDP Per Capita vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>GDP per Capita:</b></span> {y}";
				chart.options.data[0].dataPoints = economy;
				chart.options.axisY.title = "GDP Per Capita";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which GDP contributes to the calculation of the Happiness Score.");
				break;

			case "Family":
				//update chart
				chart.options.title.text = "Family vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>Family:</b></span> {y}";
				chart.options.data[0].dataPoints = family;
				chart.options.axisY.title = "Family";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Family contributes to the calculation of the Happiness Score.");
				break;

			case "Life Expectancy":
				//update chart
				chart.options.title.text = "Life Expectancy vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>Life Expectancy:</b></span> {y}";
				chart.options.data[0].dataPoints = lifeExpectancy;
				chart.options.axisY.title = "Life Expetancy";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Life expectancy contributed to the calculation of the Happiness Score.");
				break;

			case "Generosity":
				//update chart
				chart.options.title.text = "Generosity vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>Generosity:</b></span> {y}";
				chart.options.data[0].dataPoints = generosity;
				chart.options.axisY.title = "Generosity";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Generosity contributed to the calculation of the Happiness Score..");
				break;

			case "Trust (Government Corruptions)":
				//update chart
				chart.options.title.text = "Trust (Government Corruptions) vs Happiness";
				chart.options.data[0].toolTipContent = "<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b>Happiness Score:</b> {x}<br/><b>Trust in Governemnt:</b></span> {y}";
				chart.options.data[0].dataPoints = govtTrust;
				chart.options.axisY.title = "Trust (Government Corruptions)";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Perception of Corruption contributes to Happiness Score.");
				break;

			default:
				// do nothing
		}


	});

}
