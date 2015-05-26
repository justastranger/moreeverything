// Botania support
// By justastranger
// Written with Botania r1.6-181 for 1.7.10

// registerElvenTradeRecipe(ItemStack output, Object... inputs)
// registerManaAlchemyRecipe(ItemStack output, Object input, int mana)
// registerManaConjurationRecipe(ItemStack output, Object input, int mana)
// registerManaInfusionRecipe(ItemStack output, Object input, int mana)
// registerPetalRecipe(ItemStack output, Object... inputs)
// registerPureDaisyRecipe(Object input, Block output, int outputMeta)
// registerRuneAltarRecipe(ItemStack output, int mana, Object... inputs)
// addOreWeight(String ore, int weight)
// addSeed(Item item, Block block)
// blackListItemFromLoonium(Item item)

var botApi = Packages.vazkii.botania.api.BotaniaAPI;

var registerElvenTradeRecipe;
var registerManaInfusionRecipe;
var registerManaAlchemyRecipe;
var registerManaConjurationRecipe;
var registerPetalRecipe;
var registerPureDaisyRecipe;
var registerRuneAltarRecipe;
var addOreWeight;
var addSeed;
var blackListItemFromLoonium;

(function(){

	if(!modList.Botania) return;

	// Untested
	registerElvenTradeRecipe = function(output, inputsArray){
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack && !output instanceof ItemStack){
			throw("registerElvenTradeRecipe: output must be a string or ItemStack");
		}
		if (inputsArray instanceof Array){
			for (var i = 0; i < inputsArray.length; i++){
				if (typeof inputsArray[i] == "string"){
					inputsArray[i] = inputsArray[i].indexOf(':') ? new ItemStack(inputsArray[i]).constructStack() : getOres(inputsArray[i])[0];
				} else if (!inputsArray[i] instanceof __itemStack && !inputsArray[i] instanceof ItemStack){
					throw("registerElvenTradeRecipe: input must be a string or ItemStack");
				}
			}
		} else {
			if (typeof inputsArray == "string"){
				inputsArray = inputsArray.indexOf(':') ? new ItemStack(inputsArray).constructStack() : getOres(inputsArray)[0];
			} else if (!inputsArray instanceof __itemStack && !inputsArray instanceof ItemStack){
				throw("registerElvenTradeRecipe: input must be a string or ItemStack");
			}
		}
		inputsArray = objectArray(inputsArray);
		botApi.registerElvenTradeRecipe(output, inputsArray);
	};

	// Untested
	registerManaInfusionRecipe = function(output, input, mana){
		if (typeof output == "string"){
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
		} else if (!output instanceof __itemStack && !output instanceof ItemStack){
			throw("registerManaInfusionRecipe: output must be a string or ItemStack");
		}
		if (typeof input == "string"){
			input = input.indexOf(':') ? new ItemStack(input).constructStack() : getOres(input)[0];
		} else if (!input instanceof __itemStack && !input instanceof ItemStack){
			throw("registerManaInfusionRecipe: input must be a string or ItemStack");
		}
		if(typeof mana != number) throw("registerManaInfusionRecipe: mana cost must be specified.")

		botApi.registerManaInfusionRecipe(output, input, mana);
	};



}
)();