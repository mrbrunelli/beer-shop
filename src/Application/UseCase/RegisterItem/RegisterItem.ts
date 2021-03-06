import Item from "@/Domain/Entity/Item";
import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ItemRepository from "@/Domain/Repository/ItemRepository";
import ObjectIdGenerator from "@/Application/Protocols/ObjectIdGenerator";
import RegisterItemInput from "@/Application/UseCase/RegisterItem/RegisterItemInput";
import RegisterItemOutput from "@/Application/UseCase/RegisterItem/RegisterItemOutput";

export default class RegisterItem {
    itemRepository: ItemRepository;

    constructor(readonly repositoryFactory: RepositoryFactory, readonly objectIdGenerator: ObjectIdGenerator) {
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute(input: RegisterItemInput): Promise<RegisterItemOutput> {
        const id = this.objectIdGenerator.generate();

        const item = new Item(id, input.description, input.price, input.size, input.abv, input.ingredients);
        await this.itemRepository.save(item);

        const output = new RegisterItemOutput(id);
        return output;
    }
}
