import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigEnvService } from '@/modules/config-env/config-env.service';

export interface JwtPayload {
  [key: string]: string;
}

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configEnvService: ConfigEnvService,
  ) {}

  async generateJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(
      { ...payload },
      {
        secret: this.configEnvService.get('JWT_SECRET'),
        expiresIn: this.configEnvService.get('JWT_EXPIRES'),
      },
    );
  }
}
