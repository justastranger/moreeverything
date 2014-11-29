// Thaumcraft aspects addons
// By Grom PE


var registerObjectTag;
var registerOreDictObjectTag;
var newAspectList;
var newAspect;

(function(){
	if (!modList.Thaumcraft) return;

	var TCApi = Packages.thaumcraft.api;
	var aspects = {};
	var altnames = {
		"aer"          : ["air", "wind"],
		"terra"        : "earth",
		"ignis"        : "fire",
		"aqua"         : "water",
		"ordo"         : "order",
		"perditio"     : "entropy",
		"vacuos"       : "void",
		"lux"          : "light",
		"potentia"     : ["energy", "power"],
		"motus"        : "motion",
		"saxum"        : ["stone", "rock"],
		"victus"       : "life",
		"tempestas"    : "weather",
		"gelum"        : ["ice", "cold"],
		"vitreus"      : "crystal",
		"mortuus"      : "death",
		"volatus"      : "flight",
		"tenebrae"     : ["darkness", "dark"],
		"spiritus"     : ["soul", "spirit"],
		"sano"         : "heal",
		"iter"         : "travel",
		"venenum"      : "poison",
		"alienis"      : "eldritch",
		"praecantatio" : "magic",
		"auram"        : "aura",
		"vitium"       : "taint",
		"granum"       : "seed",
		"limus"        : "slime",
		"herba"        : "plant",
		"arbor"        : ["tree", "wood"],
		"bestia"       : "beast",
		"corpus"       : "flesh",
		"exanimis"     : "undead",
		"cognitio"     : ["mind", "knowledge"],
		"sensus"       : "senses",
		"humanus"      : "man",
		"messis"       : "crop",
		"meto"         : "harvest",
		"metallum"     : "metal",
		"perfodio"     : "mine",
		"instrumentum" : "tool",
		"telum"        : "weapon",
		"tutamen"      : "armor",
		"fames"        : "hunger",
		"lucrum"       : "greed",
		"fabrico"      : "craft",
		"pannus"       : "cloth",
		"machina"      : "mechanism",
		"vinculum"     : "trap",
		"permutatio"   : "exchange"
	};
	var ev = Packages.thaumcraft.api.aspects.Aspect.aspects.values().toArray();
	for (var i in ev){
		var tag = lowerCase(ev[i].getTag());
		aspects[tag] = ev[i];
		var alt;
		if (alt = altnames[tag]){
			if (!(alt instanceof Array)){
				// Adds alternative name to the object, equalling the same aspect
				aspects[alt] = ev[i];
			} else {
				for (var j = 0; j < alt.length; j++){
					// If there are multiple alternatives in an array, add them all.
					aspects[alt[j]] = ev[i];
				}
			}
		}
	}

	newAspect = function(name){
		if (aspects[name]) return aspects[name];
		throw("newAspect: Invalid Aspect!")
	};

	newAspectList = function(aspects, amounts){
		var templist = new TCApi.aspects.AspectList();
		if (typeof aspects == "string") aspects = newAspect(aspects);
		if (aspects instanceof Array && amounts instanceof Array){
			for (var i = 0; i < aspects.length; i++){
				if (typeof aspects[i] == "string") aspects[i] = newAspect(aspects[i]);
				templist.add(aspects[i], amounts[i])
			}
		} else {
			templist.add(aspects, amounts)
		}
		return templist
	};

	registerObjectTag = function(id, aspectList, aspectAmounts){
		var logitem = id;
		if (getItem(id) == null) throw("registerObjectTag: no such item.");
		if (typeof id == "string" && id.indexOf(':')) id = newItemStack(id);
		if (aspectList instanceof Array && aspectAmounts instanceof Array) newAspectList(aspectList, aspectAmounts);
		TCApi.ThaumcraftApi.registerObjectTag(id, aspectList);
		log("Registered object tag for "+logitem+": "+aspectList.toString(), logLevel.debug);
		return true;
	};

	registerOreDictObjectTag = function(name, aspectList, aspectAmounts){
		var logitem = name;
		if (getOres(name) == null) throw("registerObjectTag: no such OreDict entry.");
		if (aspectList instanceof Array && aspectAmounts instanceof Array) aspectList = newAspectList(aspectList, aspectAmounts);
		TCApi.ThaumcraftApi.registerObjectTag(name, aspectList);
		log("Registered object tag for "+logitem+": "+aspectList.toString(), logLevel.debug);
		return true;
	};


	function QregisterObjectTag(id, aspectList, aspectAmounts){
		var result;
		try{
			result = registerObjectTag(id, aspectList, aspectAmounts);
		}
		catch (e) {
			result = false
		}
		return result;
	}

	log("Thaumium is underrated.");

})();