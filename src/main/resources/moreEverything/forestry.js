// Forestry support
// By justastranger
// Written with Forestry 3.2.0.5 for 1.7.10

var forestryRecipes = Packages.forestry.api.recipes;

var forestryAddCarpenterRecipe;
var forestryAddCentrifugeRecipe;
var forestryAddFermenterRecipe;
var forestryAddMoistenerRecipe;
var forestryAddSqueezerRecipe;


(function(){

    var forestryRecipeManagers = forestryRecipes.RecipeManagers;

    /*
    *   timePerItem - number -  I think it's the number of ticks per operation
    *   liquid - FluidStack, name, ID, or null - It's an input, not an output.
    *   box - ItemStack, item name - Extra ItemStack that is consumed along with the recipe.
    *   output - ItemStack, item name, ore dictionary name - output
    *   recipe - Shaped Recipe-esque array, supports ItemStacks and OreDict names - Example: ["xxx", "xyx", "xxx", char('x'), newItemStack(item.coal), char('y'), "oreCoal"]
    * */
    forestryAddCarpenterRecipe = function(timePerItem, liquid, box, output, recipe){
        if(typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCarpenterRecipe: timePerItem must be a number.");
        if(!isJavaClass(liquid, __fluidStack) && stringOrNumber(liquid)) liquid = newFluidStack(liquid);
        if(typeof box == "undefined") box = null;
        if (typeof output == "string") {
            if (output.indexOf(':')>0){
                output = newItemStack(output);
            } else {
                output = getOres(output)[0];
            }
        }
        if(!(recipe instanceof Array)){
            throw("forestryAddCarpenterRecipe: recipe is invalid, it must be an Array.");
        }
        try {
            forestryRecipeManagers.carpenterManager.addRecipe(timePerItem, liquid, box, output, recipe);
            return true;
        } catch (e) {
            return false;
        }
    };

    // I have no idea if this actually works...
    forestryAddCentrifugeRecipe = function(timePerItem, input, outputs, chances) {
        if(typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddCentrifugeRecipe: timePerItem must be a number above 0.");
        if (typeof input == "string") {
            if (input.indexOf(':')>0){
                input = newItemStack(input);
            } else {
                input = getOres(input)[0];
            }
        }
        if(!outputs instanceof Array){
            outputs = [outputs];
            chances = [100];
        }
        if(outputs[0] instanceof Array){
            chances = [];
            for(var i = 0; i < outputs.length; i++){
                chances[i] = outputs[i][1];
                outputs[i] = outputs[i][0];
            }
        }
        if(((outputs instanceof Array) && (chances instanceof Array)) && (outputs.length != chances.length)) throw("forestryAddCentrifugeRecipe: length mismatch between outputs and chances.");
        for(var i = 0; i < outputs.length; i++){
            if (typeof outputs[i] == "string") {
                if (outputs[i].indexOf(':')>0){
                    outputs[i] = newItemStack(outputs[i]);
                } else {
                    outputs[i] = getOres(outputs[i])[0];
                }
            }
            if(typeof chances[i] != "number") throw("forestryAddCentrifugeRecipe: chances must be an Array of numbers.")
        }
        chances = javaArray(__int, chances);
        outputs = javaArray(__itemStack, outputs);
        forestryRecipeManagers.centrifugeManager.addRecipe(timePerItem, input, outputs, chances)
    };

    /*
    *   input - ItemStack, item name, ore dictionary name - item input
    *   fermentationValue - number
    *   output - FluidStack, fluid name, fluid ID - fluid output
    *   liquid - FluidStack, fluid name, fluid ID - fluid input
    * */
    forestryAddFermenterRecipe = function(input, fermentationValue, modifier, output, liquid){
        if(typeof fermentationValue != "number" || fermentationValue < 0) throw("forestryAddFermenterRecipe: fermentationValue must be a positive number.");
        if(typeof modifier != "number" || fermentationValue < 0) throw("forestryAddFermenterRecipe: modifier must be a positive number.");
        if (typeof input == "string") {
            if (input.indexOf(':')>0){
                input = newItemStack(input);
            } else {
                input = getOres(input)[0];
            }
        }
        if(stringOrNumber(output)) output = newFluidStack(output);
        if(stringOrNumber(liquid)) liquid = newFluidStack(liquid);
        forestryRecipeManagers.forestryRecipeManagers.addRecipe(input, fermentationValue, modifier, output, liquid);
    };

    /*
    *   input - ItemStack, item name, ore dictionary name
    *   output - ItemStack, item name, ore dictionary name
    *   timePerItem - positive number, probably number of ticks.
    * */
    forestryAddMoistenerRecipe = function(input, output, timePerItem){
        if (typeof input == "string") {
            if (input.indexOf(':')>0){
                input = newItemStack(input);
            } else {
                input = getOres(input)[0];
            }
        }
        if (typeof output == "string") {
            if (output.indexOf(':')>0){
                output = newItemStack(output);
            } else {
                output = getOres(output)[0];
            }
        }
        if(typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddMoistenerRecipe: timePerItem must be a positive number.");
        forestryRecipeManagers.moistenerManager.addRecipe(input, output, timePerItem);
    };

    forestryAddSqueezerRecipe = function(timePerItem, resources, liquid, remnants, chance){
        if(typeof timePerItem != "number" || timePerItem < 0) throw("forestryAddSqueezerRecipe: timePerItem must be a positive number.");
        if(!resources instanceof Array){
            resources = [resources];
        }
        if(resources instanceof Array){
            for(var i = 0; i < outputs.length; i++){
                if (typeof outputs[i] == "string") {
                    if (outputs[i].indexOf(':')>0){
                        outputs[i] = newItemStack(outputs[i]);
                    } else {
                        outputs[i] = getOres(outputs[i])[0];
                    }
                }
            }
        }
        if(stringOrNumber(liquid)) liquid = newFluidStack(liquid);
        if (typeof remnants == "string") {
            if (remnants.indexOf(':')>0){
                remnants = newItemStack(remnants);
            } else {
                remnants = getOres(remnants)[0];
            }
        }
        if(typeof chance == "undefined" && typeof remnants != "undefined") chance = 100;
        if(typeof remnants == "undefined") chance = null;
        forestryRecipeManagers.squeezerManager.addRecipe(timePerItem, resources, liquid, remnants, chance);
    }


})();