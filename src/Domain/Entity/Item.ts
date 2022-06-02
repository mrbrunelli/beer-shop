import Ingredients from "@/Domain/Entity/Ingredients";

export default class Item {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly price: number,
        readonly size: number,
        readonly abv: number,
        readonly ingredients: Ingredients
    ) {}
}
