export class UpdateNoteDto {
  title?: string;
  description?: string;
}

export function validateUpdateNoteDto(data: any): {
  isValid: boolean;
  errors?: string[];
} {
  const errors: string[] = [];

  if (data.title !== undefined) {
    if (typeof data.title !== 'string') {
      errors.push('Título debe ser un string.');
    }
    if (data.title.length > 255) {
      errors.push('Título debe tener menos de 255 caractéres.');
    }
    if (data.title.length === 0) {
      errors.push('Título no puede ser vacío.');
    }
  }

  if (data.description !== undefined && typeof data.description !== 'string') {
    errors.push('Deswcripción debe ser un string.');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
