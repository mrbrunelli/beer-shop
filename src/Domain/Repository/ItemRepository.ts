import Item from "../Entity/Item";

export default interface ItemRepository {
    getAll(): Promise<Item[]>;
    getById(id: string): Promise<Item | undefined>;
    save(item: Item): Promise<void>;
    clean(): Promise<void>;
}
