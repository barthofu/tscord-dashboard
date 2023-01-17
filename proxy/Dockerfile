# === dependencies
FROM node:16-alpine as deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# === builder & runner
FROM node:16-alpine as runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

ENV NODE_ENV production

CMD ["npm", "run", "start"]