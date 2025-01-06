# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Install TypeScript globally so tsc can run
RUN npm install -g typescript

# Ensure correct permissions on TypeScript binaries (just in case)
RUN chmod +x ./node_modules/.bin/tsc

# Step 5: Copy the rest of your backend source code to the container
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build

# Step 6: Expose the port the app will run on
EXPOSE 5000

# Step 7: Start the application
CMD ["npm", "run", "start"]
