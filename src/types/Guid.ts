export type Guid = string & { readonly __brand: "Guid" };
export function createGuid(): Guid {
    return crypto.randomUUID() as Guid;
}