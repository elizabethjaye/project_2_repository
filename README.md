# Proposal

Our project will utilize the [World Happiness Report](https://www.kaggle.com/unsdsn/world-happiness) data, sourced from kaggle.

Our intention is to take these csv files of specific years (2015-2017) and set up a relational sql database, with a reference table for countries and a unique identifier, a reference table for each region mapping to country ids, and a data table with the master info in a larger table. 

We will then deploy through flask and create a RESTful API, which will be displayed with a combination of HTML, CSS, and JS. Our intention is to have a dashboard, featuring a main heatmap (generated through Leaflet) [etc etc]
