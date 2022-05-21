import Item from "../../../Domain/Entity/Item";
import ItemRepository from "../../../Domain/Repository/ItemRepository";
import Connection from "../../Database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly connection: Connection) {}

    getAll(params: any): Promise<Item[]> {
        return this.connection.find(params);
    }

    getById(id: string): Promise<Item | undefined> {
        return this.connection.findById(id);
    }

    async save(item: Item): Promise<void> {
        await this.connection.insertOne(item);
    }

    async clean(): Promise<void> {
        await this.connection.deleteMany();
    }
}
