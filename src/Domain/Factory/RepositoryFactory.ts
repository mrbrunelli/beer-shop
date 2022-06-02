import ItemRepository from "@/Domain/Repository/ItemRepository";

export default interface RepositoryFactory {
    createItemRepository(): ItemRepository;
}
