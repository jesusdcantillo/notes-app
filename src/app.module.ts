import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, NotesModule],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
