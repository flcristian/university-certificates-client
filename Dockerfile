# Stage 1: Build React App
FROM node:20-alpine AS build

# Create a non-root user
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG USERNAME=aspnet
ARG GROUPNAME=aspnet

# Create group and user
RUN addgroup -g ${GROUP_ID} ${GROUPNAME} \
    && adduser -u ${USER_ID} -G ${GROUPNAME} -s /bin/sh -D ${USERNAME}

# Set working directory
WORKDIR /usr/src/app

# Change ownership of the working directory
RUN chown -R ${USERNAME}:${GROUPNAME} /usr/src/app

# Switch to non-root user
USER ${USERNAME}

# Copy package files and install dependencies
COPY --chown=${USERNAME}:${GROUPNAME} package*.json ./
RUN npm ci

# Copy application files
COPY --chown=${USERNAME}:${GROUPNAME} . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Create a non-root user for Nginx
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG USERNAME=nginx-user
ARG GROUPNAME=nginx-user

# Create group and user
RUN addgroup -g ${GROUP_ID} ${GROUPNAME} \
    && adduser -u ${USER_ID} -G ${GROUPNAME} -s /bin/sh -D ${USERNAME}

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy built React app
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html/

# Adjust permissions
RUN chown -R ${USERNAME}:${GROUPNAME} /usr/share/nginx/html \
    && chown -R ${USERNAME}:${GROUPNAME} /var/cache/nginx \
    && chown -R ${USERNAME}:${GROUPNAME} /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown -R ${USERNAME}:${GROUPNAME} /var/run/nginx.pid

# Switch to non-root user
USER ${USERNAME}

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]