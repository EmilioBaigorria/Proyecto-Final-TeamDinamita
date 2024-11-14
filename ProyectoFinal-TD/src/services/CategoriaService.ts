import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "./BackendClient";

export class CategoriaService extends BackendClient<ICreateCategoria | ICategorias | IUpdateCategoria>{}