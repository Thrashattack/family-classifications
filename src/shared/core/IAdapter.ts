export default interface IAdapter<Output> {
    validate(body: unknown): Output;
}