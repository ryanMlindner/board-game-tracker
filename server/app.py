#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Game, GameInstance, Session, Attendance, Player, Score

# db helper functions
def get_all_dict(cls):
    """takes a class model and returns the dicts of all objects in the database"""
    items = [item.to_dict() for item in cls.query.all()]
    return items

def get_one_dict(cls, id):
    """takes a class model and returns the matching id dict in the database"""
    item = cls.query.filter(cls.id == id).first()
    return item.to_dict()

def get_one(cls, id):
    """takes a class model and returns the matching id object in the database"""
    item = cls.query.filter(cls.id == id).first()
    return item

# Views
@app.route('/')
def index():
    return '<h1>Board Game Tracker</h1>'

class Games(Resource):
    def get(self):
        response = make_response(get_all_dict(Game), 200)
        return response

class GameInstances(Resource):
    def get(self):
        response = make_response(get_all_dict(GameInstance), 200)
        return response

class Sessions(Resource):
    def get(self):
        response = make_response(get_all_dict(Session), 200)
        return response

class Attendances(Resource):
    def get(self):
        response = make_response(get_all_dict(Attendance), 200)
        return response

class Players(Resource):
    def get(self):
        response = make_response(get_all_dict(Player), 200)
        return response

class Scores(Resource):
    def get(self):
        response = make_response(get_all_dict(Score), 200)
        return response


api.add_resource(Games, '/games')
api.add_resource(GameInstances, '/gameinstances')
api.add_resource(Sessions, '/sessions')
api.add_resource(Attendances, '/attendances')
api.add_resource(Players, '/players')
api.add_resource(Scores, '/scores')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

