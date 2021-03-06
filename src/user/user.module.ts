import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserRepository} from './user.repository';
import {AuthModule} from '../auth/auth.module';
import {TokenModule} from '../token/token.module';


@Module({
    imports: [
        AuthModule,
        TokenModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        UserRepository,
    ],
    exports: [
        UserService
    ]
})
export class UserModule {
}
