# fin_home_assignment

## Run The Service Using `docker-compose`

1. Copy the `.env` file from the email to the base of the service (`./service`)
2. Navigate to the directory that contains the `docker-compose.yml` file in your terminal.
3. Run `docker-compose build` to build the service.
4. Run `docker-compose up` to start the services. Add `-d` to the end of the command to run the services in detached mode.

## Run The Service Locally

1. Copy the `.env` file from the email to the base of the service (`./service`)
2. Install all the dependencies by running `yarn install`.
3. Start the DynamoDB database locally by running `docker-compose up dynamodb`.
4. Finally, start the service by running `yarn start`.
