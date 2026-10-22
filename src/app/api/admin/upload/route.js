import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Public endpoint (quote form uses it too) — only accept design/media files, never html/js
const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg', '.pdf', '.ai', '.eps', '.psd', '.zip', '.doc', '.docx', '.xls', '.xlsx', '.mp4', '.webm', '.mov'];
const MAX_IMAGE_MB = 20;
const MAX_VIDEO_MB = 100;
const VIDEO_EXT = ['.mp4', '.webm', '.mov'];

function saveLocally(buffer, fileName) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(fileName || '').toLowerCase() || '.png';
  const cleanFileName = `file-${uniqueSuffix}${ext}`;
  const filePath = path.join(uploadDir, cleanFileName);

  fs.writeFileSync(filePath, buffer);

  return {
    success: true,
    url: `/uploads/${cleanFileName}`,
    fileName: fileName,
    isFallback: true,
  };
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = path.extname(file.name || '').toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json({ error: `File type ${ext || '(none)'} is not allowed` }, { status: 400 });
    }
    const maxMb = VIDEO_EXT.includes(ext) ? MAX_VIDEO_MB : MAX_IMAGE_MB;
    if (file.size > maxMb * 1024 * 1024) {
      return NextResponse.json({ error: `File is larger than ${maxMb}MB` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Check if Cloudinary credentials are fully defined
    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = 'fast-apparel';

        // Generate SHA1 signature required by Cloudinary
        const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

        // Construct form data payload for Cloudinary API
        const cloudinaryForm = new FormData();
        const fileBlob = new Blob([buffer]);
        cloudinaryForm.append('file', fileBlob, file.name || 'upload.png');
        cloudinaryForm.append('api_key', apiKey);
        cloudinaryForm.append('timestamp', timestamp.toString());
        cloudinaryForm.append('signature', signature);
        cloudinaryForm.append('folder', folder);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: cloudinaryForm,
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            success: true,
            url: data.secure_url,
            fileName: file.name,
          });
        }

        const errorText = await response.text();
        console.warn('Cloudinary upload warning (falling back to local storage):', errorText);
      } catch (cloudErr) {
        console.warn('Cloudinary upload error (falling back to local storage):', cloudErr.message);
      }
    }

    // Fallback: Save file locally in public/uploads folder
    const localResult = saveLocally(buffer, file.name);
    return NextResponse.json(localResult);
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}
