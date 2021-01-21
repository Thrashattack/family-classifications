export default interface IProvider<It, As> {
  provide(request?: It): Promise<As> | As;
}
