abstract class Product {
  public abstract use(): void;
}

abstract class Factory {
  public create = (owner: string): Product => {
    const p: Product = this.createProduct(owner);
    this.registerProduct(p);
    return p;
  };

  protected abstract createProduct(owner: string): Product;
  // protected createProduct = (owner: string): Product => {
  //   return new Product(owner);
  // };

  protected abstract registerProduct(product: Product): void;
}

class IDCard extends Product {
  private owner: string;

  constructor(owner: string) {
    super();
    console.log(`${owner}의 카드를 만듭니다.`);
    this.owner = owner;
  }

  public use = (): void => {
    console.log(`${this.owner}의 카드를 사용합니다.`);
  };

  public getOwner = (): string => {
    return this.owner;
  };
}

class IDCardFactory extends Factory {
  private owners: string[] = [];

  protected createProduct = (owner: string): Product => {
    return new IDCard(owner);
  };

  protected registerProduct = (product: Product): void => {
    this.owners.push((product as IDCard).getOwner());
  };

  public getOwners = (): string[] => {
    return this.owners;
  };
}

class Main {
  main = () => {
    const factory: Factory = new IDCardFactory();
    const card1: Product = factory.create('김철수');
    const card2: Product = factory.create('김철수');
    const card3: Product = factory.create('김철수');
    card1.use();
    card2.use();
    card3.use();
  };
}
