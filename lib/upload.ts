import { put, del } from '@vercel/blob';
import { randomBytes } from 'crypto';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export interface UploadResult {
  url: string;
  filename: string;
}

export interface UploadError {
  error: string;
}

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.';
  }

  if (file.size > MAX_FILE_SIZE) {
    return `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`;
  }

  return null;
}

export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = randomBytes(8).toString('hex');
  const extension = originalName.split('.').pop() || 'jpg';
  return `${timestamp}-${randomString}.${extension}`;
}

export async function saveUploadedFile(
  file: File
): Promise<UploadResult | UploadError> {
  try {
    // Validação
    const validationError = validateFile(file);
    if (validationError) {
      return { error: validationError };
    }

    // Gera nome único
    const filename = generateFilename(file.name);

    // Prepara arquivo para upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload para Vercel Blob
    const blob = await put(`news/${filename}`, buffer, {
      access: 'public',
      contentType: file.type,
    });

    return {
      url: blob.url,
      filename: filename,
    };
  } catch (error) {
    console.error('Blob upload error:', error);
    return { error: 'Erro ao fazer upload do arquivo' };
  }
}

// Função para deletar arquivo do Vercel Blob
export async function deleteUploadedFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Blob delete error:', error);
    throw error;
  }
}
