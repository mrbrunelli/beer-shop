import MongoDBConnectionAdapter from "@/Infra/Database/MongoDBConnectionAdapter";
import DatabaseRepositoryFactory from "@/Infra/Factory/DatabaseRepositoryFactory";
import ExpressAdapter from "@/Infra/Http/ExpressAdapter";
import Router from "@/Infra/Http/Router";
import env from "@/Infra/Config/env";

const connection = new MongoDBConnectionAdapter(env.mongoUrl);
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const http = new ExpressAdapter();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(env.port);
