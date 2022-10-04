FROM node:16-alpine as development

# set working dir, all commands are run three
WORKDIR /usr/src/app

# copy package.json and package-lock.json file to /usr/src/app (workdir)
# copy this first for optimalisation -> if nothing changes in package.json, we do not need to install all the time 
# as the result will be cached :) 
COPY package*.json .

RUN npm install

# copy everything from project directory to /usr/src/app (workdir)
COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

# install only prod dependencies 
RUN npm ci --only=production

# copy only the builded JS files 
COPY --from=development /usr/src/app/build ./build

CMD ["node", "build/server.js"]
