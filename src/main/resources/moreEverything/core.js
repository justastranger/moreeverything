// moreEverything Core
// Original by gromPE
// re-organized by justastranger


var __int = java.lang.Integer.TYPE;
var __float = java.lang.Float.TYPE;
var __boolean = java.lang.Boolean.TYPE;
var __char = java.lang.Character.TYPE;
var __class = java.lang.Class.forName("java.lang.Class");
var __objectArray = __class.forName("[Ljava.lang.Object;");
var __method = __class.forName("java.lang.reflect.Method");
var __item;
var __block;
var __itemStack = Packages.net.minecraft.item.ItemStack;
var __fluidStack = Packages.net.minecraftforge.fluids.FluidStack;
var __itemsList;
var logLevel = { debug : 0, info : 1, warning : 2, error : 3 };

var __fml = Packages.cpw.mods.fml;
var __forge = Packages.net.minecraftforge;
var __mE = Packages.com.grompe.moreEverything.mod_moreEverything;
var modID = "mod_moreEverything";
var __fuelHandler = Packages.com.grompe.moreEverything.mEFuelHandler;

// var hasForge = !isEmpty(__fml.common.registry.GameRegistry); // We are kind of assuming that we have using Forge...
var isDedicatedServer = (isEmpty(Packages.net.minecraft.client.Minecraft) && isEmpty(Packages.net.minecraft.client.main.Main));
var currentLogLevel = logLevel.info;

var WILDCARD = __forge.oredict.OreDictionary.WILDCARD_VALUE;


var modList;

(function(){

	var itemNames = __fml.common.registry.GameData.getItemRegistry().func_148742_b().toArray();

	for (var i = 0; i < itemNames.length; i++){
		var itemKey = getItem(itemNames[i]);
		__mE.itemAdd(itemKey, itemNames[i]);
	}

	var itemListArray = __mE.getItemMap().values().toArray();
	modList = {};
	var modID = "";

	for (var i = 0; i < itemListArray.length; i++){
		modID = itemListArray[i].substring(0, itemListArray[i].indexOf(':'));
		if (typeof modList[modID] == "undefined") modList[modID] = [];
	}

	for (var i = 0; i < itemListArray.length; i++){
		var item = itemListArray[i];
		modID = item.substring(0, item.indexOf(':'));
		modList[modID].push(item);
	}


	/*__fml.common.registry.GameRegistry.registerFuelHandler(new __fml.common.IFuelHandler(
	 {
	 getBurnTime: function(stack)
	 {
	 return __api.__getBurnTime(getItemName(getItemFromStack(stack)), getItemDamage(stack));
	 }
	 }));*/
	log("Fires kindled and items sorted.")
})();

function getMods(){
	var l = [];
	for (var i in modList){
		l.push(i)
	}
	return l
}

function getClass(s){
	return java.lang.Class.forName(s, true, __api.getClass().getClassLoader());
}

function isEmpty(obj){
	try{
		for (var i in obj) return false;
	}
	catch (e) {
	}
	return true;
}

function isJavaClass(thing, cls){
	return (typeof thing != "undefined") && (typeof thing.getClass != "undefined") && (thing.getClass() == cls);
}

function chr(s){
	return java.lang.Character.valueOf(s);
}

function lowerCase(s){
	return java.lang.String(s).toLowerCase();
}

function javaArray(arrtype, arr){
	if (arr instanceof Array){
		var j = java.lang.reflect.Array.newInstance(arrtype, arr.length);
		for (var i = 0; i < arr.length; i++) j[i] = arr[i];
	} else {
		var j = java.lang.reflect.Array.newInstance(arrtype, 1);
		j[0] = arr;
	}
	return j;
}

function objectArray(arr){
	return javaArray(java.lang.Object, arr);
}

function intArray(arr){
	return javaArray(java.lang.Integer, arr);
}

function nativeArray(arr){
	var tmp = [];
	for (var i = 0; i < arr.length; i++) tmp.push(arr[i]);
	return tmp;
}

