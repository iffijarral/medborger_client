# Use an official Node.js runtime as a parent image
FROM --platform=linux/amd64 node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the app for production
RUN npm run build

EXPOSE 3000

# Set the command to start the app
CMD ["npm", "start"]
