import { cleanEnv, str } from 'envalid';


const validateEnv = () => {
    cleanEnv(process.env, {
        MONGODB_URI: str(),
        NODE_ENV: str({ choices: ['development', 'production'] })
    });
};

export default validateEnv;
