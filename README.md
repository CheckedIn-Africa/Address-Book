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

## Market opportunities

1. Kenya
opportunity: In Kenya, approximately 60% of the population lives in informal settlements, primarily in urban areas like Nairobi. Without a formal address, these individuals often struggle to access essential services such as healthcare, education, and government benefits. The lack of a structured address system makes it difficult for delivery services, postal services, and emergency responders to locate people. Moreover, businesses find it challenging to reach rural customers or even set up logistical networks. Without proper addressing, an estimated 50% of Kenyan businesses face difficulties in customer identification and service delivery.

Figures: 60% of Kenyans live in informal settlements; approximately 50% of businesses are affected by address-related challenges.

2. Nigeria
opportunity: Nigeria, with a population of over 200 million, faces significant challenges in addressing, especially in sprawling cities like Lagos where over 20 million people live. Without formal addresses, Nigerians in rural and informal areas are excluded from basic services such as postal delivery, e-commerce, and emergency responses. This lack of addressing also hampers urban planning, social services, and health initiatives. The absence of structured addresses means poor access to basic services for millions, with over 70% of Lagos residents living in informal settlements.

Figures: Over 70% of Lagos residents live in informal settlements; 200 million people across Nigeria face challenges with address-based service delivery.

3. India
opportunity: India’s diverse population of over 1.4 billion people, especially in rural areas, often lacks a formalized address system. Many rural areas rely on verbal descriptions for navigation, leaving citizens unable to receive mail or benefit from government initiatives. The lack of formal addresses significantly hinders the delivery of e-commerce services and essential goods. According to some estimates, around 60% of rural India faces address-related challenges that affect their access to essential services like healthcare and government subsidies.

Figures: 60% of rural India lacks proper address systems, affecting over 800 million people in rural areas.

4. Bangladesh
opportunity: Bangladesh has a population of more than 160 million people, with a substantial number living in informal settlements. In cities like Dhaka, many residents lack formal addresses, making it challenging to access critical services such as healthcare, utilities, and postal services. This issue also affects business logistics, especially for online and delivery-based services. A significant portion of the population in slums and rural areas remains underserved by official systems due to the absence of formal addresses.

Figures: 40% of Dhaka's population lives in informal settlements without reliable addresses.

5. Pakistan
opportunity: Pakistan, with a population of over 220 million people, faces widespread addressing issues. In rural areas, a significant portion of the population lacks formal addresses, making it difficult to receive deliveries, access postal services, and even vote in elections. This exclusion affects over 70 million people who live in areas with limited access to government services and infrastructure. The absence of formal addresses further exacerbates socio-economic disparities.

Figures: 70 million Pakistanis in rural areas face challenges related to the absence of formal addresses.

6. Ethiopia
opportunity: Ethiopia, a country with over 115 million people, is one of the poorest countries in the world, and a lack of formal address systems only worsens its challenges. In rural areas and towns, people often depend on local landmarks or informal directions for navigation, which complicates the delivery of government services, healthcare, and education. The absence of an address system is a major barrier to economic growth, especially in e-commerce and delivery-based industries.

Figures: Over 70% of the Ethiopian population lives in rural areas without formal addresses.

7. South Sudan
opportunity: South Sudan, with a population of about 11 million people, is a country that has been severely impacted by conflict and instability. In many parts of the country, there is no formal address system, especially in rural areas where citizens rely on community knowledge for directions. The lack of proper addresses poses a significant challenge to the delivery of humanitarian aid and services, further exacerbating the hardships faced by the population.

Figures: Over 85% of South Sudan’s population lives in areas where formal addresses are absent.

8. Afghanistan
opportunity: Afghanistan, with a population of over 38 million people, faces significant addressing challenges, particularly in rural areas and conflict zones. Many people rely on local knowledge or landmarks for finding their homes. This lack of a formal address system creates obstacles in the delivery of medical aid, goods, and government services. It is estimated that over 60% of Afghanistan’s population struggles with the absence of a reliable addressing system.

Figures: 60% of the population faces difficulties related to the absence of formal addresses.

