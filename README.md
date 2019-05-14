# Proposal

Our project will utilize the [World Happiness Report](https://www.kaggle.com/unsdsn/world-happiness) data, sourced from kaggle.

Our intention is to take these csv files of specific years (2015-2017) and set up an SQLite database, with three tables (with one per year), as well as a reference table with the country names and ids.

We will then deploy through flask and create a RESTful API, which will be displayed with a combination of HTML, CSS, and JS. Our intention is to have a dashboard, featuring multiple charts that update from a dropdown menu. We will utilize Leaflet to create a heatmap which will be our guide for the webpage.
