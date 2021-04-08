import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportcategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportcategoryController(
  importCategoryUseCase
);

export { importCategoryController };
