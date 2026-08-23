import dotenv from 'dotenv';

dotenv.config();

console.log(`URI=`, process.env.MONGO_URI);

const config ={
    MONGO_URI:process.env.MONGO_URI
}

export default config;