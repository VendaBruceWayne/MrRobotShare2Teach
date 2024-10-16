#Step 1: Use an official Node.js image as a base image
FROM node:18-alpine

#Step 2: Set the working directory inside the container
WORKDIR /app

#Step 3: Copy the package.json and pacakge-lock.json
COPY package*.json ./

#Step 4: Install all the dependencies
RUN npm install

#Step 5: Copy the rest of the Typescript source code
COPY . .

#Step 6: Insatll TypeScript and build the app
RUN npm install -g typescript
RUN tsc

#Step 7 Expose the port  the app runs on
EXPOSE 8000

#Step 8: Start the  Node.js app
CMD ["npm", "start"]