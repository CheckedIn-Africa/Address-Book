# Address ShortCode Generator API

## Background

### Problem Statement

In Kenya, millions of people lack formal address systems. This is especially challenging for people living in informal settlements or areas without proper address infrastructure. The absence of proper addresses creates significant barriers to accessing essential services such as banking, logistics, healthcare, and e-commerce.

As a result, many businesses and government services face challenges in reaching individuals, deliveries, and in providing essential services like identification, registration, and tracking.

### Solution

This project aims to build an **Address ShortCode Generator API** that can automate the process of generating **short, compact, and structured** address codes for every registered address. The short code is designed to be:

- **Unique** to each address
- **Compact** for easy use (e.g., on packages, IDs)
- **Readable** and **structured** to include geographic details like **county, sub-county, direction, and unique hash**

This solution ensures that people in underserved regions or informal settlements can still have a **valid and traceable address** for accessing various services like banking, delivery, and logistics.

---

## How We Solve It

We built a **Node.js API** that takes user inputs like county, sub-county, street direction, building name, and more, and generates a **shortCode** for each address. This shortCode is designed to be **unique** and **human-readable**, making it ideal for **address verification** and **tracking**.

The API can handle both **flat addresses** (like apartments) and **non-flat addresses** (like standalone houses), while generating **compact short codes** that can easily be printed on delivery packages, used in mobile applications, or included in QR codes for quick access.

---

## Project Structure

The project is structured as follows:

```
address-shortcode-generator-api/
│
├── src/
│   ├── models/            # Mongoose models (e.g., Address schema)
│   ├── utils/             # Utility functions (e.g., shortCode generator)
│   ├── controllers/       # Controllers for handling API requests
│   ├── routes/            # Routes for API endpoints
│   └── config/            # Configuration files (e.g., database connection)
│
├── .dockerignore          # Files to exclude from Docker image
├── Dockerfile             # Dockerfile to build the app container
├── docker-compose.yml     # Docker Compose file to run the app and services (e.g., MongoDB)
├── .gitignore             # Gitignore file
├── package.json           # Node.js dependencies and scripts
└── README.md              # This file
```

- **src/models**: Contains the Mongoose schema and models for managing address data.
- **src/utils**: Contains utility functions like the shortCode generation logic.
- **src/controllers**: Contains the logic for handling HTTP requests (e.g., creating and fetching addresses).
- **src/routes**: Defines the REST API routes for interacting with the address system (e.g., POST, GET requests).
- **src/config**: Configuration for setting up things like database connection (MongoDB).

---

## Features

- **ShortCode Generation**: Automatically generate short, unique, and compact address codes.
- **Flexible Address Types**: Handles both flats (apartments) and non-flat addresses (houses).
- **Human-Readable Format**: Generates shortCodes like `NL 5SU123 W`, making it easy to interpret.
- **MongoDB Integration**: Store generated address codes and their corresponding details.
- **Dockerized Setup**: Easy to deploy and set up the application using Docker.

---

## How to Set Up Locally

To set up the project locally, you need **Docker** and **Docker Compose** installed on your machine. If you don’t have them installed, you can get them from the official sites:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone https://github.com/allanokothdev/address-api.git
cd address-api
```

### 2. Build and Run the Docker Containers

#### Option 1: Using Docker Compose (Recommended)

Docker Compose simplifies the process by running both the application and MongoDB container in one go. To build and start the containers:

```bash
docker-compose up --build
```

This will:

- Build the application container using the `Dockerfile`.
- Start the MongoDB container.
- Expose the API on `http://localhost:3000`.

#### Option 2: Using Docker (without Docker Compose)

If you prefer to use Docker without Compose, you can build and run the container using the following commands:

1. **Build the image**:

```bash
docker build -t address-app .
```

2. **Run the container**:

```bash
docker run -p 3000:3000 address-app
```

This will expose your app on `http://localhost:3000`.

---

### 3. API Endpoints

Once the application is up and running, you can interact with the API using the following endpoints:

- **POST /addresses**: Create a new address with a generated shortCode.
  - Request body example:

    ```json
    {
      "county": "Nairobi",
      "subCounty": "Kilimani",
      "buildingName": "Green Heights",
      "floor": 3,
      "unit": "A1",
      "streetDirection": "East",
      "isFlat": true
    }
    ```

  - Response example:

    ```json
    {
      "shortCode": "NK5G3XE"
    }
    ```

- **GET /addresses/:shortCode**: Retrieve an address by its shortCode.
  - Example: `GET http://localhost:3000/addresses/NK5G3XE`
  - Response example:

    ```json
    {
      "county": "Nairobi",
      "subCounty": "Kilimani",
      "buildingName": "Green Heights",
      "floor": 3,
      "unit": "A1",
      "streetDirection": "East",
      "isFlat": true
    }
    ```

---

## Dockerfile

Here’s the **Dockerfile** used to containerize the Node.js application:

```Dockerfile
# Step 1: Use official Node.js image as the base
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the application port (default for Node.js is 3000)
EXPOSE 3000

# Step 7: Define the start command for the app
CMD ["npm", "start"]
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
