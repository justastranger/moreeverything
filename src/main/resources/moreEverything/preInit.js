// preInit.js
// Scripts to be executed at preInit instead of init or postInit
// by justastranger

var preScripts = [
	"moreEverything/core.js",
	"moreEverything/defs.js",
	"moreEverything/ic2.js",
	"moreEverything/buildcraft.js",
	"moreEverything/blood_magic.js",
	"moreEverything/thermal_expansion.js",
	"moreEverything/EnderIO.js",
	"moreEverything/forestry.js",
	"moreEverything/equivalent_exchange.js",
	"moreEverything/thaumcraft.js",
];

for (var i in preScripts) Include(preScripts[i]);