import passport from 'passport';
import JWTStrategy from '../strategies/jwt.strategy.js';
import JWTPatientStrategy from '../strategies/jwt2.strategy.js';
export default function registerStrategies() {
    passport.use('jwt', JWTStrategy);
    passport.use('jwt2', JWTPatientStrategy);
}