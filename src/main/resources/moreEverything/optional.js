// Optional addons
// by Grom PE


(function(){
	if (optionalFeature.rotten_flesh_to_leather){
		addSmelting(item.rottenFlesh, item.leather, 1.5);
	}
	if (optionalFeature.stack_more){
		function S(id, size){
			size = size ? 64 : size;
			try{
				setItemMaxStackSize(id, size);
			}
			catch (e) {
			}
		}

		S(item.saddle);
		S(item.bucket);
		S(item.egg);
		S(item.enderPearl);
		S(item.enderEye);
		S(item.snowball);
		S(item.cake);
		S(item.bed, 8);
		S(item.woodenDoor, 8);
		S(item.ironDoor, 8);
		S(item.boat);
		S(item.sign);
		S(item.minecart);
		S(item.minecartWithChest);
		S(item.minecartWithFurnace);
		S(item.minecartWithTNT);
		S(item.minecartWithHopper);
	}

	log("Options considered.");

})();