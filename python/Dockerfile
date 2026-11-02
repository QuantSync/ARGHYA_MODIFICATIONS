# Dockerfile for Arghya Modifications Python Analytics & Inventory Engine
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV ANALYTICS_INTERVAL_SECONDS=120
ENV RUN_ONCE=false

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt || true

COPY . .

CMD ["python", "runner.py"]

