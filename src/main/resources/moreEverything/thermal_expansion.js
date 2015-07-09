// Thermal Expansion support
// By justastranger
// Written with Thermal Expansion 4.0.0RC3-132 for 1.7.10


// Script mostly tested
// Will be documented whenever the hell I get around to it.
// New in later versions of TE is the ability to remove recipes over IMC

// Thermal Expansion now natively supports recipe addition and removal.
// As such, support is officially deprecated and has to be manually enabled in the config script.
// Elsewise, any calls to the provided functions log an error message.

var TE = "ThermalExpansion";

function teDeprecated(){
	log("Thermal Expansion support is deprecated.", logLevel.warning);
}

var teAddPulverizerRecipe = teDeprecated;
var teAddFurnaceRecipe = teDeprecated;
var teAddSawmillRecipe = teDeprecated;
var teAddCrucibleRecipe = teDeprecated;
var teAddOreDictCrucibleRecipe = teDeprecated;
var teAddSmelterBlastOreRecipe = teDeprecated;
var teAddSmelterRecipe = teDeprecated;
var teAddFillRecipe = teDeprecated;
var teAddExtractRecipe = teDeprecated;
var teAddInsolatorRecipe = teDeprecated;

var teRemovePulverizerRecipe;
var teRemoveFurnaceRecipe;
var teRemoveSawmillRecipe;
var teRemoveCrucibleRecipe;
var teRemoveOreDictCrucibleRecipe;
var teRemoveSmelterBlastOreRecipe;
var teRemoveSmelterRecipe;
var teRemoveFillRecipe;
var teRemoveExtractRecipe;
var teRemoveInsolatorRecipe;


