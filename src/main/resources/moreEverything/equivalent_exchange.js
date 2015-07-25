// Equivalent Exchange transmutation addons
// By Grom PE


// Gutted this since EE3 no longer does crafting table transmutations
// However, ProjectE does, so those recipes may be reborn in a script for ProjectE


//var EE3Enabled = false;
var EE3Api = Packages.com.pahimar.ee3.api;

var addAludelRecipe;

(function(){
	if (!modList.EE3) return;

	var ws = Java.type("com.pahimar.ee3.exchange.WrappedStack");
	var os = Java.type("com.pahimar.ee3.exchange.OreStack");
	function WrappedStack(stack){
		return new ws(stack);
	}
	function OreStack(oreName, stackSize){
		stackSize = typeof stackSize != "number" ? 1 : stackSize;
		return new os(oreName, stackSize);
	}

	addAludelRecipe = function(output, input, dust){
		output = _lazyStack(output);
		input = _lazyStack(input);
		dust = _lazyStack(dust);
		EE3Api.recipe.AludelRecipeProxy.addRecipe(output, input, dust);
	};

	// addPreCalculationEnergyValue(Object object, float energyValue)
	// PreInit?
	// Object      -> WrappedStack
	// energyValue -> float
	addPreCalculationEnergyValue = function(object, energyValue){
		if(typeof object == "string"){
			object = ~object.indexOf(":") ? WrappedStack(new ItemStack(object).getStack()) : WrappedStack(OreStack(object));
		} else if (object instanceof  __itemStack){
			object = WrappedStack(object);
		} else {
			throw("addPreCalculationEnergyValue: Expected something constructable into WrappedStack, got " + object.constructor.name)
		}
		if(typeof energyValue != "number"){
			throw("addPreCalculationEnergyValue: energyValue must be a number.")
		}
		EE3Api.exchange.EnergyValueRegistryProxy.addPreCalculationEnergyValue(object, energyValue);
	};



	log("Oh hey, I still have my legs.");

})();
