import GetItem from "@/Application/UseCase/GetItem/GetItem";
import RegisterItem from "@/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "@/Domain/Entity/Ingredients";
import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ObjectIdGenerator from "@/Application/Protocols/ObjectIdGenerator";
import Connection from "@/Infra/Database/Connection";
import MongoDBConnectionAdapter from "@/Infra/Database/MongoDBConnectionAdapter";
import DatabaseRepositoryFactory from "@/Infra/Factory/DatabaseRepositoryFactory";
import ObjectIdGeneratorAdapter from "@/Infra/Service/ObjectIdGeneratorAdapter";
import env from "@/Infra/Config/env";

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let objectIdGenerator: ObjectIdGenerator;

beforeEach(async () => {
    objectIdGenerator = new ObjectIdGeneratorAdapter();
    connection = new MongoDBConnectionAdapter(env.mongoUrl);
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    const itemRepository = repositoryFactory.createItemRepository();
    await itemRepository.clean();
});

afterEach(async () => {
    await connection.close();
});

test("Should get Item by id", async () => {
    const registerItem = new RegisterItem(repositoryFactory, objectIdGenerator);
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

test("Should throws exception if Item does not exists", async () => {
    const getItem = new GetItem(repositoryFactory);
    const inexistentId = "62895a88fd0d2f46b2d6bdc9";
    const output = getItem.execute(inexistentId);

    expect(output).rejects.toThrow();
});
