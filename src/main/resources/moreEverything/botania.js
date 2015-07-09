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
		output = _lazyStack(output);
		if (inputsArray instanceof Array){
			for (var i = 0; i < inputsArray.length; i++){
				inputsArray[i] = _lazyStack(inputsArray[i]);
			}
		} else {
			inputsArray = _lazyStack(inputsArray);
		}
		inputsArray = objectArray(inputsArray);
		botApi.registerElvenTradeRecipe(output, inputsArray);
	};

	// Untested
	//For recipes that don't require anything but a Mana Pool.
	registerManaInfusionRecipe = function(output, input, mana){
		output = _lazyStack(output);
		input = _lazyStack(input);
		if(typeof mana != number) throw("registerManaInfusionRecipe: mana cost must be specified as a number.");
		botApi.registerManaInfusionRecipe(output, input, mana);
	};

	// Untested
	// For recipes that require an Alchemy Catalyst
	registerManaAlchemyRecipe = function(output, input, mana){
		output = _lazyStack(output);
		input = _lazyStack(input);
		if(typeof mana != number) throw("registerManaAlchemyRecipe: mana cost must be specified.");

		botApi.registerManaAlchemyRecipe(output, input, mana);
	};

	// Untested
	// For recipes that require a Conjuration Catalyst
	registerManaConjurationRecipe = function(output, input, mana){
		output = _lazyStack(output);
		input = _lazyStack(input);
		if(typeof mana != number) throw("registerManaConjurationRecipe: mana cost must be specified.");

		botApi.registerManaAlchemyRecipe(output, input, mana);
	};

	// Untested
	// I suppose the petal apothecary doesn't actually require petals.
	// You could make a dirt->diamond recipe if you wanted...
	registerPetalRecipe = function(output, inputs){
		output = _lazyStack(output);
		if (inputs instanceof Array){
			for (var i = 0; i < inputs.length; i++){
				inputs[i] = _lazyStack(inputs[i]);
			}
		} else {
			inputs = _lazyStack(inputs);
		}
		inputs = objectArray(inputs);
		botApi.registerPetalRecipe(output, inputs);
	}


}
)();