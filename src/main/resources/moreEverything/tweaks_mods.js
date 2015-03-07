// Mod tweaks
// By Grom PE
// Re-organized by justastranger

(function(){
	if (!optionalFeature.mod_tweaks) return;

	if (!!modList.BiomesOPlenty){
		addFuel(40, "BiomesOPlenty:plants", 0);	// Dead grass
		addFuel(40, "BiomesOPlenty:plants", 5); // Thorns
		addFuel(40, "BiomesOPlenty:plants", 6); // Barley
		addFuel(40, "BiomesOPlenty:plants", 7); // Cattail
		addFuel(150, "BiomesOPlenty:woodenSingleSlab1"); // Rebalancing to match vanilla 7.5s
		addFuel(150, "BiomesOPlenty:woodenSingleSlab2");
		addFuel(100, "BiomesOPlenty:foliage", 4);	// Bush
		addFuel(100, "BiomesOPlenty:bamboo");
	}

	if (!!modList.ExtrabiomesXL){
		addFuel(40, "ExtrabiomesXL:plants4");
		// addFuel(100, m.flower, 0);	// Shrub
		//addFuel(100, "ExtrabiomesXL:flower1", 5);	// Root
		addFuel(20, "ExtrabiomesXL:grass", 2);	 // Short dead grass
		addFuel(40, "ExtrabiomesXL:grass", 3);	 // Tall dead grass
		addFuel(20, "ExtrabiomesXL:grass", 4);	 // Short yellow dead grass
		addFuel(40, "ExtrabiomesXL:leaf_pile");
		addFuel(150, "ExtrabiomesXL:woodslab"); // Rebalancing to match vanilla 7.5s
		addFuel(150, "ExtrabiomesXL:woodslab2"); // Rebalancing to match vanilla 7.5s
		// Add missing ore dictionary entries
	}

	if (!!modList.TwilightForest){
		addFuel(100, "TwilightForest:tile.TFSapling");
		// Add missing ore dictionary entries
		registerOre("logWood", newItemStack("TwilightForest:tile.TFLog", 1, WILDCARD));
	}

	if (!!modList.Thaumcraft){
		addFuel(100, "Thaumcraft:blockCustomPlant", 0); // Greatwood sapling
		addFuel(100, "Thaumcraft:blockCustomPlant", 1); // Silverwood sapling
		addShapelessRecipe(new ItemStack(item.rottenFlesh, 9).constructStack(),
			[new ItemStack("Thaumcraft:blockTaint", 1, 2).constructStack()]); // Uncrafting of Block of Flesh
	}

	if (!!modList.Natura){
		addFuel(100, "Natura:florasapling");
		addFuel(40, "Natura:barleyFood", 0); // Barley
		addFuel(300, "Natura:door.redwood");
		addFuel(300, "Natura:door.eucalyptus");
		addFuel(300, "Natura:door.hopseed");
		addFuel(300, "Natura:door.sakura");
		addFuel(300, "Natura:door.ghostwood");
		addFuel(300, "Natura:door.bloodwood");
		addFuel(300, "Natura:door.redwoodbark");
		// Add missing ore dictionary entries
		registerOre("logWood", newItemStack("Natura:bloodwood", 1, WILDCARD));
	}

	if (!!modList.Botania){
		if (!!modList.ThermalExpansion){
			teAddSmelterRecipe(5000, "ingotMithril", "ingotIron", "ingotManasteel", null, null, false)

		}

	}

	if (!!modList.TConstruct){
		addFuel(100, "TConstruct:manualBook");
		addFuel(300, "TConstruct:blankPattern", 0);
		// Bug: burns forever for some reason
		//addFuel(300, m.woodPattern);
		addFuel(160, "TConstruct:materials", 0); // Paper stack

		if (!modList.ThermalSmeltery && !!modList.ThermalExpansion && optionalFeature.tinkers_te_crucible_melting){
			// Thermal Smeltery does this better anyways.....
			function s(string){
				if (getOres("ingot"+string).length > 0) teAddCrucibleRecipe(5000, "ingot"+string, 1, newFluidStack(lowerCase(string)+".molten", 144));
				if (getOres("dust"+string).length > 0) teAddCrucibleRecipe(5000, "dust"+string, 1, newFluidStack(lowerCase(string)+".molten", 144));
				if (getOres("ore"+string).length > 0) teAddCrucibleRecipe(5000, "ore"+string, 1, newFluidStack(lowerCase(string)+".molten", 288));
				if (getOres("nugget"+string).length > 0) teAddCrucibleRecipe(5000, "nugget"+string, 1, newFluidStack(lowerCase(string)+".molten", 16));
				if (getOres("block"+string).length > 0) teAddCrucibleRecipe(5000, "block"+string, 1, newFluidStack(lowerCase(string)+".molten", 1296));
			}

			s("Iron");
			s("Gold");
			s("Copper");
			s("Tin");
			s("Cobalt");
			s("Ardite");
			s("Lead");
			s("Silver");
			s("Aluminum");
			s("Bronze");
			s("Bronze");
			s("AluminumBrass");
			s("Manyullyn");
			s("Alumite");
			s("Steel");
			s("Nickel");
			s("Platinum");
			s("Invar");
			s("Electrum");
			s("PigIron");
			teAddOreDictCrucibleRecipe(5000, "obsidian", 1, newFluidStack("obsidian.molten", 288));
			teAddOreDictCrucibleRecipe(5000, "sand", 1, newFluidStack("glass.molten"));
			teAddOreDictCrucibleRecipe(5000, "glass", 1, newFluidStack("glass.molten"));
		}
	}

	if (modList["BuildCraft|Core"]){
		addFuel(300, "BuildCraft|Core:woodenGearItem");

		if (modList.TConstruct && optionalFeature.tinkers_bc_refinery_mixing){
			bcAddRefinery2to1Recipe("manyullyn", newFluidStack("cobalt.molten", 1), newFluidStack("ardite.molten", 1), newFluidStack("manyullyn.molten", 1), 10, 1);
			bcAddRefinery2to1Recipe("electrum", newFluidStack("gold.molten", 1), newFluidStack("silver.molten", 1), newFluidStack("electrum.molten", 2), 10, 1);
			bcAddRefinery2to1Recipe("invar", newFluidStack("iron.molten", 1), newFluidStack("nickel.molten", 3), newFluidStack("electrum.molten", 4), 10, 1);
		}

	}

	if (modList.magicalcrops){
		var essenceOrb = new ItemStack("magicalcrops:magicalcrops_EssenceOrb").constructStack();
		var Essence = new ItemStack("magicalcrops:magicalcrops_MagicEssence");
		var mc = Packages.com.mark719.magicalcrops.MagicalCrops;
		var seeds = {};

		for (var a in mc){
			if (a instanceof __item){
				if (a.func_77658_a().indexOf("seeds")){
					seeds[a] = new ItemStack("magicalcrops:magicalcrops_"+a.func_77658_a()).constructStack();
				}
			}
		}
		for (var a in seeds){
			addShapelessRecipe(Essence.setItemDamage(1).constructStack(), [essenceOrb, new ItemStack(a)])
		}

	}


	log("Forcing my play-style on you.");

})();
