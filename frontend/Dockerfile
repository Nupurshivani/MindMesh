ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/app

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/next.config.ts ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]