9. Haiti
opportunity: In Haiti, which has a population of about 11 million, addressing is a serious challenge, especially in rural and informal settlements. The absence of a formal address system impacts every aspect of life, from receiving mail to accessing healthcare and education. It also hinders the delivery of humanitarian aid, which is critical in a country frequently affected by natural disasters.

Figures: 50% of Haiti's population lacks formal addresses, which complicates logistics and service delivery.

10. Mozambique
opportunity: Mozambique, with a population of 31 million, faces addressing issues that affect service delivery and economic growth. In many rural areas, people do not have formal addresses, making it difficult to access health services, postal systems, and even government benefits. The lack of a structured address system also hampers business development, particularly for online services.

Figures: 40% of the population lacks formal addresses, which impedes economic development and access to services.

11. Uganda
opportunity: Uganda has a population of 44 million, and like many other developing nations, a significant portion of the population lacks formal addresses. In Uganda, about 85% of the population lives in rural areas where formalized addressing is rare. This absence prevents citizens from receiving packages, accessing postal services, and even interacting with government services effectively.

Figures: 85% of Ugandans live in rural areas where formal addresses are rare.

12. Tanzania
opportunity: Tanzania, with a population of 58 million, has major addressing gaps, especially in rural areas. The lack of formalized address systems in these regions creates difficulties for individuals in accessing services, receiving packages, or contacting businesses. Additionally, without structured addresses, emergency responders and aid workers face difficulties in reaching those in need during crises.

Figures: 60% of Tanzanians live in rural areas without formal address systems.

13. Myanmar
opportunity: Myanmar has a population of about 54 million, and many of its rural areas, especially those affected by conflict, do not have formal addresses. This lack of formal addressing exacerbates difficulties in accessing healthcare, education, and government services, as well as hinders economic development and business expansion.

Figures: 40% of Myanmar's population lacks proper addresses, leading to widespread exclusion from essential services.

14. Liberia
opportunity: Liberia, with a population of 5 million, faces major addressing challenges, especially in rural and slum areas. Most of the country lacks formal address systems, making it difficult for locals to receive mail, packages, or even emergency services. The lack of proper addresses hinders social mobility and access to essential services.

Figures: Over 60% of Liberians lack formal addresses, particularly in rural and slum areas.

15. Somalia
opportunity: Somalia, with a population of 16 million, has a severe lack of formal addresses due to decades of conflict. Without proper addressing, people are often unable to access critical services such as healthcare, education, and government support. In areas with no formal addresses, humanitarian efforts and emergency response services are also hindered.

Figures: Over 70% of Somalis live without formal addresses, especially in conflict zones and rural areas.

16. Democratic Republic of the Congo (DRC)
opportunity: The DRC, with a population of over 90 million, faces immense challenges due to the absence of a formal address system in many rural and conflict-affected areas. This lack of infrastructure makes it difficult for citizens to access basic services like healthcare, education, and postal delivery. Moreover, businesses and aid organizations struggle to reach these regions effectively.

Figures: Over 80% of the DRC's population lacks a formal address system.

17. Mali
opportunity: Mali, with a population of 20 million, faces significant addressing challenges in its rural and remote areas. The lack of formal addresses hinders access to services, prevents businesses from reaching potential customers, and complicates the delivery of humanitarian aid.

Figures: Over 60% of Malians live without formal addresses, making it difficult to receive basic services.

18. Sierra Leone
opportunity: Sierra Leone, with a population of 8 million, faces challenges in addressing, particularly in rural and informal settlements. Lack of formal addresses complicates access to healthcare, education, and government services. Many people rely on local landmarks for directions, which affects service delivery and economic participation.

Figures: 50% of Sierra Leone's population lacks formal addresses, especially in rural and informal settlements.

19. Zambia
opportunity: Zambia, with a population of 18 million, suffers from inadequate addressing, particularly in its rural areas. The lack of formal addresses in these regions hampers access to healthcare, government services, and economic opportunities. Additionally, it makes delivery of goods and services difficult, impeding local development.

Figures: 60% of Zambia’s population lives in rural areas with no formal addresses.

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
git clone https://github.com/CheckedIn-Africa/Address-Book.git
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
