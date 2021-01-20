export default interface IRepository<IModel, IDType> {
  findAll(page?: number, size?: number): IModel[] | Promise<IModel>[];

  findOne(id: IDType): IModel | Promise<IModel>;

  saveOne(entity: IModel): IModel | Promise<IModel>;

  saveAll(entities: IModel[]): IModel[] | Promise<IModel>[];

  updateOne(id: IDType, entity: IModel): IModel | Promise<IModel>;

  updateAll(
    entities: { id: IDType; entity: IModel }[],
  ): IModel[] | Promise<IModel>[];

  deleteOne(id: IDType): IModel | Promise<IModel>;

  deleteAll(ids: IDType[]): IModel[] | Promise<IModel>[];
}
