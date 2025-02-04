@echo off
REM Check if .env file exists
if not exist .env (
    echo Copying .env.example to .env...
    copy .env.example .env
    echo.
    echo WARNING: Please configure your .env file before running this script!
    echo.
    exit /b 1
)

REM Load environment variables from .env
for /f "tokens=*" %%a in (.env) do (
    set %%a
)

REM Trim whitespace from variables
set DOCKER_USER=%DOCKER_USER: =%
set COMPOSE_PROJECT_NAME=%COMPOSE_PROJECT_NAME: =%
set USER_ID=%USER_ID: =%
set GROUP_ID=%GROUP_ID: =%
set USERNAME=%USERNAME: =%
set GROUPNAME=%GROUPNAME: =%
set API_PORT=%API_PORT: =%
set CLIENT_PORT=%CLIENT_PORT: =%

REM Construct IMAGE_NAME
set IMAGE_NAME=%DOCKER_USER%/%COMPOSE_PROJECT_NAME%-client

REM Execute docker build with environment variables
docker build --no-cache ^
    --build-arg USER_ID=%USER_ID% ^
    --build-arg GROUP_ID=%GROUP_ID% ^
    --build-arg USERNAME=%USERNAME% ^
    --build-arg GROUPNAME=%GROUPNAME% ^
    -t "%IMAGE_NAME%:latest" .

docker push "%IMAGE_NAME%:latest"
copy .env .deployment\.env

echo Build completed successfully!