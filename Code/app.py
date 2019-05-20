import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


#################################################
# Database Setup 10-3-10
#################################################
engine = create_engine("sqlite:///db.sqlite")
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
# db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table

year2015 = Base.classes.Year2015
year2016 = Base.classes.Year2016
year2017 = Base.classes.Year2017

session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    """Return the homepage."""
    print(Base.classes.keys())
    return render_template("index.html")
    

@app.route("/api/2017")
def api2017():
    year2017 = Base.classes.Year2017

    results = session.query(year2017.ID_2017, year2017.Country, year2017.HappyRank, year2017.HappyScore, year2017.UpConfidence, \
        year2017.LowConfidence, year2017.Economy, year2017.Family, year2017.Health, year2017.Freedom, year2017.GovtTrust, year2017.Generosity, \
        year2017.Dystopia).all()

    # Create a dictionary from the row data and append to a list of all_passengers
    year = []
    for ID_2017, Country, HappyRank, HappyScore, UpConfidence, LowConfidence, Economy, Family, Health, Freedom, GovtTrust, Generosity, \
        Dystopia in results:
        year2 = {}
        year2["ID"] = ID_2017
        year2["Country"] = Country
        year2["Happiness Rank"] = HappyRank
        year2["Happiness Score"] = HappyScore
        year2["Upper Standard of Error"] = UpConfidence
        year2["Lower Standard of Error"] = LowConfidence
        year2["Economy"] = Economy
        year2["Family"] = Family
        year2["Health (Life Expectancy"] = Health
        year2["Freedom"] = Freedom
        year2["Trust in Government"] = GovtTrust
        year2["Generosity"] = Generosity
        year2["Dystopia Residual"] = Dystopia

        year.append(year2)

    return jsonify(year)


@app.route("/api/<country_sel>")
def countrySelection(country_sel):

    year2017 = Base.classes.Year2017

    """Return the MetaData for a given sample."""
    sel = [
        year2017.ID_2017, 
        year2017.Country, 
        year2017.HappyRank, 
        year2017.HappyScore, 
        year2017.UpConfidence, 
        year2017.LowConfidence, 
        year2017.Economy, 
        year2017.Family, 
        year2017.Health, 
        year2017.Freedom, 
        year2017.GovtTrust, 
        year2017.Generosity, 
        year2017.Dystopia
    ]

    results = session.query(*sel).filter(year2017.Country == country_sel).all()

    # Create a dictionary entry for each row of metadata information
    countryAPI = {}
    for result in results:

        countryAPI["ID"] = result[0]
        countryAPI["Country"] = result[1]
        countryAPI["Happiness Rank"] = result[2]
        countryAPI["Lower Standard of Error"] = result[5]
        countryAPI["Economy"] = result[6]
        countryAPI["Family"] = result[7]
        countryAPI["Health (Life Expectancy"] = result[8]
        countryAPI["Freedom"] = result[9]
        countryAPI["Trust in Government"] = result[10]
        countryAPI["Generosity"] = result[11]
        countryAPI["Dystopia Residual"] = result[12]


    print(countryAPI)
    return jsonify(countryAPI)   


if __name__ == "__main__":
    app.run(debug=True)
