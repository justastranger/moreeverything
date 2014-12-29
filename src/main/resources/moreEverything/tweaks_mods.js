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

	if (!!modList.EE3 && (EE3Enabled == true)){
		// Most of this was rather straight forward porting, replacing any mentions of the old mods_init.js with 1.7+ item names,
		// which shouldn't change version to version, between installs, worlds, or config options
		if (optionalFeature.ee_vanilla_transmutations){
			// Transmutations
			// 1 coal = 2 redstone
			addTransmutation1to1(newItemStack(item.coal, 1), newItemStack(item.redstone, 2));
			// 7 coal = 1 lapis lazuli
			addTransmutation1to1(newItemStack(item.dye, 1, dye.lapisLazuli), newItemStack(item.coal, 7));
			// 3 coal = 1 glowstone dust
			addTransmutation1to1(item.glowstoneDust, newItemStack(item.coal, 3));
			// 6 redstone -> 1 glowstone dust
			addTransmutation(item.glowstoneDust, arrayOf(item.redstone, 6));
		}
		if (optionalFeature.ee_vanilla_uncrafting){
			// Simple uncrafting
			QaddTransmutation(newItemStack(item.glass, 3), arrayOf(item.glassPane, 8));
			QaddTransmutation(newItemStack(item.netherBrick, 4), item.netherBricks);
			QaddTransmutation(item.netherrack, item.netherBrick);
			QaddTransmutation(item.clay, item.brick);
			QaddTransmutation(newItemStack(item.stick, 3), item.fence);
			QaddTransmutation(newItemStack(item.netherQuartz, 4), newItemStack(item.quartzBlock, 1));
			QaddTransmutation(item.quartzBlock, item.quartzBlock);
			if (optionalFeature.ee_stairs_slabs_walls_uncrafting){
				QaddTransmutation(item.stone, newItemStack(item.slab, 2, 0));
				QaddTransmutation(item.sandstone, newItemStack(item.slab, 2, 1));
				QaddTransmutation(item.woodPlanks, newItemStack(item.slab, 2, 2));
				QaddTransmutation(item.cobblestone, newItemStack(item.slab, 2, 3));
				QaddTransmutation(item.bricks, newItemStack(item.slab, 2, 4));
				QaddTransmutation(item.stoneBricks, newItemStack(item.slab, 2, 5));
				QaddTransmutation(item.netherBricks, newItemStack(item.slab, 2, 6));
				QaddTransmutation(item.quartzBlock, newItemStack(item.slab, 2, 7));
				for (var i = 0; i < 4; i++){
					QaddTransmutation(newItemStack(item.woodPlanks, 1, i), newItemStack(item.woodenSlab, 2, i));
				}
				QaddTransmutation(newItemStack(item.woodPlanks, 3, 0), arrayOf(item.oakWoodStairs, 2));
				QaddTransmutation(newItemStack(item.woodPlanks, 3, 1), arrayOf(item.spruceWoodStairs, 2));
				QaddTransmutation(newItemStack(item.woodPlanks, 3, 2), arrayOf(item.birchWoodStairs, 2));
				QaddTransmutation(newItemStack(item.woodPlanks, 3, 3), arrayOf(item.jungleWoodStairs, 2));
				QaddTransmutation(newItemStack(item.cobblestone, 3), arrayOf(item.cobblestoneStairs, 2));
				QaddTransmutation(newItemStack(item.stoneBricks, 3), arrayOf(item.stoneBrickStairs, 2));
				QaddTransmutation(newItemStack(item.netherBricks, 3), arrayOf(item.netherBrickStairs, 2));
				QaddTransmutation(newItemStack(item.sandstone, 3), arrayOf(item.sandstoneStairs, 2));
				QaddTransmutation(newItemStack(item.quartzBlock, 3), arrayOf(item.quartzStairs, 2));
				QaddTransmutation(item.netherBricks, item.netherBrickFence);
				QaddTransmutation(item.cobblestone, newItemStack(item.cobblestoneWall, 1, 0));
				QaddTransmutation(item.mossStone, newItemStack(item.cobblestoneWall, 1, 1));
			}
		}
		if (optionalFeature.ee_ore_transmutations){
			// Transmutations based on ore dictionary
			var all_copper = ["ingotCopper", "blockCopper", "nuggetCopper"];
			var all_bronze = ["ingotBronze", "blockBronze", "nuggetBronze"];
			var all_tin = ["ingotTin", "blockTin", "nuggetTin"];
			var all_silver = ["ingotSilver", "blockSilver", "nuggetSilver"];
			var all_iron = [item.ironIngot, item.ironBlock, "nuggetIron"];
			var all_gold = [item.goldIngot, item.goldBlock, item.goldNugget];
			var iron;
			for (var i = 0; i < 3; i++){
				var copper = getOres(all_copper[i]);
				var bronze = getOres(all_bronze[i]);
				var tin = getOres(all_tin[i]);
				var silver = getOres(all_silver[i]);
				if ((copper.length > 0) && (tin.length > 0)){
					// 1 tin = 3 copper
					addTransmutation(setItemStackSize(copper[0], 3), all_tin[i]);
					addTransmutation(tin[0], arrayOf(all_copper[i], 3));
				}
				if ((bronze.length > 0) && (tin.length > 0)){
					// 2 bronze -> 1 tin
					addTransmutation(tin[0], arrayOf(all_bronze[i], 2));
				}
				if ((silver.length > 0) && (tin.length > 0)){
					// 1 silver = 2 tin
					addTransmutation(setItemStackSize(tin[0], 2), all_silver[i]);
					addTransmutation(silver[0], arrayOf(all_tin[i], 2));
				}
				if (((i != 2) || (iron = getOres("nuggetIron")) && (iron.length > 0)) && (silver.length > 0)){
					// 2 iron -> 1 silver
					addTransmutation(silver[0], arrayOf(all_iron[i], 2));
				}
				if (silver.length > 0){
					// 4 silver -> 1 gold
					addTransmutation(all_gold[i], arrayOf(all_silver[i], 4));
				}
				if ((i == 2) && (iron.length > 0)){
					// 1 golden nugget -> 8 iron nuggets
					addTransmutation(setItemStackSize(iron[0], 8), all_gold[i]);
				}
			}

			addTransmutation(item.obsidian, "logWood", "logWood");
		}
		if (optionalFeature.ee_thaumcraft_transmutations && (modList.thaumcraft)){
			// Air shard -> fire shard -> water shard -> earth shard -> order shard -> entropy shard -> air shard; same for clusters
			addEquivalency(makeMetaCycle("Thaumcraft:ItemShard", 6));
			addEquivalency(makeMetaCycle("Thaumcraft:blockCrystal", 6));

			// Combine shards into balanced shards.
			var otherShards = [];
			for (var i = 0; i < 6; i++){
				otherShards.push(newItemStack("Thaumcraft:ItemShard", 1, i));
			}
			addTransmutation(newItemStack("Thaumcraft:ItemShard", 6, 6), otherShards);

			// Change marker, candle and warded stone colors
			addEquivalency(makeMetaCycle("Thaumcraft:blockCandle", 16));
			// Uncrafting: obsidian tile -> obsidian
			QaddTransmutation(item.obsidian, newItemStack("Thaumcraft:blockCosmeticSolid", 1, 1));
		}
		if (optionalFeature.ee_natura_transmutations && (modList.Natura)){
			// Barley = wheat
			addEquivalency(item.wheat, newItemStack("Natura:barleyFood", 1));
			// Seeds = barley seeds
			addEquivalency(item.seeds, newItemStack("Natura:barley.seed", 1));
			// Wheat flour = barley flour
			addEquivalency(newItemStack("Natura:barleyFood", 1, 1), newItemStack("Natura:barleyFood", 1, 2));
			// Uncrafting: gunpowder -> 4 sulfur (foodItems, heh)
			addTransmutation(newItemStack("Natura:barleyFood", 4, 4), item.gunpowder);
			// Uncrafting: sulfur -> 4 sulfur Cloud
			addTransmutation(newItemStack("Natura:Cloud", 4, 3), newItemStack("Natura:barleyFood", 1, 4));
		}
		if (optionalFeature.ee_underground_biomes_transmutations && (modList.UndergroundBiomes)){
			// Transmute stones in cycle
			addEquivalency(makeMetaCycle("UndergroundBiomes:igneousStone", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:metamorphicStone", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:igneousBrick", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:igneousCobblestone", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:igneousBrickSlab", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:metamorphicBrick", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:metamorphicCobblestone", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:metamorphicStoneSlab", 8));
			addEquivalency(makeMetaCycle("UndergroundBiomes:sedimentaryStone", 8, 4)); // Skip the lignite block

			// Uncook stone to cobble (can do only in pairs)
			for (var i = 0; i < 8; i++){
				addTransmutation(newItemStack("UndergroundBiomes:igneousCobblestone", 2, i), newItemStack("UndergroundBiomes:igneousStone", 2, i));
				addTransmutation(newItemStack("UndergroundBiomes:metamorphicCobblestone", 2, i), newItemStack("UndergroundBiomes:metamorphicStone", 2, i));
			}
			// Convert igneous/metamorphic stone to vanilla flint
			addTransmutation(item.flint, newItemStack("UndergroundBiomes:igneousCobblestone", 4, WILDCARD));
			addTransmutation(item.flint, newItemStack("UndergroundBiomes:metamorphicCobblestone", 4, WILDCARD));
			// And from sedimentary stone, only flint block
			addTransmutation(item.flint, newItemStack("UndergroundBiomes:sedimentaryStone", 4, 5));

			if (optionalFeature.ee_stairs_slabs_walls_uncrafting){
				// Joining slabs
				for (var i = 0; i < 8; i++){
					addTransmutation(newItemStack("UndergroundBiomes:igneousBrick", 1, i), newItemStack("UndergroundBiomes:igneousBrickSlab", 2, i));
					addTransmutation(newItemStack("UndergroundBiomes:metamorphicBrick", 1, i), newItemStack("UndergroundBiomes:metamorphicStoneSlab", 2, i));
				}
			}
		}
		if (optionalFeature.ee_biome_mods_transmutations && (modList.ExtrabiomesXL)){
			// redwood -> fir -> acacia -> cypress -> jap maple -> rainbow eucalyptus -> autumn wood -> bald cypress -> sakura
			// 0,1,2,3,4,5,6,7,8

			// Red rock -> red rock cobblestone
			addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 1, 1), newItemStack("ExtrabiomesXL:terrain_blocks1", 1));
			// 4 red rock cobblestone -> flint
			addTransmutation(item.flint, newItemStack("ExtrabiomesXL:terrain_blocks1", 4, 1));
			// Cycle leaves
			addEquivalency(makeMetaCycle("ExtrabiomesXL:leaves_1", 4), makeMetaCycle("ExtrabiomesXL:leaves_2", 4), makeMetaCycle("ExtrabiomesXL:leaves_3", 1), makeMetaCycle("ExtrabiomesXL:leaves_4", 4));
			// Cycle saplings
			addEquivalency(makeMetaCycle("ExtrabiomesXL:saplings_1", 7), makeMetaCycle("ExtrabiomesXL:saplings_2", 5));
			// Cycle logs
			addEquivalency(makeMetaCycle("ExtrabiomesXL:log1", 4), makeMetaCycle("ExtrabiomesXL:log2", 4));
			addEquivalency("ExtrabiomesXL:cornerlog_baldcypress", "ExtrabiomesXL:cornerlog_rainboweucalyptus", "ExtrabiomesXL:cornerlog_oak", "ExtrabiomesXL:cornerlog_fir", "ExtrabiomesXL:cornerlog_redwood");
			// Cycle wood planks
			addEquivalency(makeMetaCycle("ExtrabiomesXL:planks", 9));
			// Cycle slabs
			addEquivalency(makeMetaCycle("ExtrabiomesXL:woodslab", 8));
			addEquivalency(makeMetaCycle("ExtrabiomesXL:slabRedRock", 3));
			// Cycle stairs
			addEquivalency("ExtrabiomesXL:stairs.redwood", "ExtrabiomesXL:stairs.fir", "ExtrabiomesXL:stairs.acacia",
				"ExtrabiomesXL:stairs.rainboweucalyptus", "ExtrabiomesXL:stairs.cypress", "ExtrabiomesXL:stairs.baldcypress",
				"ExtrabiomesXL:stairs.japanesemaple", "ExtrabiomesXL:stairs.autumn", "ExtrabiomesXL:stairs.sakurablossom");
			addEquivalency("ExtrabiomesXL:redrockbrick", "ExtrabiomesXL:stairsRedCobble");
			// Uncraft 4 planks -> 1 log
			// I'm not making another for-loop for this one...
			addTransmutation("ExtrabiomesXL:planks", newItemStack("ExtrabiomesXL:planks", 4, WILDCARD));

			if (optionalFeature.ee_stairs_slabs_walls_uncrafting){
				// Uncraft stairs
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 0), arrayOf("ExtrabiomesXL:stairs.redwood", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 1), arrayOf("ExtrabiomesXL:stairs.fir", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 2), arrayOf("ExtrabiomesXL:stairs.acacia", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 3), arrayOf("ExtrabiomesXL:stairs.rainboweucalyptus", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 4), arrayOf("ExtrabiomesXL:stairs.cypress", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 5), arrayOf("ExtrabiomesXL:stairs.baldcypress", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 6), arrayOf("ExtrabiomesXL:stairs.japanesemaple", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 7), arrayOf("ExtrabiomesXL:stairs.autumn", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 3, 8), arrayOf("ExtrabiomesXL:stairs.sakurablossom", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 3, 2), arrayOf("ExtrabiomesXL:redrockbrick", 2));
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 3, 1), arrayOf("ExtrabiomesXL:stairsRedCobble", 2));

				// Join slabs
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 1, 1), arrayOf("ExtrabiomesXL:slabRedRock", 2, 0));
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 1, 0), arrayOf("ExtrabiomesXL:slabRedRock", 2, 1));
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 1, 2), arrayOf("ExtrabiomesXL:slabRedRock", 2, 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 0), arrayOf("ExtrabiomesXL:woodslab", 2, 0));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 1), arrayOf("ExtrabiomesXL:woodslab", 2, 1));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 2), arrayOf("ExtrabiomesXL:woodslab", 2, 2));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 3), arrayOf("ExtrabiomesXL:woodslab", 2, 3));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 4), arrayOf("ExtrabiomesXL:woodslab", 2, 4));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 5), arrayOf("ExtrabiomesXL:woodslab", 2, 5));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 6), arrayOf("ExtrabiomesXL:woodslab", 2, 6));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 7), arrayOf("ExtrabiomesXL:woodslab", 2, 7));
				addTransmutation(newItemStack("ExtrabiomesXL:planks", 1, 8), arrayOf("ExtrabiomesXL:woodslab2", 2, 0));

				// Uncraft walls
				addTransmutation(newItemStack("ExtrabiomesXL:terrain_blocks1", 1, 1), newItemStack("ExtrabiomesXL:wall", 1, 0));
			}
		}
		if (optionalFeature.ee_biome_mods_transmutations && (modList.BiomesOPlenty)){
			// Cycle leaves
			addEquivalency(makeMetaCycle("BiomesOPlenty:leaves1", 4), makeMetaCycle("BiomesOPlenty:leaves2", 4), makeMetaCycle("BiomesOPlenty:leaves3", 4), makeMetaCycle("BiomesOPlenty:leaves4", 2));
			// Cycle wood
			addEquivalency(makeMetaCycle("BiomesOPlenty:logs1", 4), makeMetaCycle("BiomesOPlenty:logs2", 4), makeMetaCycle("BiomesOPlenty:logs3", 4), makeMetaCycle("BiomesOPlenty:logs4", 4));
			// Cycle saplings and colorized saplings together
			addEquivalency(makeMetaCycle("BiomesOPlenty:saplings", 16), makeMetaCycle("BiomesOPlenty:colorizedSaplings", 5));
			// Cycle wooden planks
			addEquivalency(makeMetaCycle("BiomesOPlenty:planks", 10));
			// Cycle flowers
			addEquivalency(makeMetaCycle("BiomesOPlenty:flowers", 16), makeMetaCycle("BiomesOPlenty:flowers2", 9));
			// Cycle slabs
			addEquivalency(makeMetaCycle("BiomesOPlenty:woodenSingleSlab1", 8), makeMetaCycle("BiomesOPlenty:woodenSingleSlab2", 4));
			// Cycle stairs
			addEquivalency("BiomesOPlenty:sacredoakStairs", "BiomesOPlenty:cherryStairs", "BiomesOPlenty:darkStairs",
				"BiomesOPlenty:firStairs", "BiomesOPlenty:etherealStairs", "BiomesOPlenty:magicStairs",
				"BiomesOPlenty:mangroveStairs", "BiomesOPlenty:palmStairs", "BiomesOPlenty:redwoodStairs",
				"BiomesOPlenty:willowStairs", "BiomesOPlenty:pineStairs", "BiomesOPlenty:hellBarkStairs",
				"BiomesOPlenty:jacarandaStairs", "BiomesOPlenty:mahoganyStairs");
			// Uncraft 4 planks -> 1 log
			// All of them to the same log? There must be a better way!
			// addTransmutation("BiomesOPlenty:logs1", newItemStack("BiomesOPlenty:planks", 4, WILDCARD));
			// Found a way!
			var logCount = 0;
			for (var i = 0; i < 15; i++){
				if (!(i%4)) logCount++;
				if (i == 10) continue; // Bamboo Thatching...
				if (i < 11){ // Pine should be 12 according to the chart below, but there isn't a stand-in for the stem, so pine->mahogany are 1 metadata behind.
					var plank = newItemStack("BiomesOPlenty:planks", 4, i);
					var bLog = newItemStack(("BiomesOPlenty:logs"+logCount), 1, (i%4));
					addTransmutation(bLog, plank)
				} else { // So we add 1 to i when we hit Pine.
					var plank = newItemStack("BiomesOPlenty:planks", 4, i);
					var bLog = newItemStack(("BiomesOPlenty:logs"+logCount), 1, ((i+1)%4));
					addTransmutation(bLog, plank)
				}
			}

			if (optionalFeature.ee_stairs_slabs_walls_uncrafting){
				// Uncraft stairs
				// sacredoak, cherry, dark, fir, | ethereal, magic, mangrove, palm, | redwood, willow, dead, bigflowerstem, | pine, hellbark, jacaranda, mahogany
				// 		0, 		1, 	   2, 	 3,  |	4, 		 5, 		6, 	     7, |	  8, 	 9, 	10, 		11, 	|  12, 	  13, 		  14, 	   15
				addTransmutation(newItemStack("BiomesOPlenty:mudBricks", 3), newItemStack("BiomesOPlenty:mudBricksStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 0), newItemStack("BiomesOPlenty:sacredoakStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 1), newItemStack("BiomesOPlenty:cherryStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 2), newItemStack("BiomesOPlenty:darkStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 3), newItemStack("BiomesOPlenty:firStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 4), newItemStack("BiomesOPlenty:etherealStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 5), newItemStack("BiomesOPlenty:magicStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 6), newItemStack("BiomesOPlenty:mangroveStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 7), newItemStack("BiomesOPlenty:palmStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 8), newItemStack("BiomesOPlenty:redwoodStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 9), newItemStack("BiomesOPlenty:willowStairs", 2)); // There are no stairs or logs for dead wood or flower stems
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 12), newItemStack("BiomesOPlenty:pineStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 13), newItemStack("BiomesOPlenty:hellBarkStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 14), newItemStack("BiomesOPlenty:jacarandaStairs", 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 3, 15), newItemStack("BiomesOPlenty:mahoganyStairs", 2));

				// Join slabs
				addTransmutation(newItemStack("BiomesOPlenty:mudBricks", 1), newItemStack("BiomesOPlenty:stoneSingleSlab", 2, 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 0), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 0));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 1), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 1));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 2), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 3), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 3));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 4), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 4));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 5), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 5));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 6), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 6));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 7), newItemStack("BiomesOPlenty:woodenSingleSlab1", 2, 7));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 8), newItemStack("BiomesOPlenty:woodenSingleSlab2", 2, 0));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 9), newItemStack("BiomesOPlenty:woodenSingleSlab2", 2, 1));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 12), newItemStack("BiomesOPlenty:woodenSingleSlab2", 2, 2));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 13), newItemStack("BiomesOPlenty:woodenSingleSlab2", 2, 3));
				addTransmutation(newItemStack("BiomesOPlenty:planks", 1, 14), newItemStack("BiomesOPlenty:woodenSingleSlab2", 2, 4));
			}

			// Uncraft mud bricks block to 4 mud brick items
			addTransmutation(newItemStack("BiomesOPlenty:misc", 4, 0), "BiomesOPlenty:mudBricks");
			// Uncook mud brick to mud ball
			addTransmutation("BiomesOPlenty:mudball", newItemStack("BiomesOPlenty:misc", 1, 0));
		}
		if (optionalFeature.ee_biome_mods_transmutations && (modList.TwilightForest)){
			// Cycle normal wood: twilight oak -> canopy tree -> mangrove -> darkwood -> twilight oak
			addEquivalency(makeMetaCycle("TwilightForest:tile.TFLog", 4));
			// Cycle normal leaves: twilight oak -> canopy tree -> mangrove -> darkwood -> twilight oak
			addEquivalency(makeMetaCycle("TwilightForest:tile.TFLeaves", 3), newItemStack("TwilightForest:tile.TFHedge", 1, 1));
			// Cycle normal saplings (?)
			addEquivalency(makeMetaCycle("TwilightForest:tile.TFSapling", 4));
			// Cycle mazestone
			addEquivalency(makeMetaCycle("TwilightForest:tile.TFMazestone", 8));
		}
		/* if (optionalFeature.ee_minefantasy_transmutations && (modList.minefantasy))
		 {
		 // cobblestone bricks -> mossy -> cracked -> normal cobblestone bricks
		 addEquivalency(makeMetaCycle(m.cobblestoneBricks, 4));
		 // granite bricks -> mossy -> cracked -> normal granite bricks
		 addEquivalency(makeMetaCycle(m.graniteBricks,		 4));
		 // 2 ironbark wood -> obsidian
		 addTransmutation(item.obsidian, arrayOf(m.ironbarkWood, 2));
		 // 4 ironbark wood planks -> 1 ironbark wood
		 addTransmutation(m.ironbarkWood, arrayOf(m.ironbarkPlanks, 4));
		 if (optionalFeature.ee_stairs_slabs_walls_uncrafting)
		 {
		 // 2 stone stairs -> 3 stone
		 addTransmutation(newItemStack(item.stone, 3), arrayOf(m.stoneStairs, 2));
		 // 2 cobblestone brick stairs -> 3 cobblestone bricks
		 addTransmutation(newItemStack(m.cobblestoneBricks, 3), arrayOf(m.cobblestoneBrickStairs, 2));
		 }
		 } */
		if (optionalFeature.ee_tinkersconstruct_transmutations && (modList.TConstruct)){
			// Uncraft seared bricks -> 4x seared brick 14276:2
			addTransmutation(newItemStack("TConstruct:materials", 4, 2), newItemStack("TConstruct:Smeltery", 1, 2));
		}
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
		addShapelessRecipe(new ItemStack(item.rottenFlesh,9).constructStack(),
			[new ItemStack("Thaumcraft:blockTaint",1,2).constructStack()]); // Uncrafting of Block of Flesh
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

	if(!!modList.Botania){
		if(!!modList.ThermalExpansion){
			teAddSmelterRecipe(5000, "ingotMithril", "ingotIron", "ingotManasteel", null, null, false)

		}

	}

	if (!!modList.TConstruct){
		addFuel(100, "TConstruct:manualBook");
		addFuel(300, "TConstruct:blankPattern", 0);
		// Bug: burns forever for some reason
		//addFuel(300, m.woodPattern);
		addFuel(160, "TConstruct:materials", 0); // Paper stack

		if (!!modList.ThermalExpansion && optionalFeature.tinkers_te_crucible_melting){
			function s(string){
				if (getOres("ingot"+string).length > 0) teAddOreDictCrucibleRecipe(5000, "ingot"+string, 1, newFluidStack(lowerCase(string)+".molten", 144));
				if (getOres("dust"+string).length > 0) teAddOreDictCrucibleRecipe(5000, "dust"+string, 1, newFluidStack(lowerCase(string)+".molten", 144));
				if (getOres("ore"+string).length > 0) teAddOreDictCrucibleRecipe(5000, "ore"+string, 1, newFluidStack(lowerCase(string)+".molten", 288));
				if (getOres("nugget"+string).length > 0) teAddOreDictCrucibleRecipe(5000, "nugget"+string, 1, newFluidStack(lowerCase(string)+".molten", 16));
				if (getOres("block"+string).length > 0) teAddOreDictCrucibleRecipe(5000, "block"+string, 1, newFluidStack(lowerCase(string)+".molten", 1296));
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

	log("Forcing my play-style on you.");

})();
