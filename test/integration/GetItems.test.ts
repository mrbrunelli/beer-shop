import GetItems from "../../src/Application/UseCase/GetItems/GetItems";
import RegisterItem from "../../src/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "../../src/Domain/Entity/Ingredients";
import RepositoryFactory from "../../src/Domain/Factory/RepositoryFactory";
import ObjectIdGenerator from "../../src/Domain/Service/ObjectIdGenerator";
import Connection from "../../src/Infra/Database/Connection";
import MongoDBConnectionAdapter from "../../src/Infra/Database/MongoDBConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/Infra/Factory/DatabaseRepositoryFactory";
import ObjectIdGeneratorAdapter from "../../src/Infra/Service/ObjectIdGeneratorAdapter";

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let objectIdGenerator: ObjectIdGenerator;

beforeEach(async () => {
    objectIdGenerator = new ObjectIdGeneratorAdapter();
    connection = new MongoDBConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    const itemRepository = repositoryFactory.createItemRepository();
    await itemRepository.clean();
});

afterEach(async () => {
    await connection.close();
});

test("Should get all Items", async () => {
    const registerItem = new RegisterItem(repositoryFactory, objectIdGenerator);

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

test("Should return an Item empty list", async () => {
    const getItems = new GetItems(repositoryFactory);
    const output = await getItems.execute();

    expect(output).toHaveLength(0);
});
