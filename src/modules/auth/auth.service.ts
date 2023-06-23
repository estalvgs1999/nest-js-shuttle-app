import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiKeyService;

  constructor(private readonly configService: ConfigService) {
    this.apiKeyService = configService.get('apiKey');
  }

  public validateApiKey(apiKey: string): boolean {
    return apiKey === this.apiKeyService;
  }
}
