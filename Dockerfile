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
ARG DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ARG DISCORD_CLIENT_SECRET
ENV DISCORD_CLIENT_SECRET=$DISCORD_CLIENT_SECRET
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
RUN yarn build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ ./
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]