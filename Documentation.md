
# Project Documentation

## Overview

This project involves building a full-stack application that handles the creation and management of addresses, users, and API keys. It incorporates services such as email notifications, user authentication, and API key management. The system supports geospatial queries, address validation, and API key usage with limits based on user plans. The architecture follows a service-based approach and utilizes technologies like MongoDB, Node.js, React, and React-Email for rendering email templates.

### Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Service Layer](#service-layer)
8. [Email Templates](#email-templates)
9. [Setting up the Project Locally](#setting-up-the-project-locally)
10. [Docker Setup](#docker-setup)
11. [API Key Management and Limits](#api-key-management-and-limits)
12. [Logs and Monitoring](#logs-and-monitoring)
13. [Contributing](#contributing)

### Features

- **User Authentication**: Users can sign up, log in, and generate unique API keys.
- **Address Management**: Users can create, retrieve, update, and delete addresses.
- **Geospatial Queries**: Find nearby addresses using location-based searches.
- **Email Notifications**: Send waitlist notifications via email using React-Email and Resend.
- **API Key Limits**: Restrict API calls based on the user’s plan.
- **Logging**: Track actions performed by users to ensure monitoring and auditing.

### Tech Stack

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side logic.
  - **Express**: Web framework for building APIs.
  - **MongoDB**: NoSQL database for storing user, address, and API key data.
  - **Mongoose**: ODM for interacting with MongoDB.
  - **Joi**: Schema validation for API request data.
  - **Resend API**: Email service for sending email notifications.

- **Frontend**:
  - **React**: Frontend framework for building UI components.
  - **React-Email**: Library for generating email templates with React.
  
- **DevOps**:
  - **Docker**: Containerization tool for creating isolated environments.
  - **Git**: Version control to manage source code.

### Architecture

The system follows a modular architecture with the following components:

- **Controllers**: Handle incoming requests, interact with services, and return responses.
- **Services**: Encapsulate the business logic and interact with the database models.
- **Models**: Define the schema and structure of the database objects.
- **Middleware**: Validate data, authenticate users, and manage API key access.
- **Utilities**: Functions such as API key generation, short code generation, etc.

### Installation

#### Prerequisites

1. **Node.js** (version 14 or higher)
2. **MongoDB** (local or cloud instance)
3. **Docker** (optional for containerization)
4. **Git**

#### Steps to install

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:
   - Create a `.env` file at the root of your project and add the following:

     ```
     MONGO_URI=<your_mongo_connection_string>
     JWT_SECRET=<your_jwt_secret>
     API_KEY_SECRET=<your_api_key_secret>
     SENDGRID_API_KEY=<your_sendgrid_api_key>
     ```

4. Run the application:

   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:5000`.

### Folder Structure

```
├── src
│   ├── config            # Configuration files (e.g., database, server setup)
│   ├── controllers       # Logic for handling API requests
│   ├── middlewares       # Middleware for validating API keys, authentication, etc.
│   ├── models            # Mongoose models for user, address, API key, etc.
│   ├── services          # Business logic for interacting with models
│   ├── utils             # Utility functions (e.g., API key generation)
│   ├── routes            # API routes
│   ├── email             # Email templates and related functions
│   └── app.js            # Main app file
├── public                # Static files (images, assets)
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose file
└── package.json          # Project metadata and dependencies
```

### API Endpoints

#### User Endpoints

1. **POST /api/users**: Create a new user (with an associated API key).
2. **POST /api/login**: Login a user and return JWT and API key.
3. **GET /api/users/:id**: Get a user by their ID.

#### Address Endpoints

1. **POST /api/addresses**: Create a new address.
2. **GET /api/addresses/:id**: Get an address by its ID.
3. **PUT /api/addresses/:id**: Update an address.
4. **DELETE /api/addresses/:id**: Delete an address.

#### API Key Endpoints

1. **POST /api/keys**: Generate and store an API key for the user.
2. **GET /api/keys**: Retrieve all API keys for a user.

#### Email Notifications

1. **POST /api/email/waitlist**: Send a waitlist email to the user.

### Service Layer

- **User Service**: Handles user registration, login, and password management.
- **Address Service**: Handles the creation, deletion, updating, and retrieval of addresses.
- **API Key Service**: Manages the generation, validation, and storage of API keys.
- **Email Service**: Sends email notifications for events like waitlist updates.

### Email Templates

- **Waitlist Email**: A template to send to users who are waiting for product updates. Created using React-Email, this email can be sent using the Resend API.

Example `WaitlistEmail` Component:

```js
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components';

const WaitlistEmail = ({ name }) => (
  <Html>
    <Head />
    <Preview>Thank you for joining our waitlist and for your patience</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Coming Soon.</Heading>
        <Text style={text}>
          Thank you {name} for joining our waitlist and for your patience. We will send you a note when we have something new to share.
        </Text>
      </Container>
    </Body>
  </Html>
);
```

### Setting up the Project Locally

To run this project locally:

1. Follow the installation steps provided.
2. You can use `docker-compose` to run the application inside containers:

   ```bash
   docker-compose up --build
   ```

3. This will set up MongoDB in a container and start the application locally.

### Docker Setup

To run the application in Docker:

1. **Dockerfile** is provided to create a container image for the application.
2. You can build the image and run the container using:

   ```bash
   docker build -t app-name .
   docker run -p 5000:5000 app-name
   ```

### API Key Management and Limits

Each user is given an API key upon registration. The API key can be used for making requests, and limits are set based on the user's plan.

- **Plan Types**:
  - Basic: 100 requests/month.
  - Premium: 1000 requests/month.
  
When users make requests, the API key is validated, and their remaining quota is checked. If the user exceeds their limit, they are blocked from making further requests.

### Logs and Monitoring

Logs are essential for tracking actions in the system, especially for user actions like address creation or API key usage. Monitoring services like **Winston** or **Morgan** can be integrated for enhanced logging and tracking.

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
```

### Contributing

To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request with a detailed description of your changes.
