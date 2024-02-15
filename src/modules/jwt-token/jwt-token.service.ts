import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  [key: string]: string;
}

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get('jwt_secret'),
        expiresIn: this.configService.get('jwt_expires'),
      },
    );
  }
}
