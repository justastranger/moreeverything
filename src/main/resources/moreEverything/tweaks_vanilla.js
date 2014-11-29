// Vanilla tweaks
// By Grom PE

(function(){
	if (optionalFeature.more_vanilla_fuel){
		// More fuel
		addFuel(20, item.feather);
		addFuel(20, item.string);
		addFuel(40, item.woodenButton);
		addFuel(40, item.wheat);
		addFuel(40, item.sugarCane);
		addFuel(40, item.map);
		addFuel(40, item.emptyMap);
		addFuel(40, item.paper);
		addFuel(100, item.book);
		addFuel(100, item.painting);
		addFuel(100, item.bowl);
		addFuel(100, item.deadBush);
		addFuel(100, item.wool);
		addFuel(100, item.torch);
		addFuel(100, item.redstoneTorch);
		addFuel(100, item.arrow);
		addFuel(200, item.bow);
		addFuel(200, item.ladders);
		addFuel(200, item.woodenSword);
		addFuel(200, item.woodenShovel);
		addFuel(200, item.woodenPickaxe);
		addFuel(200, item.woodenAxe);
		addFuel(200, item.woodenHoe);
		addFuel(200, item.saddle);
		addFuel(200, item.fishingRod);
		addFuel(200, item.carrotStick);
		addFuel(300, item.woodenPressurePlate);
		addFuel(300, item.sign);
		addFuel(300, item.woodenDoor);
		addFuel(300, item.boat);
		addFuel(300, item.bed);
		addFuel(400, item.netherrack);
		addFuel(100, item.grass, 0); // Shrub
		addFuel(150, item.slab, 2); // Old wooden slab
		addFuel(400, item.hayBlock);
	}
	if (optionalFeature.wool_bleaching){
		// Allow bleaching wool with bonemeal
		addShapelessRecipe(item.wool, [newItemStack(item.dye, 1, dye.boneMeal), item.wool]);
	}
	if (optionalFeature.hayblock_uncrafting){
		addShapelessRecipe(newItemStack(item.wheat, 9), item.hayBlock);
	}

	log("Fixed Mojang's mistakes.");

})();
