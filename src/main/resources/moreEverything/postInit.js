// There's a preInit and init script, why not a postInit?

var postScripts = [
	"moreEverything/tweaks_vanilla.js",
	"moreEverything/tweaks_mods.js",
	"moreEverything/optional.js"
];

for (var i in postScripts) Include(postScripts[i]);