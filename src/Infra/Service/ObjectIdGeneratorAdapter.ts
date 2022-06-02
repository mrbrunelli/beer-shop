import ObjectIdGenerator from "../../Application/Protocols/ObjectIdGenerator";
import { ObjectId } from "mongodb";

export default class ObjectIdGeneratorAdapter implements ObjectIdGenerator {
    generate(): string {
        return new ObjectId().toString();
    }
}
