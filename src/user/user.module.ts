import { Module } from '@nestjs/common';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
