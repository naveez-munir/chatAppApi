import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    const { password, ...result } = user.toObject();
    return result;
  }

  @Post('register/admin')
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createAdmin(createUserDto);
    const { password, ...result } = user.toObject();
    return result;
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    const token = await this.authService.login(user);
    const { password, ...result } = user.toObject();
    return {
      ...result,
      ...token
    };
  }
}
