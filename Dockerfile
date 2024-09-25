# Use the official Node.js image.
FROM node:14

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Copy the memory consumer script.
COPY memory-consumer.js ./

# Expose the port your app runs on.
EXPOSE 3000

# Command to run your app.
CMD ["node", "index.js"]
