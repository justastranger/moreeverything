// Thermal Expansion support
// By justastranger
// Written with Thermal Expansion 4.0.0B6-16 for 1.7.10

var teAPI = Packages.thermalexpansion.util;
var teCrafting = teAPI.crafting;
var teAddPulverizerRecipe;
var teAddFurnaceRecipe;
var teAddOreDictFurnaceRecipe;


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
        chance = chance ? chance : 0
        teCrafting.PulverizerManager.addRecipe(energy, input, output, bonus, chance, overwrite)
    }
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
    }
    teAddOreDictFurnaceRecipe = function(energy, strInput, output){
        energy = energy ? energy : 1600; // Again, 1600 seems to be the default?
        if(typeof strInput != "string") throw("teAddOreDictFurnaceRecipe: strInput must be a string!");
        if(typeof output == "string") {
            output = output.indexOf(':') ? newItemStack(output) : getOres(output)[0];
        } else if(!isJavaClass(output, __itemStack)) {
            throw("teAddFurnaceRecipe: output must be a string or ItemStack");
        }
        teCrafting.FurnaceManager.addOreDictRecipe(energy, strInput, output);
    }
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
        chance = chance ? chance : 0
        overwrite = !!overwrite;
        teCrafting.SawmillManager.addRecipe(energy, input, output, bonus, chance, overwrite);
    }


})();
