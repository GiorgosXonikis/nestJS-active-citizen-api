import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {User} from './user.entity';
import {ChangePasswordDto} from '../dto/change-password.dto';
import {AuthService} from '../auth.service';
import {extractUserProfile} from './helper';
import {ChangeUserProfileDto} from '../dto/change-user-profile.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
                private authService: AuthService) {
    }

    async getUserProfile(user: User): Promise<Partial<User>> {
        return extractUserProfile(user);
    }

    async changeUserProfile(user: User, changeUserProfileDto: ChangeUserProfileDto): Promise<Partial<User>> {
        Object.assign(user, changeUserProfileDto);
        await this.userRepository.saveUser(user)
        return extractUserProfile(user);
    }

    async changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<Partial<User>> {
        if (changePasswordDto.newPassword !== changePasswordDto.passwordRepeat) {
            throw new BadRequestException('Passwords do not match');
        }

        const isPasswordValid = await this.authService.isPasswordValid(changePasswordDto.password, user.password, user.salt);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        user.password = await this.authService.hashPassword(changePasswordDto.newPassword, user.salt);
        await this.userRepository.saveUser(user);

        return extractUserProfile(user);
    };
    
}
