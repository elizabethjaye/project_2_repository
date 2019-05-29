//declare arrays

var country = [],
	happinessScore = [],
	economy = [],
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
					govtTrust.push(parseFloat(JSON.stringify(data[i]["Trust in Government"])));
				}
				console.log(generosity);
			}),

			d3.json(queryURL, function(data) {
				for (i = 0; i < data.length; i++) {
					lifeExpectancy.push(parseFloat(JSON.stringify(data[i]["Health (Life Expectancy"])));
				}
			})

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
						showInLegend: true,
						dataPoints: happinessScore.map(function(elt, index) {
							return {
								x: elt,
								y: economy[index],
								pointBorderColor: "#0000ff"
							}
						})
						

					}
				]

			}

		);
		//chart.render(); --> commented out so that this display is initially and purposefully left blank

	});


	//Updating per drop down
	$('.dropdown-menu li > a').click(function(e) {
		console.log(chart);
		switch (this.innerHTML) {

			case "Freedom":
				//update chart
				chart.options.title.text = "Freedom vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: freedom[index]
					}

				});
				chart.options.axisY.title = "Freedom";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Freedom contributed to the calculation of the Happiness Score.");
				break;

			case "GDP per Capita":
				//update chart
				chart.options.title.text = "GDP Per Capita vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: economy[index]
					}

				});
				chart.options.axisY.title = "GDP Per Capita";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which GDP contributes to the calculation of the Happiness Score.");
				break;

			case "Family":
				//update chart
				chart.options.title.text = "Family vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: family[index]
					}

				});
				chart.options.axisY.title = "Family";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("TLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus, est commodo tempus egestas, neque nulla lobortis nisi, at dignissim sapien massa quis neque. Integer elementum, tellus eu venenatis fringilla, augue lectus sagittis eros, ac suscipit lacus felis eu dui. Nullam a ligula ac odio sagittis vehicula at ut risus. Curabitur luctus libero sapien, quis lacinia libero eleifend hendrerit. Vivamus odio libero, pharetra ac velit id, pretium fermentum sem. Aenean volutpat vehicula ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sagittis convallis mauris, sed viverra massa dapibus vel. Vivamus nec neque posuere, consectetur massa in, vestibulum elit. Aenean dapibus eros ante, vel consectetur nisl porttitor at. Curabitur quis augue vel lorem faucibus vulputate vitae nec est. Nam aliquet dolor lorem, bibendum porta libero vulputate vel. Sed sed turpis mauris. Quisque volutpat tempus nibh et mattis. Vestibulum a nibh feugiat felis facilisis interdum eget a purus.");
				break;

			case "Life Expectancy":
				//update chart
				chart.options.title.text = "Life Expectancy vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: lifeExpectancy[index]
					}

				});
				chart.options.axisY.title = "Life Expetancy";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Life expectancy contributed to the calculation of the Happiness Score.");
				break;

			case "Generosity":
				//update chart
				chart.options.title.text = "Generosity vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: generosity[index]
					}

				});
				chart.options.axisY.title = "Generosity";
				chart.render();

				//update text
				//write-ups still needed
				d3.select("#scatter-text").text("The extent to which Generosity contributed to the calculation of the Happiness Score..");
				break;

			case "Trust (Government Corruptions)":
				//update chart
				chart.options.title.text = "Trust (Government Corruptions) vs Happiness";
				chart.options.data[0].dataPoints = happinessScore.map(function(elt, index) {
					return {
						x: elt,
						y: govtTrust[index]
					}

				});
				chart.options.axisY.title = "Trust (Government Corruptions) vs Happiness";
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
