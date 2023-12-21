# Clothize App API

For API Documentation, check /docs folder

# How to Run the API guide

Clone the repository

    git clone https://github.com/Clothize-App-Bangkit-Capstone-Project/Clothize-CC.git

Switch to repo folder

    cd Clothize-CC

Install all the dependencies.

    npm install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Migrate the Prisma migration

    npx prisma migrate dev

Start the local development server

    npm start
