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
		energy = energy ? energy : 5000; // 5000 or something is the default?
		input = _lazyStack(input);
		output = _lazyStack(output);
		if(typeof bonus != "undefined")	bonus = _lazyStack(bonus);
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
		input = _lazyStack(input);
		output = _lazyStack(output);
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "FurnaceRecipe", nbt.constructCompound());
	};
	teAddSawmillRecipe = function(energy, input, output, bonus, chance, overwrite){
		energy = energy ? energy : 800; // Default for logs seems to be 800?
		input = _lazyStack(input);
		output = _lazyStack(output);
		bonus = _lazyStack(bonus);
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
		input = _lazyStack(input);
		fluid = _lazyFluidStack(fluid);
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("output", fluid)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "CrucibleRecipe", nbt.constructCompound());
	};
	teAddSmelterRecipe = function(energy, input1, input2, output, bonus, chance, overwrite){
		if (!energy) throw("teAddSmelterRecipe: energy must be a number.");
		bonus = bonus ? bonus : null;
		overwrite = !!overwrite;
		input1 = _lazyStack(input1);
		input2 = _lazyStack(input2);
		output = _lazyStack(output);
		if (bonus != undefined){
			bonus = _lazyStack(bonus);
		} else {
			bonus = null;
			chance = null;
		}
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
		input = _lazyStack(input);
		output = _lazyStack(output);
		fluid = _lazyFluidStack(fluid);
		overwrite = !!overwrite;
		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("fluid", fluid)
			.setItemStack("output", output).setBoolean("overwrite", overwrite);
		sendIMCMessage(TE, "TransposerFillRecipe", nbt.constructCompound());
	};
	teAddExtractRecipe = function(energy, input, output, chance, fluid, fill, overwrite){
		if (!energy) throw("teAddFillRecipe: energy must be a positive number.");
		input = _lazyStack(input);
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).getStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			chance =null;
			output = null;
		}
		fluid = _lazyFluidStack(fluid);
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
		input1 = _lazyStack(input1);
		input2 = _lazyStack(input2);
		output1 = _lazyStack(output1);
		chance = chance ? chance : 0;
		if (typeof output2 != undefined){ // Check to see if they only wanted one output
			output2 = _lazyStack(output2);
		} else {
			output2 = null;
			chance = null;
		}
		overwrite = !!overwrite; // !!undefined == false, that way they don't HAVE to specify it if they don't want to overwrite anything.
		var temp = new NBTTagCompound();
		temp.setBoolean("overwrite", overwrite).setInteger("energy", energy)
			.setItemStack("primaryInput", input1).setItemStack("secondaryInput", input2)
			.setItemStack("primaryOutput", output1);
		if (output2 != null){
			temp.setItemStack("secondaryOutput", output2);
			if(chance > 0) temp.setInteger("secondaryChance", chance);
		}
		sendIMCMessage(TE, "InsolatorRecipe", temp);
	};


	log("Thermal expansion... how embarrassing.");

})();
