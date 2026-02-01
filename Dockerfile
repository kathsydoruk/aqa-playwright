FROM mcr.microsoft.com/playwright:v1.58.0-noble
WORKDIR /test

# Install the application dependencies
COPY package*.json ./
RUN npm install

# Copy in the source code
COPY . ./ 

CMD ["npm", "run", "pw:test"]