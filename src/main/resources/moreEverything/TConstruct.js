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
		if (typeof output == "string"){
			if (output.indexOf(':') > 0){
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (typeof cast == "string"){
			if (cast.indexOf(':') > 0){
				cast = newItemStack(cast);
			} else {
				cast = getOres(cast)[0];
			}
		}
		if (stringOrNumber(fluidstack)) fluidstack = newFluidStack(fluidstack);
		consume = !!consume;
		if (typeof delay != "number") throw("tconAddCastingRecipe: ");

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
		if (typeof output == "string"){
			if (output.indexOf(':') > 0){
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (typeof cast == "string"){
			if (cast.indexOf(':') > 0){
				cast = newItemStack(cast);
			} else {
				cast = getOres(cast)[0];
			}
		}
		if (stringOrNumber(fluidstack)) fluidstack = newFluidStack(fluidstack);
		consume = !!consume;
		if (typeof delay != "number") throw("tconAddCastingRecipe: ");

		TConLibrary.TConstructRegistry.getBasinCasting().addCastingRecipe(output, fluidstack, cast, consume, delay);
	};

	/*
	 *   result - FluidStack, name, or ID
	 *   arrInputs - Array of FluidStacks
	 * */
	tconAddAlloyMixingRecipe = function(result, arrInputs){
		if (stringOrNumber(result)) result = newFluidStack(result);
		if (!arrInputs instanceof Array) throw("tconAddAlloyMixingRecipe: arrInputs must be an Array of FluidStacks or IDs.");
		for (var i = 0; i < arrInputs.length; i++){
			if (stringOrNumber(arrInputs[i])) arrInputs[i] = newFluidStack(arrInputs[i])
		}
		TConCrafting.Smeltery.addAlloyMixing(result, arrInputs)
	};

	/*
	 *   input - ItemStack or item name
	 *   time - Number
	 *   output - ItemStack or item name
	 * */
	tconAddDryingRecipe = function(input, time, output){
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
		if (typeof time != "number") throw("tconAddDryingRecipe: time must be a number.");
		TConCrafting.DryingRackRecipes.addDryingRecipe(input, time, output);
	};

	/*
	 *   fluid - Fluid, name, or ID
	 *   power - Number
	 *   duration - Number
	 * */
	tconAddSmelteryFuel = function(fluid, power, duration){
		if (typeof power != "number") throw("tconAddSmelteryFuel: power must be a number.");
		if (typeof duration != "number") throw("tconAddSmelteryFuel: duration must be a number.");
		if (stringOrNumber(fluid)) fluid = getFluid(fluid);
		TConCrafting.Smeltery.addSmelteryFuel(fluid, power, duration);
	};

	// I will probably just use stone for the placeholder
	tconAddMeltingRecipe = function(input, block, meta, temp, fluid){
		if (typeof input == "string"){
			if (input.indexOf(':') > 0){
				input = newItemStack(input);
			} else {
				input = getOres(input)[0];
			}
		}
		if (typeof block == "undefined"){
			block = !!__block.func_149634_a(input.func_77973_b()) ? __block.func_149634_a(input.func_77973_b()) : __block.func_149634_a(newItemStack(item.stone).func_77973_b());
			meta = !!__block.func_149634_a(input.func_77973_b()) ? input.func_77960_j() : 0;
		}
		meta = meta ? meta : 0;
		if (typeof temp != "number") throw("tconAddMeltingRecipe: temp must be a number.");
		if (stringOrNumber(fluid)) fluid = newFluidStack(fluid);
		TConCrafting.Smeltery.addMelting(input, block, meta, temp, fluid);
	};

})();