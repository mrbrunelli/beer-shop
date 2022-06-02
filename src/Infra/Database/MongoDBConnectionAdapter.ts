import Connection from "@/Infra/Database/Connection";
import { MongoClient, ObjectId } from "mongodb";

export default class MongoDBConnectionAdapter implements Connection {
    private client: MongoClient;

    constructor() {
        this.client = new MongoClient("mongodb://beer:beer@localhost:27017");
        this.init();
    }

    private async init() {
        await this.client.connect();
    }

    async find(params: any): Promise<any> {
        return this.client.db("beer").collection("items").find(params).toArray();
    }

    async findOne(params: any): Promise<any> {
        const document: any = await this.client.db("beer").collection("items").findOne(params);

        if (!document) {
            return null;
        }

        const { _id, ...rest } = document;

        return {
            id: _id.toString(),
            ...rest,
        };
    }

    async findById(id: string): Promise<any> {
        return this.findOne({ _id: new ObjectId(id) });
    }

    async insertOne(params: any): Promise<void> {
        const { id, ...rest } = params;

        if (!id) {
            throw new Error("Identifier (_id) is required");
        }

        await this.client
            ?.db("beer")
            .collection("items")
            .insertOne({ _id: new ObjectId(id), ...rest });
    }

    async deleteMany(): Promise<void> {
        await this.client.db("beer").collection("items").deleteMany({});
    }

    async close(): Promise<void> {
        await this.client.close();
    }
}
