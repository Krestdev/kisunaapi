import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Presence } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/presence")
@Tags("PresenceRoutes")
export default class PresenceCtrl {
  @Post("/")
  create(@Body() data: Presence): Promise<Presence> {
    return presenceService.create(data);
  }
  @Get("/")
  getAll(): Promise<Presence[]> {
    return presenceService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Presence | null> {
    return presenceService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Presence): Promise<Presence> {
    return presenceService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Presence> {
    return presenceService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Presence) {
    return prisma.presence.create({
      data,
    });
  }
  update(id: number, data: Presence) {
    return prisma.presence.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.presence.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.presence.findMany();
  }
  getOne(id: number) {
    return prisma.presence.findUnique({
      where: { id },
    });
  }
}

export const presenceService = new usrSrvc();
