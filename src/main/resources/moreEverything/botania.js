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
var registerManaAlchemyRecipe;
var registerManaConjurationRecipe;
var registerManaInfusionRecipe;
var registerPetalRecipe;
var registerPureDaisyRecipe;
var registerRuneAltarRecipe;
var addOreWeight;
var addSeed;
var blackListItemFromLoonium;

(function(){

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
					throw("teAddPulverizerRecipe: input must be a string or ItemStack");
				}
			}
		} else {
			if (typeof inputsArray == "string"){
				inputsArray = inputsArray.indexOf(':') ? new ItemStack(inputsArray).constructStack() : getOres(inputsArray)[0];
			} else if (!inputsArray instanceof __itemStack && !inputsArray instanceof ItemStack){
				throw("teAddPulverizerRecipe: input must be a string or ItemStack");
			}
		}
		inputsArray = objectArray(inputsArray);
		botApi.registerElvenTradeRecipe(output, inputsArray);
	}





}
)();