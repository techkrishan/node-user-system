import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { findUser } from '../services/user-service.js';


export const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY });
};

export const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};

export const getToken = (req) => {
    const authHeader    = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
};

export const getTokenData = (req) => {
    return verifyToken(getToken(req));
};

export const authUser = (req) => {
    let authData = getTokenData(req);

    if(authData.id) {
        return findUser(authData.id);
    }
    return [];
}