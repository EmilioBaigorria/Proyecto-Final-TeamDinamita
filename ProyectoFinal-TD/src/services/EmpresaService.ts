import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { BackendClient } from "./BackendClient";

export class EmpresaService extends BackendClient<IEmpresa> {}
