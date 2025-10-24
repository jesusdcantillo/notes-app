import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.note.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`Nota con ID ${id} no fue encontrada.`);
    }

    return note;
  }

  async create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: createNoteDto,
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);

    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.note.delete({
      where: { id },
    });
  }
}
