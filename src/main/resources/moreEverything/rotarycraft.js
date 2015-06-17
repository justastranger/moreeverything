// Support for Rotarycraft
// By justastranger
// Written with RotaryCraft v3d for 1.7.10
// Being rewritten for whatever version is on github as of 17/06/2015 for 1.7.10

// RoCRM should be deprecated by the time this file is finished with its rewrite.
var RoCRM = Packages.Reika.RotaryCraft.Auxiliary.RecipeManagers;
var FieldUtils = new JavaImporter("org.apache.commons.lang3.reflect.FieldUtils");

// TODO test this stuff.....

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
// One thing I'm thankful to Reika about is that there's an ItemHashMap.remove(ItemStack is) method
//   for lazy people. It's going to find a lot of use here.

var rocRemoveGrinderRecipe;
var rocRemovePulseFurnaceRecipe;
var rocRemoveLavaMakerRecipe;
var rocRemoveFrictionHeaterRecipeByInput; // You can retrieve the recipe via input OR output
var rocRemoveFrictionHeaterRecipeByOutput;
var rocRemoveExtractorRecipe;
var rocRemoveDryingBedRecipe;
var rocRemoveCrystallizerRecipe;
var rocRemoveCompactorRecipe;
var rocRemoveCentrifugeRecipe;

