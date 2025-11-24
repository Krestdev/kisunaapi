import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { User } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/user")
@Tags("UserRoutes")
export default class UserCtrl {
  @Post("/")
  create(@Body() data: User): Promise<User> {
    return userService.create(data);
  }
  @Get("/")
  getAll(): Promise<User[]> {
    return userService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<User | null> {
    return userService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: User): Promise<User> {
    return userService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<User> {
    return userService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: User) {
    return prisma.user.create({
      data,
    });
  }
  update(id: number, data: User) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.user.findMany();
  }
  getOne(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}

export const userService = new usrSrvc();
