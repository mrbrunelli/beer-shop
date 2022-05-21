import Ingredients from "../../src/Domain/Entity/Ingredients";
import Item from "../../src/Domain/Entity/Item";

test("Should to be defined", () => {
    const item = new Item("1", "Spaten", 355, 5.8, new Ingredients("água", "malte", "lúpulo"));
    expect(item).toBeDefined();
});
