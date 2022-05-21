export default class Ingredients {
    ingredients: string[];

    constructor(...ingredients: string[]) {
        this.ingredients = ingredients;
    }

    getIngredients() {
        return this.ingredients.join(", ");
    }
}
