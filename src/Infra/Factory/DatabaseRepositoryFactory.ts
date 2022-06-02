import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ItemRepository from "@/Domain/Repository/ItemRepository";
import Connection from "@/Infra/Database/Connection";
import ItemRepositoryDatabase from "@/Infra/Repository/Database/ItemRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    constructor(readonly connection: Connection) {}

    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(this.connection);
    }
}
