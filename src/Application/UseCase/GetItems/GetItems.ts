import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ItemRepository from "@/Domain/Repository/ItemRepository";
import GetItemsOutput from "@/Application/UseCase/GetItems/GetItemsOutput";

export default class GetItems {
    itemRepository: ItemRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
    }

    async execute(): Promise<GetItemsOutput[]> {
        const items = await this.itemRepository.getAll();
        const output: GetItemsOutput[] = [];

        for (const item of items) {
            output.push(new GetItemsOutput(item.id, item.description, item.price));
        }

        return output;
    }
}
