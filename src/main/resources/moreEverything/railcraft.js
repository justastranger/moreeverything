// Railcraft Support
// By justastranger
// Written with Railcraft 9.4.0.0 for 1.7.10

// TODO Rock Crusher, Rolling Machine

var rcAddCokeOvenRecipe;
var rcAddBlastFurnaceRecipe;


(function(){
	if(modList.Railcraft == null) return;

	/*
	*   input        - ItemStack
	*   matchDamage  - Boolean, lets you use item.sandStone for input and use any of the sandstone types
	*   matchNBT     - Boolean, lets you use bees and then input any kind of bee TODO: find actual name for bees
	*   output       - ItemStack
	*   fluidOut     - fluidStack
	*   time         - Number
	* */
	rcAddCokeOvenRecipe = function(input, matchDamage, matchNBT, output, fluidOut, time){
		input = _nameStack(input);
		output = _nameStack(output);
		matchDamage = !!matchDamage;
		matchNBT = !!matchNBT;
		if(stringOrNumber(fluidOut)) fluidOut = newFluidStack(fluidOut);
		if(typeof time != "number") throw("rcAddCokeOvenRecipe: time must be a number.");
		Packages.mods.railcraft.api.crafting.RailcraftCraftingManager.cokeOven.addRecipe(input, matchDamage, matchNBT, output, fluidOut, time);
	};
	/*
	*   input
	*   matchDamage
	*   matchNBT
	*   time
	*   output
	* */
	rcAddBlastFurnaceRecipe = function(input, matchDamage, matchNBT, time, output){
		input = _nameStack(input);
		output = _nameStack(output);
		matchDamage = !!matchDamage;
		matchNBT = !!matchNBT;
		if(typeof time != "number") throw("rcAddBlastFurnaceRecipe: time must be a number.");
		Packages.mods.railcraft.api.crafting.RailcraftCraftingManager.blastFurnace.addRecipe(input, matchDamage, matchNBT, time, output);
	};


})();