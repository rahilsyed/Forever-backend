"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authUser = (req, res, next) => {
    const { token } = req.headers;
    //   console.log("token"+token)
    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    try {
        const token_decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        //   console.log(token_decode)
        //   console.log("this is token"+(token_decode as JwtPayload).id)
        req.body.userId = token_decode.id;
        console.log(req.body.userId);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
        return;
    }
};
exports.default = authUser;
