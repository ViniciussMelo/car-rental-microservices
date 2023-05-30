## Description

> This repository is responsible for provides endpoints for:
> - Provides endpoints detailed to get information of rentals by user and by car;
> - Listens for ```api.rental``` topics to consume the rental information.
> 
> This application has its own database to save users and rentals information.

## Installation
> Install the dependencies with the following command:
> ```
> nmp install
> ```

## Run
> We are using prisma, so we need to push/create the database tables:
>
> ```
> npx prisma db push
> ```
>
> After that we need to generate prisma models with:
>
> ```
> npx prisma generate
> ```
>
> Before you run the application, you need to create a .env file and provide the environment values, by copying the .env.example and provide the values.
>
>
> After provide the environments values, just start the application with:
> ```
> nmp run start
>
> or
>
> npm run start:dev
> ```
>