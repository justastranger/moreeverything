// Equivalent Exchange transmutation addons
// By Grom PE


// Gutted this since EE3 no longer does crafting table transmutations
// However, ProjectE does, so those recipes may be reborn in a script for ProjectE


var EE3Enabled = false;
var EE3Api = Packages.com.pahimar.ee3.api;

var addAludelRecipe;

(function(){
	if (!modList.EE3) return;

	addAludelRecipe = function(output, input, dust){
		if(typeof output == "string") {
			output = output.indexOf(':') ? new ItemStack(output).constructStack() : getOres(output)[0];
		}else if(!output instanceof __itemStack){
			throw("addAludelRecipe: output must be a string or ItemStack")
		}
		if(typeof input == "string") {
			input = input.indexOf(':') ? new ItemStack(input).constructStack() : getOres(input)[0];
		}else if(!input instanceof __itemStack){
			throw("addAludelRecipe: input must be a string or ItemStack")
		}
		if(typeof dust == "string") {
			dust = dust.indexOf(':') ? new ItemStack(dust).constructStack() : getOres(dust)[0];
		}else if(!dust instanceof __itemStack){
			throw("addAludelRecipe: dust must be a string or ItemStack")
		}
		EE3Api.AludelRecipeProxy.addRecipe(output, input, dust);
	};

	log("Oh hey, I still have my legs.");

})();
