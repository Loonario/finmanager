import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
// import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signup(dto: AuthDto) {
    try {
      //password generation
      // const hash = await bcrypt.hash(dto.password, 10);
      const hash = await argon.hash(dto.password);
      const newUser = await this.userRepository.create({
        name: dto.name,
        hash,
      });

      await this.userRepository.save(newUser);
      return this.signToken(newUser.id, newUser.name);
    } catch (err) {
      if (err.code === '23505') {
        throw new ForbiddenException('User with this name already exists');
      }
      throw err;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      name: dto.name,
    });
    if (!user) {
      throw new HttpException('User dnot found', HttpStatus.NOT_FOUND);
    }
    // const pwMatches = await bcrypt.compare(dto.password, user.hash);
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Pasword incorrect');
    }
    return this.signToken(user.id, user.name);
  }

  async signToken(
    userId: string,
    userName: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      userName,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      token: token,
    };
  }
}
