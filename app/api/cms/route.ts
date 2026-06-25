import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { initialCmsData } from '@/lib/cms-store';

const filePath = path.join(process.cwd(), 'lib', 'cms-data.json');

async function readCmsFile() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return initialCmsData;
  }
}

export async function GET() {
  try {
    const data = await readCmsFile();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read CMS data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    console.error('Error writing CMS data:', error);
    return NextResponse.json({ error: 'Failed to save changes' }, { status: 500 });
  }
}
