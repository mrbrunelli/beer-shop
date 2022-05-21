import Item from "../../../Domain/Entity/Item";
import ItemRepository from "../../../Domain/Repository/ItemRepository";
import Connection from "../../Database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly connection: Connection) {}

    getAll(): Promise<Item[]> {
        throw new Error("Method not implemented.");
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
