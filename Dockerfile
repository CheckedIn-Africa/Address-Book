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