function arrayOf(thing, count){
	var tmp = [];
	for (var i = 0; i < count; i++) tmp.push(thing);
	return tmp;
}

function log(msg, level){
	if (typeof level == "undefined") level = logLevel.info;
	if (level == logLevel.warning){
		msg = "Warning: "+msg;
		__api.__incWarnings(1);
	}
	if (level == logLevel.error){
		msg = "Error: "+msg;
		__api.__incErrors(1);
	}
	if (level >= currentLogLevel){
		__api.log(msg);
	}
}

function findIntMatch(regex){
	var res = FindMatch(regex);
	if (res) return parseInt(res);
	throw("FindIntMatch: Couldn't find "+regex);
}

function getItem(name){
	return __fml.common.registry.GameData.getItemRegistry().func_82594_a(name);
}
function getItemStackSize(stack){
	return stack.field_77994_a;
}
function setItemStackSize(stack, size){
	stack.field_77994_a = size;
	return stack;
}
function getItemDamage(stack){
	return stack.func_77960_j();
}
function setItemDamage(stack, damage){
	stack.field_77991_e = damage;
	return stack;
}
function setItemMaxStackSize(item, size){
	var item = getItem(item);
	if (size > 64) throw("setItemIDMaxStackSize: size can not be larger than 64.");
	item.func_77639_j(size)
}
function getItemMaxStackSize(item){
	var item = getItem(item);
	return item.func_77639_j()
}
function getItemFromStack(stack){
	return stack.func_77973_b();
}
function getItemName(item){
	if (isJavaClass(item, __itemStack)) item = getItemFromStack(item);
	return __mE.itemGet(item);
}
function itemStackEquals(first, second){
	return !!((getItemName(first) == getItemName(second)) && (getItemDamage(first) == getItemDamage(second)) && (getItemStackSize(first) == getItemStackSize(second)));
}
function getFluidID(name){
	if (typeof name != "string") throw("getFluidName: name must be a string.");
	return __forge.fluids.FluidRegistry.getFluidID(name)
}
function getFluidName(id){
	if (typeof id != "number") throw("getFluidName: id must be a number.");
	return __forge.fluids.FluidRegistry.getFluidName(id)
}
function getFluid(nameOrID){
	if (!(typeof nameOrID == "string" || typeof nameOrID == "number")) throw("getFluid: nameOrID must either be a string or a number.");
	return __forge.fluids.FluidRegistry.getFluid(nameOrID)
}
function QgetFluid(nameOrID){
	if (typeof nameOrID != "string" || typeof nameOrID != "number") return nameOrID;
	return __forge.fluids.FluidRegistry.getFluid(nameOrID)
}

function newItemStack(item, amount, metadata){
	if (getItem(item) == null) throw("newItemStack: item does not exist.");
	if (typeof item == "string" || isJavaClass(item, java.lang.String)) item = getItem(item);
	if (typeof amount == "undefined") amount = 1;
	if (typeof metadata == "undefined") metadata = 0;
	return new net.minecraft.item.ItemStack(item, amount, metadata)
}

function newFluidStack(id, amount){
	if (typeof id == "string") id = getFluidID(id);
	if (typeof amount == "undefined") amount = 1000;
	return new __forge.fluids.FluidStack(id, amount);
}

function stringOrNumber(thing){
	return !!(typeof thing == "string" || typeof thing == "number");
}


function getOres(name){
	var list = __forge.oredict.OreDictionary.getOres(name);
	return nativeArray(list.toArray());
}

function getOreNames(){
	return __forge.oredict.OreDictionary.getOreNames();
}

function registerOre(name, stackOrBlockName, itemDamage){
	if (typeof stackOrBlockName == "string"){
		stackOrBlockName = newItemStack(stackOrBlockName, 1, typeof itemDamage == "number" ? itemDamage : WILDCARD);
	}
	__forge.oredict.OreDictionary.registerOre(name, stackOrBlockName);
	return true;
}

