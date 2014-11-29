// EnderIO Support
// By justastranger
// Written with EnderIO 2.2.1.276 for 1.7.10

var __eIO = Packages.crazypants.enderio;
var __eioRecipeInput = __eIO.machine.recipe.RecipeInput;
var __eioRecipeOutput = __eIO.machine.recipe.RecipeOutput;
var __eioRecipe = __eIO.machine.recipe.Recipe;
var __eioManyToOneRecipe = __eIO.machine.recipe.BasicManyToOneRecipe;

var eioNewRecipeOutput;
var eioNewRecipeOutputFluid;
var eioNewRecipeInput;
var eioNewRecipeInputFluid;
var eioNewRecipe;
var eioAddCrusherRecipe;
var eioAddAlloyRecipe;
var eioAddVatRecipe;

(function(){
	eioNewRecipeOutput = function(stack, chance){
		if (isJavaClass(stack, __eioRecipeOutput)) return stack;
		if (!isJavaClass(stack, __itemStack)){
			if (typeof stack == "string"){
				if (stack.indexOf(":") > 0) stack = newItemStack(stack);
				else if (getOres(stack) != "") stack = getOres(stack)[0];
				else return eioNewRecipeOutputFluid(stack);
			} else {
				if (isJavaClass(stack, __fluidStack)) return eioNewRecipeOutputFluid(stack);
				throw("newRecipeOutput: stack should be an ItemStack or string, it was a "+stack.getClass());
			}
		}
		if (typeof chance == "undefined") chance = 1;
		if (chance > 1 || chance < 0) chance = 1;
		return new __eioRecipeOutput(stack, chance);
	};

	eioNewRecipeOutputFluid = function(fluidStack){
		if (isJavaClass(fluidStack, __eioRecipeOutput)) return stack;
		if (!isJavaClass(fluidStack, __fluidStack)){
			if (stringOrNumber(fluidStack)) fluidStack = newFluidStack(fluidStack, 1000);
			else throw("newRecipeInputFluid: fluidStack must be a FluidStack, a string, or a number, it was a "+fluidStack.getClass());
		}
		return new __eioRecipeOutput(fluidStack);
	};

	eioNewRecipeInput = function(stack, useMeta, multiplier, slot){
		if (isJavaClass(stack, __eioRecipeOutput)) return stack;
		if (!isJavaClass(stack, __itemStack)){
			if (typeof stack == "string"){
				if (stack.indexOf(":") > 0) stack = newItemStack(stack);
				else if (getOres(stack) != "") stack = getOres(stack)[0];
				else return eioNewRecipeInputFluid(newFluidStack(stack, 1000));
			} else {
				if (isJavaClass(stack, __fluidStack)) return eioNewRecipeInputFluid(stack);
				throw("newRecipeOutput: stack should be an ItemStack or string, it was a "+stack.getClass());
			}
		}
		if (typeof slot != "number") slot = -1;
		if (multiplier < 0 || typeof multiplier != "number") multiplier = 1;
		useMeta = !!useMeta;
		return new __eioRecipeInput(stack, useMeta, multiplier, slot);
	};
	eioNewRecipeInputFluid = function(fluidStack){
		if (isJavaClass(fluidStack, __eioRecipeOutput)) return stack;
		if (!isJavaClass(fluidStack, __fluidStack)){
			if (stringOrNumber(fluidStack)) fluidStack = newFluidStack(fluidStack, 1000);
			else throw("newRecipeInputFluid: fluidStack must be a FluidStack, a string, or a number, it was a "+fluidStack.getClass());
		}
		return new __eioRecipeInput(fluidStack);
	};
	eioNewRecipe = function(input, energy, output){
		if (typeof energy != "number") throw("eioNewRecipe: energy must be a number.");

		if (input instanceof Array){
			for (var i = 0; i < input.length; i++){
				if (!isJavaClass(input[i], __eioRecipeInput)) input[i] = eioNewRecipeInput(input[i]);
			}
		} else {
			if (!isJavaClass(input, __eioRecipeInput)) input = eioNewRecipeInput(input);
		}
		if (output instanceof Array){
			for (var i = 0; i < output.length; i++){
				if (!isJavaClass(output[i], __eioRecipeOutput)) output[i] = eioNewRecipeOutput(output[i]);
			}
		} else {
			if (!isJavaClass(output, __eioRecipeOutput)) output = eioNewRecipeOutput(output);
		}
		output = javaArray(__eioRecipeOutput, output);
		input = javaArray(__eioRecipeInput, input);
		return new __eioRecipe(input, output, energy);
	};

	/*
	 *   energy - number, Crusher runs at 20RF/t by default
	 *   input - An item name, ore dictionary name, ItemStack, or RecipeInput
	 *   output - An item name, ore dictionary name, ItemStack, or RecipeOutput
	 * */

	eioAddCrusherRecipe = function(energy, input, output){
		if (typeof energy != "number") throw("eioAddCrusherRecipe: energy must be a number.")
		var recipe = eioNewRecipe(input, energy, output);
		__eIO.machine.crusher.CrusherRecipeManager.getInstance().addRecipe(recipe);
	};

	/*
	 *   energy - number, Alloy Furnace runs at 20RF/t by default,
	 *   inputs - an array of item names, ore dictionary names, ItemStacks, or RecipeInputs
	 *   output - An item name, ore dictionary name, ItemStack, or RecipeOutput
	 * */

	eioAddAlloyRecipe = function(energy, inputs, output){
		if (typeof energy != "number") throw("eioAddAlloyRecipe: energy must be a number.")
		var recipe = new __eioManyToOneRecipe(eioNewRecipe(inputs, energy, output));
		__eIO.machine.alloy.AlloyRecipeManager.getInstance().addRecipe(recipe);
	};


	/*
	 *   energy - number, Vat runs at a max of 20 RF/t, so energy/400=time in seconds
	 *   fluidIn - FluidStack, name of fluid, fluid ID, or RecipeInput
	 *   arrSlot1 - An array of item names, ore dictionary names, ItemStacks, or RecipeInputs
	 *   arrSlot2 - An array of item names, ore dictionary names, ItemStacks, or RecipeInputs
	 *   fluidOut - FluidStack, name of fluid, fluid ID, or RecipeOutput
	 * */

	eioAddVatRecipe = function(energy, fluidIn, arrSlot1, arrSlot2, fluidOut){
		if (typeof energy != "number") throw("eioAddVatRecipe: energy must be a number.");
		if (!isJavaClass(fluidIn, __fluidStack)){
			if (stringOrNumber(fluidIn)) fluidIn = newFluidStack(fluidIn);
		}
		if (!isJavaClass(fluidIn, __eioRecipeInput))fluidIn = eioNewRecipeInputFluid(fluidIn);
		if (!isJavaClass(fluidOut, __eioRecipeInput))fluidOut = eioNewRecipeOutputFluid(fluidOut);
		if (arrSlot1 instanceof Array){
			for (var i = 0; i < arrSlot1.length; i++){
				if (!isJavaClass(arrSlot1[i], __eioRecipeInput)) arrSlot1[i] = eioNewRecipeInput(arrSlot1[i], null, null, 0);
			}
		}
		if (arrSlot2 instanceof Array){
			for (var i = 0; i < arrSlot2.length; i++){
				if (!isJavaClass(arrSlot2[i], __eioRecipeInput)) arrSlot2[i] = eioNewRecipeInput(arrSlot2[i], null, null, 1);
			}
		}
		var input = arrSlot1.concat(fluidIn).concat(arrSlot2);
		var output = javaArray(__eioRecipeOutput, fluidOut);
		input = javaArray(__eioRecipeInput, input);
		var recipe = new __eioRecipe(input, output, energy);
		try{
			__eIO.machine.still.VatRecipeManager.getInstance().addRecipe(recipe);
			return true
		} catch (e) {
			log(e);
			return false
		}
	};

	log("Thinking otuside the block.")

})();