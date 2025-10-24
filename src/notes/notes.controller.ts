import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, validateCreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto, validateUpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll() {
    try {
      return await this.notesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error: No se pudo recuperar las notas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.notesService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error: No se pudo recuperar la nota.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: any) {
    const validation = validateCreateNoteDto(body);

    if (!validation.isValid) {
      throw new HttpException(
        { message: 'Validación fallida', errors: validation.errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const createNoteDto: CreateNoteDto = {
        title: body.title,
        description: body.description,
      };

      return await this.notesService.create(createNoteDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear la nota.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const validation = validateUpdateNoteDto(body);

    if (!validation.isValid) {
      throw new HttpException(
        { message: 'Validación fallida.', errors: validation.errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Object.keys(body).length === 0) {
      throw new HttpException(
        { message: 'Se debe proporcionar al menos un campo para la actualización.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const updateNoteDto: UpdateNoteDto = {
        title: body.title,
        description: body.description,
      };

      return await this.notesService.update(id, updateNoteDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error actualizando la nota.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.notesService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al eliminar la nota.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
