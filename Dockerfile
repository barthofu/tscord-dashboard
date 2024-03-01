# source: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# ============================
# ==== Dependencies stage ====
# ============================

FROM node:20-alpine as deps

    WORKDIR /app

    COPY package.json package-lock.json ./
    
    RUN apk add --no-cache libc6-compat
    RUN npm ci

# ======================
# ===== Build stage ====
# ======================

FROM node:20-alpine as builder

    WORKDIR /app
    ENV NEXT_TELEMETRY_DISABLED 1

    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    RUN npm run build

# =====================
# ===== Run stage =====
# =====================

FROM node:20-alpine as runner

    WORKDIR /app

    ENV NODE_ENV production
    ENV NEXT_TELEMETRY_DISABLED 1
    ENV PORT 3000

    EXPOSE ${PORT}

    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    RUN addgroup --system --gid 1001 nodejs && \
        adduser --system --uid 1001 nextjs

    USER nextjs

    CMD ["node", "server.js"]