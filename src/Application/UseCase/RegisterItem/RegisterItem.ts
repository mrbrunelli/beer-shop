import crypto from "node:crypto";
import Item from "../../../Domain/Entity/Item";
import RepositoryFactory from "../../../Domain/Factory/RepositoryFactory";
import ItemRepository from "../../../Domain/Repository/ItemRepository";
import RegisterItemInput from "./RegisterItemInput";
import RegisterItemOutput from "./RegisterItemOutput";

export default class RegisterItem {
    itemRepository: ItemRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute(input: RegisterItemInput): Promise<RegisterItemOutput> {
        const id = crypto.randomUUID();

        const item = new Item(id, input.description, input.price, input.size, input.abv, input.ingredients);
        await this.itemRepository.save(item);

        const output = new RegisterItemOutput(id);
        return output;
    }
}
