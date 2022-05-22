import RegisterItem from "../../src/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "../../src/Domain/Entity/Ingredients";
import RepositoryFactory from "../../src/Domain/Factory/RepositoryFactory";
import ObjectIdGenerator from "../../src/Domain/Service/ObjectIdGenerator";
import MemoryRepositoryFactory from "../../src/Infra/Factory/MemoryRepositoryFactory";
import ObjectIdGeneratorAdapter from "../../src/Infra/Service/ObjectIdGeneratorAdapter";

let repositoryFactory: RepositoryFactory;
let objectIdGenerator: ObjectIdGenerator;

beforeEach(async () => {
    objectIdGenerator = new ObjectIdGeneratorAdapter();
    repositoryFactory = new MemoryRepositoryFactory();
    const itemRepository = repositoryFactory.createItemRepository();
    await itemRepository.clean();
});

test("Should register an Item", async () => {
    const registerItem = new RegisterItem(repositoryFactory, objectIdGenerator);
    const input = {
        description: "Duplo Malte",
        price: 3.89,
        abv: 4.6,
        size: 350,
        ingredients: new Ingredients("água", "malte", "lúpulo"),
    };
    const output = await registerItem.execute(input);
    expect(output.id).toBeDefined();
    expect(output.id).toHaveLength(24);
});
