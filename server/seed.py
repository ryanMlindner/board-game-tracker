#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Game, GameInstance, Session, Attendance, Player, Score

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        #test code comment out eventually
        game = Game(
            title="Definitely Game",
            publisher="publisher of Game",
            genre="totally a genre",
        )
        db.session.add(game)
        db.session.commit()
        player = Player(
            name="Bob",
            start_date=date(2023, 8, 8),
            end_date=date(2023, 11, 11),
        )
        db.session.add(player)
        db.session.commit()
        session = Session(
            date = date(2023, 10, 10),
        )
        db.session.add(session)
        db.session.commit()
        attendance = Attendance(
            player_id = 1,
            session_id = 1
        )
        db.session.add(attendance)
        db.session.commit()
        gameinstance = GameInstance(
            session_id = 1,
            game_id = 1
        )
        db.session.add(gameinstance)
        db.session.commit()
        score = Score(
            points=10,
            placement=1,
            player_id=1,
            game_instance_id=1,
        )
        db.session.add(score)
        db.session.commit()
