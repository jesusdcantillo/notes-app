export class CreateNoteDto {
  title: string;
  description?: string;
}

export function validateCreateNoteDto(data: any): {
  isValid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Título no debe ser vacío y debe ser string.');
  }

  if (data.title && data.title.length > 255) {
    errors.push('Título debe tener menos de 255 caractéres.');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('Descripción debe ser un string.');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
