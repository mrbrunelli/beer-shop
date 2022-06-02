import RegisterItem from "@/Application/UseCase/RegisterItem/RegisterItem";
import Ingredients from "@/Domain/Entity/Ingredients";
import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ObjectIdGenerator from "@/Application/Protocols/ObjectIdGenerator";
import Connection from "@/Infra/Database/Connection";
import MongoDBConnectionAdapter from "@/Infra/Database/MongoDBConnectionAdapter";
import DatabaseRepositoryFactory from "@/Infra/Factory/DatabaseRepositoryFactory";
import ObjectIdGeneratorAdapter from "@/Infra/Service/ObjectIdGeneratorAdapter";
import env from "@/Infra/Config/env";
import axios from "axios";
import ExpressAdapter from "@/Infra/Http/ExpressAdapter";
import Router from "@/Infra/Http/Router";

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let objectIdGenerator: ObjectIdGenerator;
let server: any;

beforeAll(async () => {
    objectIdGenerator = new ObjectIdGeneratorAdapter();
    connection = new MongoDBConnectionAdapter(env.mongoUrl);
    repositoryFactory = new DatabaseRepositoryFactory(connection);

    const http = new ExpressAdapter();
    const router = new Router(http, repositoryFactory);

    router.init();
    server = await http.listen(env.port);
});

beforeEach(async () => {
    const itemsRepository = repositoryFactory.createItemRepository();
    await itemsRepository.clean();
});

afterAll(async () => {
    await connection.close();
    await server.close();
});

test("Should execute GET /items", async () => {
    const registerItem = new RegisterItem(repositoryFactory, objectIdGenerator);

    for (let i = 0; i < 5; i++) {
        const input = {
            abv: 2.8,
            description: "Schincariol",
            ingredients: new Ingredients("água", "milho", "cevada"),
            price: 1.59,
            size: 350,
        };
        await registerItem.execute(input);
    }

    const response = await axios({
        url: "http://localhost:3000/items",
        method: "get",
    });

    const output = response.data;

    expect(output).toHaveLength(5);
});

test("Should execute GET /items/:id", async () => {
    const registerItem = new RegisterItem(repositoryFactory, objectIdGenerator);

    const input = {
        abv: 4.5,
        description: "Boa",
        ingredients: new Ingredients("água", "milho", "cevada"),
        price: 2.45,
        size: 350,
    };

    const registeredItem = await registerItem.execute(input);

    const response = await axios({
        url: `http://localhost:3000/items/${registeredItem.id}`,
        method: "get",
    });

    const output = response.data;

    expect(output.id).toBe(registeredItem.id);
});

test("Should execute POST /items", async () => {
    const response = await axios({
        url: "http://localhost:3000/items",
        method: "post",
        data: {
            abv: 5.4,
            description: "Baden Baden IPA",
            ingredients: new Ingredients("água", "malte", "lúpulo", "maracujá"),
            price: 8.9,
            size: 600,
        },
    });

    const output = response.data;

    expect(output.id).toBeDefined();
    expect(output.id).toHaveLength(24);
});
