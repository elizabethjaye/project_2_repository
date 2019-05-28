function perc2color(perc) {
  var r, g, b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);

  } else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};


// Creating map object
var map = L.map("heatmap", {
  center: [40.7128, -74.0059],
  zoom: 2
});
console.log(map);
// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Legend creating and implementation



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [2, 3, 4, 5, 6],
    labels = [];
  for (var x = 3; x < 8; x++){
    labels.push(((x - 2.69) / (7.54 - 2.69)) * 100  )
  };

    // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            // '<i style="background:' + perc2color((grades[i] + 1)/8* 100) + '"></i> ' +
            '<i style="background:' + perc2color(labels[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
// console.log(countryColor);
// Grabbing our GeoJSON data..
d3.json(`api/2017`, function (apidata) {

  d3.json("static/Data/world_polygons.json", function (data) {
    
//colors for the countries based on value

    function countryColor(country) {
      // console.log(country)
      let hColor = "blue";
      // console.log(country);
     // apidata.forEach(function (row) {
        // console.log(row["Country"]);
        // console.log(country);
      for (var i = 0; i < apidata.length; i++){
        // console.log(apidata[i]["Country"]);
        if (apidata[i]["Country"] === country) {
          console.log(apidata[i]["Country"]);
          let per = ((apidata[i]["Happiness Score"]-2.69)/(7.54-2.69))*100;
          // let per = Math.round(((apidata[i]["Happiness Score"] - 2) / 6) * 100);
          hColor = perc2color(per);
          console.log(per);
          console.log(hColor);
          return hColor;
        } else {
          hColor = "grey";
          
        };
      };
      
      return hColor;
      
    };

    function countryHappiness(country) {
      let happinessScore = "Not Available";
      for (var i = 0; i < apidata.length; i++){
        // console.log(apidata[i]["Country"]);
        if (apidata[i]["Country"] === country) {
          happinessScore = (apidata[i]["Happiness Score"]);
          // console.log(happinessScore);
          return happinessScore.toFixed(2);
        } else {
          happinessScore = "Not Available";
        };
      };
      return happinessScore; 
    };

  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      // console.log(feature.properties.name);
      let maxColor = countryColor(feature.properties.name);
      // console.log(countryColor(feature.properties.name));
      // console.log(maxColor);
      return {
        color: countryColor(feature.properties.name),
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: countryColor(feature.properties.name),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" +"Country: "+ feature.properties.name + "</h1>" + "<h1>" +"Happiness Score: "+ countryHappiness(feature.properties.name) + "</h1> <hr> <h2>" + "Region: "+feature.properties.region_un + "</h2>");


    }
  }).addTo(map);
});
});
