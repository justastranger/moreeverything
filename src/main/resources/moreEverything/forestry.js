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
		if (typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCarpenterRecipe: timePerItem must be a positive number.");
		liquid = _lazyFluidStack(liquid);
		if (typeof box == "undefined") box = null;
		output = _lazyStack(output);
		if (!recipe instanceof Array) throw("forestryAddCarpenterRecipe: recipe is invalid, it must be an Array.");
		for (var i = 1; i < recipe.length; i++){
			// Iterates the array converting everything into a shaped-recipe-alike fashion
			if (typeof recipe[i-1] == "object" && typeof recipe[i] == "string") recipe[i] = _lazyStack(recipe[i]);
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
		input = _lazyStack(input);
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
			outputs[i] = _lazyStack(outputs[i]);
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
		input = _lazyStack(input);
		output = _lazyFluidStack(output);
		liquid = _lazyFluidStack(liquid);
		forestryRecipeManagers.fermenterManager.addRecipe(input, fermentationValue, modifier, output, liquid);
	};

	/*
	 *   input - ItemStack, item name, ore dictionary name
	 *   output - ItemStack, item name, ore dictionary name
	 *   timePerItem - positive number, probably number of ticks.
	 * */
	forestryAddMoistenerRecipe = function(input, output, timePerItem){
		input = _lazyStack(input);
		output = _lazyStack(output);
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
				resources[i] = _lazyStack(resources[i]);
			}
		}
		liquid = _lazyFluidStack(liquid);
		if (typeof remnants != "undefined"){
			remnants = _lazyStack(remnants);
			if(typeof chance == "undefined"){
				chance = 100;
			}
		} else {
			remnants = null;
			chance = null;
		}
		forestryRecipeManagers.squeezerManager.addRecipe(timePerItem, resources, liquid, remnants, chance);
	};

	/*
	 *   timePerUnit - number
	 *   input - FluidStack, fluid name, fluid ID
	 *   output - FluidStack, fluid name, fluid ID
	 * */
	forestryAddStillRecipe = function(timePerUnit, input, output){
		if (typeof timePerUnit != "number") throw("forestryAddStillRecipe: timePerUnit must be a number");
		input = _lazyFluidStack(input);
		output = _lazyFluidStack(output);
		forestryRecipeManagers.stillManager.addRecipe(timePerUnit, input, output);
	};

	/*
	 *   molten - FluidStack, fluid name, fluid ID - input liquid, only seems to like glass
	 *   result - ItemStack, item name, ore dictionary name - output
	 *   pattern - Shaped Recipe-esque array
	 * */
	forestryAddFabricatorRecipe = function(molten, result, pattern){
		if (!pattern instanceof Array) throw("forestryAddFabricatorRecipe: pattern must be an Array.");
		molten = _lazyFluidStack(molten);
		result = _lazyStack(result);
		forestryRecipeManagers.fabricatorManager.addRecipe(null, molten, result, pattern);
	};

	/*
	 *   cast - ItemStack, item name, ore dictionary name - Don't these usually have damage values?
	 *   molten - Same as forestryAddFabricatorRecipe
	 *   result - Same as forestryAddFabricatorRecipe
	 *   pattern - Same as forestryAddFabricatorRecipe
	 * */
	forestryAddFabricatorCastRecipe = function(cast, molten, result, pattern){
		if (!pattern instanceof Array) throw("forestryAddFabricatorCastRecipe: pattern must be an Array.");
		cast = _lazyStack(cast);
		molten = _lazyFluidStack(molten);
		result = _lazyStack(result);
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
		input = _lazyStack(input);
		fluidOut = _lazyFluidStack(fluidOut);
		forestryRecipeManagers.fabricatorManager.addSmelting(input, fluidOut, meltingPoint);
	};

	log("Buzz buzz");

})();