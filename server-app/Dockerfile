# Use Node 20.16 alpine as base ima
FROM node:20-alpine


# Change the working directory to /build
WORKDIR /build

# Copy the package.json and package-lock.json files to the /build directory
COPY /server-app/package*.json ./

# Install production dependencies and clean the cache
RUN npm ci && npm cache clean --force



# Copy the entire source code into the container
COPY /server-app .


RUN  run build
# Document the port that may need to be published
EXPOSE 8000



# Start the application
CMD ["node", "dist/server.js"]
