# Car Rental Microservices

## Description
> - This project was created to consolidate my knowledge about Nest.js + Microservice architecture;
> - Intended to be a simple car rental project.
> This project is divided into three microservices and one api gateway;
> - api-gateway: 
>> - Acts as a single entry point for client requests;
>> - Responsible for authenticate and unify the ```api.consumer``` and ```api.rental``` into one URL.
> - api.authentication:
>> - Responsible for the authentication and creation of JWT tokens;
>> - Provides endpoints for user registration, login, and token generation;
> - api.consumer:
>> - Provides endpoints detailed to get information of rentals by user and by car;
>> - Listens for ```api.rental``` topics to consume the rental information.
> - api.rental:
>> - Contains business logic and endpoints related to renting services;
>> - Provides endpoints for managing rental listings, creating reservations, and handling rental-related operations;
>> - Publish on kafka to ```api.consumer``` process and consumer the data.

## Requirements

> - **Node** with version equal or higher than 18 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** with version equal or higher than 9 - [Npm Download](https://www.npmjs.com/package/download)
> - **Git** with version equal or higher than 2.25.1 - [Git Donwload](https://git-scm.com/downloads)
> - **Docker** with version equal or higher than 20.10.21 - [Docker download](https://docs.docker.com/get-docker/)
> - **Docker-compose** with version equal or higher than 1.25.0 - [Docker compose download](https://docs.docker.com/compose/install/)

## Installation
> Clone this project in your computer with the command:
> ```
> 	git clone https://github.com/ViniciussMelo/car-rental-microservices.git
> ```
> The docker-compose.yml is configured to provide a interface to manage kafka on ```http://localhost:8080/``` , so to Run the kafka service locally use this command:
> ```
> 	docker-compose up
> ```
> The next steps to run the microservices are inside their respective folders.