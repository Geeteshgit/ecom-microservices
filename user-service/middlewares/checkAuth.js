import jwt from "jsonwebtoken";
import { env } from "../lib/env.js";
import { User } from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({ message: "Not Authorized" });

        const decoded = jwt.verify(token, env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        return next();
    } catch (err) {
        console.error("Error validating token: ", err);
        return res.status(401).json({ message: "Error validating token" });
    }
}

export const restrictTo = (role) => {
    return (req, res, next) =>  {
        if(role !== req.user.role) {
            return res.status(401).json({ message: "Access Denied: Unauthorized" });
        }
        next();
    }
}