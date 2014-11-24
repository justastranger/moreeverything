// Forestry support
// By justastranger
// Written with Forestry 3.2.0.5 for 1.7.10

var forestryRecipes = Packages.forestry.api.recipes;

var forestryAddCarpenterRecipe;
var forestryAddCentrifugeRecipe;


(function(){

    var forestryRecipeManagers = forestryRecipes.RecipeManagers;

    /*
    *   packagingTime - number -  I think it's the number of ticks per operation
    *   liquid - FluidStack, name, ID, or null - It's an input, not an output.
    *   box - ItemStack, item name - Extra ItemStack that is consumed along with the recipe.
    *   product - ItemStack, item name, ore dictionary name - output
    *   recipe - Shaped Recipe-esque array, supports ItemStacks and OreDict names - Example: ["xxx", "xyx", "xxx", char('x'), newItemStack(item.coal), char('y'), "oreCoal"]
    * */

    forestryAddCarpenterRecipe = function(packagingTime, liquid, box, product, recipe){
        if(typeof packagingTime != "number") throw("forestryAddCarpenterRecipe: packagingTime must be a number.");
        if(!isJavaClass(liquid, __fluidStack) && stringOrNumber(liquid)) liquid = newFluidStack(liquid);
        if(typeof box == "undefined") box = null;
        if (typeof product == "string") {
            if (product.indexOf(':')>0){
                product = newItemStack(product);
            } else {
                product = getOres(product)[0];
            }
        }
        if(!(recipe instanceof Array)){
            throw("forestryAddCarpenterRecipe: recipe is invalid, it must be an Array.");
        }
        try {
            forestryRecipeManagers.carpenterManager.addRecipe(packagingTime, liquid, box, product, recipe);
            return true;
        } catch (e) {
            return false;
        }
    }

    // I have no idea if this actually works...
    forestryAddCentrifugeRecipe = function(timePerItem, input, outputs, chances) {
        if(typeof timePerItem != "number" && !(timePerItem >= 0)) throw("forestryAddCentrifugeRecipe: timePerItem must be a number above 0.")
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
        if(((outputs instanceof Array) && (chances instanceof Array)) && (outputs.length != chances.length)) throw("forestryAddCentrifugeRecipe: length mismatch between outputs and chances.")
        for(var i = 0; i < outputs.length; i++){
            if (typeof outputs == "string") {
                if (outputs.indexOf(':')>0){
                    outputs = newItemStack(outputs);
                } else {
                    outputs = getOres(outputs)[0];
                }
            }
            if(typeof chances[i] != "number") throw("forestryAddCentrifugeRecipe: chances must be an Array of numbers.")
        }
        chances = javaArray(__int, chances);
        outputs = javaArray(__itemStack, outputs);
        forestryRecipeManagers.centrifugeManager.addRecipe(timePerItem, input, outputs, chances)
    }

})();