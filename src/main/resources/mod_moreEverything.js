/* mod_moreEverything configuration script
==========================================
For more information, see the forum topic:
http://minecraftforum.net/topic/1819835-/
And scripts:
https://github.com/grompe/moreeverything/tree/master/mod_moreEverything/moreEverything
*/

var optionalFeature = {
	more_vanilla_fuel: 1,
	wool_bleaching: 1,
	hayblock_uncrafting: 1,
	mod_tweaks: 1,
	/* ee_vanilla_transmutations: 1,
	ee_vanilla_uncrafting: 1,
	ee_stairs_slabs_walls_uncrafting: 1,
	ee_ore_transmutations: 1,
	ee_thaumcraft_transmutations: 1,
	ee_natura_transmutations: 1,
	ee_underground_biomes_transmutations: 1,
	ee_biome_mods_transmutations: 1,
	ee_minefantasy_transmutations: 1,
	ee_tinkersconstruct_transmutations: 1, */
	thaumcraft_vanilla_aspects: 1,
	thaumcraft_mod_aspects: 1,

	rotten_flesh_to_leather: 0,
	stack_more: 0
};

// Uncomment for debugging; valid logLevels are debug, info, warning, error
//currentLogLevel = logLevel.debug;

// Uncomment to disable default features
// optionalFeature.more_vanilla_fuel = 0;
// optionalFeature.wool_bleaching = 0;
// optionalFeature.hayblock_uncrafting = 0;
// optionalFeature.mod_tweaks = 0;
// optionalFeature.ee_vanilla_transmutations = 0;
// optionalFeature.ee_vanilla_uncrafting = 0;
// optionalFeature.ee_stairs_slabs_walls_uncrafting = 0;
// optionalFeature.ee_ore_transmutations = 0;
// optionalFeature.ee_thaumcraft_transmutations = 0;
// optionalFeature.ee_natura_transmutations = 0;
// optionalFeature.ee_underground_biomes_transmutations = 0;
// optionalFeature.ee_biome_mods_transmutations = 0;
// optionalFeature.ee_minefantasy_transmutations = 0;
// optionalFeature.ee_tinkersconstruct_transmutations = 0;
// optionalFeature.thaumcraft_vanilla_aspects = 0;
// optionalFeature.thaumcraft_mod_aspects = 0;

// Uncomment to enable optional features
// optionalFeature.rotten_flesh_to_leather = 1;
//optionalFeature.stack_more = 1;

// Remove "Internal" word if you want the scripts to be extracted for you to modify
// If you do extract default scripts, you'll have to update (delete) them manually
// Actually, better look inside the mod .zip file for a reference and add your own code in this file below
// for (i in defaultScripts) IncludeInternal(defaultScripts[i]);

function Include(filename) { return __api.__include(filename); }
function IncludeInternal(filename) { return __api.__includeInternal(filename); }

function test() {
	try{Include("moreEverything/test.js");}
	catch(e){throw("You need to create a test.js file within the moreEverything folder located in the config folder.")}
}

var defaultScripts = [
	"moreEverything/core.js",
	"moreEverything/ic2.js",
	"moreEverything/buildcraft.js",
	"moreEverything/defs.js",
	//"moreEverything/equivalent_exchange.js",
	"moreEverything/thaumcraft.js",
	"moreEverything/tweaks_vanilla.js",
	"moreEverything/tweaks_mods.js",
	"moreEverything/optional.js"
];

// for (i in defaultScripts) IncludeInternal(defaultScripts[i]);
for (i in defaultScripts) Include(defaultScripts[i]);
	
/* ////////////////////////

Some working examples
=====================
Add shaped recipe or shaped ore recipe
Syntax: addShapedRecipe(
	number/ItemStack result,
	string shape[, string shape[, string shape]],
	array/plain(Chr component, number/ItemStack/string component[, Chr component2, number/ItemStack/string component2[...]])
)
Dependency: core.js
Examples:
	addShapedRecipe(item.wool, "xx", "yy", Chr("x"), item.cobblestone, Chr("y"), item.dirt);
	addShapedRecipe(item.wool, "xx", "yy", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper");

Add shapeless recipe or shapeless ore recipe
Syntax: addShapelessRecipe(
	number/ItemStack result,
	array/plain(number/ItemStack/string component[, number/ItemStack/string component2[...]])
)
Dependency: core.js
Examples:
	addShapelessRecipe(item.wool, item.cobblestone, item.cobblestone);

Add smelting recipe
Syntax: addSmelting(
	number input,
	number/ItemStack result,
	number experience
)
Dependency: core.js
Examples:
	addSmelting(item.dirt, item.cobblestone, 5.0);

Add furnace fuel
Syntax: addFuel(
	number duration,
	number itemID[, number itemDamage]
)
Dependency: core.js
Examples:
	addFuel(20, item.feather);

Look inside default scripts for more documentation and examples!

*/ ////////////////////////

// Be sure to test your additions
currentLogLevel = logLevel.debug;

(function () {
	//
	// Add code that doesn't depend on mods here
	//
	// Shaped recipe test
	//addRecipe(item.wool, ["x ", " y", chr("x"), item.cobblestone, chr("y"), item.dirt]);
	// Shapeless recipe test
	//addShapelessRecipe(item.wool, [item.cobblestone, item.cobblestone]);
	// Shaped ore recipe test
	//addRecipe(item.wool, ["x ", " y", chr("x"), "ingotSilver", chr("y"), "ingotCopper"]);
	// Shapeless ore recipe test
	//addShapelessRecipe(item.wool, ["ingotSilver", "ingotSilver"]);
	// Smelting test
	//addSmelting(item.dirt, item.cobblestone, 5.0);
	// Ore dictionary test
	//registerOre("ingotIron", item.ironIngot);
	//addShapelessRecipe(item.wool, ["ingotIron", "ingotIron"]);
	//addShapelessRecipe(item.wool, arrayOf("ingotIron", 2));
	
	// See core.js for basic, non-mod related functions
	// Functions directly related to a mod will usually reside in a file named after the mod.

	if (modList.EE3) {
		// Do something with Equivalent Exchange
		//addTransmutation(item.coal, arrayOf(item.redstone, 2));
		//addTransmutation(newItemStack(item.redstone, 2), newItemStack(item.coal, 1, 0));
		//addTransmutation1to1(item.stonePressurePlate, item.woodenPressurePlate);
	}
	if (modList.Thaumcraft) {
		// Do something with Thaumcraft
		//registerObjectTag(item.trappedChest, ["wood", "void", "trap"], [2, 4, 1]);
	}
	// etc.
})();

// Alternatively, put the code in a new script file, for example myscripts/my.js
// and include it here:
// Include("myscripts/my.js");
// or directly from the game chat, if you're admin or single player with cheats:
// /eval Include("myscripts/my.js");

// If you want to publish your additions, post them in the forum topic:
// http://www.minecraftforum.net/topic/1819835-
// and I'll see about adding them to the official distribution!
// Or if you're not Minecraft Forum user, you can email me:
// i@grompe.org.ru with subject "mod_moreEverything"
