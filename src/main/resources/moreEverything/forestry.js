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
	 *   recipe - Shaped Recipe-esque array, supports ItemStacks and OreDict names - Example: ["xxx", "xyx", "xxx", char('x'), new ItemStack(item.coal), char('y'), "oreCoal"]
	 *   Recipes can be added in-world, but you have to break-and-replace carpenters in order for them to recognize new fluids.
	 * */
	forestryAddCarpenterRecipe = function(timePerItem, liquid, box, output, recipe){
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCarpenterRecipe: timePerItem must be a number.");
		if (!isJavaClass(liquid, __fluidStack) && stringOrNumber(liquid)) liquid = new FluidStack(liquid).getStack();
		if (typeof box == "undefined") box = null;
		if (typeof output == "string"){
			output = (output.indexOf(':') > 0) ? new ItemStack(output).getStack() : getOres(output)[0];
		}
		if (!recipe instanceof Array) throw("forestryAddCarpenterRecipe: recipe is invalid, it must be an Array.");
		for (var i = 1; i < recipe.length; i++){
			// Iterates the array converting everything into a shaped-recipe-alike fashion
			if (typeof recipe[i-1] == "object" && typeof recipe[i] == "string") recipe[i] = new ItemStack(recipe[i]).getStack();
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
			input = (input.indexOf(':') > 0) ? new ItemStack(input).getStack() : getOres(input)[0];
		}
		if (!outputs instanceof Array){
			outputs = [outputs];
			chances = [100];
		}
		// I was fond of passing a single array for outputs+chances so I added this to make it easier.
		if (outputs[0] instanceof Array){
			chances = outputs[1];
			outputs = outputs[0];
		}
		if (((outputs instanceof Array) && (chances instanceof Array)) && (outputs.length != chances.length)) throw("forestryAddCentrifugeRecipe: length mismatch between outputs and chances.");
		for (var i = 0; i < outputs.length; i++){
			if (typeof outputs[i] == "string"){
				outputs[i] = (outputs[i].indexOf(':') > 0) ? new ItemStack(outputs[i]).getStack() : getOres(outputs[i])[0];
			}
			// By this point in time, there should be 2 arrays of equal length, one for outputs, and one for chances
			// for those outputs with each element in the array having a corresponding element in the other array
			// at the same index. Chances should also be nothing but numbers.
			if (typeof chances[i] != "number") throw("forestryAddCentrifugeRecipe: chances must be an Array of numbers.")
		}
		// Convert the two arrays into actual java arrays. Why? I don't remember.
		// Maybe Nashorn automatically handles conversions, but oh well.
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
			input = (input.indexOf(':') > 0) ? new ItemStack(input).getStack() : getOres(input)[0];
		}
		if (stringOrNumber(output)) output = new FluidStack(output).getStack();
		if (stringOrNumber(liquid)) liquid = new FluidStack(liquid).getStack();
		forestryRecipeManagers.fermenterManager.addRecipe(input, fermentationValue, modifier, output, liquid);
	};

	/*
	 *   input - ItemStack, item name, ore dictionary name
	 *   output - ItemStack, item name, ore dictionary name
	 *   timePerItem - positive number, probably number of ticks.
	 * */
	forestryAddMoistenerRecipe = function(input, output, timePerItem){
		if (typeof input == "string"){
			input = (input.indexOf(':') > 0) ? new ItemStack(input).getStack() : getOres(input)[0];
		}
		if (typeof output == "string"){
			output = (output.indexOf(':') > 0) ? new ItemStack(output).getStack() : getOres(output)[0];
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
					resources[i] = (resources[i].indexOf(':') > 0) ? new ItemStack(resources[i]) : getOres(resources[i])[0];
				}
			}
		}
		if (stringOrNumber(liquid)) liquid = new FluidStack(liquid).getStack();
		if (typeof remnants == "string"){
			remnants = (remnants.indexOf(':') > 0) ? new ItemStack(remnants).getStack() : getOres(remnants)[0];
		}
		if (typeof chance == "undefined" && typeof remnants != "undefined") chance = 100;
		if (typeof remnants == "undefined") chance = null;
		forestryRecipeManagers.squeezerManager.addRecipe(timePerItem, resources, liquid, remnants, chance);
	};

	/*
	 *   timePerUnit - number
	 *   input - FluidStack, fluid name, fluid ID
	 *   output - FluidStack, fluid name, fluid ID
	 * */
	forestryAddStillRecipe = function(timePerUnit, input, output){
		if (typeof timePerUnit != "number") throw("forestryAddStillRecipe: timePerUnit must be a number");
		if (stringOrNumber(input)) input = new FluidStack(input).getStack();
		if (stringOrNumber(output)) output = new FluidStack(output).getStack();
		forestryRecipeManagers.stillManager.addRecipe(timePerUnit, input, output);
	};

	/*
	 *   molten - FluidStack, fluid name, fluid ID - input liquid, only seems to like glass
	 *   result - ItemStack, item name, ore dictionary name - output
	 *   pattern - Shaped Recipe-esque array
	 * */
	forestryAddFabricatorRecipe = function(molten, result, pattern){
		if (stringOrNumber(molten)) molten = new FluidStack(molten).getStack();
		if (typeof result == "string"){
			result = (result.indexOf(':') > 0) ? new ItemStack(result).getStack() : getOres(result)[0];
		}
		if (!pattern instanceof Array) throw("forestryAddFabricatorRecipe: pattern must be an Array.");
		forestryRecipeManagers.fabricatorManager.addRecipe(null, molten, result, pattern);
	};

	/*
	 *   cast - ItemStack, item name, ore dictionary name - Don't these usually have damage values?
	 *   molten - Same as forestryAddFabricatorRecipe
	 *   result - Same as forestryAddFabricatorRecipe
	 *   pattern - Same as forestryAddFabricatorRecipe
	 * */
	forestryAddFabricatorCastRecipe = function(cast, molten, result, pattern){
		if (typeof cast == "string"){
			cast = (cast.indexOf(':') > 0) ? new ItemStack(cast).getStack() : getOres(cast)[0];
		}
		if (stringOrNumber(molten)) molten = new FluidStack(molten).getStack();
		if (typeof result == "string"){
			result = (result.indexOf(':') > 0) ? new ItemStack(result).getStack() : getOres(result)[0];
		}
		if (!pattern instanceof Array) throw("forestryAddFabricatorRecipe: pattern must be an Array.");
		forestryRecipeManagers.fabricatorManager.addRecipe(cast, molten, result, pattern);
	};

	/*
	 *   input - ItemStack, item name, ore dictionary name
	 *   fluidOut - FluidStack, fluid name, fluid ID
	 *   meltingPoint - number
	 *   Doesn't seem to work...
	 * */
	forestryAddFabricatorMeltingRecipe = function(input, fluidOut, meltingPoint){
		if (typeof meltingPoint != "number" || meltingPoint <= 0) throw("forestryAddFabricatorMeltingRecipe: meltingPoint must be a number above 0.");
		if (typeof input == "string"){
			input = (input.indexOf(':') > 0) ? new ItemStack(input).getStack() : getOres(input)[0];
		}
		if (stringOrNumber(fluidOut)) fluidOut = new FluidStack(fluidOut).getStack();
		forestryRecipeManagers.fabricatorManager.addSmelting(input, fluidOut, meltingPoint);
	}

})();