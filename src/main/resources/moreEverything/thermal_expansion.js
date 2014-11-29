// Thermal Expansion support
// By justastranger
// Written with Thermal Expansion 4.0.0B6-16 for 1.7.10


// Script mostly tested

var teAPI = Packages.thermalexpansion.util;
var teCrafting = teAPI.crafting;
var teAddPulverizerRecipe;
var teAddFurnaceRecipe;
var teAddOreDictFurnaceRecipe;
var teAddSawmillRecipe;
var teAddCrucibleRecipe;
var teAddOreDictCrucibleRecipe;
var teAddSmelterBlastOreRecipe;
var teAddSmelterRecipe;
var teAddFillRecipe;
var teAddExtractRecipe;

(function(){
    teAddPulverizerRecipe = function(energy, input, output, bonus, chance, overwrite){ // Overwrite will default to false
        overwrite = !!overwrite;
        if(!energy) throw("teAddPulverizerRecipe: energy must be a positive number.");
        if(typeof input == "string") {
            input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddPulverizerRecipe: input must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddPulverizerRecipe: output must be a string or ItemStack");
        }
        if(typeof bonus == "string") {
            bonus = bonus.indexOf(':') ? newItemStack(bonus) : getOres(bonus)[0];
        } else if(!isJavaClass(bonus, __itemStack)) {
            bonus = null;
        }
        chance = chance ? chance : 0;
        teCrafting.PulverizerManager.addRecipe(energy, input, output, bonus, chance, overwrite)
    };
    teAddFurnaceRecipe = function(energy, input, output, overwrite){
        energy = energy ? energy : 1600; // 1600 seems to be the default?
        if(typeof input == "string") {
            input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddFurnaceRecipe: input must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddFurnaceRecipe: output must be a string or ItemStack");
        }
        overwrite = !!overwrite; // hooray for double negatives!
        teCrafting.FurnaceManager.addRecipe(energy, input, output, overwrite);
    };
    teAddOreDictFurnaceRecipe = function(energy, strInput, output){
        energy = energy ? energy : 1600; // Again, 1600 seems to be the default?
        if(typeof strInput != "string") throw("teAddOreDictFurnaceRecipe: strInput must be a string!");
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddFurnaceRecipe: output must be a string or ItemStack");
        }
        teCrafting.FurnaceManager.addOreDictRecipe(energy, strInput, output);
    };
    teAddSawmillRecipe = function (energy, input, output, bonus, chance, overwrite) {
        energy = energy ? energy : 800; // Default for logs seems to be 800?
        if(typeof input == "string") {
            input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddPulverizerRecipe: input must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddPulverizerRecipe: output must be a string or ItemStack");
        }
        if(typeof bonus == "string") {
            bonus = bonus.indexOf(':') ? newItemStack(bonus) : getOres(bonus)[0];
        } else if(!isJavaClass(bonus, __itemStack)) {
            bonus = null;
        }
        chance = chance ? chance : 0;
        overwrite = !!overwrite;
        teCrafting.SawmillManager.addRecipe(energy, input, output, bonus, chance, overwrite);
    };
    teAddCrucibleRecipe = function(energy, input, fluid, overwrite){
        if(!energy) throw("teAddCrucibleRecipe: energy must be a number.");
        if(typeof input == "string") {
            input = (input.indexOf(':')>0) ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddPulverizerRecipe: input must be a string or ItemStack");
        }
        if(stringOrNumber(fluid)) {
            fluid = newFluidStack(fluid, 1000);
        } else if(!isJavaClass(fluid, __fluidStack)) {
            throw("teAddPulverizerRecipe: fluid must be a string or FluidStack");
        }
        overwrite = !!overwrite;
        teCrafting.CrucibleManager.addRecipe(energy, input, fluid, overwrite);
    };
    teAddOreDictCrucibleRecipe = function(energy, strInput, amount, fluid){
        if(!energy) throw("teAddOreDictCrucibleRecipe: energy must be a number.");
        if(!typeof strInput == "string") throw("teAddOreDictCrucibleRecipe: strInput must be a string.");
        amount = amount ? amount : 1;
        if(stringOrNumber(fluid)) {
            fluid = newFluidStack(fluid, 1000);
        } else if(!isJavaClass(fluid, __fluidStack)) {
            throw("teAddOreDictCrucibleRecipe: fluid must be a string or FluidStack");
        }
        teCrafting.CrucibleManager.addOreDictionaryRecipe(energy, strInput, amount, fluid);
    };
    teAddSmelterRecipe = function(energy, input1, input2, output, bonus, chance, overwrite){
        if(!energy) throw("teAddSmelterRecipe: energy must be a number.");
        if(typeof input1 == "string") {
            input1 = input1.indexOf(':') ? newItemStack(input1) : getOres(input1)[0];
        } else if(!isJavaClass(input1, __itemStack)) {
            throw("teAddPulverizerRecipe: input1 must be a string or ItemStack");
        }
        if(typeof input2 == "string") {
            input2 = input2.indexOf(':') ? newItemStack(input2) : getOres(input2)[0];
        } else if(!isJavaClass(input2, __itemStack)) {
            throw("teAddPulverizerRecipe: input2 must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddPulverizerRecipe: output must be a string or ItemStack");
        }
        if(bonus != undefined){
            if(typeof bonus == "string") {
                bonus = bonus.indexOf(':') ? newItemStack(bonus) : getOres(bonus)[0];
            }
        } else {
            bonus = null;
            chance = 0
        }
        overwrite = !!overwrite;
        teCrafting.SmelterManager.addRecipe(energy, input1, input2, output, bonus, chance, overwrite);
    };
    teAddSmelterBlastOreRecipe = function(strInput){
        var titleCase = strInput.substring(0, 1).toUpperCase() + strInput.substring(1);
        if(!getOres("ingot"+titleCase)) return false;
        teCrafting.SmelterManager.addBlastOreRecipe(strInput);
    };
    teAddFillRecipe = function(energy, input, output, fluid, extract, overwrite){
        if(!energy) throw("teAddFillRecipe: energy must be a positive number.");
        if(typeof input == "string") {
            input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddFillRecipe: input must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddFillRecipe: output must be a string or ItemStack");
        }
        if(stringOrNumber(fluid)) {
            fluid = newFluidStack(fluid, 1000);
        } else if(!isJavaClass(fluid, __fluidStack)) {
            throw("teAddFillRecipe: fluid must be a string or FluidStack");
        }
        extract = !!extract;
        overwrite = !!overwrite;
        teCrafting.TransposerManager.addTEFillRecipe(energy, input, output, fluid, extract, overwrite);
    };
    teAddExtractRecipe = function(energy, input, output, chance, fluid, fill, overwrite){
        if(!energy) throw("teAddFillRecipe: energy must be a positive number.");
        if(typeof input == "string") {
            input = input.indexOf(':') ? newItemStack(input) : getOres(input)[0];
        } else if(!isJavaClass(input, __itemStack)) {
            throw("teAddFillRecipe: input must be a string or ItemStack");
        }
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            chance = 0;
            output = null;
        }
        if(stringOrNumber(fluid)) {
            fluid = newFluidStack(fluid, 1000);
        } else if(!isJavaClass(fluid, __fluidStack)) {
            throw("teAddFillRecipe: fluid must be a string or FluidStack");
        }
        fill = !!fill;
        overwrite = !!overwrite;
        teCrafting.TransposerManager.addTEExtractionRecipe(energy, input, output, fluid, chance, fill, overwrite);
    };

    log("Thermal expansion... how embarrassing.");

})();
