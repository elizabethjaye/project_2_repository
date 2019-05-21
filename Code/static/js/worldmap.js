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

// catch function
function getSafe(fn, defaultVal) {
  try {
      return fn();
  } catch (e) {
      return defaultVal;
  }
}

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


// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(borough) {
  switch (borough) {
  case "Brooklyn":
    return "yellow";
  case "Bronx":
    return "red";
  case "Manhattan":
    return "orange";
  case "Queens":
    return "green";
  case "Staten Island":
    return "purple";
  default:
    return "black";
  }
};


// Colors

function countryColor(country) {
  // console.log(country);

  fetch(`api/2017/${country}`).then(function (response) {
    console.log(response.status);
    console.log(response.json());
    if (response.status === 404) {
      return "white"
    } else {
      console.log(response.json());
      
      color = perc2color(response["Happiness Score"]);
      console.log(color);
      return color
    }

  })

    // d3.json(`api/2017/${country}`, function (data) {
    //   console.log(data);
      
    //   color = perc2color(data["Happiness Score"]);
    //   console.log(color);
    //   return color
    // })
};

// d3.json("api/2017", function (error, data) {

//   if (error) throw error;
//   console.log(data);
//   data.forEach(function (country) {
//     console.log(country["Country"]);
//     countryColor[country["Country"]] = country["Happiness.Score"]
//     console.log(country["Happiness Score"]);
//     color = perc2color(country["Happiness Score"]);
//   console.log(color)
//   })



// console.log(countryColor);
// Grabbing our GeoJSON data..
d3.json("static/Data/world_polygons.json", function (data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: countryColor(feature.properties.brk_name),
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
      layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + feature.properties.region_un + "</h2>");

    }
  }).addTo(map);
});