import Item from "@/Domain/Entity/Item";

export default interface ItemRepository {
    getAll(params?: any): Promise<Item[]>;
    getById(id: string): Promise<Item | undefined>;
    save(item: Item): Promise<void>;
    clean(): Promise<void>;
}
