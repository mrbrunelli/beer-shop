import MongoDBConnectionAdapter from "@/Infra/Database/MongoDBConnectionAdapter";
import DatabaseRepositoryFactory from "@/Infra/Factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "@/Infra/Factory/MemoryRepositoryFactory";
import ExpressAdapter from "@/Infra/Http/ExpressAdapter";
import Router from "@/Infra/Http/Router";

const connection = new MongoDBConnectionAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const http = new ExpressAdapter();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(3000);
