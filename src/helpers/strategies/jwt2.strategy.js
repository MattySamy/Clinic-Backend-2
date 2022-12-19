import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { prisma } from '../../index.js';
dotenv.config();
const JWTPatientStrategy = new Strategy({
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async(payload, done) => {
        try {
            const tokenPatient = await prisma.tokenPatient.findUnique({
                where: {
                    id: payload.tokenId,
                },
                include: {
                    user: true,
                    // credit: true,
                },
            });
            if (tokenPatient.user) {
                return done(null, {...tokenPatient.user, tokenId: tokenPatient.id });
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    },
);

export default JWTPatientStrategy;