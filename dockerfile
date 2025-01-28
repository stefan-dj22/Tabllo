FROM node:20 AS client-base
WORKDIR /usr/local/app
COPY ./frontend-app/package.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm npm install
COPY ./frontend-app/public ./public
COPY ./frontend-app/src ./src

FROM client-base AS client-dev
CMD ["npm", "start"]
