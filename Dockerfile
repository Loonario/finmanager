FROM node:18-alpine
ENV NODE_ENV=development

WORKDIR /usr/src/finmanager
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm install -g localtunnel
# RUN npm install source-map-support
COPY ./ ./
RUN npm run build

EXPOSE 3000
# RUN  chown -R node /usr/src/finmanager

USER node
# CMD ["npm", "run", "start:prod"]
CMD ["node", "dist/main.js"]
# CMD ["npm", "run", "start"]
# CMD ["node", "dist/src/main"]



# FROM node:18 as development
# WORKDIR /usr/src/finmanager

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install glob rimraf

# RUN npm install --only=development

# COPY . .

# RUN npm run build
# EXPOSE 3000
# FROM node:18 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/finmanager

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/finmanager/dist ./dist
# EXPOSE 3000
# CMD ["node", "dist/main"]








# FROM node:18
# ENV NODE_ENV=production

# WORKDIR /usr/src/finmanager
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent && mv node_modules ../

# COPY ./ ./


# # RUN  chown -R node /usr/src/finmanager
# RUN npm run build


# EXPOSE 3000
# CMD ["node", "dist/main"]