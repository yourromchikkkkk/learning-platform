# Build stage
FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run db:generate && npm run build


# Run stage
FROM node
WORKDIR /app
COPY --from=builder /app ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
