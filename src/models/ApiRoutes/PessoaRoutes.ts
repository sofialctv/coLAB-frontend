import type { BaseConfig } from './BaseConfig'

class PessoaRoutes {
  protected config: BaseConfig;
  protected name: string;

  constructor(config: BaseConfig) {
    this.config = config;
    this.name = 'pessoa';
  };

  // GET
  get getAll(): string {
    return `${this.name}`
  };

  // GET by ID
  get getById(): string {
    return `${this.name}/${this.config.id}`
  };

  // POST
  get post(): string {
    return `${this.name}`
  };

  // PUT
  get update(): string {
    return `${this.name}/${this.config.id}`
  };

  // DELETE
  get delete(): string {
    return `${this.name}/${this.config.id}`
  };
};

export default PessoaRoutes;
