# Medication Refill Application

This repository contains the code for a Medication Refill application consisting of a Django backend and a React frontend. The application allows users to register, log in, view medications, request refills, and visualize refill statistics in a dashboard. The backend is secured with JWT authentication, and the frontend integrates with the backend API to display medication data and generate charts.

## Table of Contents

- [Backend Setup (Django)](#backend-setup-django)
  - [User Registration and Login](#user-registration-and-login)
  - [Medication and Refill Request Endpoints](#medication-and-refill-request-endpoints)
  - [Basic Authentication](#basic-authentication)
- [Frontend Setup (React)](#frontend-setup-react)
  - [User Registration and Login Pages](#user-registration-and-login-pages)
  - [Medication List and Refill Request](#medication-list-and-refill-request)
  - [Dashboard with Chart](#dashboard-with-chart)
- [Local Deployment](#local-deployment)
  - [Docker Setup](#docker-setup)
  - [Running the Application](#running-the-application)
- [Optional AWS Deployment](#optional-aws-deployment)
- [Evaluation Criteria](#evaluation-criteria)

## Backend Setup (Django)

### User Registration and Login

- Implemented using Django REST Framework (DRF).
- Two main endpoints:
  - **POST `/api/register/`**: Registers a new user.
  - **POST `/api/login/`**: Logs in a user and returns a JWT token for authentication.

### Medication and Refill Request Endpoints

- **GET `/api/medications/`**: Returns a static list of medications available for refill.
- **POST `/api/refill-request/`**: Allows users to submit refill requests.
- **GET `/api/refill-stats/`**: Retrieves refill request statistics, providing data for charting (e.g., total refills requested per medication).

### Basic Authentication

- The API is secured using JWT authentication. The user must include the JWT token in the Authorization header to access protected endpoints.

## Frontend Setup (React)

### User Registration and Login Pages

- Forms for user registration and login, which interact with the backend's `/api/register/` and `/api/login/` endpoints.
- The authentication token is stored in the browser's local storage for session management.
- The token is used in subsequent requests to access protected API endpoints.

### Medication List and Refill Request

- A page displays a list of medications retrieved from the backend.
- A button or form allows users to request refills for the listed medications.

### Dashboard with Chart

- A dashboard page visualizes refill request statistics using a chart.
- A charting library like [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/en-US/) is used to display the number of refill requests per medication based on data from the `/api/refill-stats/` endpoint.

## Local Development
1. Build and Run Docker compose
```bash
docker-compose up --build
```
2. Frontend Server will be running on http://localhost:3000
3. Backend Server will be running on http://localhost:8000


### Clone the Application

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>