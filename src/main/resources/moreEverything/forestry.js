// Forestry support
// By justastranger
// Written with Forestry 3.2.0.5 for 1.7.10

var forestryApi = Packages.forestry.api;
var forestryRecipeManagers = forestryApi.recipes.RecipeManagers;

var forestryAddCarpenterRecipe;
var forestryAddCentrifugeRecipe;
var forestryAddFermenterRecipe;
var forestryAddMoistenerRecipe;
var forestryAddSqueezerRecipe;
var forestryAddStillRecipe;
var forestryAddFabricatorRecipe;
var forestryAddFabricatorCastRecipe;
var forestryAddFabricatorMeltingRecipe;

(function(){



	/*
	 *   timePerItem - number -  I think it's the number of ticks per operation
	 *   liquid - FluidStack, name, ID, or null - It's an input, not an output.
	 *   box - ItemStack, item name - Extra ItemStack that is consumed along with the recipe.
	 *   output - ItemStack, item name, ore dictionary name - output
	 *   recipe - Shaped Recipe-esque array, supports ItemStacks and OreDict names - Example: ["xxx", "xyx", "xxx", char('x'), newItemStack(item.coal), char('y'), "oreCoal"]
	 *   Works with other fluids, but you have to break-and-replace carpenters when adding recipes that use a as-of-yet-unused fluid such as Tinkers Construct's "molten obsidian"
	 * */
	forestryAddCarpenterRecipe = function(timePerItem, liquid, box, output, recipe){
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCarpenterRecipe: timePerItem must be a number.");
		if (!isJavaClass(liquid, __fluidStack) && stringOrNumber(liquid)) liquid = newFluidStack(liquid);
		if (typeof box == "undefined") box = null;
		if (typeof output == "string"){
			if (output.indexOf(':') > 0){
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (!recipe instanceof Array) throw("forestryAddCarpenterRecipe: recipe is invalid, it must be an Array.");
		for (var i = 1; i < recipe.length; i++){
			if (typeof recipe[i-1] == "object" && typeof recipe[i] == "string") recipe[i] = newItemStack(recipe[i]);
		}
		try{
			forestryRecipeManagers.carpenterManager.addRecipe(timePerItem, liquid, box, output, recipe);
			return true;
		} catch (e) {
			log(e);
			return false;
		}
	};

	/*
	 *   timePerItem - number
	 *   input - ItemStack, item name, ore dictionary name
	 *   outputs - Array of ItemStack, item name, ore dictionary name
	 *           - can be Array of Arrays, one being outputs, the other being chances: [[item.stone, item.dirt],[40,60]]
	 *   chances - Array of numbers
	 * */
	forestryAddCentrifugeRecipe = function(timePerItem, input, outputs, chances){
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCentrifugeRecipe: timePerItem must be a number above 0.");
		if (typeof input == "string"){
			if (input.indexOf(':') > 0){
				input = newItemStack(input);
			} else {
				input = getOres(input)[0];
			}
		}
		if (!outputs instanceof Array){
			outputs = [outputs];
			chances = [100];
		}
		if (outputs[0] instanceof Array){
			chances = outputs[1]
			outputs = outputs[0]
		}
		if (((outputs instanceof Array) && (chances instanceof Array)) && (outputs.length != chances.length)) throw("forestryAddCentrifugeRecipe: length mismatch between outputs and chances.");
		for (var i = 0; i < outputs.length; i++){
			if (typeof outputs[i] == "string"){
				if (outputs[i].indexOf(':') > 0){
					outputs[i] = newItemStack(outputs[i]);
				} else {
					outputs[i] = getOres(outputs[i])[0];
				}
			}
			if (typeof chances[i] != "number") throw("forestryAddCentrifugeRecipe: chances must be an Array of numbers.")
		}
		chances = javaArray(__int, chances);
		outputs = javaArray(__itemStack, outputs);
		forestryRecipeManagers.centrifugeManager.addRecipe(timePerItem, input, outputs, chances)
	};

	/*
	 *   input - ItemStack, item name, ore dictionary name - item input
	 *   fermentationValue - number
	 *   output - FluidStack, fluid name, fluid ID - fluid output
	 *   liquid - FluidStack, fluid name, fluid ID - fluid input
	 * */
	forestryAddFermenterRecipe = function(input, fermentationValue, modifier, output, liquid){
		if (typeof fermentationValue != "number" || fermentationValue < 0) throw("forestryAddFermenterRecipe: fermentationValue must be a positive number.");
		if (typeof modifier != "number" || fermentationValue < 0) throw("forestryAddFermenterRecipe: modifier must be a positive number.");
		if (typeof input == "string"){
			if (input.indexOf(':') > 0){
				input = newItemStack(input);
			} else {
				input = getOres(input)[0];
			}
		}
		if (stringOrNumber(output)) output = newFluidStack(output);
		if (stringOrNumber(liquid)) liquid = newFluidStack(liquid);
		forestryRecipeManagers.fermenterManager.addRecipe(input, fermentationValue, modifier, output, liquid);
	};

	/*
	 *   input - ItemStack, item name, ore dictionary name
	 *   output - ItemStack, item name, ore dictionary name
	 *   timePerItem - positive number, probably number of ticks.
	 * */
	forestryAddMoistenerRecipe = function(input, output, timePerItem){
		if (typeof input == "string"){
			if (input.indexOf(':') > 0){
				input = newItemStack(input);
			} else {
				input = getOres(input)[0];
			}
		}
		if (typeof output == "string"){
			if (output.indexOf(':') > 0){
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddMoistenerRecipe: timePerItem must be a positive number.");
		forestryRecipeManagers.moistenerManager.addRecipe(input, output, timePerItem);
	};

	/*
	 *   timePerItem - number
	 *   resources - Array of ItemStacks, item names, ore dictionary names
	 *   liquid - FluidStack, fluid name, fluid ID
	 *   remnants - ItemStack, item name, ore dictionary name
	 *   chance - number
	 * */
	forestryAddSqueezerRecipe = function(timePerItem, resources, liquid, remnants, chance){
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddSqueezerRecipe: timePerItem must be a positive number.");
		if (!resources instanceof Array){
			resources = [resources];
		}
		if (resources instanceof Array){
			for (var i = 0; i < resources.length; i++){
				if (typeof resources[i] == "string"){
					if (resources[i].indexOf(':') > 0){
						resources[i] = newItemStack(resources[i]);
					} else {
						resources[i] = getOres(resources[i])[0];
					}
				}
			}
		}
		if (stringOrNumber(liquid)) liquid = newFluidStack(liquid);
		if (typeof remnants == "string"){
			if (remnants.indexOf(':') > 0){
				remnants = newItemStack(remnants);
			} else {
				remnants = getOres(remnants)[0];
			}
		}
		if (typeof chance == "undefined" && typeof remnants != "undefined") chance = 100;
		if (typeof remnants == "undefined") chance = null;
		forestryRecipeManagers.squeezerManager.addRecipe(timePerItem, resources, liquid, remnants, chance);
	}

	/*
	 *   timePerUnit - number
	 *   input - FluidStack, fluid name, fluid ID
	 *   output - FluidStack, fluid name, fluid ID
	 * */
	forestryAddStillRecipe = function(timePerUnit, input, output){
		if (typeof timePerUnit != "number") throw("");
		if (stringOrNumber(input)) input = newFluidStack(input);
		if (stringOrNumber(output)) output = newFluidStack(output);
		forestryRecipeManagers.stillManager.addRecipe(timePerUnit, input, output);
	}

	/*
	 *   molten - FluidStack, fluid name, fluid ID - input liquid, only seems to take glass
	 *   result - ItemStack, item name, ore dictionary name - output
	 *   pattern - Shaped Recipe-esque array
	 * */
	forestryAddFabricatorRecipe = function(molten, result, pattern){
		if (stringOrNumber(molten)) molten = newFluidStack(molten);
		if (typeof result == "string"){
			if (result.indexOf(':') > 0){
				result = newItemStack(result);
			} else {
				result = getOres(result)[0];
			}
		}
		if (!pattern instanceof Array) throw("forestryAddFabricatorRecipe: pattern must be an Array.")
		forestryRecipeManagers.fabricatorManager.addRecipe(null, molten, result, pattern);
	}

	/*
	 *   cast - ItemStack, item name, ore dictionary name - Don't these usually have damage values?
	 *   molten - Same as forestryAddFabricatorRecipe
	 *   result - Same as forestryAddFabricatorRecipe
	 *   pattern - Same as forestryAddFabricatorRecipe
	 * */
	forestryAddFabricatorCastRecipe = function(cast, molten, result, pattern){
		if (typeof cast == "string"){
			if (cast.indexOf(':') > 0){
				cast = newItemStack(cast);
			} else {
				cast = getOres(cast)[0];
			}
		}
		if (stringOrNumber(molten)) molten = newFluidStack(molten);
		if (typeof result == "string"){
			if (result.indexOf(':') > 0){
				result = newItemStack(result);
			} else {
				result = getOres(result)[0];
			}
		}
		if (!pattern instanceof Array) throw("forestryAddFabricatorRecipe: pattern must be an Array.");
		forestryRecipeManagers.fabricatorManager.addRecipe(cast, molten, result, pattern);
	}

	/*
	 *   input - ItemStack, item name, ore dictionary name
	 *   fluidOut - FluidStack, fluid name, fluid ID
	 *   meltingPoint - number
	 *   Doesn't seem to work...
	 * */
	forestryAddFabricatorMeltingRecipe = function(input, fluidOut, meltingPoint){
		if (typeof meltingPoint != "number" || meltingPoint <= 0) throw("forestryAddFabricatorMeltingRecipe: meltingPoint must be a number above 0.");
		if (typeof input == "string"){
			if (input.indexOf(':') > 0){
				input = newItemStack(input);
			} else {
				input = getOres(input)[0];
			}
		}
		if (stringOrNumber(fluidOut)) fluidOut = newFluidStack(fluidOut);
		forestryRecipeManagers.fabricatorManager.addSmelting(input, fluidOut, meltingPoint);
	}

})();