function forInObject(object){ // This is more of a dev function for discovering methods in an object or class.
	for (var a in object) log(a)
}

function addSmelting(input, output, experience){
	if (typeof input != "string" && input.getClass() != "net.minecraft.item.ItemStack") throw("addSmelting: input must be a string or ItemStack.");
	if (typeof output != "string" && output.getClass() != "net.minecraft.item.ItemStack") throw("addSmelting: output must be a string or ItemStack.");
	if (typeof input == "string") input = newItemStack(input);
	if (typeof output == "string") output = newItemStack(output);
	if (typeof experience == "undefined") experience = 1.0;
	__fml.common.registry.GameRegistry.addSmelting(input, output, experience);
	log("Added smelting: ID "+input+" cooks into "+output+".", logLevel.debug);
	return true;
}

function addShapelessRecipe(stack, arr){
	if (!(arr instanceof Array)){
		var tmp = [];
		for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
		arr = tmp;
	}
	if (typeof stack == "undefined") throw("AddShapelessRecipe: stack is undefined.");
	if (typeof stack == "string") stack = newItemStack(stack);
	for (var i = 0; i < arr.length; i++){
		if ((typeof arr[i] == "string") && (arr[i].indexOf(':') > 0)) arr[i] = newItemStack(arr[i], 1, WILDCARD);
	}
	var recipe = new __forge.oredict.ShapelessOreRecipe(stack, objectArray(arr));
	__fml.common.registry.GameRegistry.addRecipe(recipe);
	log("Added shapeless recipe for "+stack+".", logLevel.debug);
	return true;
}

function addShapedRecipe(stack, arr){
	if (!(arr instanceof Array)){
		var tmp = [];
		for (var i = 1; i < arguments.length; i++) tmp.push(arguments[i]);
		arr = tmp;
	}
	if (typeof stack == "undefined") throw("addShapedRecipe: stack is undefined.");
	if (typeof stack == "string") stack = newItemStack(stack);
	for (var i = 0; i < arr.length; i++){
		if ((typeof arr[i] == "string") && (arr[i].indexOf(':') > 0)) arr[i] = newItemStack(arr[i], 1, WILDCARD);
	}
	var recipe = new __forge.oredict.ShapedOreRecipe(stack, objectArray(arr));
	__fml.common.registry.GameRegistry.addRecipe(recipe);
	log("Added shaped recipe for "+stack+".", logLevel.debug);
	return true;
}

function addFuel(burnTime, id, damage){
	if (isNaN(burnTime) || (burnTime <= 0)) throw("addFuel: burnTime argument must be a number greater than 0.");
	if (typeof id == "String" && !id.indexOf(":") > 0) throw("addFuel: id must be an item name, such as 'minecraft:dirt'");
	if (typeof damage == "undefined") damage = 32767; // Java program always uses 32767 as wildcard
	__fuelHandler.__addFuel(id, damage, burnTime);
	var logitem = (damage != 32767) ? (id+":"+damage) : id;
	log("Added fuel: ID "+logitem+" to burn for "+burnTime+" ticks.", logLevel.debug);
	return true;
}

function getFuel(name, damage){
	damage = damage ? damage : WILDCARD;
	if (typeof name == "string") return __fuelHandler.__getBurnTime(name, damage);
	if (isJavaClass(name, __itemStack)) return __fuelHandler.getBurnTime(name);
}

// I was hoping that I would use this somewhere... oh well...
function sendIMCMessage(target, key, value){
	if (typeof target != "string") throw("sendIMCMessage: target must be a string");
	if (!__fml.common.FMLCommonHandler.findContainerFor(target)) throw("sendIMCMessage: target must the mod ID of an installed mod.");
	if (typeof key != "string") throw("sendIMCMessage: key must be a string");
	if (typeof value != "string") throw("sendIMCMessage: value must be a string");

	__fml.common.event.FMLInterModComms.sendRuntimeMessage(modID, modID, target, key, value);
}


log("Found the core!");
