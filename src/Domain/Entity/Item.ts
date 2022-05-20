export default class Item {
    constructor(
        readonly id: string,
        readonly description: string,
        readonly size: number,
        readonly abv: number,
        readonly ingredients: string[]
    ) {}

    getIngredients() {
        return this.ingredients.join(", ");
    }
}
