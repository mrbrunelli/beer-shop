import Ingredients from "../../../Domain/Entity/Ingredients";
import Item from "../../../Domain/Entity/Item";
import ItemRepository from "../../../Domain/Repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor() {
        this.items = [
            new Item(
                "6c9c3de0-94ef-4526-b525-5b02ea4b6811",
                "Spaten",
                4.98,
                355,
                5.2,
                new Ingredients("água", "malte", "lúpulo")
            ),
            new Item(
                "ab2f1fa3-4179-4ae0-b424-7680e1542a5e",
                "Budweiser",
                5.22,
                355,
                4.8,
                new Ingredients("água", "malte", "arroz", "lúpulo")
            ),
            new Item(
                "368237a2-650d-4058-93b1-8c69845ddecc",
                "Heineken",
                5.9,
                355,
                5.0,
                new Ingredients("água", "malte", "lúpulo")
            ),
        ];
    }

    async getAll(): Promise<Item[]> {
        return this.items;
    }

    async getById(id: string): Promise<Item | undefined> {
        return this.items.find((item) => item.id === id);
    }

    async save(item: Item): Promise<void> {
        this.items.push(item);
    }

    async clean(): Promise<void> {
        this.items = [];
    }
}