(function(){

	if (!modList.ThermalExpansion || !optionalFeature.enable_thermal_expansion) return;

	teAddPulverizerRecipe = function(energy, input, output, bonus, chance, overwrite){ // Overwrite will default to false
		overwrite = !!overwrite;
		if (!energy) throw("teAddPulverizerRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':') ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? new ItemStack(bonus).getStack() : getOres(bonus)[0];
		} else if (!bonus instanceof __itemStack){
			bonus = null;
		}
		chance = chance ? chance : 0;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		if (!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if (!!chance) nbt.setInteger("secondaryChance", chance);
		sendIMCMessage(TE, "PulverizerRecipe", nbt.constructCompound());
	};
	teAddFurnaceRecipe = function(energy, input, output, overwrite){
		energy = energy ? energy : 1600; // 1600 seems to be the default?
		if (typeof input == "string"){
			input = input.indexOf(':') ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFurnaceRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddFurnaceRecipe: output must be a string or ItemStack");
		}
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "FurnaceRecipe", nbt.constructCompound());
	};
	teAddSawmillRecipe = function(energy, input, output, bonus, chance, overwrite){
		energy = energy ? energy : 800; // Default for logs seems to be 800?
		if (typeof input == "string"){
			input = input.indexOf(':') ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? new ItemStack(bonus).getStack() : getOres(bonus)[0];
		} else if (!bonus instanceof __itemStack){
			bonus = null;
		}
		chance = chance ? chance : 0;
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		if (!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if (!!chance) nbt.setInteger("secondaryChance", chance);
		sendIMCMessage(TE, "SawmillRecipe", nbt.constructCompound());
	};
	teAddCrucibleRecipe = function(energy, input, fluid, overwrite){
		if (!energy) throw("teAddCrucibleRecipe: energy must be a number.");
		if (typeof input == "string"){
			input = (input.indexOf(':') > 0) ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (!fluid instanceof __fluidStack){
			throw("teAddPulverizerRecipe: fluid must be a string or FluidStack");
		}
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("output", fluid)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "CrucibleRecipe", nbt.constructCompound());
	};
	teAddSmelterRecipe = function(energy, input1, input2, output, bonus, chance, overwrite){
		if (!energy) throw("teAddSmelterRecipe: energy must be a number.");
		if (typeof input1 == "string"){
			input1 = input1.indexOf(':') > 0 ? new ItemStack(input1).getStack() : getOres(input1)[0];
		} else if (!input1 instanceof __itemStack){
			throw("teAddPulverizerRecipe: input1 must be a string or ItemStack");
		}
		if (typeof input2 == "string"){
			input2 = input2.indexOf(':') > 0 ? new ItemStack(input2).getStack() : getOres(input2)[0];
		} else if (!input2 instanceof __itemStack){
			throw("teAddPulverizerRecipe: input2 must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (bonus != undefined){
			if (typeof bonus == "string"){
				bonus = bonus.indexOf(':') > 0 ? newItemStack(bonus) : getOres(bonus)[0];
			}
		} else {
			bonus = null;
			chance = 0
		}
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("primaryInput", input1).setItemStack("secondaryInput", input2)
			.setItemStack("primaryOutput", output).setBoolean("overwrite", overwrite);
		if (!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if (!!chance) nbt.setInteger("secondaryChance", chance);
		sendIMCMessage(TE, "SmelterRecipe", nbt.constructCompound());
	};
	teAddSmelterBlastOreRecipe = function(strInput){
		var titleCase = strInput.charAt(0).toUpperCase()+strInput.slice(1);
		if (!getOres("ingot"+titleCase)) return false;
		var nbt = new NBTTagCompound();
		nbt.setString("oreType", strInput);
		sendIMCMessage(TE, "SmelterBlastOreType", nbt.constructCompound());
	};
	teAddFillRecipe = function(energy, input, output, fluid, overwrite){
		if (!energy) throw("teAddFillRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':') > 0 ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddFillRecipe: output must be a string or ItemStack");
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (fluid instanceof __fluidStack){
			throw("teAddFillRecipe: fluid must be a string or FluidStack");
		}
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("fluid", fluid)
			.setItemStack("output", output).setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "TransposerFillRecipe", nbt.constructCompound());
	};
	teAddExtractRecipe = function(energy, input, output, chance, fluid, fill, overwrite){
		if (!energy) throw("teAddFillRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':') > 0 ? new ItemStack(input).getStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			chance = 0;
			output = null;
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (fluid instanceof __fluidStack){
			throw("teAddFillRecipe: fluid must be a string or FluidStack");
		}
		fill = !!fill;
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("fluid", fluid)
		   .setItemStack("output", output).setBoolean("overwrite", overwrite).setBoolean("reversible", fill)
		   .setInteger("chance", chance);
		sendIMCMessage(TE, "TransposerExtractRecipe", nbt.constructCompound());
	};
	teAddInsolatorRecipe = function(energy, input1, input2, output1, output2, chance, overwrite){
		// "Phytogenic Insolator"
		// Insolator requires water to function, perhaps make a feature request for custom liquids?
		if (!energy) throw("teAddInsolatorRecipe: energy must be a positive number.");
		if (typeof input1 == "string"){
			input1 = input1.indexOf(':') > 0 ? new ItemStack(input1).getStack() : getOres(input1)[0];
		} else if (!input1 instanceof __itemStack){
			throw("teAddInsolatorRecipe: input1 must be a string or ItemStack");
		}
		if (typeof input2 == "string"){
			input2 = input2.indexOf(':') > 0 ? new ItemStack(input2).getStack() : getOres(input2)[0];
		} else if (!input2 instanceof __itemStack){
			throw("teAddInsolatorRecipe: input2 must be a string or ItemStack");
		}
		if (typeof output1 == "string"){
			output1 = output1.indexOf(':') ? new ItemStack(output1).getStack() : getOres(output1)[0];
		} else if (!output1 instanceof __itemStack){
			throw("teAddInsolatorRecipe: output1 must be a string or ItemStack");
		}
		chance = chance ? chance : 0;
		if (typeof output2 == "string"){
			output2 = output2.indexOf(':') ? new ItemStack(output2).getStack() : getOres(output2)[0];
		} else if (!output2 instanceof __itemStack){
			log("teAddInsolatorRecipe: output2 is null");
			output2 = null;
			chance = 0;
		}
		overwrite = !!overwrite;
		var temp = new NBTTagCompound();
			temp.setBoolean("overwrite", overwrite).setInteger("energy", energy)
				.setItemStack("primaryInput", input1).setItemStack("secondaryInput", input2)
				.setItemStack("primaryOutput", output1);
		if(output2 != null){
			temp.setItemStack("secondaryOutput", output2);
			if(chance > 0) temp.setInteger("secondaryChance", chance);
		}
		sendIMCMessage(TE, "InsolatorRecipe", temp);
	};


	log("Thermal expansion... how embarrassing.");

})();
