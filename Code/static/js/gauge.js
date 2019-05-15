
//Color Gradient Function

function perc2color(perc) {
  var r, g, b = 0;
  if(perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

var colorArray = [];
for (var i = 0; i < 11; i++){
  colorArray.unshift(perc2color(10 * i))
  
};
colorArray.push('rgba(255, 255, 255, 0)');
console.log(colorArray);
//  Build the Gauge Chart
 function buildGauge(sample) {
  console.log("building Gauge Chart");
  console.log(`/wfreq/${sample}`);

  var gauge = d3.select("#gauge");

  d3.json(`/wfreq/${sample}`).then((gaugeData) => {
    console.log(gaugeData);

    var wfreq = gaugeData.WFREQ;

        // Enter a speed between 0 and 180
    var level = (wfreq + 1)*18;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
      x: [0], y:[0],
        marker: {size: 14, color:'000000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'Happy!'},
      { values: [50/11, 50/11, 50/11, 50/11, 50/11, 50/11, 50/11, 50/11, 50/11,50/11,50/11, 50],
      rotation: 90,
      text: ['10','9', '8', '7', '6', '5', '4', '3','2','1','0'],
      textinfo: 'text',
        textposition: 'inside',
        marker: { colors: colorArray},
      labels: ['10','9', '8', '7', '6', '5', '4', '3','2','1','0'],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '000000',
          line: {
            color: '000000'
          }
        }],
      title: '<b>Happiness Coefficient</b> <br>Average Per Country',
      // height: 1000,
      // width: 1000,
      autoscale: true,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);


  });

};