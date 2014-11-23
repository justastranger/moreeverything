// Buildcraft support
// by justastranger
// Written with Buildcraft 6.1.7


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
	
	if(!modList["BuildCraft|Core"]) return;

	bcAddRefinery1to1Recipe = function(id, input, output, energy, delay) {
		// String id, FluidStack input, FluidStack output, int energy, int delay
		if (typeof id != "string") throw("bcAddRefineryRecipe: id must be a string."); // id = id.toString()
		if (stringOrNumber(input)) input = newFluidStack(input,10);
		if (stringOrNumber(output)) output = newFluidStack(output,10);
		if (!energy) throw("bcAddRefineryRecipe: energy must be a number");
		if (!delay) throw("bcAddRefineryRecipe: delay must be a number");
		bcRecipeRegistry.refinery.addRecipe(id, input, output, energy, delay);
	};

	bcAddRefinery2to1Recipe = function(id, input1, input2, output, energy, delay) {
		// String id, FluidStack input1, FluidStack input2, FluidStack output, int energy, int delay
		if (typeof id != "string") throw("bcAddRefineryRecipe: id must be a string."); // id = id.toString()
		if (stringOrNumber(input1)) input1 = newFluidStack(input1,10);
		if (stringOrNumber(input2)) input2 = newFluidStack(input2,10);
		if (stringOrNumber(output)) output = newFluidStack(output,20);
		if (!energy) throw("bcAddRefineryRecipe: energy must be a number");
		if (!delay) throw("bcAddRefineryRecipe: delay must be a number");
		bcRecipeRegistry.refinery.addRecipe(id, input1, input2, output, energy, delay);
	};

	bcRemoveRefineryRecipe = function(id) {
		if (typeof id != "string") throw("bcRemoveRefineryRecipe: id must be a string.");
		bcRecipeRegistry.refinery.removeRecipe(id);
	};

	bcAddAssemblyTableRecipe = function(id, energyCost, output, inputs) {
		if (typeof id != "string") throw("bcAddAssemblyTableRecipe: id must be a string.");
		if (typeof energyCost != "number") throw("bcAddAssemblyTableRecipe: energyCost must be a nunber.");
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (inputs instanceof Array) {
			for (var i = 0; i<inputs.length; i++) {
				if (typeof inputs[i] == "string") {
					if (inputs[i].indexOf(':')) {
						inputs[i] = newItemStack(inputs[i]);
					} else {
						inputs[i] = getOres(inputs[i])[0];
					}
				}
			}
		}
		if (typeof inputs == "string") {
			if (inputs.indexOf(':')) {
				inputs = newItemStack(inputs);
			} else {
				inputs = getOres(inputs)[0];
			}
		}
		bcRecipeRegistry.assemblyTable.addRecipe(id, energyCost, output, inputs);
	};

	bcRemoveAssemblyTableRecipe = function(id) {
		if (typeof id != "string") throw("bcRemoveAssemblyTableRecipe: id must be a string.");
		bcRecipeRegistry.assemblyTable.removeRecipe(id);
	};

	bcAddFuel = function(fluid, powerPerCycle, totalBurningTime) {
		// No way to remove fuels.
		if (stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (typeof powerPerCycle != "number") throw("bcAddFuel: powerPerCycle must be a number.");
		if (typeof totalBurningTime != "number") throw("bcAddFuel: totalBurningTime must be a number.");
		bcAPI.fuels.BuildcraftFuelRegistry.fuel.addFuel(fluid, powerPerCycle, totalBurningTime);
	};

	bcAddCoolant = function(fluid, degreesCoolingPerMB) {
		// No way to remove coolants either.
		if (stringOrNumber(fluid)) fluid = getFluid(fluid);
		if (typeof degreesCoolingPerMB != "number") throw("bcAddCoolant: degreesCoolingPerMB must be a number.");
		bcAPI.fuels.BuildcraftFuelRegistry.coolant.addCoolant(fluid, degreesCoolingPerMB);
	};
	// Not going to bother with the Integration Table...

	log("Leaving massive holes in public servers since 2011");
})();