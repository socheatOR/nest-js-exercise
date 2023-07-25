FROM node:19.6.1

# Create app directory
RUN mkdir -p /usr/src/application

WORKDIR /usr/src/application



# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json  /usr/src/application


RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . /usr/src/application/

RUN npm run build


EXPOSE 3001


CMD [ "node", "dist/main" ]
