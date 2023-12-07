#!/bin/bash

show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -h, --help         Display this help message"
    echo "  -i, --install      Clean and Install the backend source using Maven before starting containers"
    echo "  -b, --build        Build new images and Start Docker containers using Docker Compose"
    exit 0
}

INSTALL=false
BUILD=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            ;;
        -b|--build)
            BUILD=true
            shift
            ;;
        -i|--install)
            INSTALL=true
            shift
            ;;
        *)
            echo "Error: Unknown option: $1"
            show_help
            ;;
    esac
done

if [ "$INSTALL" = true ]; then
    cd backend
    mvn clean install -DskipTests
    cd ..
fi

if [ "$BUILD" = true ]; then
  docker-compose up --build
else
  docker-compose up
fi
