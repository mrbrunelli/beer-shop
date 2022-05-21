import ItemRepository from "../Repository/ItemRepository";

export default interface RepositoryFactory {
    createItemRepository(): ItemRepository;
}
