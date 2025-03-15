export interface ImageValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  preview?: string;
}

export async function validateAndPreviewImage(
  file: File,
  options: ImageValidationOptions = {}
): Promise<ImageValidationResult> {
  const { maxSizeInMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'] } = options;

  // Check file size
  if (file.size > maxSizeInMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `이미지 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.`,
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `지원하지 않는 파일 형식입니다. (${allowedTypes.join(', ')})`,
    };
  }

  // Create preview URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        isValid: true,
        preview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  });
}

export function generateImageFileName(originalName: string): string {
  const fileExt = originalName.split('.').pop();
  return `${Date.now()}.${fileExt}`;
}
