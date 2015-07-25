// Tinkers Construct Support
// By justastranger
// Written with TConstruct 1.7.1c for 1.7.10

var TConLibrary = Packages.tconstruct.library;
var TConCrafting = TConLibrary.crafting;

var tconAddCastingRecipe;
var tconAddBasinCastingRecipe;
var tconAddAlloyMixingRecipe;
var tconAddDryingRecipe;
var tconAddSmelteryFuel;
var tconAddMeltingRecipe;

(function(){

	/*
	 *   output - ItemStack or name
	 *   fluidstack - FluidStack, name, or ID
	 *   cast - ItemStack or name
	 *   consume - Boolean
	 *   delay - Number
	 * */
	tconAddCastingRecipe = function(output, fluidstack, cast, consume, delay){
		output = _lazyStack(output);
		cast = _lazyStack(cast);
		fluidstack = _lazyFluidStack(fluidstack);
		consume = !!consume;
		if (typeof delay != "number") throw("tconAddCastingRecipe: Delay must be a positive number");

		TConLibrary.TConstructRegistry.getTableCasting().addCastingRecipe(output, fluidstack, cast, consume, delay);
	};

	/*
	 *   output - ItemStack or item name
	 *   fluidstack - FluidStack, name, or ID
	 *   cast - ItemStack or item name
	 *   consume - Boolean
	 *   delay - number
	 * */
	tconAddBasinCastingRecipe = function(output, fluidstack, cast, consume, delay){
		output = _lazyStack(output);
		cast = _lazyStack(cast);
		fluidstack = _lazyFluidStack(fluidstack);
		consume = !!consume;
		if (typeof delay != "number") throw("tconAddCastingRecipe: Delay must be a positive number");

		TConLibrary.TConstructRegistry.getBasinCasting().addCastingRecipe(output, fluidstack, cast, consume, delay);
	};

	/*
	 *   result - FluidStack, name, or ID
	 *   arrInputs - Array of FluidStacks
	 * */
	tconAddAlloyMixingRecipe = function(result, arrInputs){
		result = _lazyFluidStack(result);
		if (!arrInputs instanceof Array) throw("tconAddAlloyMixingRecipe: arrInputs must be an Array of FluidStacks or IDs.");
		for (var i = 0; i < arrInputs.length; i++){
			arrInputs[i] = _lazyFluidStack(arrInputs[i]);
		}
		TConCrafting.Smeltery.addAlloyMixing(result, arrInputs)
	};

	/*
	 *   input - ItemStack or item name
	 *   time - Number
	 *   output - ItemStack or item name
	 * */
	tconAddDryingRecipe = function(input, time, output){
		input = _lazyStack(input);
		output = _lazyStack(output);
		if (typeof time != "number") throw("tconAddDryingRecipe: time must be a positive number.");
		TConCrafting.DryingRackRecipes.addDryingRecipe(input, time, output);
	};

	/*
	 *   fluid - Fluid, name, or ID
	 *   power - Number
	 *   duration - Number
	 * */
	tconAddSmelteryFuel = function(fluid, power, duration){
		if (typeof power != "number") throw("tconAddSmelteryFuel: power must be a positive number.");
		if (typeof duration != "number") throw("tconAddSmelteryFuel: duration must be a positive number.");
		fluid = _lazyFluidStack(fluid);
		TConCrafting.Smeltery.addSmelteryFuel(fluid, power, duration);
	};

	// Block should be a string in format mod:name
	tconAddMeltingRecipe = function(input, block, meta, temp, fluid){
		input = _lazyStack(input);
		fluid = _lazyFluidStack(fluid);
		if (typeof block != "undefined"){
			if(typeof block == "string") block = getBlock(block);
			else throw("Expected block name, got: "+ typeof block);
		} else {
			block = getBlock("minecraft:stone");
			meta = 0;
		}
		meta = meta ? meta : 0;
		if (typeof temp != "number") throw("tconAddMeltingRecipe: temp must be a number.");
		TConCrafting.Smeltery.addMelting(input, block, meta, temp, fluid);
	};

})();