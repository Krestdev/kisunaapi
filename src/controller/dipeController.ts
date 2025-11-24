import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Dipe } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/dipe")
@Tags("DipeRoutes")
export default class DipeCtrl {
  @Post("/")
  create(@Body() data: Dipe): Promise<Dipe> {
    return dipeService.create(data);
  }
  @Get("/")
  getAll(): Promise<Dipe[]> {
    return dipeService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Dipe | null> {
    return dipeService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Dipe): Promise<Dipe> {
    return dipeService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Dipe> {
    return dipeService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Dipe) {
    return prisma.dipe.create({
      data,
    });
  }
  update(id: number, data: Dipe) {
    return prisma.dipe.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.dipe.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.dipe.findMany();
  }
  getOne(id: number) {
    return prisma.dipe.findUnique({
      where: { id },
    });
  }
}

export const dipeService = new usrSrvc();
