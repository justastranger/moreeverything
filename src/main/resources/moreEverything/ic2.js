// Industrial-Craft 2 Recipe Support
// By justastranger

var ic2Api = Packages.ic2.api;
var ic2Recipes = ic2Api.recipe.Recipes;
var ic2RecipeInputOreDict;
var ic2RecipeInputItemStack;
var ic2RecipeInputFluidContainer;
var ic2AddMaceratorRecipe;
var ic2AddExtractorRecipe;
var ic2AddCompressorRecipe;
var ic2AddExtrudingRecipe;
var ic2AddCuttingRecipe;
var ic2AddRollingRecipe;
var ic2AddRecyclingRecipe;
var ic2AddEnrichingRecipe;
var ic2AddBottlingRecipe;
var ic2AddBlockCutterRecipe;
var ic2AddCentrifugeRecipe;
var ic2AddWashingRecipe;
var ic2AddBlastFurnaceRecipe;
var ic2AddAmplifier;
var ic2AddFluidHeatSource;
var ic2AddSemiFluidFuel;
var ic2AddShapedRecipe;
var ic2AddShapelessRecipe;
var ic2AddScrapboxDrop;
var ic2RIOD;
var ic2RIIS;
var ic2RIFC;

(function() {
	
	if(!modList.IC2) return;
	
	ic2RecipeInputOreDict = function(name, amount, meta)
	{
		if (typeof name != "string") throw("ic2OreDictInput: name must be a string.");
		if (typeof amount != "number" && typeof meta != "number") return new ic2Api.recipe.RecipeInputOreDict(name);
		if (typeof amount == "number" && typeof meta != "number") return new ic2Api.recipe.RecipeInputOreDict(name, amount);
		if (typeof amount == "number" && typeof meta == "number") return new ic2Api.recipe.RecipeInputOreDict(name, amount, meta);
	};

	ic2RecipeInputItemStack = function(stack, amount, meta) {
		if (typeof stack == "string") {
			stack = newItemStack(stack, amount, meta);
			return new ic2Api.recipe.RecipeInputItemStack(stack);
		} else if (amount) {
			return new ic2Api.recipe.RecipeInputItemStack(stack, amount);
		}
		try{ return new ic2Api.recipe.RecipeInputItemStack(stack) }
		catch(e){
			log(e);
			throw("ic2RecipeInputItemStack: stack must be either an ItemStack or an item name");
		}
	};

	ic2RecipeInputFluidContainer = function(fluid, amount) {
		fluid = QgetFluid(fluid);
		if(amount) return ic2Api.recipe.RecipeInputFluidContainer(fluid, amount);
		return ic2Api.recipe.RecipeInputFluidContainer(fluid);
	};

	ic2AddMaceratorRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.macerator.addRecipe(input, null, output);
	};

	ic2AddExtractorRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.extractor.addRecipe(input, null, output);
	};

	ic2AddCompressorRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.compressor.addRecipe(input, null, output);
	};

	ic2AddExtrudingRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.metalformerExtruding.addRecipe(input, null, output);
	};

	ic2AddCuttingRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.metalformerCutting.addRecipe(input, null, output);
	};

	ic2AddRollingRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.metalformerRolling.addRecipe(input, null, output);
	};

	// Recycling recipe thingy might not be needed, but it was listed in the recipe manager.
	ic2AddRecyclingRecipe = function(input, output) {
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		if (typeof output == "undefined") output = newItemStack("IC2:scrap"); // or whatever the name for scrap is...
		ic2Recipes.recycler.addRecipe(input, null, output);
	};

	ic2AddEnrichingRecipe = function(input, additive, output) {
		// input = FluidStack, additive = IRecipeInput (OreDict, ItemStack, or FluidContainer), output = FluidStack
		// However, I'm not entirely sure how I would go about taking care of FluidContainer...
		// I suppose we can assume that additive isn't a FluidContainer unless explicitly stated to the contrary...
		// Doing that would let me make these recipe functions more generic...
		if (stringOrNumber(input)) input = newFluidStack(input);
		if (stringOrNumber(output)) output = newFluidStack(output);
		if (input instanceof Array) input = newFluidStack(input[0], input[1]);
		if (output instanceof Array) output = newFluidStack(output[0], output[1]);
		if (typeof additive == "string") {
			if (additive.indexOf(':')) {
				additive = ic2RIIS(additive);
			} else {
				additive = ic2RIOD(additive);
			}
		}
		ic2Recipes.cannerEnrich.addRecipe(input, additive, output);
	};

	ic2AddBottlingRecipe = function(container, fill, output) {
		// item + item -> canned item
		if (typeof container == "string") {
			if (container.indexOf(':')) {
				container = ic2RIIS(newItemStack(container));
			} else {
				container = ic2RIOD(container);
			}
		}
		if (typeof fill == "string") {
			if (fill.indexOf(':')) {
				fill = ic2RIIS(newItemStack(fill));
			} else {
				fill = ic2RIOD(fill);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.cannerBottle.addRecipe(container, fill, output)
	};

	ic2AddBlockCutterRecipe = function(input, hardness, output) {
		var nbt = new net.minecraft.nbt.NBTTagCompound();
		nbt.func_74768_a("hardness", hardness);
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.blockcutter.addRecipe(input, nbt, output)
	};

	ic2AddCentrifugeRecipe = function(input, heat, output) {
		var nbt = new net.minecraft.nbt.NBTTagCompound();
		nbt.func_74768_a("minHeat", heat);
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (output instanceof Array) {
			if (output.length > 3) throw("ic2AddCentrifugeRecipe: Max length of output is 3, else the last object gets cut off.");
			for (var i = 0; i<output.length; i++) {
				if (typeof output[i] == "string") {
					if (output[i].indexOf(':')) {
						output[i] = newItemStack(output[i]);
					} else {
						output[i] = getOres(output[i])[0];
					}
				}
				
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.centrifuge.addRecipe(input, nbt, output)
	};

	ic2AddWashingRecipe = function(input, water, output) {
		var nbt = new net.minecraft.nbt.NBTTagCompound();
		nbt.func_74768_a("amount", water);
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (output instanceof Array) {
			if (output.length > 3) throw("ic2AddWashingRecipe: Max length of output is 3, else the last object gets cut off.");
			for (var i = 0; i<output.length; i++) {
				if (typeof output[i] == "string") {
					if (output[i].indexOf(':')) {
						output[i] = newItemStack(output[i]);
					} else {
						output[i] = getOres(output[i])[0];
					}
				}
				
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.oreWashing.addRecipe(input, nbt, output);
	};

	ic2AddBlastFurnaceRecipe = function(input, output){
		if (typeof input == "string") {
			if (input.indexOf(':')) {
				input = ic2RIIS(newItemStack(input));
			} else {
				input = ic2RIOD(input);
			}
		}
		if (output instanceof Array) {
			for (var i = 0; i<output.length; i++) {
				if (typeof output[i] == "string") {
					if (output[i].indexOf(':')) {
						output[i] = newItemStack(output[i]);
					} else {
						output[i] = getOres(output[i])[0];
					}
				}
			}
		}
		if (typeof output == "string") {
			if (output.indexOf(':')) {
				output = newItemStack(output);
			} else {
				output = getOres(output)[0];
			}
		}
		ic2Recipes.blastfurance.addRecipe(input, null, output);
	};

	ic2AddAmplifier = function(item, amplify) {
		var nbt = new net.minecraft.nbt.NBTTagCompound();
		nbt.func_74768_a("amplification", amplify);
		if (typeof item == "string") {
			if (item.indexOf(':')) {
				item = ic2RIIS(newItemStack(item));
			} else {
				item = ic2RIOD(item);
			}
		}
		ic2Recipes.matterAmplifier.addRecipe(item, nbt, []);
	};
	
	ic2AddFluidHeatSource = function(fluidName, amount, heat) {
		if (!(typeof fluidName == "string")) throw("ic2AddFluidHeatSource: fluidName must be a string.");
		if (!(typeof amount == "number")) throw("ic2AddFluidHeatSource: amount must be a number.");
		if (!(typeof heat == "number")) throw("ic2AddFluidHeatSource: heat must be a number.");
		ic2Recipes.FluidHeatGenerator.addFluid(fluidName, amount, heat);
	};
	
	ic2AddSemiFluidFuel = function(fluidName, amount, heat) {
		if (!(typeof fluidName == "string")) throw("ic2AddsemiFluidFuel: fluidName must be a string.");
		if (!(typeof amount == "number")) throw("ic2AddsemiFluidFuel: amount must be a number.");
		if (!(typeof heat == "number")) throw("ic2AddsemiFluidFuel: heat must be a number.");
		ic2Recipes.semiFluidGenerator.addFluid(fluidName, amount, heat);
	};
	
	ic2AddScrapboxDrop = function(drop, chance) {
		if (typeof drop == "string") {
			if (drop.indexOf(':')) {
				drop = newItemStack(drop);
			} else {
				drop = getOres(drop)[0];
			}
		}
		if (typeof chance != "number") throw("ic2AddScrapboxDrop: chance must be a number");
		ic2Recipes.scrapboxDrops.addDrop(drop, chance);
	};
	
	ic2AddShapedRecipe = function(output, input) {
		// This acts the same as the normal addShapedRecipe, except with the IC2 recipe handler.
		if (!(input instanceof Array)) {
			var tmp = [];
			for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
			input = tmp;
		}
		if (typeof output == "undefined") throw("ic2AddShapedRecipe: output is undefined.");
		if (typeof output != "string" && output.getClass() != "net.minecraft.item.ItemStack") throw("ic2AddShapedRecipe: output must be a string or ItemStack.");
		if (typeof output == "string") output = newItemStack(output);
		for (var i=0; i<input.length; i++) {
			if ((typeof input[i] == "string") && (input[i].indexOf(':'))) input[i] = newItemStack(input[i], 1, WILDCARD);
		}
		ic2Recipes.advRecipes.addRecipe(output, objectArray(input));
		log("Added shaped recipe for "+stack+".", logLevel.debug);
		return true;
	};
	
	ic2AddShapelessRecipe = function(output, input) {
		// This acts the same as the normal addShapelessRecipe, except with the IC2 recipe handler.
		if (!(input instanceof Array)) {
			var tmp = [];
			for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
			input = tmp;
		}
		if (typeof output == "undefined") throw("ic2AddShapelessRecipe: output is undefined.");
		if (typeof output != "string" && output.getClass() != "net.minecraft.item.ItemStack") throw("ic2AddShapelessRecipe: output must be a string or ItemStack.");
		if (typeof output == "string") output = newItemStack(output);
		for (var i=0; i<input.length; i++) {
			if ((typeof input[i] == "string") && (input[i].indexOf(':') > 0)) input[i] = newItemStack(input[i], 1, WILDCARD);
		}
		ic2Recipes.advRecipes.addShapelessRecipe(output, objectArray(input));
		log("Added shapeless recipe for "+output+".", logLevel.debug);
		return true;
	};
	
	ic2RIOD = ic2RecipeInputOreDict;
	ic2RIIS = ic2RecipeInputItemStack;
	ic2RIFC = ic2RecipeInputFluidContainer;
	
	
	log("Crafting industriously!")
	
})();