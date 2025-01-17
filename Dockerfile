# Step 1: Build Stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Step 2: Production Stage
FROM node:18

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "run", "start"]
