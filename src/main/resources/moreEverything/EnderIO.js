// EnderIO Support
// By justastranger
// Written with EnderIO 2.2.1.276 for 1.7.10

var __eIO = Packages.crazypants.enderio;
var __eioRecipeInput = __eIO.machine.recipe.RecipeInput;
var __eioRecipeOutput = __eIO.machine.recipe.RecipeOutput;
var __eioRecipe =  __eIO.machine.recipe.Recipe;

var eioNewRecipeOutput;
var eioNewRecipeOutputFluid;
var eioNewRecipeInput;
var eioNewRecipeInputFluid;
var eioNewRecipe;
var eioAddCrusherRecipe;
var eioAddAlloyRecipe;
var eioAddVatRecipe;

(function(){
    eioNewRecipeOutput = function(stack, chance){
        if(!isJavaClass(stack, __itemStack)){
            if(typeof stack == "string") {
                if (stack.indexOf(":") > 0) stack = newItemStack(stack);
                else stack = getOres(stack)[0];
            } else {
                if(isJavaClass(stack, __fluidStack)) return eioNewRecipeOutputFluid(stack);
                throw("newRecipeOutput: stack should be an ItemStack or string, it was a " + stack.getClass());
            }
        }
        if (typeof chance == "undefined") chance = 1;
        if (chance>1 || chance < 0) chance = 1;
        return new __eioRecipeOutput(stack, chance);
    };

    eioNewRecipeOutputFluid = function(fluidStack){
        if(!isJavaClass(fluidStack, __fluidStack)){
            if(stringOrNumber(fluidStack)) fluidStack = newFluidStack(fluidStack, 1000);
            else throw("newRecipeInputFluid: fluidStack must be a FluidStack, a string, or a number, it was a " + fluidStack.getClass());
        }
        return new __eioRecipeOutput(fluidStack);
    };

    eioNewRecipeInput = function(stack, useMeta){
        if(!isJavaClass(stack, __itemStack)){
            if(typeof stack == "string"){
                if (stack.indexOf(":") > 0) stack = newItemStack(stack);
                else stack = getOres(stack)[0];
            } else {
                if(isJavaClass(stack, __fluidStack)) return eioNewRecipeInputFluid(stack);
                throw("newRecipeOutput: stack should be an ItemStack or string, it was a " + stack.getClass());
            }
        }
        useMeta = !!useMeta;
        return new __eioRecipeInput(stack, useMeta);
    };
    eioNewRecipeInputFluid = function(fluidStack){
        if(!isJavaClass(fluidStack, __fluidStack)){
            if(stringOrNumber(fluidStack)) fluidStack = newFluidStack(fluidStack, 1000);
            else throw("newRecipeInputFluid: fluidStack must be a FluidStack, a string, or a number, it was a " + fluidStack.getClass());
        }
        return new __eioRecipeInput(fluidStack);
    };
    eioNewRecipe = function(input, energy, output){
        if(typeof energy != "number") throw("eioNewRecipe: energy must be a number.");
        if(input instanceof Array){
            for(var i = 0; i < input.length; i++){
                if(!isJavaClass(input[i], __eioRecipeInput)) input[i] = eioNewRecipeInput(input[i]);
            }
        } else {
            if(!isJavaClass(input, __eioRecipeInput)) input = eioNewRecipeInput(input);
        }
        if(output instanceof Array){
            for(var i = 0; i < output.length; i++){
                if(!isJavaClass(output[i], __eioRecipeOutput)) output[i] = eioNewRecipeOutput(output[i]);
            }
        } else {
            if(!isJavaClass(output, __eioRecipeOutput)) output = eioNewRecipeOutput(output);
        }
        return new __eioRecipe(input, energy, output);
    };

    eioAddCrusherRecipe = function(recipe, energy, output){
        if(!isJavaClass(recipe, __eioRecipe)) recipe = eioNewRecipe(recipe, energy, output);
        __eIO.machine.crusher.CrusherRecipeManager.getInstance().addRecipe(recipe);
    };

    eioAddAlloyRecipe = function(recipe, energy, output){
        if(!isJavaClass(recipe, __eioRecipe)) recipe = eioNewRecipe(recipe, energy, output);
        __eIO.machine.alloy.AlloyRecipeManager.getInstance().addRecipe(recipe);
    };

    eioAddVatRecipe = function(recipe, energy, output){
        if(!isJavaClass(recipe, __eioRecipe)) recipe = eioNewRecipe(recipe, energy, output);
        __eIO.machine.still.VatRecipeManager.getInstance().addRecipe(recipe);
    };

})();