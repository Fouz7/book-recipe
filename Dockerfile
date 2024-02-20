# Stage 1: Compile and Build angular codebase
FROM node:20.11.0-alpine as angular

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY . /usr/src/app

# Install all the dependencies
RUN npm install -g @angular/cli@latest
RUN npm install

# Expose port 4200
EXPOSE 8000

# Start the application without live reload
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--live-reload=false"]
