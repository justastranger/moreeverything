// Railcraft Support
// By justastranger
// Written with Railcraft 9.4.0.0 for 1.7.10

// TODO Rolling Machine
// Shaped and Shapeless

var rcAddCokeOvenRecipe;
var rcAddBlastFurnaceRecipe;
var rcAddRockCrusherRecipe;


(function(){
	if (modList.Railcraft == null) return;

	var railcraftAPI = Packages.mods.railcraft.api;

	/*
	 *   input        - ItemStack
	 *   matchDamage  - Boolean, lets you use item.sandStone for input and use any of the sandstone types
	 *   matchNBT     - Boolean, does what it says on the tin, if true, only allows matching NBT (Say, blasting iron pickaxes with enchant into special materials)
	 *   output       - ItemStack
	 *   fluidOut     - fluidStack
	 *   time         - Number
	 * */
	rcAddCokeOvenRecipe = function(input, matchDamage, matchNBT, output, fluidOut, time){
		input = _lazyStack(input); // Syntactic sugar because I got lazy at some point, can be found in core.js
		output = _lazyStack(output);
		matchDamage = !!matchDamage; // Double negative, undefineds become false letting you skip them.
		matchNBT = !!matchNBT;
		fluidOut = _lazyFluidStack(fluidOut);
		if (typeof time != "number") throw("rcAddCokeOvenRecipe: time must be a number.");
		railcraftAPI.crafting.RailcraftCraftingManager.cokeOven.addRecipe(input, matchDamage, matchNBT, output, fluidOut, time);
	};
	/*
	 *   input
	 *   matchDamage
	 *   matchNBT
	 *   time
	 *   output
	 * */
	rcAddBlastFurnaceRecipe = function(input, matchDamage, matchNBT, time, output){
		input = _lazyStack(input);
		output = _lazyStack(output);
		matchDamage = !!matchDamage;
		matchNBT = !!matchNBT;
		if (typeof time != "number") throw("rcAddBlastFurnaceRecipe: time must be a number.");
		railcraftAPI.crafting.RailcraftCraftingManager.blastFurnace.addRecipe(input, matchDamage, matchNBT, time, output);
	};
	rcAddRockCrusherRecipe = function(input, matchDamage, matchNBT, outputArray, chancesArray){
		input = _lazyStack(input);
		matchDamage = !!matchDamage;
		matchNBT = !!matchNBT;
		if (!outputArray instanceof Array){
			outputArray = [outputArray];
			if (typeof chancesArray == "undefined") chancesArray = [1];
		}
		if (outputArray[0] instanceof Array){
			chancesArray = outputArray[1];
			outputArray = outputArray[0];
		}
		if (outputArray.length != chancesArray.length) throw("rcAddRockCrusherRecipe: length mismatch between outputArray and chancesArray."); // TODO replace with for loop that fills remainder of chancesArray with 1's
		var recipe = railcraftAPI.crafting.RailcraftCraftingManager.rockCrusher.createNewRecipe(input, matchDamage, matchNBT);
		for (var i = 0; i < outputArray.length; i++){
			outputArray[i] = _lazyStack(outputArray[i]);
			recipe.addOutput(outputArray[i], chancesArray[i]);
		}
	};


})();