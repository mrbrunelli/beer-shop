import RepositoryFactory from "@/Domain/Factory/RepositoryFactory";
import ItemsController from "@/Infra/Controller/ItemsController";
import Http from "@/Infra/Http/Http";

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

        this.http.route("post", "/items", async (params: any, body: any) => {
            const itemsController = new ItemsController(this.repositoryFactory);
            const output = await itemsController.registerItem(body);
            return output;
        });
    }
}
