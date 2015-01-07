// Support for Rotarycraft
// By justastranger
// Written with RotaryCraft v3d for 1.7.10

var RoCRM = Reika.RotaryCraft.Auxiliary.RecipeManagers;

// TODO Figure out why the actual recipes seem unreachable...
// It's keeping recipe removal from being a thing.

var rocAddGrinderRecipe;
var rocAddPulseFurnaceRecipe;
var rocAddLavaMakerRecipe;
var rocAddFrictionHeaterRecipe;
var rocAddExtractorRecipe;
var rocAddDryingBedRecipe;
var rocAddCrystallizerRecipe;
var rocAddCompactorRecipe;
var rocAddCentrifugeRecipe;
var rocAddBlastFurnaceRecipe;

// To Be Implemented (eventually)

var rocRemoveGrinderRecipe;
var rocRemovePulseFurnaceRecipe;
var rocRemoveLavaMakerRecipe;
var rocRemoveFrictionHeaterRecipe;
var rocRemoveExtractorRecipe;
var rocRemoveDryingBedRecipe;
var rocRemoveCrystallizerRecipe;
var rocRemoveCompactorRecipe;
var rocRemoveCentrifugeRecipe;

(function(){

	function canBecomeStack(thing){
		return !!(typeof thing == "string" && thing.indexOf(":") > 0);
	}
	function isOreDict(thing){
		return !!(typeof thing == "string" && thing.indexOf(":") < 1);
	}

	rocAddGrinderRecipe = function(input, output){
		var recipes = RoCRM.RecipesGrinder.getRecipes();
		var oreDict;
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) oreDict = true;
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if (!!oreDict) {
			recipes.addOreDictRecipe(input, output, 0);
		} else {
			recipes.addRecipe(input, output, 0);
		}
	};

	rocAddPulseFurnaceRecipe = function(input, output, experience){
		var recipes = RoCRM.RecipesPulseFurnace.smelting()
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof experience != "number") experience = 0.0;
		recipes.addSmelting(input, output, experience);
	};

	// It may be called the Lava Maker, but it's basically the Crucible from TE
	rocAddLavaMakerRecipe = function(input, output, temperature, energy){
		var recipes = RoCRM.RecipesLavaMaker.getRecipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if (output instanceof FluidStack) output = output.constructStack();
		else if(stringOrNumber(output)) output = new FluidStack(output).constructStack();
		if(typeof temperature != "number") throw("rocAddLavaMakerRecipe: temperature must be a number.");
		if(typeof energy != "number") throw("rocAddLavaMakerRecipe: energy must be a number.");
		recipes.addRecipe(input, output, temperature, energy);

	};

	rocAddFrictionHeaterRecipe = function(input, output, temperature){
		var recipes = RoCRM.RecipesFrictionHeater.getRecipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof temperature != "number") throw("rocAddFrictionHeaterRecipe: temperature must be a number.");
		recipes.addRecipe(input, output, temperature);
	};

	rocAddExtractorRecipe = function(input, output, experience){
		var recipes = RoCRM.RecipesExtractor.recipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof experience != "number") experience = 0.0;
		recipes.addRecipe(input, output, experience);
	};

	rocAddDryingBedRecipe = function(fluid, amount, output){
		var recipes = RoCRM.RecipesDryingBed.recipes();
		if (fluid instanceof __fluidStack) fluid = fluid.getFluid();
		else if(stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof amount != "number") throw("rocAddDryingBedRecipe: amount must be a number.");
		recipes.addRecipe(fluid, output, experience);
	};

	rocAddCrystallizerRecipe = function(fluid, amount, output){
		var recipes = RoCRM.RecipesCrystallizer.getRecipes();
		if (fluid instanceof __fluidStack) fluid = fluid.getFluid();
		else if(stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof amount != "number") throw("rocAddDryingBedRecipe: amount must be a number.");
		recipes.addRecipe(fluid, output, experience);
	};

	rocAddCompactorRecipe = function(input, output, experience, pressure, temperature){
		var recipes = RoCRM.RecipesCompactor.getRecipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof experience != "number") experience = 0.0;
		if(typeof pressure != "number") throw("rocAddCompactorRecipe: pressure must be a number.");
		if(typeof temperature != "number") throw("rocAddCompactorRecipe: temperature must be a number.");
		recipes.addRecipe(input, output, experience, pressure, temperature);
	};

	rocAddCentrifugeRecipe = function(input, fluidStack, outputs){
		var recipes = RoCRM.RecipesCentrifuge.recipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if (fluidStack instanceof FluidStack) fluidStack = fluidStack.constructStack();
		else if(stringOrNumber(fluidStack)) fluidStack = new FluidStack(fluidStack).constructStack();
		if(!outputs instanceof Array) outputs = [outputs];
		for(var i = 0; i<outputs.length; i++){
			if (outputs[i] instanceof ItemStack) outputs[i] = outputs[i].constructStack();
			if(canBecomeStack(outputs[i])) outputs[i] = new ItemStack(outputs[i]).constructStack();
			else if(isOreDict(outputs[i])) outputs[i] = getOres(outputs[i])[0];
		}
		outputs = javaArray(__itemStack, outputs);
		recipes.addRecipe(input, fluidStack, outputs)
	};

	// There is no rocRemoveBlastFurnaceRecipe for this one since the storage objects for recipes are "ImmutableList"s
	// inputs is a addShapedRecipe-esque kinda thing
	rocAddBlastFurnaceRecipe = function(output, temperature, speed, experience, inputs){
		var recipes = RoCRM.RecipesBlastFurnace.getRecipes();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof experience != "number") experience = 0.0;
		if(typeof speed != "number") throw("rocAddBlastFurnaceRecipe: speed must be a number.");
		if(typeof temperature != "number") throw("rocAddBlastFurnaceRecipe: temperature must be a number.");
		if(!inputs instanceof Array) inputs = [inputs];
		for(var i = 0; i<inputs.length; i++){
			if (inputs[i] instanceof ItemStack) inputs[i] = inputs[i].constructStack();
			if(canBecomeStack(inputs[i])) inputs[i] = new ItemStack(inputs[i]).constructStack();
			else if(isOreDict(inputs[i])) inputs[i] = getOres(inputs[i])[0];
		}
		inputs = objectArray(inputs);
		recipes.add3x3Crafting(output, temperature, speed, experience, inputs);
	};

	// This should do it for all of the RotaryCraft machines...
	// Chromaticraft seems to be the only other mod that has custom recipes, but it looks like a bit of a mess.





})();