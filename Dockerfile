FROM node:6.9.2
EXPOSE 8079
COPY . .
RUN npm install
CMD node server.js