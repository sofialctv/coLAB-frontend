class CargoRoutes {
  private readonly name: string;

  constructor() {
      this.name = 'cargo';
  };

  // GET
  getAll(): string {
    return `${this.name}`;
  };

  // GET by ID
  getById(id: number): string {
    return `${this.name}/${id}`;
  };

  // POST
  post(): string {
    return `${this.name}`;
  };

  // PUT
  update(id: number): string {
    return `${this.name}/${id}`;
  };

  // DELETE
  delete(id: number): string {
    return `${this.name}/${id}`;
  };
};

export default CargoRoutes;
