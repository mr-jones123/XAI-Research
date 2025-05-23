FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

COPY src/app/api/python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/app/api/python/ .

EXPOSE 8080

CMD ["gunicorn", \
    "--bind", "0.0.0.0:8080", \
    "--workers=1", \                  
    "--timeout=120", \
    "--access-logfile=-", \
    "--error-logfile=-", \
    "--preload", \
    "app:app"]
