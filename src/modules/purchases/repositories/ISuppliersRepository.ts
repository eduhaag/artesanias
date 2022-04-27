import { ISupplierDTO } from '../dtos/ISupplierDTO';
import { Supplier } from '../infra/typeorm/entities/Supplier';

interface ISuppliersRepository {
  createSupplier({
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<Supplier>;
  updateSupplier({
    id,
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<void>;
  listAllSuppliers(): Promise<Supplier[]>;
  getSupplierById(id: string): Promise<Supplier>;
  getSupplierByTaxCode(taxCode: string): Promise<Supplier>;
}

export { ISuppliersRepository };
