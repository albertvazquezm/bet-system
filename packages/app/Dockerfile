# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/
COPY packages/dto/package*.json ./packages/dto/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/dto ./packages/dto
COPY packages/app ./packages/app

# Build the application
RUN npm run --workspace=@bet-system/dto build && \
    npm run --workspace=@bet-system/app build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/packages/app/.next ./packages/app/.next
COPY --from=builder /app/packages/app/public ./packages/app/public
COPY --from=builder /app/packages/dto/dist ./packages/dto/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "-w", "packages/app", "start"] 