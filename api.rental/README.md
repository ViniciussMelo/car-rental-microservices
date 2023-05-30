## Description

> This repository is responsible for:
> - Contains business logic and endpoints related to renting services;;
> - Provides endpoints for managing rental listings, creating reservations, and handling rental-related operations;
> - Publish on kafka to ```api.consumer``` process and consumer the data.
> 
> This application has its own database to save users and rentals information.

## Installation
> Install the dependencies with the following command:
> ```
> nmp install
> ```

## Run
> Before you run the application, you need to create a .env file and provide the environment values, by copying the .env.example and provide the values.
>
> After provide the environments values, just start the application with:
> ```
> nmp run start
>
> or
>
> npm run start:dev
> ```