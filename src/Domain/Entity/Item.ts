import Ingredients from "./Ingredients";

export default class Item {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly size: number,
        readonly abv: number,
        readonly ingredients: Ingredients
    ) {}
}
