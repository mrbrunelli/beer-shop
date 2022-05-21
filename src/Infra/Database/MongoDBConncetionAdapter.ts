import { MongoClient, ObjectId } from "mongodb";
import Connection from "./Connection";

export default class MongoDBConnectionAdapter implements Connection {
    private client: MongoClient | undefined;

    constructor() {
        this.init();
    }

    private async init() {
        this.client = new MongoClient("mongodb://beer:beer@localhost:27017");
        await this.client.connect();
    }

    async find(params: any): Promise<any> {
        return this.client?.db("beer").collection("items").find(params).toArray();
    }

    async findOne(params: any): Promise<any> {
        return this.client?.db("beer").collection("items").findOne(params);
    }

    async findById(id: string): Promise<any> {
        const document = await this.findOne({ _id: new ObjectId(id) });

        if (!document) {
            return null;
        }

        const { _id, ...rest } = document;

        return {
            _id: _id.toString(),
            ...rest,
        };
    }

    async insertOne(params: any): Promise<void> {
        const { _id, ...rest } = params;

        if (!_id) {
            throw new Error("Identifier (_id) is required");
        }

        await this.client
            ?.db("beer")
            .collection("items")
            .insertOne({ _id: new ObjectId(_id), ...rest });
    }

    async deleteMany(): Promise<void> {
        await this.client?.db("beer").collection("items").deleteMany({});
    }

    async close(): Promise<void> {
        await this.client?.close();
    }
}
