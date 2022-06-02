import Ingredients from "@/Domain/Entity/Ingredients";

export default class RegisterItemInput {
    constructor(
        readonly description: string,
        readonly price: number,
        readonly size: number,
        readonly abv: number,
        readonly ingredients: Ingredients
    ) {}
}
