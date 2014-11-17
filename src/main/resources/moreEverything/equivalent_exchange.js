// Equivalent Exchange transmutation addons
// By Grom PE


// EE3 seems to have done away with actual transmutation, so these features may be dropped.

var EE3Enabled = true

var addTransmutation;
var addTransmutation1to1;
var addEquivalency;
var makeMetaCycle;
var QaddTransmutation;
var QaddTransmutation1to1;

(function()
{
	if (!modList.EE3) return;

	addTransmutation = function(result, input) {
		var size;
		if (isJavaClass(input, __itemStack) && ((size = getItemStackSize(input)) > 1)) {
			// Convert item stack of size to (size) number of single items
			var id = getItemName(input);
			var damage = getItemDamage(input);
			var tmp = arrayOf(newItemStack(id,1,damage), size);
			input = tmp;
		}
		if (!(input instanceof Array)) {
			var tmp = [];
			for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
			input = tmp;
		}
		var i1 = input.slice();
		i1.unshift("EE3:stoneMinium");
		var i2 = input.slice();
		i2.unshift("EE3:stonePhilosophers");
		return addShapelessRecipe(result, i1) && addShapelessRecipe(result, i2);
	};

	addTransmutation1to1 = function(a, b) {
		return addTransmutation(a, b) && addTransmutation(b, a);
	};

	addEquivalency = function(one_or_more_objects_or_arrays) {
		var arr = [];
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] instanceof Array) {
				arr = arr.concat(arguments[i]);
			} else {
				arr.push(arguments[i]);
			}
		}
		for (var i=0; i < arr.length; i++) {
			if (typeof arr[i] == "string"&&arr[i].indexOf(':')) arr[i] = newItemStack(arr[i], 1, WILDCARD);
		}
		// Packages.com.pahimar.ee3.core.handlers.EquivalencyHandler.instance().addObjects(ObjectArray(arr));
		// As moreEverything mod is running late, need to manually add the recipes
		// There is no EquivalencyHandler as of the latest versions.
		for (var i=0; i < arr.length; i++) {
			addTransmutation(arr[(i+1) % arr.length], arr[i]);
		}
		log("Added equvalency: "+arr, logLevel.debug);
		return true;
	}

	makeMetaCycle = function(id, numMetaValues, skipMeta_zero_or_more_numbers_or_arrays)
	{
		var skipMeta = {};
		for (var i = 2; i < arguments.length; i++) {
			if (arguments[i] instanceof Array) {
				for (var j in arguments[i]) skipMeta[arguments[i][j]] = 1;
			} else {
				skipMeta[arguments[i]] = 1;
			}
		}
		result = [];
		for (var i = 0; i < numMetaValues; i++) {
			if (i in skipMeta) continue;
			result.push(newItemStack(id, 1, i));
		}
		return result;
	}

	// Quiet functions that don't throw exceptions
	QaddTransmutation = function(result, input) {
		var result;
		try { result = addTransmutation(result, input); }
		catch(e) {};
		return result;
	};
	QaddTransmutation1to1 = function(a, b) {
		var result;
		try { result = AddTransmutation1to1(a, b); }
		catch(e) {};
		return result;
	};

	// EMC values: http://technicpack.wikia.com/wiki/Alchemical_Math

	log("Did some alchemy! Oh good, I still have my leg!");
	
})();
