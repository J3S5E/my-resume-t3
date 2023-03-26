FROM node:18-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN yarn build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ ./
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]