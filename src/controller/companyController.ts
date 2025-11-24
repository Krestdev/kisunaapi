import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Company } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
@Route("/company")
@Tags("CompanyRoutes")
export default class CompanyCtrl {
  @Post("/")
  create(@Body() data: Company): Promise<Company> {
    return companyService.create(data);
  }
  @Get("/")
  getAll(): Promise<Company[]> {
    return companyService.getAll();
  }
  @Get("/{id}")
  getOne(@Path() id: string): Promise<Company | null> {
    return companyService.getOne(Number(id));
  }
  @Put("/{id}")
  update(@Path() id: string, @Body() data: Company): Promise<Company> {
    return companyService.update(Number(id), data);
  }
  @Delete("/{id}")
  delete(@Path() id: string): Promise<Company> {
    return companyService.delete(Number(id));
  }
}

class usrSrvc {
  create(data: Company) {
    return prisma.company.create({
      data,
    });
  }
  update(id: number, data: Company) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }
  delete(id: number) {
    return prisma.company.delete({
      where: { id },
    });
  }
  getAll() {
    return prisma.company.findMany();
  }
  getOne(id: number) {
    return prisma.company.findUnique({
      where: { id },
    });
  }
}

export const companyService = new usrSrvc();
