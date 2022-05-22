import ObjectIdGenerator from "../../Domain/Service/ObjectIdGenerator";
import { ObjectId } from "mongodb";

export default class ObjectIdGeneratorAdapter implements ObjectIdGenerator {
    generate(): string {
        return new ObjectId().toString();
    }
}
