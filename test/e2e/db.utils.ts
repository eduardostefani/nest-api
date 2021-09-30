import { getConnection } from 'typeorm';
import { BookEntity } from '../../src/book/book.entity';

const getRepository = async () => {
  const connection = await getConnection();
  return await connection.getRepository(BookEntity);
};

const initializeDatabase = async () => {
  const repository = await getRepository();
  await repository.save({ name: 'My Book', isbn: '95454546' });
  return;
};

export { initializeDatabase };
