import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Role } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/role")
@Tags("RoleRoutes")
export default class RoleCtrl {
  @Post("/")
  create(@Body() data: Role): Promise<Role> {
    return roleService.create(data);
  }
  @Get("/")
  getAll(): Promise<Role[]> {
    return roleService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Role | null> {
    return roleService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Role): Promise<Role> {
    return roleService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Role> {
    return roleService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Role) {
    return prisma.role.create({
      data,
    });
  }
  update(id: number, data: Role) {
    return prisma.role.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.role.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.role.findMany();
  }
  getOne(id: number) {
    return prisma.role.findUnique({
      where: { id },
    });
  }
}

export const roleService = new usrSrvc();
