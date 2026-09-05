import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI)  {
    throw new Error("MONGO URI Is Not Defined")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined")
}
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined")
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined")
}
if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined")
}
if(!process.env.GOOGLE_USER){
    throw new Error("GOOGLE_USER is not defined")
}
if(!process.env.AWS_ACCESS_KEY_ID){
    throw new Error("AWS_ACCESS_KEY_ID is not defined")
}
if(!process.env.AWS_SECRET_ACCESS_KEY){
    throw new Error ("AWS_SECRET_ACCESS_KEY is not defined")
}
if(!process.env.AWS_REGION){
    throw new Error("AWS_REGION is not defined")
}
const config ={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER:process.env.GOOGLE_USER,
    AWS_REGION:process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME


}
export default config;