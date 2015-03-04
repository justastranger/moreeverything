// Thermal Expansion support
// By justastranger
// Written with Thermal Expansion 4.0.0B6-16 for 1.7.10


// Script mostly tested

var teAPI = Packages.cofh.thermalexpansion.util;
var teCrafting = teAPI.crafting;
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

var testerino;

(function(){

	if(!modList.ThermalExpansion) return;

	teAddPulverizerRecipe = function(energy, input, output, bonus, chance, overwrite){ // Overwrite will default to false
		overwrite = !!overwrite;
		if (!energy) throw("teAddPulverizerRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? newItemStack(bonus) : getOres(bonus)[0];
		} else if (bonus != null && !isJavaClass(bonus, __itemStack)){
			bonus = null;
		}
		chance = chance ? chance : 0;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		if(!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if(!!chance) nbt.setInteger("secondaryChance", chance);
		testerino = nbt.constructCompound();
		sendIMCMessage("ThermalExpansion", "PulverizerRecipe", nbt.constructCompound());
		//teCrafting.PulverizerManager.addRecipe(energy, input, output, bonus, chance, overwrite)
	};
	teAddFurnaceRecipe = function(energy, input, output, overwrite){
		energy = energy ? energy : 1600; // 1600 seems to be the default?
		if (typeof input == "string"){
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddFurnaceRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			throw("teAddFurnaceRecipe: output must be a string or ItemStack");
		}
		overwrite = !!overwrite; // hooray for double negatives!

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage("ThermalExpansion", "FurnaceRecipe", nbt.constructCompound());
		//teCrafting.FurnaceManager.addRecipe(energy, input, output, overwrite);
	};
	teAddSawmillRecipe = function(energy, input, output, bonus, chance, overwrite){
		energy = energy ? energy : 800; // Default for logs seems to be 800?
		if (typeof input == "string"){
			input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (typeof bonus == "string"){
			bonus = bonus.indexOf(':') ? newItemStack(bonus) : getOres(bonus)[0];
		} else if (bonus != null && !isJavaClass(bonus, __itemStack)){
			bonus = null;
		}
		chance = chance ? chance : 0;
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setItemStack("primaryOutput", output)
			.setBoolean("overwrite", overwrite);
		if(!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if(!!chance) nbt.setInteger("secondaryChance", chance);
		sendIMCMessage("ThermalExpansion", "SawmillRecipe", nbt.constructCompound());
		//teCrafting.SawmillManager.addRecipe(energy, input, output, bonus, chance, overwrite);
	};
	teAddCrucibleRecipe = function(energy, input, fluid, overwrite){
		if (!energy) throw("teAddCrucibleRecipe: energy must be a number.");
		if (typeof input == "string"){
			input = (input.indexOf(':') > 0) ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddPulverizerRecipe: input must be a string or ItemStack");
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (!isJavaClass(fluid, __fluidStack)){
			throw("teAddPulverizerRecipe: fluid must be a string or FluidStack");
		}
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("output", fluid)
			.setBoolean("overwrite", overwrite);
		sendIMCMessage("ThermalExpansion", "CrucibleRecipe", nbt.constructCompound());
		//teCrafting.CrucibleManager.addRecipe(energy, input, fluid, overwrite);
	};
	teAddSmelterRecipe = function(energy, input1, input2, output, bonus, chance, overwrite){
		if (!energy) throw("teAddSmelterRecipe: energy must be a number.");
		if (typeof input1 == "string"){
			input1 = input1.indexOf(':')>0 ? newItemStack(input1) : getOres(input1)[0];
		} else if (!isJavaClass(input1, __itemStack)){
			throw("teAddPulverizerRecipe: input1 must be a string or ItemStack");
		}
		if (typeof input2 == "string"){
			input2 = input2.indexOf(':')>0 ? newItemStack(input2) : getOres(input2)[0];
		} else if (!isJavaClass(input2, __itemStack)){
			throw("teAddPulverizerRecipe: input2 must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':')>0 ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			throw("teAddPulverizerRecipe: output must be a string or ItemStack");
		}
		if (bonus != undefined){
			if (typeof bonus == "string"){
				bonus = bonus.indexOf(':')>0 ? newItemStack(bonus) : getOres(bonus)[0];
			}
		} else {
			bonus = null;
			chance = 0
		}
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("primaryInput", input1).setItemStack("secondaryInput", input2)
			.setItemStack("primaryOutput", output).setBoolean("overwrite", overwrite);
		if(!!bonus) nbt.setItemStack("secondaryOutput", bonus);
		if(!!chance) nbt.setInteger("secondaryChance", chance);
		sendIMCMessage("ThermalExpansion", "SmelterRecipe", nbt.constructCompound());
		//teCrafting.SmelterManager.addRecipe(energy, input1, input2, output, bonus, chance, overwrite);
	};
	teAddSmelterBlastOreRecipe = function(strInput){
		var titleCase = strInput.charAt(0).toUpperCase() + strInput.slice(1);
		if (!getOres("ingot"+titleCase)) return false;

		var nbt = new NBTTagCompound();
		nbt.setString("oreType", strInput);
		sendIMCMessage("ThermalExpansion", "SmelterBlastOreType", nbt.constructCompound());
		//teCrafting.SmelterManager.addBlastOreRecipe(strInput);
	};
	teAddFillRecipe = function(energy, input, output, fluid, overwrite){
		if (!energy) throw("teAddFillRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':')>0 ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':')>0 ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			throw("teAddFillRecipe: output must be a string or ItemStack");
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (!isJavaClass(fluid, __fluidStack)){
			throw("teAddFillRecipe: fluid must be a string or FluidStack");
		}
		//extract = !!extract;
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("fluid", fluid)
			.setItemStack("output", output).setBoolean("overwrite", overwrite);
		sendIMCMessage("ThermalExpansion", "TransposerFillRecipe", nbt.constructCompound());
		//teCrafting.TransposerManager.addTEFillRecipe(energy, input, output, fluid, extract, overwrite);
	};
	teAddExtractRecipe = function(energy, input, output, chance, fluid, fill, overwrite){
		if (!energy) throw("teAddFillRecipe: energy must be a positive number.");
		if (typeof input == "string"){
			input = input.indexOf(':')>0 ? newItemStack(input) : getOres(input)[0];
		} else if (!isJavaClass(input, __itemStack)){
			throw("teAddFillRecipe: input must be a string or ItemStack");
		}
		if (typeof output == "string"){
			output = output.indexOf(':')>0 ? newItemStack(output) : getOres(output)[0];
		} else if (!isJavaClass(output, __itemStack)){
			chance = 0;
			output = null;
		}
		if (stringOrNumber(fluid)){
			fluid = newFluidStack(fluid, 1000);
		} else if (!isJavaClass(fluid, __fluidStack)){
			throw("teAddFillRecipe: fluid must be a string or FluidStack");
		}
		fill = !!fill;
		overwrite = !!overwrite;

		var nbt = new NBTTagCompound();
		nbt.setInteger("energy", energy).setItemStack("input", input).setFluidStack("fluid", fluid)
			.setItemStack("output", output).setBoolean("overwrite", overwrite).setBoolean("reversible", fill)
			.setInteger("chance", chance);
		sendIMCMessage("ThermalExpansion", "TransposerExtractRecipe", nbt.constructCompound());
		//teCrafting.TransposerManager.addTEExtractionRecipe(energy, input, output, fluid, chance, fill, overwrite);
	};


	log("Thermal expansion... how embarrassing.");

})();
