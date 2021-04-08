import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportcategoryController {
  constructor(private importUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importUseCase.execute(file);

    return response.send();
  }
}

export { ImportcategoryController };
