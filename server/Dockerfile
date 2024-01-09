FROM python:3.8.13

RUN pip install pipenv

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./ /app

CMD ["python", "app.py"]