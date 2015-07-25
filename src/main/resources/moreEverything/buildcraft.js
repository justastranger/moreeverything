// Buildcraft support
// by justastranger
// Written with Buildcraft 6.1.7

// TODO rewrite for BC7

// Buildcraft is nice because it lets you remove recipes.

var bcAPI = Packages.buildcraft.api;
var bcRecipeRegistry = bcAPI.recipes.BuildcraftRecipeRegistry;

var bcAddRefinery1to1Recipe;
var bcAddRefinery2to1Recipe;
var bcRemoveRefineryRecipe;
var bcAddAssemblyTableRecipe;
var bcRemoveAssemblyTableRecipe;
var bcAddFuel;
var bcAddCoolant;

(function(){

	if (!modList["BuildCraft|Core"]) return;

	bcAddRefinery1to1Recipe = function(id, input, output, energy, delay){
		// String id, FluidStack input, FluidStack output, int energy, int delay
		if (typeof id != "string") throw("bcAddRefineryRecipe: id must be a string."); // id = id.toString()?
		input = _lazyFluidStack(input);
		output = _lazyFluidStack(output);
		if (!energy) throw("bcAddRefineryRecipe: energy must be a number");
		if (!delay) throw("bcAddRefineryRecipe: delay must be a number");
		bcRecipeRegistry.refinery.addRecipe(id, input, output, energy, delay);
	};

	bcAddRefinery2to1Recipe = function(id, input1, input2, output, energy, delay){
		// String id, FluidStack input1, FluidStack input2, FluidStack output, int energy, int delay
		if (typeof id != "string") throw("bcAddRefineryRecipe: id must be a string."); // id = id.toString()
		input1 = _lazyFluidStack(input1);
		input2 = _lazyFluidStack(input2);
		output = _lazyFluidStack(output);
		if (!energy) throw("bcAddRefineryRecipe: energy must be a number");
		if (!delay) throw("bcAddRefineryRecipe: delay must be a number");
		bcRecipeRegistry.refinery.addRecipe(id, input1, input2, output, energy, delay);
	};

	bcRemoveRefineryRecipe = function(id){
		if (typeof id != "string") throw("bcRemoveRefineryRecipe: id must be a string.");
		bcRecipeRegistry.refinery.removeRecipe(id);
	};

	bcAddAssemblyTableRecipe = function(id, energyCost, output, inputs){
		if (typeof id != "string") throw("bcAddAssemblyTableRecipe: id must be a string.");
		if (typeof energyCost != "number") throw("bcAddAssemblyTableRecipe: energyCost must be a nunber.");
		output = _lazyStack(output);
		if (inputs instanceof Array){
			for (var i = 0; i < inputs.length; i++){
				inputs[i] = _lazyStack(inputs[i]);
			}
		} else {
			inputs = _lazyStack(inputs)
		}
		bcRecipeRegistry.assemblyTable.addRecipe(id, energyCost, output, inputs);
	};

	bcRemoveAssemblyTableRecipe = function(id){
		if (typeof id != "string") throw("bcRemoveAssemblyTableRecipe: id must be a string.");
		bcRecipeRegistry.assemblyTable.removeRecipe(id);
	};

	bcAddFuel = function(fluid, powerPerCycle, totalBurningTime){
		// No way to remove fuels.
		fluid = _lazyFluidStack(fluid);
		if (typeof powerPerCycle != "number") throw("bcAddFuel: powerPerCycle must be a number.");
		if (typeof totalBurningTime != "number") throw("bcAddFuel: totalBurningTime must be a number.");
		bcAPI.fuels.BuildcraftFuelRegistry.fuel.addFuel(fluid, powerPerCycle, totalBurningTime);
	};

	bcAddCoolant = function(fluid, degreesCoolingPerMB){
		// No way to remove coolants either.
		fluid = _lazyFluidStack(fluid);
		if (typeof degreesCoolingPerMB != "number") throw("bcAddCoolant: degreesCoolingPerMB must be a number.");
		bcAPI.fuels.BuildcraftFuelRegistry.coolant.addCoolant(fluid, degreesCoolingPerMB);
	};
	// Might not bother with the Integration Table, send a PR if you want I guess.

	log("Leaving massive holes in public servers since whenever");
})();