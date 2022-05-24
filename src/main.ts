import MemoryRepositoryFactory from "./Infra/Factory/MemoryRepositoryFactory";
import ExpressAdapter from "./Infra/Http/ExpressAdapter";
import Router from "./Infra/Http/Router";

const repositoryFactory = new MemoryRepositoryFactory();
const http = new ExpressAdapter();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(3000);
