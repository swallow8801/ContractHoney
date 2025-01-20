import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// 비동기 함수로 DB 연결 설정
export async function createDbConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,  // DB_PORT 환경변수가 설정되지 않으면 기본 포트 3306 사용
  });

  return connection;
}
