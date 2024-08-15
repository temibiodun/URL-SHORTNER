FROM node:20-alpine


# Change the working directory to /build
WORKDIR /build

# Copy the package.json and package-lock.json files to the /build directory
COPY /client-app/package*.json ./

# Install production dependencies and clean the cache
RUN npm ci && npm cache clean --force



# Copy the entire source code into the container
COPY /client-app .


RUN  npm run build
# Document the port that may need to be published
EXPOSE 8000



# Start the application
CMD ["npm", "run", "start"]