import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Notification } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/notification")
@Tags("NotificationRoutes")
export default class NotificationCtrl {
  @Post("/")
  create(@Body() data: Notification): Promise<Notification> {
    return notificationService.create(data);
  }
  @Get("/")
  getAll(): Promise<Notification[]> {
    return notificationService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Notification | null> {
    return notificationService.getOne(Number(id));
  }
  @Put("/{id}")
  update(
    @Path() id: string,
    @Body() data: Notification
  ): Promise<Notification> {
    return notificationService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Notification> {
    return notificationService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Notification) {
    return prisma.notification.create({
      data,
    });
  }
  update(id: number, data: Notification) {
    return prisma.notification.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.notification.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.notification.findMany();
  }
  getOne(id: number) {
    return prisma.notification.findUnique({
      where: { id },
    });
  }
}

export const notificationService = new usrSrvc();
