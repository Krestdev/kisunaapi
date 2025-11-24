import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Document } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/document")
@Tags("DocumentRoutes")
export default class DocumentCtrl {
  @Post("/")
  create(@Body() data: Document): Promise<Document> {
    return documentService.create(data);
  }
  @Get("/")
  getAll(): Promise<Document[]> {
    return documentService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Document | null> {
    return documentService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Document): Promise<Document> {
    return documentService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Document> {
    return documentService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Document) {
    return prisma.document.create({
      data,
    });
  }
  update(id: number, data: Document) {
    return prisma.document.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.document.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.document.findMany();
  }
  getOne(id: number) {
    return prisma.document.findUnique({
      where: { id },
    });
  }
}

export const documentService = new usrSrvc();
