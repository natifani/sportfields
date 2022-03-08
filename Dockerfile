FROM node:latest
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 8080
CMD ["node", "index.js"]