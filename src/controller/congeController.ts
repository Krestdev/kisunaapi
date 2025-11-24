import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Conge } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/conge")
@Tags("CongeRoutes")
export default class CongeCtrl {
  @Post("/")
  create(@Body() data: Conge): Promise<Conge> {
    return congeService.create(data);
  }
  @Get("/")
  getAll(): Promise<Conge[]> {
    return congeService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Conge | null> {
    return congeService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Conge): Promise<Conge> {
    return congeService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Conge> {
    return congeService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Conge) {
    return prisma.conge.create({
      data,
    });
  }
  update(id: number, data: Conge) {
    return prisma.conge.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.conge.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.conge.findMany();
  }
  getOne(id: number) {
    return prisma.conge.findUnique({
      where: { id },
    });
  }
}

export const congeService = new usrSrvc();
