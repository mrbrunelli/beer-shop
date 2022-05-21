import GetItem from "../../src/Application/UseCase/GetItem/GetItem";
import GetItems from "../../src/Application/UseCase/GetItems/GetItems";
import RegisterItem from "../../src/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "../../src/Domain/Entity/Ingredients";
import RepositoryFactory from "../../src/Domain/Factory/RepositoryFactory";
import Connection from "../../src/Infra/Database/Connection";
import MongoDBConnectionAdapter from "../../src/Infra/Database/MongoDBConncetionAdapter";
import DatabaseRepositoryFactory from "../../src/Infra/Factory/DatabaseRepositoryFactory";

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
    connection = new MongoDBConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    const itemRepository = repositoryFactory.createItemRepository();
    await itemRepository.clean();
});

afterEach(async () => {
    await connection.close();
});

test("Should get Item by id", async () => {
    const registerItem = new RegisterItem(repositoryFactory);
    const input = {
        description: "Ribeirão Lager",
        price: 8.9,
        abv: 5.2,
        size: 600,
        ingredients: new Ingredients("água", "malte", "lúpulo", "laranja"),
    };
    const registeredItem = await registerItem.execute(input);

    const getItem = new GetItem(repositoryFactory);
    const output = await getItem.execute(registeredItem.id);

    expect(output).toBeDefined();
    expect(output.id).toBe(registeredItem.id);
});

test("Should get all Items", async () => {
    const registerItem = new RegisterItem(repositoryFactory);

    Array.from(Array(10)).forEach(async () => {
        const input = {
            description: "Ribeirão Lager",
            price: 8.9,
            abv: 5.2,
            size: 600,
            ingredients: new Ingredients("água", "malte", "lúpulo", "laranja"),
        };
        await registerItem.execute(input);
    });

    const getItems = new GetItems(repositoryFactory);
    const output = await getItems.execute();

    expect(output).toBeDefined();
    expect(output).toHaveLength(10);
});

test("Should throws exception if Item does not exists", async () => {
    const getItem = new GetItem(repositoryFactory);
    const inexistentId = "62895a88fd0d2f46b2d6bdc9";
    const output = getItem.execute(inexistentId);

    expect(output).rejects.toThrow();
});
