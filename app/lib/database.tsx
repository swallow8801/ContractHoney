import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

// Azure에서 설정한 연결 문자열 환경 변수 사용
const connectionString = process.env.AZURE_MYSQL_CONNECTIONSTRING;

if (connectionString) {
  const { Database, Server, UserId, Password } = connectionString.split(';').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  // MySQL 연결 설정
  const db = await mysql.createConnection({
    host: Server,
    user: UserId,
    password: Password,
    database: Database,
  });

  console.log('MySQL connected successfully!');
} else {
  console.error('Connection string not found!');
}
