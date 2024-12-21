# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/

# psycopg2-binary
RUN apt-get update && apt-get install -y libpq-dev gcc

RUN pip install psycopg2-binary

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app/

# Expose the port Django runs on
EXPOSE 8000

RUN cd /app

# Start the Django server (you can modify this to your preferred method)
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]