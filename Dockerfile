FROM python:3.13-slim

WORKDIR /app

# Install dependencies first (better caching)
COPY src/app/api/python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/app/api/python/ .

# Copy model files
# Models are placed in the same directory level as app.py inside the container
COPY src/lib/models/ ./models

EXPOSE 8080

# Run with gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]