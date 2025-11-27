import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  public constructor(private readonly configService: ConfigService) {}

  public getMongoUri(): string {
    return this.configService.getOrThrow<string>('mongodb.uri');
  }

  public getJwtSecret(): string {
    return this.configService.getOrThrow<string>('jwt.secret');
  }

  public getJwtExpiresIn(): string {
    return this.configService.getOrThrow<string>('jwt.signOptions.expiresIn');
  }

  public getAuthServiceHost(): string {
    return this.configService.getOrThrow<string>('auth-service.host');
  }

  public getAuthServicePort(): number {
    return this.configService.getOrThrow<number>('auth-service.port');
  }
}
