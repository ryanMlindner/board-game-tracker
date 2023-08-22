from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #serialize_rules= ('-sessions')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    
    sessions = db.relationship("Session", backref='user') #TODO test
    players = db.relationship("Player", backref='user') #TODO test

    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, entry):
        if User.query.filter(User.username == entry).first() != None:
                raise ValueError("Username Taken!")
        return entry



class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    serialize_rules = ('-game_instances',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    publisher = db.Column(db.String)
    genre = db.Column(db.String)

    game_instances = db.relationship("GameInstance", backref='game')


class GameInstance(db.Model, SerializerMixin):
    __tablename__ = 'gameinstances'

    serialize_rules = ('-scores.gameinstance','-session', '-game')

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    scores = db.relationship("Score", cascade="all, delete-orphan", backref='gameinstance')


class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    serialize_rules = ('-game_instances.session', '-attendances.session')

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)

    game_instances = db.relationship("GameInstance", cascade="all, delete-orphan", backref='session')
    attendances = db.relationship("Attendance", cascade='all, delete-orphan', backref='session')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  

class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'

    serialize_rules = ('-player', '-session')

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'))


class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'

    serialize_rules = ('-scores.player',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    attendances = db.relationship("Attendance", cascade='all, delete-orphan', backref='player')
    scores = db.relationship("Score", cascade='all, delete-orphan', backref='player')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'

    serialize_rules = ('-gameinstance','-player')

    id = db.Column(db.Integer, primary_key=True)
    points = db.Column(db.Integer)
    placement = db.Column(db.Integer)

    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    game_instance_id = db.Column(db.Integer, db.ForeignKey('gameinstances.id'))
