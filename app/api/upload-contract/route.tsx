import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

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
    const contractId = formData.get('contractId') as string | null;
    const version = formData.get('version') as string | null;

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: 'Missing file information' }, { status: 400 });
    }

    // Here you would typically upload the file to a storage service
    // TODO: Implement actual file upload logic
    console.log(`File ${fileName} of type ${fileType} would be uploaded here.`);

    let newContractId: number;

    if (contractId) {
      // Fetch the existing contract information
      const [existingContract] = await db.query(
        'SELECT con_title, con_type, con_version FROM contract WHERE con_id = ? AND user_id = ?',
        [parseInt(contractId), userId]
      );

      if (existingContract.length === 0) {
        return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
      }

      const { con_title, con_type, con_version } = existingContract[0];

      // Insert new version of the contract
      const [result] = await db.query(
        'INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)',
        [userId, con_title, con_type, con_version + 1]
      );
      newContractId = (result as any).insertId;
    } else {
      // Insert new contract
      const [result] = await db.query(
        'INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)',
        [userId, fileName, fileType, 1]
      );
      newContractId = (result as any).insertId;
    }

    await db.query(
      'INSERT INTO contract_postfile (con_id, con_filetype, con_datetype, con_filename) VALUES (?, ?, NOW(), ?)',
      [newContractId, fileType, fileName]
    );

    return NextResponse.json({ contractId: newContractId });
  } catch (error) {
    console.error('Error uploading contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

