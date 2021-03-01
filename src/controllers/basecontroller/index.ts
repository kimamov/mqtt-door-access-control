import { Repository } from "typeorm";

export default abstract class BaseController<T> {
    protected readonly service: Repository<T>;
    constructor(service: Repository<T>) {
        this.service = service;
    }

}