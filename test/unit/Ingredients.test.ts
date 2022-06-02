import Ingredients from "@/Domain/Entity/Ingredients";

test("Should to be defined", () => {
    const ing = new Ingredients("água", "malte", "milho", "lúpulo");
    expect(ing).toBeDefined();
    expect(ing.ingredients).toHaveLength(4);
});

test("Should return an ingredients list", () => {
    const ing = new Ingredients("água", "milho");
    expect(ing.getIngredients()).toBe("água, milho");
});
