// Blood Magic support
// By justastranger
// Written with Blood Magic 1.2.0b for 1.7.10
// Recipes can be removed since the Recipe objects are public and stored in a LinkedList, so I'll get to that.

var bmAPI = Packages.WayofTime.alchemicalWizardry.api;
var addBloodOrbShapedRecipe;
var addBloodOrbShapelessRecipe;
var addBindingItem;
var addBloodAltarInfusionRecipe;
var addAlchemyRecipe;
var removeBindingItem;
var removeBloodAltarInfusionRecipe;
var removeAlchemyRecipe;


(function(){

	if(!modList.AWWayofTime) return;

	addBloodOrbShapedRecipe = function(result, recipe) {
		if (typeof result == "string") {
			result = result.indexOf(':') ? newItemStack(result) : getOres(result)[0];
		}
		if (recipe instanceof Array) {
			for (var i = 0; i<recipe.length; i++) {
				if (typeof recipe[i] == "string" && recipe[i].indexOf(':')) {
					recipe[i] = newItemStack(recipe[i]);
				}
			}
		}
		if (typeof recipe == "string") {
			if (recipe.indexOf(':')) {
				recipe = newItemStack(recipe);
			}
			recipe = [recipe]
		}
		bmAPI.items.ShapedBloodOrbRecipe(result, recipe);
	}

	addBloodOrbShapelessRecipe = function(result, recipe) {
		if (typeof result == "string") {
			result = result.indexOf(':') ? newItemStack(result) : getOres(result)[0];
		}
		if (recipe instanceof Array) {
			for (var i = 0; i<recipe.length; i++) {
				if (typeof recipe[i] == "string" && recipe[i].indexOf(':')) {
					recipe[i] = newItemStack(recipe[i]);
				}
			}
		}
		if (typeof recipe == "string") {
			if (recipe.indexOf(':')) {
				recipe = newItemStack(recipe);
			}
			recipe = [recipe]
		}
		bmAPI.items.ShapelessBloodOrbRecipe(result, recipe);
	}

	addBindingItem = function(output, input) {
		if (typeof output == "string") {
			output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
		}
		if (typeof input == "string") {
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		}
		bmAPI.bindingRegistry.registerRecipe(output, input);
	}
	
	removeBindingItem = function(input) {
		if (typeof input == "string") {
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		}
		recipes = bmAPI.bindingRegistry.BindingRegistry.bindingRecipes;
		for (var recipe in recipes) {
			if (isJavaClass(recipe, bmAPI.bindingRegistry.BindingRecipe)) {
				if (recipe.doesRequiredItemMatch(input)) return recipes.remove(recipe)
			}
		}
	}
	
	addBloodAltarInfusionRecipe = function(result, input, minTier, bloodRequired, consumption, drain) {
		if (typeof result == "string") {
			result = result.indexOf(':') ? newItemStack(result) : getOres(result)[0];
		}
		if (typeof input == "string") {
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		}
		if (typeof minTier != "number") throw("addBloodInfusionRecipe: minTier must be a number.")
		if (typeof bloodRequired != "number") throw("addBloodInfusionRecipe: bloodRequired must be a number.")
		if (typeof consumption != "number") {
			log("addBloodInfusionRecipe: consumption should be a number. Defaults to 10 to make things easy.")
			consumption = 10
		}
		if (typeof drain != "number") {
			log("addBloodInfusionRecipe: drain should be a number. Defaults to 5 to make things easy.")
			drain = 5
		}
		bmAPI.altarRecipeRegistry.AltarRecipeRegistry.registerAltarRecipe(result, input, minTier, bloodRequired, consumption, drain, false);
	}

	removeBloodAltarInfusionRecipe = function(input, tier) {
		if (typeof input == "string") {
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		}
		recipes = bmAPI.altarRecipeRegistry.AltarRecipeRegistry.altarRecipes;
		recipeArray = bmAPI.altarRecipeRegistry.AltarRecipeRegistry.altarRecipes.toArray();
		for (var i = 0; i<recipeArray.length; i++) {
			if (isJavaClass(recipeArray[i], bmAPI.altarRecipeRegistry.AltarRecipe)) {
				if (recipeArray[i].doesRequiredItemMatch(input, tier)) return recipes.remove(recipeArray[i]);
			}
		}
		return false;
	}
	
	addAlchemyRecipe = function(output, lpRequired, recipe, bloodOrbLevel) {
		if (typeof output == "string") {
			if (output.indexOf(':')){
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (recipe instanceof Array) {
			for (var i = 0; i<recipe.length; i++) {
				if (typeof recipe[i] == "string") {
					if (recipe[i].indexOf(':')) {
						recipe[i] = newItemStack(recipe[i]);
					}
				}
			}
		}
		if (typeof recipe == "string") {
			if (recipe.indexOf(':')) {
				recipe = newItemStack(recipe);
			}
			recipe = [recipe]
		}
		bmAPI.alchemy.AlchemyRecipeRegistry.registerRecipe(output, lpRequired, recipe, bloodOrbLevel);
	}
	
	removeAlchemyRecipe = function(output){
		recipes = bmAPI.alchemy.AlchemyRecipeRegistry.recipes
		for (var recipe in recipes) {
			if (isJavaClass(recipe, bmAPI.alchemy.AlchemyRecipe)) {
				if (recipe.getResult().toString() == output.toString()) return recipes.remove(recipe)
			}
		}
	}
	
})();