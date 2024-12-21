# Use Node.js as a parent image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . /app/

# Expose the port React app will run on
EXPOSE 3000

# Start the React app using Vite
CMD ["npm", "run", "dev"]