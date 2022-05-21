import GetItem from "../../src/Application/UseCase/GetItem/GetItem";
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
