# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as angular

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY . /usr/src/app

# Install all the dependencies
RUN npm install -g @angular/cli
RUN npm install

# Expose port 4200
EXPOSE 4200

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
