import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDTO {
  @ApiProperty({
    description: 'Book name',
    example: 'My book',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Book isbn',
    example: '1234567890',
  })
  @IsNotEmpty()
  readonly isbn: string;
}
