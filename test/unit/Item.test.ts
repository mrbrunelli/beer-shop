import Item from "../../src/Domain/Entity/Item";

test("Should create an item and return ingredients", () => {
    const item = new Item("1", "Spaten", 355, 5.8, ["água", "malte", "lúpulo"]);
    expect(item).toBeDefined();
    expect(item.getIngredients()).toBe("água, malte, lúpulo");
});
