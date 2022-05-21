import RegisterItem from "../../src/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "../../src/Domain/Entity/Ingredients";
import RepositoryFactory from "../../src/Domain/Factory/RepositoryFactory";
import MemoryRepositoryFactory from "../../src/Infra/Factory/MemoryRepositoryFactory";

let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
    repositoryFactory = new MemoryRepositoryFactory();
    const itemRepository = repositoryFactory.createItemRepository();
    await itemRepository.clean();
});

test("Should register an Item", async () => {
    const registerItem = new RegisterItem(repositoryFactory);
    const input = {
        description: "Duplo Malte",
        price: 3.89,
        abv: 4.6,
        size: 350,
        ingredients: new Ingredients("água", "malte", "lúpulo"),
    };
    const output = await registerItem.execute(input);
    expect(output.id).toBeDefined();
    expect(output.id).toHaveLength(36);
});
