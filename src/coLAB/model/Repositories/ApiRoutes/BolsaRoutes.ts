import type { BaseConfig } from "./BaseConfig";

class CargoRoutes {
    protected config: BaseConfig;
    protected name: string;

    constructor(config: BaseConfig) {
        this.config = config;
        this.name = 'bolsa';
    };

    // GET
    get getAll(): string {
        return `${this.name}`;
    };

    // GET by ID
    get getById(): string {
        return `${this.name}/${this.config.id}`;
    };

    // POST
    get post(): string {
        return `${this.name}`;
    };

    // PUT
    get update(): string {
        return `${this.name}/${this.config.id}`;
    };

    // DELETE
    get delete(): string {
        return `${this.name}/${this.config.id}`;
    };
};

export default CargoRoutes;
