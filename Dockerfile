FROM node:6.9.0

WORKDIR /src

# Copy app source
COPY . /src

# Install packages
RUN apt-get update && \
 apt-get install -y net-tools && \
 apt-get clean && \
 rm -rf /var/lib/apt/lists/*

# Install dev dependencies
RUN npm install


ENV PORT 3000
ENV CLIENT_ID ''
ENV CLIENT_SECRET ''
ENV REDIRECT_URI ''
ENV ACCESS_TOKEN ''

# Expose port
EXPOSE $PORT

# Enable corbel-composr
CMD npm start
