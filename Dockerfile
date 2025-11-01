# Use Python 3.11 (more stable for production than 3.13)
FROM python:3.11-slim

WORKDIR /app


RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt


RUN python -m spacy download en_core_web_sm

COPY src/api/ /app/


ENV PYTHONPATH=/app


EXPOSE 8000

# Production command (no --reload)
# Use host 0.0.0.0 to accept external connections
# Use $PORT environment variable for cloud platforms
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]