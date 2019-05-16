import sqlite3
import pandas as pd

conn = sqlite3.connect("db.sqlite")
curs = conn.cursor()
curs.execute("DROP TABLE Year2015")
curs.execute("DROP TABLE Year2016")
curs.execute("DROP TABLE Year2017")
# curs.execute("DROP TABLE pets")

### USED TO CREATE SQL TABLES

# Load csv
df2015 = pd.read_csv('../data/2015.csv')
df2016 = pd.read_csv('../data/2016.csv')
df2017 = pd.read_csv('../data/2017.csv')

# Modify column names before import into SQLite
df2015.rename(columns = {"Happines Rank": "HappyRank", 
                        "Happiness Score":"HappyScore", 
                        "Standard Error": "SoE",
                        "Economy (GDP per Capita)": "Economy",
                        "Health (Life Expectancy)": "Health",
                        "Trust (Government Corruption)": "GovtTrust",
                        "Dystopia Residual" : "Dystopia"}, inplace=True) 

df2016.rename(columns = {"Happines Rank": "HappyRank", 
                        "Happiness Score":"HappyScore",
                        "Lower Confidence Interval" : "LowConfidence",
                        "Upper Confidence Interval" : "UpCondfidence",
                        "Economy (GDP per Capita)": "Economy",
                        "Health (Life Expectancy)": "Health",
                        "Trust (Government Corruption)": "GovtTrust",
                        "Dystopia Residual" : "Dystopia"}, inplace=True) 

df2017.rename(columns = {"Happiness.Rank": "HappyRank", 
                        "Happiness.Score":"HappyScore",
                        "Whisker.low" : "LowConfidence",
                        "Whisker.high" : "UpCondfidence",
                        "Economy..GDP.per.Capita.": "Economy",
                        "Health..Life.Expectancy.": "Health",
                        "Trust..Government.Corruption.": "GovtTrust",
                        "Dystopia.Residual" : "Dystopia"}, inplace=True) 

# strip whitespace from headers
df2015.columns = df2015.columns.str.strip()
df2016.columns = df2016.columns.str.strip()
df2017.columns = df2017.columns.str.strip()


# drop data into database
df2015.to_sql("Year2015", conn)
df2016.to_sql("Year2016", conn)
df2017.to_sql("Year2017", conn)

conn.close()




# import csv
# import sqlite3
# import os

# conn = sqlite3.connect("db.sqlite")
# print(1)
# curs = conn.cursor()
# print(2)
# # Code below works, but is already created
# # curs.execute("""CREATE TABLE Year2015 
# #     (id INTEGER PRIMARY KEY,
# #     country TEXT, 
# #     region TEXT, 
# #     happinessRank INT, 
# #     happinessScore REAL, 
# #     standardError REAL, 
# #     economy REAL, 
# #     family REAL, 
# #     health REAL, 
# #     freedom REAL, 
# #     govtTrust REAL,
# #     generosity REAL, 
# #     dystopiaResidual REAL);
# #     """)
# # curs.execute("DROP TABLE Year2015")
# print(3)
# test1 = curs.execute("PRAGMA table_info(Year2015) ;").fetchall()
# print(test1)
# # mypath = os.path.dirname(os.path.abspath(__file__))
# # mypath = os.getcwd()

# # with open('2015.csv', "rb") as f: # CSV file input
# #     reader = csv.reader(f, delimiter=',')
# #     print(4)
# #     for row in reader:
# #         curs.execute("""INSERT INTO 2015 (Country, Region, Happiness_Rank, Happiness_Score, Standard_Error, Economy, Family, Health, Freedom, \\
# #         Govt_Trust,	Generosity,	Dystopia_Residual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);""")

# reader = csv.reader(open('../data/2015.csv', 'r'), delimiter=',')
# print (4)
# for row in reader:
#     # to_db = [unicode(row[0], "utf8"), unicode(row[1], "utf8"), unicode(row[2], "utf8")]
#     # curs.execute("INSERT INTO Year2015 VALUES (null, "+row[0]+","+row[1]+","+row[2]+","+row[3]+","+row[4]+","+row[5]+","+row[6]+","+row[7]+","+row[8]+","+row[9]+","+row[10]+","+row[11]+";")
#     curs.execute("INSERT INTO Year2015 (country, region) VALUES (column1,column2);")
#     # curs.execute("""INSERT INTO Year2015 (Country, Region, Happiness_Rank, Happiness_Score, Standard_Error, Economy, Family, Health, Freedom, Govt_Trust, Generosity, Dystopia_Residual) VALUES ("+row[0]+","+row[1]+","+row[2]+","+row[3]+","+row[4]+","+row[5]+","+row[6]+","+row[7]+","+row[8]+","+row[9]+","+row[10]+","+row[11]+");""")
# print(5)
# conn.commit()
# conn.close()
