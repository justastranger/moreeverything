// Blood Magic support
// By justastranger
// Written with Blood Magic 1.2.0b for 1.7.10

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

	if (!modList.AWWayofTime) return;

	addBloodOrbShapedRecipe = function(result, recipe){
		result = _lazyStack(result);
		if (recipe instanceof Array){
			for (var i = 0; i < recipe.length; i++){
				recipe[i] = _lazyStack(recipe[i]);
			}
		} else {
			throw("addBloodOrbShapedRecipe: Pretend that this is addShapedRecipe, just with a blood orb somewhere in the recipe.")
		}
		bmAPI.items.ShapedBloodOrbRecipe(result, recipe);
	};

	addBloodOrbShapelessRecipe = function(result, recipe){
		if (typeof result == "string"){
			result = result.indexOf(':') ? new ItemStack(result).getStack() : getOres(result)[0];
		}
		if (recipe instanceof Array){
			for (var i = 0; i < recipe.length; i++){
				if (typeof recipe[i] == "string" && recipe[i].indexOf(':') > 0){
					recipe[i] = new ItemStack(recipe[i]).getStack();
				}
			}
		} else {
			throw("addBloodOrbShapelessRecipe: Pretend that this is addShapelessRecipe, just with a blood orb somewhere in the recipe.")
		}
		bmAPI.items.ShapelessBloodOrbRecipe(result, recipe);
	};

	addBindingItem = function(output, input){
		output = _lazyStack(output);
		input = _lazyStack(input);
		bmAPI.bindingRegistry.BindingRegistry.registerRecipe(output, input);
	};

	removeBindingItem = function(input){
		input = _lazyStack(input);
		var recipes = bmAPI.bindingRegistry.BindingRegistry.bindingRecipes;
		var recipeArray = bmAPI.bindingRegistry.BindingRegistry.bindingRecipes.toArray();
		for (var i = 0; i < recipeArray.length; i++){
			if (isJavaClass(recipeArray[i], bmAPI.bindingRegistry.BindingRecipe)){
				if (recipeArray[i].doesRequiredItemMatch(input)){
					recipes.remove(recipeArray[i]);
					return true;
				}
			}
		}
	};

	addBloodAltarInfusionRecipe = function(result, input, minTier, bloodRequired, consumption, drain){
		result = _lazyStack(result);
		input = _lazyStack(input);
		if (typeof minTier != "number") throw("addBloodInfusionRecipe: minTier must be a number.");
		if (typeof bloodRequired != "number") throw("addBloodInfusionRecipe: bloodRequired must be a number.");
		if (typeof consumption != "number"){
			//log("addBloodInfusionRecipe: consumption should be a number. Defaults to 10 to make things easy.");
			consumption = 10
		}
		if (typeof drain != "number"){
			//log("addBloodInfusionRecipe: drain should be a number. Defaults to 5 to make things easy.");
			drain = 5
		}
		bmAPI.altarRecipeRegistry.AltarRecipeRegistry.registerAltarRecipe(result, input, minTier, bloodRequired, consumption, drain, false);
	};

	removeBloodAltarInfusionRecipe = function(input, tier){
		input = _lazyStack(input);
		var recipes = bmAPI.altarRecipeRegistry.AltarRecipeRegistry.altarRecipes;
		var recipeArray = bmAPI.altarRecipeRegistry.AltarRecipeRegistry.altarRecipes.toArray();
		for (var i = 0; i < recipeArray.length; i++){
			if (isJavaClass(recipeArray[i], bmAPI.altarRecipeRegistry.AltarRecipe)){
				if (recipeArray[i].doesRequiredItemMatch(input, tier)) return recipes.remove(recipeArray[i]);
			}
		}
		return false;
	};

	addAlchemyRecipe = function(output, lpRequired, recipe, bloodOrbLevel){
		output = _lazyStack(output);
		if (recipe instanceof Array){
			for (var i = 0; i < recipe.length; i++){
				if (typeof recipe[i] == "string"){
					recipe[i] = _lazyStack(recipe[i]);
				}
			}
		}
		if (typeof recipe == "string"){
			recipe = (recipe.indexOf(':') > 0) ? new ItemStack(recipe).getStack() : getOres(recipe)[0];
			recipe = [recipe]
		}
		bmAPI.alchemy.AlchemyRecipeRegistry.registerRecipe(output, lpRequired, recipe, bloodOrbLevel);
		return true;
	};

	removeAlchemyRecipe = function(output){
		output = _lazyStack(output);
		var recipes = bmAPI.alchemy.AlchemyRecipeRegistry.recipes;
		var recipeArray = bmAPI.alchemy.AlchemyRecipeRegistry.recipes.toArray();
		for (var i = 0; i < recipeArray.length; i++){
			if (isJavaClass(recipeArray[i], bmAPI.alchemy.AlchemyRecipe)){
				if (recipeArray[i].getResult().equals(output)){
					recipes.remove(recipeArray[i]);
					return true;
				}
			}
		}
		return false;
	};

	log("Blood for the blood god!")

})();