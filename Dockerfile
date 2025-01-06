# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock if you're using Yarn)
COPY package*.json ./

# Step 5: Install dependencies
RUN npm install

# Step 6: Copy the Prisma schema
COPY src/prisma ./src/prisma

# Generate Prisma Client
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Step 7: Copy the rest of your backend source code to the container
COPY . .

# Install TypeScript globally so tsc can run
RUN npm install -g typescript

# Ensure correct permissions on TypeScript binaries (just in case)
RUN chmod +x ./node_modules/.bin/tsc

# Step 8: Build the TypeScript code
RUN npm run build

# Step 9: Expose the port the app will run on
EXPOSE 5000

# Step 10: Start the application
CMD ["npm", "run", "start"]
