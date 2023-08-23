#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Game, GameInstance, Session, Attendance, Player, Score, User

# db helper functions
#TODO filter by user --admin unfiltered list
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

class Signup(Resource):
    def post(self):
        json = request.get_json()
        try:
            user = User(username=json['username'])
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            response = make_response(user.to_dict(), 201)
            return response
        except ValueError:
            response = make_response({"errors": "username taken"}, 400)
            return response

class CheckAuth(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id == session['user_id']).first()
            print(user)
            response = make_response(user.to_dict(), 200)
            return response
        else:
            return ({}, 204)

class Login(Resource):
    def post(self):
        username = request.get_json()['username']

        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            response = make_response(user.to_dict(), 200)
        else:
            response = make_response({'error': 'Invalid username or password'}, 401)
        
        return response

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response({'message': 'No Content'}, 204)
        return response

api.add_resource(Games, '/games', endpoint='games')
api.add_resource(GameInstances, '/gameinstances', endpoint='gameinstances')
api.add_resource(Sessions, '/sessions', endpoint='sessions')
api.add_resource(Attendances, '/attendances', endpoint='attendances')
api.add_resource(Players, '/players', endpoint='players')
api.add_resource(Scores, '/scores', endpoint='scores')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckAuth, '/check_auth', endpoint='check_auth')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

