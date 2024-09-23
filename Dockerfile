FROM node:22-alpine

ENV TZ=Asia/Kolkata

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 8080

# Define the command to run the application
CMD ["yarn","run", "start"]
