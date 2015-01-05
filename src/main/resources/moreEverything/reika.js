// Support for Reika's mods, mainly Rotarycraft
// By justastranger
// Written with DragonAPI v3d, RotaryCraft v3d, ReactorCraft v3d, ElectriCraft v3d, and ChromatiCraft v3d for 1.7.10

var RoCRM = Reika.RotaryCraft.Auxiliary.RecipeManagers;


// Reika's recipe managers use a "ItemHashMap" created by Reika for DragonAPI.

// Contains a Hashmap<ItemKey, V>, an ArrayList<ItemStack>, and a Collection<ItemStack>
// ItemKey is a custom object constructed as new ItemKey(someItemStack) with a public Item and a private int for metadata
// ItemHashMap.put(ItemKey i, int value)
// ItemHashMap.get(ItemKey i)
// ItemHashMap.containsKey(ItemKey i)
// Also contains versions for ItemStacks, Block/Meta, and Item/Meta
// ItemHashMap.put(ItemStack i, int value)
// ItemHashMap.get(ItemStack i)
// ItemHashMap.put(Item i, int meta, int value) puts and gets are mostly useless since there are simpler implementations in the RecipeManagers
// ItemHashMap.remove(ItemKey i)
// ItemHashMap.remove(ItemStack i) These two are the most important if we're to allow removing of recipes.

// TODO

var rocAddGrinderRecipe;
var rocRemoveGrinderRecipe;
var rocAddPulseFurnaceRecipe;
var rocRemovePulseFurnaceRecipe;


(function(){

	function canBecomeStack(thing){
		if(typeof thing == "string" && thing.indexOf(":")>0){
			return true
		}
		return false
	}
	function isOreDict(thing){
		if(typeof thing == "string" && thing.indexOf(":")<1){
			return true
		}
		return false
	}

	rocAddGrinderRecipe = function(input, output){
		var recipes = RoCRM.RecipesGrinder.getRecipes();
		var oreDict;
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) oreDict = true;
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if (!!oreDict) {
			recipes.addOreDictRecipe(input, output, 0);
		} else {
			recipes.addRecipe(input, output, 0);
		}
	};

	rocAddPulseFurnaceRecipe = function(input, output, experience){
		var recipes = RoCRM.RecipesPulseFurnace.smelting()
		if (input instanceof ItemStack) input = input.constructStack();
		if (output instanceof ItemStack) output = output.constructStack();
		if(canBecomeStack(input)) input = new ItemStack(input).constructStack();
		else if(isOreDict(input)) input = getOres(input)[0];
		if(canBecomeStack(output)) output = new ItemStack(output).constructStack();
		else if(isOreDict(output)) output = getOres(output)[0];
		if(typeof experience != "number") experience = 0.0;
		recipes.addSmelting(input, output, experience);
	};




})();