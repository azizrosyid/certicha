# Stage 1: Build the TypeScript code
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY ./prisma prisma
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Stage 2: Run the application
FROM node:18

# Set working directory
WORKDIR /app

# Copy the build output from Stage 1
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

RUN npx prisma generate
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "serve"]
