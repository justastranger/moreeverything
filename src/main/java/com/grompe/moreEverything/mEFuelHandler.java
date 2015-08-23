package com.grompe.moreEverything;


import cpw.mods.fml.common.IFuelHandler;
import net.minecraft.item.ItemStack;
import net.minecraftforge.oredict.OreDictionary;

import java.util.HashMap;
import java.util.Map;


public class mEFuelHandler implements IFuelHandler {

    private static final Map<String,Integer> fuelMap = new HashMap<String,Integer>();
    private static final int WILDCARD = OreDictionary.WILDCARD_VALUE;

    @Override
    public int getBurnTime(ItemStack stack){
        String id = moreEverything.itemGet(stack.getItem());
        int damage = stack.getItemDamage();
        return __getBurnTime(id, damage);
    }

    public static void __addFuel(String id, int damage, int burnTime)
    {
        if (damage == -1) damage = WILDCARD;
        String index = id + String.valueOf(damage);
        fuelMap.put(index, burnTime);
    }

    public static int __getBurnTime(String id, int damage)
    {
        String index = id + String.valueOf(damage);
        if (fuelMap.containsKey(index)) return fuelMap.get(index);
        index = id + String.valueOf(WILDCARD);
        if (fuelMap.containsKey(index)) return fuelMap.get(index);
        return 0;
    }

}
