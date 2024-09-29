FROM node:latest

WORKDIR /app
COPY package.json package-lock.json ./

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; then \
    npm install; \
    else npm install --only=production; \
    fi

COPY . .

ENV PORT 4000
EXPOSE ${PORT}
CMD ["node", "index.js"]
