# Board Game Tracker

## Project Pitch
  An online database to keep track of games, scores, and attendance at game nights, with a UI that displays any 
and all information that can be derived from the data (averages, placement, rankings, etc.). Users can log in and keep 
track of all the data they wish to and come back to it whenever they need.

---

## ERD

#TODO

## File Structure

```console
.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── Pipfile.lock
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── instance
    ├── migrations
    ├── models.py
    └── seed.py
```

---

## Setup

### `server/`

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

Run the Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

### `client/`

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

Run the React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

---

### What Goes into a README?

This README should serve as a template for your own- go through the important
files in your project and describe what they do. Each file that you edit (you
can ignore your migration files) should get at least a paragraph. Each function
should get a small blurb.

You should descibe your application first, and with a good level of detail. The
rest should be ordered by importance to the user. (Probably routes next, then
models.)

Screenshots and links to resources that you used throughout are also useful to
users and collaborators, but a little more syntactically complicated. Only add
these in if you're feeling comfortable with Markdown.

---

## Resources

- [Setting up a respository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
