// Thermal Expansion support
// By justastranger
// Written with Thermal Expansion 4.0.0RC3-132 for 1.7.10


// Script mostly tested
// Will be documented whenever the hell I get around to it.
// New in later versions of TE is the ability to remove recipes over IMC

// TODO add recipe removal functions

var TE = "ThermalExpansion";

var teAddPulverizerRecipe;
var teAddFurnaceRecipe;
var teAddSawmillRecipe;
var teAddCrucibleRecipe;
var teAddOreDictCrucibleRecipe;
var teAddSmelterBlastOreRecipe;
var teAddSmelterRecipe;
var teAddFillRecipe;
var teAddExtractRecipe;

(function(){

	if (!modList.ThermalExpansion) return;

	teAddPulverizerRecipe = function(energy, input, output, bonus, chance, overwrite){ // Overwrite will default to false
		overwrite = !!overwrite;
		if (!energy) throw("teAddPulverizerRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':') ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? new ItemStack(bonus).constructStack() : getOres(bonus)[0];
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
			input = input.indexOf(':') ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFurnaceRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
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
			input = input.indexOf(':') ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? new ItemStack(bonus).constructStack() : getOres(bonus)[0];
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
			input = (input.indexOf(':') > 0) ? new ItemStack(input).constructStack() : getOres(input)[0];
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
			input1 = input1.indexOf(':') > 0 ? new ItemStack(input1).constructStack() : getOres(input1)[0];
		} else if (!input1 instanceof __itemStack){
			throw("teAddPulverizerRecipe: input1 must be a string or ItemStack");
		}
		if (typeof input2 == "string"){
			input2 = input2.indexOf(':') > 0 ? new ItemStack(input2).constructStack() : getOres(input2)[0];
		} else if (!input2 instanceof __itemStack){
			throw("teAddPulverizerRecipe: input2 must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).constructStack() : getOres(output)[0];
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
			input = input.indexOf(':') > 0 ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).constructStack() : getOres(output)[0];
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
			input = input.indexOf(':') > 0 ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') > 0 ? new ItemStack(output).constructStack() : getOres(output)[0];
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


	log("Thermal expansion... how embarrassing.");

})();
