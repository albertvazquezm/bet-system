# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/dto/package*.json ./packages/dto/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/dto ./packages/dto
COPY packages/api ./packages/api

# Build the application
RUN npm run --workspace=@bet-system/dto build && \
    npm run --workspace=@bet-system/api build

# Production stage
FROM node:20-alpine

# Install production dependencies only
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/dto/package*.json ./packages/dto/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/dto/dist ./packages/dto/dist

# Copy necessary configuration files
COPY packages/api/sequelize.config.js ./packages/api/
COPY packages/api/.sequelizerc ./packages/api/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port
EXPOSE 4000

# Set the working directory to the api package
WORKDIR /app/packages/api

# Start the application
CMD ["npm", "run", "start:pm2"] 