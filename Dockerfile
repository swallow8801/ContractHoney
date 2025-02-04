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
ENV FRONTEND_URL="https://conhoney-edfcc7adbrgwb9ac.koreacentral-01.azurewebsites.net"
ENV BACKEND_URL="https://your-backend-domain.com"
ENV AZURE_STORAGE_ACCOUNT_NAME="conhoneystorage"
ENV AZURE_STORAGE_ACCOUNT_KEY="9jS+1zxRCHjdDJRjiqUZFWLXdrRrcIsPAx6h+AfVFAbeWj8XmAVHU02cHrT7S7DoNIvRTS7eLQnl+AStZL4QNw=="
ENV AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=conhoneystorage;AccountKey=9jS+1zxRCHjdDJRjiqUZFWLXdrRrcIsPAx6h+AfVFAbeWj8XmAVHU02cHrT7S7DoNIvRTS7eLQnl+AStZL4QNw==;EndpointSuffix=core.windows.net"
ENV AZURE_STORAGE_CONTAINER_NAME="contract"
ENV CLOUD_CONVERT_API_KEY='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmM0OWNiZjFjM2VlMGE1MjdjZDhiYzMwMTdhZDc2YjBlNzhlMjdhMDg5ZGI4ZWQ5ZTdmOThkY2E0ZDZlNTUyYjRiMTc4NzEzMDg0ZDU3ODAiLCJpYXQiOjE3Mzg1NjQ3NjkuMTg0OTQzLCJuYmYiOjE3Mzg1NjQ3NjkuMTg0OTQ0LCJleHAiOjQ4OTQyMzgzNjkuMTc5NTQxLCJzdWIiOiI3MDkzNDIxMSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSJdfQ.MgJElFfhExD5tVZsr1ioHaScVSuAonqjVj9aKJuvqThx-imcGYieHkS2h6kj1VVs4MiMxluz0Mk3ky_Wh-LV_c5LpaPpX2_3krNb1htnqewGKsJNAq8T0vSvLkBL4ZcM0HlduMLiTdQy6Hzy_J-4krAzdFZsiNHNCW4__jmcdCOnyAUJgUx8PzZpB-Dxz3WZI23glBHIQ1ELUdar4L7im0zqqLJykmAJUHUjni-Z3SI8bHLg82CRm_Hp5uRzHFLp7aZLxAMhdCMqYwVeJQq8w8InEZBg8wPTso3ipFqjeFAffr5bdHyZ0ba9jUxiwWiDoK32x-vWTbRaAfMbdmHQdYAGxJxGX5LzTOgdyduX_N73y3QqIBIwEZdZTDRUN0ZDgbm7cHoxD3KgH2MWfPlwG4gr7fZ5cPWcwkXVModZKki1DVFak01_r4nTSz2J48hBojgorEyZgrHh9TYroliTKTIDsAHdo-S500UjWaP9wbhoQOojfGta2AdXP7cHENqpOW2xFF06hepSsE-GBnIFohIzl5gXDX4hwRPm7hHSsXoO5vBGnsGn9fWPBfihQnsvPWSmB4aZ0e-1y8RGNhxpV4pf41zeZYaAGBjlGqSK00pFBO2slLf9kASZZ00X7lHwaVsC9GYmWIV4VBDq5AvN1VYRo_L-SlzUE_5YoyqXvSU'
# Expose port
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]
