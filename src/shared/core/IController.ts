export default interface IController<IRequest, IResponse> {
  post(req: IRequest, res: IResponse): Promise<IResponse>;
  put(req: IRequest, res: IResponse): Promise<IResponse>;
  get(req: IRequest, res: IResponse): Promise<IResponse>;
  patch(req: IRequest, res: IResponse): Promise<IResponse>;
  delete(req: IRequest, res: IResponse): Promise<IResponse>;
}
