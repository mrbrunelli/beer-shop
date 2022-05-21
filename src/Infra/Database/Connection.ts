export default interface Connection {
    find(params: any): Promise<any>;
    findOne(params: any): Promise<any>;
    findById(id: string): Promise<any>;
    insertOne(params: any): Promise<void>;
    deleteMany(): Promise<void>;
    close(): Promise<void>;
}
