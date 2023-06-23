import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiKeyService;

  // constructor(private readonly configService: ConfigService) {
  //   this.apiKeyService = ConfigService.get('API_KEY');
  // }
}
