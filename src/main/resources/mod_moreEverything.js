/* mod_moreEverything configuration script
==========================================
For more information, see the forum topic:
http://minecraftforum.net/topic/1819835-/
And scripts:
https://github.com/grompe/moreeverything/tree/master/mod_moreEverything/moreEverything
*/


// This is more or less the actual config file, where built-in tweaks can be enabled or disabled.
var optionalFeature = {
	// Enabled by default
	more_vanilla_fuel: true,
	wool_bleaching: true,
	hayblock_uncrafting: true,
	mod_tweaks: true,
	thaumcraft_vanilla_aspects: true,
	thaumcraft_mod_aspects: true,
	tinkers_te_crucible_melting: true,
	tinkers_bc_refinery_mixing: false,

	// Disabled by default
	enable_thermal_expansion: false, // TE offers native support for recipe addition.
									 //  This is still provided so you can keep everything in one place.
	rotten_flesh_to_leather: false,
	stack_more: false
};

// Uncomment for debugging; valid logLevels are debug, info, warning, error
// currentLogLevel = logLevel.debug;

function Include(filename) {
	return __api.__include(filename);
}
function IncludeInit(filename) {
	return __mE.includeInit.add(filename);
}
function IncludePost(filename) {
	return __mE.includePost.add(filename);
}
function IncludeInternal(filename) {
	return __api.__includeInternal(filename);
}
// Syntactic sugar - includes a file from the default config directory based on name. Keeps your includes short.
function IncludeJS(filename) { Include("moreEverything/" + filename + ".js"); }

function test() {
	try{IncludeJS("test");}
	catch(e){
		if (e.toString().indexOf("not found") > 0) throw("You need to create a test.js file within the moreEverything folder located in the config folder.");
		throw(e);
	}
}


// Remove "Internal" word if you want the scripts to be extracted for you to modify
// If you do extract default scripts, you'll have to update (delete) them manually
// Actually, better look inside the mod .zip file for a reference and add your own code in this file below
// for (i in defaultScripts) IncludeInternal(defaultScripts[i]);
Include("moreEverything/core.js");
Include("moreEverything/preInit.js");
IncludeInit("moreEverything/init.js");
IncludePost("moreEverything/postInit.js");

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
	addShapedRecipe(item.wool, ["xx", "yy", Chr("x"), item.cobblestone, Chr("y"), item.dirt]);
	addShapedRecipe(item.wool, "xx", "yy", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper");
	addShapedRecipe(item.wool, ["xx", "yy", Chr("x"), "ingotSilver", Chr("y"), "ingotCopper"]);

Add shapeless recipe or shapeless ore recipe
Syntax: addShapelessRecipe(
	number/ItemStack result,
	array/plain(number/ItemStack/string component[, number/ItemStack/string component2[...]])
)
Dependency: core.js
Examples:
	addShapelessRecipe(item.wool, [item.cobblestone, item.cobblestone]);

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
		//addAludelRecipe(item.coal, item.dirt, item.stone)
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
