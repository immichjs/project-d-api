import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class CryptService {
  public encrypt(data: string | Buffer, salt: number = 10): string {
    return hashSync(data, salt);
  }

  public decrypt(data: string | Buffer, encrypted: string): boolean {
    return compareSync(data, encrypted);
  }
}
