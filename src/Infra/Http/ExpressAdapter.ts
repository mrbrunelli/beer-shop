import Http from "@/Infra/Http/Http";
import express, { Request, Response, NextFunction } from "express";

export default class ExpressAdapter implements Http {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token, Authorization");
            next();
        });

        this.app.options("*", (req: Request, res: Response, next: NextFunction) => {
            res.end();
        });
    }

    async route(method: string, url: string, callback: any): Promise<any> {
        this.app[method](url, async (req: Request, res: Response) => {
            const result = await callback(req.params, req.body);
            res.json(result);
        });
    }

    async listen(port: number): Promise<void> {
        await this.app.listen(port);
    }
}
