FROM node:10.15-alpine as dist

WORKDIR /tmp/

COPY ./package.json ./package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm ci

COPY . .

RUN npm run build

#----------------------------------------------
FROM node:10.15-alpine

ARG BUILD_ID
ENV BUILD_ID ${BUILD_ID}

WORKDIR /usr/app/src

COPY --from=dist /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]
