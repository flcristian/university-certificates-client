# Makefile for Docker Compose management

# Variables
DOCKER_COMPOSE := docker-compose
CLIENT_CONTAINER := ${COMPOSE_PROJECT_NAME:-certificates}-client

# Default target
all: setup

# Compose the Docker containers
setup:
	@echo "Setting up Docker containers..."
	$(DOCKER_COMPOSE) up --force-recreate -d

# Delete the containers and volumes
clean:
	@echo "Cleaning up Docker containers and volumes..."
	$(DOCKER_COMPOSE) down -v

# Help target to display available commands
help:
	@echo "Available commands:"
	@echo "  make setup   - Compose the Docker containers"
	@echo "  make clean   - Delete the containers and volumes"

.PHONY: all setup clean migrate help