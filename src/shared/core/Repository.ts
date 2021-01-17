export default interface Service<Model, IDType> {
  findAll(page?: number, size?: number): Model[];

  findOne(id: IDType): Model[];

  saveOne(entity: Model): Model;

  saveAll(entities: Model[]): Model[];

  updateOne(id: IDType, entity: Model): Model;

  updateAll(entities: { id: IDType; entity: Model }[]): Model[];

  deleteOne(id: IDType): Model;

  deleteAll(ids: IDType[]): Model[];
}