(function(){

	var Class = Java.type("java.lang.Class");

	var grinderRecipes;
	var pulseFurnaceRecipes;
	var extractorRecipes;

	var lavaMakerRecipes;
	var MeltingRecipeConstructor;

	var compactorRecipes;
	var CompactingRecipeConstructor;

	var frictionHeaterRecipes;
	var frictionHeaterOutputs;
	var FrictionRecipeConstructor;

	var dryingBedBase;
	var dryingRecipeMethod;
	var crystallizerBase;
	var crystallizerRecipeMethod;


	// Reflection to allow manipulation of Reika's fancy shmancy immutables
	// It's going to be a lot of copypasting... :\
	// Class.forName should be accessible to us, use it to reach the Class<?> objects which can be used to get the recipe Bases
	// After that, we have the recipe Base, all that needs doing after that is retrieving the "one way" item maps and
	//   disabling the oneway field, which allows overwriting of values
	// Thanks to Apache and their wonderful reflection tools, and thanks to whoever decided to make it a default Forge library.
	// And, Reika, until you allow full, unconditional control over a person's own minecraft instance, I won't stop working on this.
	function init(){
		// Retrieve the Class<?> object
		var grinderClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesGrinder");
		// Reflect our way to the RecipeBase/Instance object
		var grinderBase = readDeclaredStaticField(grinderClass, "GrinderBase", true);
		// Use said object to reflect into the recipe ItemHashMap
		grinderRecipes = readDeclaredField(grinderBase, "recipes", true);
		// Disable the oneway nature of said Map
		writeField(grinderRecipes, "oneway", false, true);

		// Do it again for another machine
		var puleFurnaceClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesPulseFurnace");
		var PulseFurnaceBase = readDeclaredStaticField(puleFurnaceClass, "PulseFurnaceBase", true);
		pulseFurnaceRecipes = readDeclaredField(PulseFurnaceBase, "recipes", true);
		writeField(pulseFurnaceRecipes, "oneway", false, true);

		// the Lava Maker is a little more annoying, having a private nested class.
		// Java.type can not access private internal classes, but using reflection, access to it can be achieved.
		var lavaMakerClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesLavaMaker");
		var lavaMakerBase = readDeclaredStaticField(lavaMakerClass, "recipes", true);
		lavaMakerRecipes = readDeclaredField(lavaMakerBase, "recipeList", true);
		writeField(lavaMakerRecipes, "oneway", false, true);
		// we can access the constructor of MeltingRecipe since we know its parameters
		// A private inner class should be accessible from an instance of the class containing it
		// lavaMakerClass->lavaMakerBase->MeltingRecipe.class->getDeclaredConstructor
		MeltingRecipeConstructor = lavaMakerBase.MeltingRecipe.class.getDeclaredConstructor(__itemStack, __fluidStack, __int, __long);
		// And make it accessible
		MeltingRecipeConstructor.setAccessible(true);

		// Why is the Friction Heater so special? 4 ItemHashMaps, all of which are "one way"...
		// Only two of those ItemHashMaps are important, however. The other two are the "custom recipe" versions,
		//   which we're ignoring in favor of the originals.
		// The Friction Heater has a nested class, but it's public with a private constructor making it easier to reflect with.
		var frictionHeaterClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesFrictionHeater");
		var frictionHeaterBase = readDeclaredStaticField(frictionHeaterClass, "instance", true);
		frictionHeaterRecipes = readDeclaredField(frictionHeaterBase, "recipes", true);
		frictionHeaterOutputs = readDeclaredField(frictionHeaterBase, "outputs", true);
		// We aren't going to hook through an instance of frictionHeaterClass since FrictionRecipe is a public class
		var frictionRecipeClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesFrictionHeater$FrictionRecipe");
		// We still need to divine the constructor, since it's private.
		var FrictionRecipeConstructor = frictionRecipeClass.getDeclaredConstructor(__itemStack, __itemStack, __int);
		FrictionRecipeConstructor.setAccessible(true);

		var extractorClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesExtractor");
		var extractorBase = readDeclaredStaticField(extractorClass, "instance", true);
		extractorRecipes = readDeclaredField(extractorBase, "recipeList", true);
		writeField(extractorRecipes, "oneway", false, true);

		// The drying bed continues to use completely immutable Maps, but we can at least force access to the AddRecipe method.
		// Retrieve the class
		var dryingBedClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesDryingBed");
		// Retrieve the recipe Base
		dryingBedBase = readDeclaredStaticField(dryingBedClass, "DryingBase", true);
		// Retrieve the Method using known parameters.
		dryingRecipeMethod = dryingBedBase.getDeclaredMethod("addRecipe", __fluid, __int, __itemStack);
		// Make it accessible
		dryingRecipeMethod.setAccessible(true);

		// The Crystallizer is in the same boat as the Drying Bed
		var crystallizerClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesCrystallizer");
		crystallizerBase = readDeclaredStaticField(crystallizerClass, "CrystallizerBase", true);
		crystallizerRecipeMethod = dryingBedBase.getDeclaredMethod("addRecipe", __fluid, __int, __itemStack);
		crystallizerRecipeMethod.setAccessible(true);

		// The compactor uses an ItemHashMap, so we can go back to our normal reflection routine.
		// Has a private nested class with a private constructor.
		var compactorClass = Class.forName("Reika.RotaryCraft.Auxiliary.RecipeManagers.RecipesCompactor");
		var compactorBase = readDeclaredStaticField(compactorClass, "CompactorBase", true);
		compactorRecipes = readDeclaredField(compactorBase, "recipes", true);
		writeField(compactorRecipes, "oneway", false, true);
		CompactingRecipeConstructor = compactorBase.CompactingRecipe.class.getDeclaredConstructor(__itemStack, __itemStack, __int, __int);
		CompactingRecipeConstructor.setAccessible(true);


	}
	init();

	function isItemName(thing){
		return !!(typeof thing == "string" && thing.indexOf(":") > 0);
	}

	function isOreDict(thing){
		return !!(typeof thing == "string" && thing.indexOf(":") < 1);
	}

	// These functions overwrite any recipes sharing the same input
	// This can cause blanket overwrites if using an oreDict entry.
	// You have been warned.
	rocAddGrinderRecipe = function(input, output){
		var oreDict;
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) oreDict = true;
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (!!oreDict){
			for(var i = 0; i < getOres(input); i++){
				grinderRecipes.put(input[i], output)
			}
		} else {
			grinderRecipes.put(input, output);
		}
	};

	rocAddPulseFurnaceRecipe = function(input, output){
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		pulseFurnaceRecipes.put(input, output);
	};

	// It may be called the Lava Maker, but it's basically the Crucible from TE
	rocAddLavaMakerRecipe = function(input, output, temperature, energy){
		if (input instanceof ItemStack) input = input.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (output instanceof FluidStack) output = output.constructStack();
		else if (stringOrNumber(output)) output = new FluidStack(output).constructStack();
		if (typeof temperature != "number") throw("rocAddLavaMakerRecipe: temperature must be a number.");
		if (typeof energy != "number") throw("rocAddLavaMakerRecipe: energy must be a number.");
		// At this point, we should have everything needed to construct a new MeltingRecipe
		var MeltingRecipe = MeltingRecipeConstructor.newInstance(input, output, temperature, energy);
		lavaMakerRecipes.put(input, MeltingRecipe);
	};

	rocAddFrictionHeaterRecipe = function(input, output, temperature){
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof temperature != "number") throw("rocAddFrictionHeaterRecipe: temperature must be a number.");
		var recipe = FrictionRecipeConstructor.newInstance(input, output, temperature);
		frictionHeaterRecipes.put(input, recipe);
		frictionHeaterOutputs.put(output, recipe);
	};

	rocAddExtractorRecipe = function(input, output, experience){
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof experience != "number") experience = 0.0;
		extractorRecipes.put(input, output);
	};

	// The drying bed remains nearly as is.
	rocAddDryingBedRecipe = function(fluid, amount, output){
		if (fluid instanceof __fluidStack) fluid = fluid.getFluid();
		else if (stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof amount != "number") throw("rocAddDryingBedRecipe: amount must be a number.");
		dryingRecipeMethod.invoke(dryingBedBase, fluid, amount, output);
	};

	// Crystallizer too
	rocAddCrystallizerRecipe = function(fluid, amount, output){
		if (fluid instanceof __fluidStack) fluid = fluid.getFluid();
		else if (stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof amount != "number") throw("rocAddDryingBedRecipe: amount must be a number.");
		crystallizerRecipeMethod.invoke(crystallizerBase, fluid, amount, output);
	};

	rocAddCompactorRecipe = function(input, output, pressure, temperature){
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof pressure != "number") throw("rocAddCompactorRecipe: pressure must be a number.");
		if (typeof temperature != "number") throw("rocAddCompactorRecipe: temperature must be a number.");
		var recipe = CompactingRecipeConstructor.newInstance(input, output, pressure, temperature);
		compactorRecipes.put(input, recipe);
	};

	rocAddCentrifugeRecipe = function(input, fluidStack, outputs){
		var recipes = RoCRM.RecipesCentrifuge.recipes();
		if (input instanceof ItemStack) input = input.constructStack();
		if (isItemName(input)) input = new ItemStack(input).constructStack();
		else if (isOreDict(input)) input = getOres(input)[0];
		if (fluidStack instanceof FluidStack) fluidStack = fluidStack.constructStack();
		else if (stringOrNumber(fluidStack)) fluidStack = new FluidStack(fluidStack).constructStack();
		if (!outputs instanceof Array) outputs = [outputs];
		for (var i = 0; i < outputs.length; i++){
			if (outputs[i] instanceof ItemStack) outputs[i] = outputs[i].constructStack();
			if (isItemName(outputs[i])) outputs[i] = new ItemStack(outputs[i]).constructStack();
			else if (isOreDict(outputs[i])) outputs[i] = getOres(outputs[i])[0];
		}
		outputs = javaArray(__itemStack, outputs);
		recipes.addRecipe(input, fluidStack, outputs)
	};

	// There is no rocRemoveBlastFurnaceRecipe for this one since the storage objects for recipes are "ImmutableList"s
	// inputs is a addShapedRecipe-esque kinda thing
	rocAddBlastFurnaceRecipe = function(output, temperature, speed, experience, inputs){
		var recipes = RoCRM.RecipesBlastFurnace.getRecipes();
		if (output instanceof ItemStack) output = output.constructStack();
		if (isItemName(output)) output = new ItemStack(output).constructStack();
		else if (isOreDict(output)) output = getOres(output)[0];
		if (typeof experience != "number") experience = 0.0;
		if (typeof speed != "number") throw("rocAddBlastFurnaceRecipe: speed must be a number.");
		if (typeof temperature != "number") throw("rocAddBlastFurnaceRecipe: temperature must be a number.");
		if (!inputs instanceof Array) inputs = [inputs];
		for (var i = 0; i < inputs.length; i++){
			if (inputs[i] instanceof ItemStack) inputs[i] = inputs[i].constructStack();
			if (isItemName(inputs[i])) inputs[i] = new ItemStack(inputs[i]).constructStack();
			else if (isOreDict(inputs[i])) inputs[i] = getOres(inputs[i])[0];
		}
		inputs = objectArray(inputs);
		recipes.add3x3Crafting(output, temperature, speed, experience, inputs);
	};

	// This should do it for all of the RotaryCraft machines...
	// Chromaticraft seems to be the only other mod that has custom recipes, but it looks like a bit of a mess.


})();