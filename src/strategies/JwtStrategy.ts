import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigEnvService } from '@/modules/config-env/config-env.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configEnvService: ConfigEnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configEnvService.get('JWT_SECRET'),
    });
  }

  validate<T>(payload: T) {
    return {
      payload,
    };
  }
}
