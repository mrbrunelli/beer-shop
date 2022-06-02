import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ItemRepository from "@/Domain/Repository/ItemRepository";
import GetItemOutput from "@/Application/UseCase/GetItem/GetItemOutput";

export default class GetItem {
    itemRepository: ItemRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute(id: string): Promise<GetItemOutput> {
        const item = await this.itemRepository.getById(id);

        if (!item) {
            throw new Error("Item not Found");
        }

        const output = new GetItemOutput(item.id, item.description, item.price);
        return output;
    }
}
