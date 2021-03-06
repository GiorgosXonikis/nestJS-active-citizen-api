import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from './jwt-payload.interface';
import {InjectRepository} from '@nestjs/typeorm';
import * as config from 'config';
import {User} from '../../user/user.entity';
import {UserRepository} from '../../user/user.repository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const email = payload.email;
        const user = await this.userRepository.findOne({email});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
