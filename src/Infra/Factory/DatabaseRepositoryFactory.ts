import RepositoryFactory from "../../Domain/Factory/RepositoryFactory";
import ItemRepository from "../../Domain/Repository/ItemRepository";
import Connection from "../Database/Connection";
import ItemRepositoryDatabase from "../Repository/Database/ItemRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    constructor(readonly connection: Connection) {}

    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection);
    }
}
