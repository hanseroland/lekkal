import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: procces.env.PORT || 5000,
    MONGODB_URL: procces.env.MONGODB_URL || 'mongodb+srv://parfaitcarree:parfaitcarree@clusterlekkal.ce8cl.mongodb.net/test',
    JWT_SECRET: procces.env.JWT_SECRET || 'somethingsecret',
    DB_USER_PASS: proccess.env.DB_USER_PASS || 'parfaitcarree'
}; 