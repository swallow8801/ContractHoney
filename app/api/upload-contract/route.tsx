import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs'; // 파일 처리용
export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const fileType = formData.get('fileType') as string;

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: 'Missing file information' }, { status: 400 });
    }

    // Azure Blob Storage 연결
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME!);

    // 파일 이름에서 버전 접미사 부분 추출 (ex. test.txt -> test)
    const versionPrefix = fileName.split('.')[0];

    // 기존 파일의 버전 번호 확인
    const existingBlobs = containerClient.listBlobsFlat();
    let maxVersion = 0;

    for await (const blob of existingBlobs) {
      // 기존 파일 이름에 _ver 숫자가 포함된 블롭을 찾아서 버전 번호를 추출
      const match = blob.name.match(new RegExp(`^${versionPrefix}_ver(\\d+)\\.${fileType}$`));
      if (match) {
        const version = parseInt(match[1], 10);
        maxVersion = Math.max(maxVersion, version); // 최대 버전 번호 찾기
      }
    }

    // 새로운 버전 번호 생성 (최대 버전 + 1)
    const newVersion = maxVersion + 1;
    const newFileName = `${versionPrefix}_ver${newVersion}.${fileType}`;  // 예: test_ver1.txt

    // 파일을 Blob으로 업로드
    const blobClient = containerClient.getBlockBlobClient(newFileName);
    const buffer = Buffer.from(await file.arrayBuffer()); // 파일을 Buffer로 변환
    await blobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: fileType }, // MIME 타입 설정
    });

    // DB에 파일 정보 저장
    const [result] = await db.query(
      'INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)',
      [userId, newFileName, fileType, newVersion]
    );

    const contractId = (result as any).insertId;

    await db.query(
      'INSERT INTO contract_postfile (con_id, con_filetype, con_datetype, con_filename) VALUES (?, ?, NOW(), ?)',
      [contractId, fileType, newFileName]
    );

    return NextResponse.json({ contractId: contractId });
  } catch (error) {
    console.error('Error uploading contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
