import { ApiProperty } from '@nestjs/swagger';

export class ResponseMapper<T> {
  @ApiProperty()
  data: T;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: '2024-01-27T10:30:00.000Z' })
  timestamp: string;

  constructor(data: T, statusCode: number = 200) {
    this.data = data;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}
