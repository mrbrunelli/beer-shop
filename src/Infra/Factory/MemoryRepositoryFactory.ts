import RepositoryFactory from "../../Domain/Factory/RepositoryFactory";
import ItemRepository from "../../Domain/Repository/ItemRepository";
import ItemRepositoryMemory from "../Repository/Memory/ItemRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
    createItemRepository(): ItemRepository {
        return new ItemRepositoryMemory();
    }
}
