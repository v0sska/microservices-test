import { registerAs } from '@nestjs/config';

export default function getAuthConfig() {
  return registerAs('auth-service', () => ({
    host: process.env.AUTH_HOST || 'localhost',
    port: parseInt(process.env.AUTH_PORT ?? '4001', 10) || 4001,
  }));
}
