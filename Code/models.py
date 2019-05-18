from .app import db


class Happiness(db.Model): ##Happiness formerly called 'Pet"
    __tablename__ = 'year' ##formerly called 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)
