# Use an official Node.js runtime as the base image
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest application files to the container
COPY . .

# Expose the port the application will run
EXPOSE 8000

# Define the command to start your application
CMD ["node", "function.js"]
