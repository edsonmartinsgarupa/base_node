export default class Product {
  #uid: string;

  public get uid(): string {
    return this.#uid;
  }

  #category: string;

  public get category(): string {
    return this.#category;
  }

  #name: string;

  public get name(): string {
    return this.#name;
  }

  #price: number;

  public get price(): number {
    return this.#price;
  }

  private constructor(
    uid: string,
    category: string,
    name: string,
    price: number
  ) {
    this.#uid = uid;
    this.#category = category;
    this.#name = name;
    this.#price = price;
  }

  public static create(
    uid: string,
    category: string,
    name: string,
    price: number
  ): Product {
    const product = new Product(uid, category, name, price);

    return product;
  }
}
