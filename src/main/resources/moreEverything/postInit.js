// There's a preInit and init script, why not a postInit?

var postScripts = [
	"moreEverything/tweaks_vanilla.js",
	"moreEverything/tweaks_mods.js",
	"moreEverything/optional.js"
];

if(!!modList.Railcraft){
	registerOre("gemFirestoneRaw", "Railcraft:firestone.raw");
	if(!!modList.ThermalExpansion){
		teAddPulverizerRecipe(5000, "oreFirestone", "gemFirestoneRaw"); // There's a rock crusher recipe but no pulverizer recipe
																		// Probably intentional to encourage USING Railcraft, but insanely annoying.
	}
}

for (var i in postScripts) Include(postScripts[i]);