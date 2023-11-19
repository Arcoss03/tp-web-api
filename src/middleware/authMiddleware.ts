
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const extractToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No authorization token found' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET ?? "" , (err, decoded) => { 
            if (err) {
                return res.status(401).json({ message: 'Invalid authorization token' });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
}

const extractTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No authorization token found' });
    } else {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err, decoded) => { 
            if (err) {
                return res.status(401).json({ message: 'Invalid authorization token' });
            } else {
                res.locals.jwt = decoded;
                
                // Assurez-vous d'ajuster la vérification du rôle selon la structure réelle de votre token
                if (res.locals.jwt.role === 'admin') {
                    // L'utilisateur a le rôle administrateur, continuer vers la route
                    next();
                } else {
                    return res.status(401).json({ message: 'Unauthorized. Admin role required.' });
                }
            }
        });
    }
}
export { extractToken, extractTokenAdmin };
