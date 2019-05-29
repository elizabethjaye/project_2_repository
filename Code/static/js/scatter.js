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
				d3.select("#scatter-text").text("While one would imagine freedom and happiness have a correlation, the results are not so clear cut! There are some clear countries that have strong freedom and happiness scores, such as Finland and Sweden. However, countries such as Rwanda and Cambodia have relatively low scores considering where they rank freedom.");
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
				d3.select("#scatter-text").text("In this chart, we see a fairly clear correlation between GDP Per Capita and Happiness Scores. The higher the GDP Per Capita, generally the higher the Happiness Score. The trend line moves across from the bottom left to the top right, indicating that desired correlation even if this isn't enough to claim causation. While there are definitely outliers (see Qatar as a higher point and Somalia as a lower one, where the trends don't perfectly match), over-all this is true in Western countries in particular. The countries furthest to the right are all located in the Nordic region and hold the highest happiness scores.");
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
				d3.select("#scatter-text").text("In this chart, we see a fairly clear correlation between Family and Happiness Scores. Family scores universally increase with Happiness Scores, though not at a very strong slope. A higher happiness score with significant steps in that regard do not necessarily indicate such drastic increases in family scores. The highest concentration of high scores in both regards concentrate in Nordic countries predominately, with some exceptions such as Canada, Australia, and New Zealand.");
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
				d3.select("#scatter-text").text("TInterestingly, life expectancy and happiness have a less clear correlation in this chart versus others in this set. While there is an absolute trend of life expectancy increasing as happiness does, it is not a clear set. It gradually increases in both directions, but there are clear outliers in different directions. While Hong Kong and Singapore both have extremely high scores for life expectancy, their happiness scores do not necessarily reflect the same. Additionally, there are some countries with mid-range happiness scores that have extremely low life expectancy scores - such as Lesotho, Sierra Leone, Chad, and Angola.");
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
				d3.select("#scatter-text").text("This chart, showcasing the relationship between generosity and happiness has a noticeably different trend then others we've seen before. There are some mild correlations between generosity and happiness - those with the highest happiness scores do tend to have higher generosity scores. However, this is not a given and the concentration is not evenly distributed.");
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
				d3.select("#scatter-text").text("This chart shows the relationship between trust (specifically in government corruptions) in regards to happiness. Interestingly, the countries with the lowest scores in terms of trust land directly in the middle of the happiness scores. Greece and Lithuania both have remarkably low trust scores, yet are solidly in the mid-range of happiness. Otherwise, scores are evenly distributed across the two metrics.");
				break;

			default:
				// do nothing
		}


	});

}
