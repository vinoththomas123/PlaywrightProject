import {test} from '@playwright/test'
import dotenv from 'dotenv';
//Should call .env data before the test blocks
dotenv.config();

//process.env is different from the CLI options
//CLI options are --headed, --workers, --project 
//We can create .env file and pass the .env as process.env file and read the data 
//npm install --save-dev dotenv - this will include the package
//need to create .env file in the root and we can read it

test("Reading .env file", async ()=>{
    console.log(process.env.BASE_URL);
});

// test("print process env", async({page})=>{
//     console.log(process.env)
// });



