import GetItem from "../../Application/UseCase/GetItem/GetItem";
import GetItemOutput from "../../Application/UseCase/GetItem/GetItemOutput";
import GetItems from "../../Application/UseCase/GetItems/GetItems";
import GetItemsOutput from "../../Application/UseCase/GetItems/GetItemsOutput";
import RegisterItem from "../../Application/UseCase/RegisterItem/RegisterItem";
import RegisterItemInput from "../../Application/UseCase/RegisterItem/RegisterItemInput";
import RegisterItemOutput from "../../Application/UseCase/RegisterItem/RegisterItemOutput";
import RepositoryFactory from "../../Domain/Factory/RepositoryFactory";
import ObjectIdGeneratorAdapter from "../Service/ObjectIdGeneratorAdapter";

export default class ItemsController {
    constructor(readonly repositoryFactory: RepositoryFactory) {}

    async getItems(): Promise<GetItemsOutput[]> {
        const getItems = new GetItems(this.repositoryFactory);
        const output = await getItems.execute();
        return output;
    }

    async getItem(id: string): Promise<GetItemOutput> {
        const getItem = new GetItem(this.repositoryFactory);
        const output = await getItem.execute(id);
        return output;
    }

    async registerItem(input: RegisterItemInput): Promise<RegisterItemOutput> {
        const registerItem = new RegisterItem(this.repositoryFactory, new ObjectIdGeneratorAdapter());
        const output = await registerItem.execute(input);
        return output;
    }
}
