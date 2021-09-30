import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';

@ApiTags('Books')
@Controller('books')
@UsePipes(new ValidationPipe({ transform: true }))
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  @Get()
  async findAll(): Promise<BookEntity[]> {
    return await this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  @HttpCode(201)
  create(@Body() book: CreateBookDTO): Promise<Book> {
    return this.bookService.create(book);
  }
}
