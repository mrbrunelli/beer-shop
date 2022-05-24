import GetItem from "../../Application/UseCase/GetItem/GetItem";
import GetItemOutput from "../../Application/UseCase/GetItem/GetItemOutput";
import GetItems from "../../Application/UseCase/GetItems/GetItems";
import GetItemsOutput from "../../Application/UseCase/GetItems/GetItemsOutput";
import RepositoryFactory from "../../Domain/Factory/RepositoryFactory";

export default class ItemsController {
    constructor(readonly repositoryFactory: RepositoryFactory) {}

    async getItems(): Promise<GetItemsOutput[]> {
        const getItems = new GetItems(this.repositoryFactory)
        const output = await getItems.execute()
        return output
    }

    async getItem(id: string): Promise<GetItemOutput> {
        const getItems = new GetItem(this.repositoryFactory)
        const output = await getItems.execute(id)
        return output
    }
}