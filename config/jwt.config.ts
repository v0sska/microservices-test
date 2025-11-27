import { registerAs } from '@nestjs/config';

export default function getJwtConfig() {
  return registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
    },
  }));
}
