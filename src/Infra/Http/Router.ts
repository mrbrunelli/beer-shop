import RepositoryFactory from "../../Domain/Factory/RepositoryFactory";
import ItemsController from "../Controller/ItemsController";
import Http from "./Http";

export default class Router {
    constructor(readonly http: Http, readonly repositoryFactory: RepositoryFactory) {}

    init() {
        this.http.route("get", "/items", async (params: any, body: any) => {
            const itemsController = new ItemsController(this.repositoryFactory);
            const output = await itemsController.getItems();
            return output;
        });

        this.http.route("get", "/items/:id", async (params: any, body: any) => {
            const itemsController = new ItemsController(this.repositoryFactory);
            const output = await itemsController.getItem(params.id);
            return output;
        });
    }
}
