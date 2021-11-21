FROM python:3.7

ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chmod +x ./entry.sh
CMD ["/api/entry.sh"]


