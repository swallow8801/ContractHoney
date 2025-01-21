# Step 1: Build Stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (캐싱을 위해 dependency 파일만 복사한 상태에서 실행)
RUN npm ci

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

# Set environment variables
ENV DB_HOST="contract.mysql.database.azure.com"
ENV DB_USER="Aivle627"
ENV DB_PASSWORD="Aivle627"
ENV DB_NAME="contract"
ENV DB_PORT=3306
ENV JWT_SECRET_KEY="sdgb"
ENV EMAIL_HOST="smtp.gmail.com"
ENV EMAIL_PORT=587
ENV EMAIL_USER="sundaegugbab0@gmail.com"
ENV EMAIL_PASS="dmbh oqsx whfg xhch"
ENV FRONTEND_URL="conhoney-edfcc7adbrgwb9ac.koreacentral-01.azurewebsites.net"
ENV BACKEND_URL="https://your-backend-domain.com"

# Expose port
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]
