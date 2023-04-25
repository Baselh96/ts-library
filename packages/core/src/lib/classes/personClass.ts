export class PersonClass {
  private name: string;
  private bootstrapVersion;

  constructor(name: string) {
    this.name = name;
    try {
      const bsv = bootstrap.Tooltip.VERSION.substr(0, 1);

      this.bootstrapVersion = parseInt(bsv);
    } catch (error) {
      this.bootstrapVersion = 0;
    }
  }

  public getName(): string {
    return this.name;
  }
}
