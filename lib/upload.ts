import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'news');
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
  // Validação
  const validationError = validateFile(file);
  if (validationError) {
    return { error: validationError };
  }

  // Garante que o diretório existe
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }

  // Gera nome único
  const filename = generateFilename(file.name);
  const filePath = join(UPLOAD_DIR, filename);

  // Salva arquivo
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(filePath, buffer);

  return {
    url: `/uploads/news/${filename}`,
    filename,
  };
}

// Opcional: Função para deletar arquivo
export async function deleteUploadedFile(filename: string): Promise<void> {
  const filePath = join(UPLOAD_DIR, filename);
  const { unlink } = await import('fs/promises');
  await unlink(filePath);
}
