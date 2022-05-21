import Ingredients from "../../src/Domain/Entity/Ingredients";
import Item from "../../src/Domain/Entity/Item";

test("Should to be defined with correctly values", () => {
    const item = new Item("1", "Spaten", 4.98, 355, 5.8, new Ingredients("água", "malte", "lúpulo"));
    expect(item).toBeDefined();
    expect(item.description).toBe("Spaten");
    expect(item.price).toBe(4.98);
    expect(item.size).toBe(355);
    expect(item.abv).toBe(5.8);
    expect(item.ingredients.getIngredients()).toBe("água, malte, lúpulo");
});
