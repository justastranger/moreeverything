// moreEverything Core
// Original by gromPE
// re-organized by justastranger


var __int = java.type("java.lang.Integer");
var __float = java.type("java.lang.Float");
var __boolean = java.type("java.lang.Boolean");
var __char = java.type("java.lang.Character");
var __class = java.type("java.lang.Class");
var __objectArray = java.type("java.lang.Object[]");
var __method = java.type("java.lang.reflect.Method");
var __item = java.type("net.minecraft.item.Item");
var __block;
var __itemStack = java.type("net.minecraft.item.ItemStack");
var __fluidStack = java.type("net.minecraftforge.fluids.FluidStack");
var __nbtBase = java.type("net.minecraft.nbt.NBTBase");
var __itemsList;
var logLevel = { debug : 0, info : 1, warning : 2, error : 3 };

var __fml = Packages.cpw.mods.fml;
var __forge = Packages.net.minecraftforge;
var __mE = Packages.com.grompe.moreEverything.mod_moreEverything;
var modID = "mod_moreEverything";
var __fuelHandler = Packages.com.grompe.moreEverything.mEFuelHandler;

// var hasForge = !isEmpty(__fml.common.registry.GameRegistry); // We are kind of assuming that we are using Forge...
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
		//var j = java.lang.reflect.Array.newInstance(arrtype, arr.length);
		var j = new java.type(arrtype+"[]")(arr.length);
		for (var i = 0; i < arr.length; i++) j[i] = arr[i];
	} else {
		var j = new java.type(arrtype+"[]")(1);
		j[0] = arr;
	}
	return j;
}

function objectArray(arr){
	return javaArray("java.lang.Object", arr);
}

function intArray(arr){
	return javaArray("java.lang.Integer", arr);
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
	if(typeof item == "string") var item = getItem(item);
	else if(item instanceof __itemStack) item = getItemFromStack(item);
	else if(!item instanceof __item) throw("setItemMaxStackSize: item must be the name of the item, or the actual item.");
	if (size > 64) throw("setItemIDMaxStackSize: size can not be larger than 64.");
	item.func_77639_j(size)
}
function getItemMaxStackSize(item){
	if(typeof item == "string") var item = getItem(item);
	else if(item instanceof __itemStack) item = getItemFromStack(item);
	else if(!item instanceof __item) throw("getItemMaxStackSize: item must be the name of the item, or the actual item.");
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

function _nameStack(name){
	if(typeof name == "string"){
		if(name.indexOf(':')>0) return newItemStack(name);
		else return getOres(name)[0];
	} else {
		return name;
	}
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

function newNBTTagCompound(){
	return new net.minecraft.nbt.NBTTagCompound();
}

function setNBTTagItemStack(compound, itemStack){
	return itemStack.func_77955_b(compound);
}

function setNBTTagCustomItem(compound, key, itemStack){
	var nbt = itemStack.func_77978_p();
	compound.func_74782_a(key, nbt);
}

function setNBTTagBoolean(compound, key, bool){
	compound.func_74757_a(key, bool);
}

function setNBTTagFluidStack(compound, fluidStack){
	return fluidStack.writeToNBT(compound);
}

function stripNBTTag(compound, tag){
	compound.func_82580_o(tag);
}

function setNBTTagCustomFluidStack(compound, key, fluidStack){
	var fs =  fluidStack.writeToNBT(newNBTTagCompound());
	compound.func_74782_a(key, fs);
}

function setNBTTagInteger(compound, key, value){
	compound.func_74768_a(key, value);
}

function ItemStack(item, amount, meta){
	this.itemDamage = meta ? meta : 0;
	this.stackSize = amount ? amount : 1;
	if(typeof item != "undefined") this.item = item;
	else throw("ItemStack: null item");
	this.setstackSize = function(amount){
		this.stackSize = amount;
		return this;
	};
	this.setItemDamage = function(meta){
		this.itemDamage = meta;
		return this;
	};
	this.getItem = function(){
		return this.constructStack().func_77973_b()
	};
	this.getItemName = function(){
		return this.item;
	};
	this.getStackSize = function(){
		return this.stackSize;
	};
	this.getItemDamage = function(){
		return this.itemDamage;
	};
	this.constructStack = function(){
		if (typeof this.item == "string" && getItem(this.item) == null){
			try{this.item = getItemName(this.item);}
			catch(e){throw("newItemStack: item does not exist.");}
		}
		if (typeof this.item == "string" || (this.item instanceof java.lang.String)) this.item = getItem(this.item);
		this.stack = new net.minecraft.item.ItemStack(this.item, this.stackSize, this.itemDamage)
		return this.stack;
	};

	return this;
}

function FluidStack(fluid, amount){
	this.fluidID = typeof fluid == "string" ? getFluidID(fluid) : fluid;
	this.amount = amount ? amount : 1000;

	this.getFluid = function(){
		return getFluid(this.fluidID);
	};

	this.getFluidName = function(){
		return getFluidName(this.fluidID);
	};

	this.getAmount = function(){
		return this.amount;
	};

	this.setAmount = function(amount){
		this.amount = amount;
		return this;
	};

	this.constructStack = function(){
		return new __forge.fluids.FluidStack(id, amount);
	};

}

function NBTTagCompound(){
	this.blankCompound = function(){
		return new net.minecraft.nbt.NBTTagCompound();
	};
	this.setInteger = function(key, num){
		if(typeof num == "number" && Math.floor(num) == num) this[key] = num;
		return this;
	};
	this.setFluidStack = function(key, fluidStack){
		if(isJavaClass(fluidStack, __fluidStack)) this[key] = fluidStack;
		return this;
	};
	this.setItemStack = function(key, itemStack){
		if(isJavaClass(itemStack, __itemStack)) this[key] = itemStack;
		return this;
	};
	this.setBoolean = function(key, bool){
		if(typeof bool == "boolean") this[key] = bool;
		return this;
	};
	this.setString = function(key, string){
		if(typeof string == "string") this[key] = string;
		return this;
	}
	this.setFloat = function(key, fl){
		if(typeof fl == "number" && Math.floor(fl) != fl) this[key] = fl;
		return this;
	}
	this.constructInteger = function(comp, key, num){
		comp.func_74768_a(key, num);
		return comp;
	};
	this.constructFloat = function(comp, key, num){
		comp.func_74776_a(key, num);
		return comp;
	};
	this.constructFluidStack = function(comp, key, fluid){
		var fs =  fluid.writeToNBT(this.blankCompound());
		comp.func_74782_a(key, fs);
		return comp;
	};
	this.constructItemStack = function(comp, key, stack){
		var nbt = stack.func_77955_b(this.blankCompound());
		comp.func_74782_a(key, nbt);
		return comp;
	};
	this.constructString = function(comp, key, string){
		comp.func_74778_a(key, string);
		return comp;
	};
	this.constructBoolean = function(comp, key, bool){
		comp.func_74757_a(key, bool);
		return comp;
	};
	this.constructTag = function(comp, key, tag){
		comp.func_74782_a(key, tag);
		return comp;
	};


	this.constructCompound = function(){
		var comp = this.blankCompound();
		for(var b in this){
			if(typeof this[b] != "function"){
				switch (typeof this[b]){
					case "number":
						if(Math.floor(this[b]) == this[b]) this.constructInteger(comp, b, this[b]);
						if(Math.floor(this[b]) != this[b]) this.constructFloat(comp, b, this[b]);
						break;
					case "string":
						this.constructString(comp, b, this[b]);
						break;
					case "boolean":
						this.constructBoolean(comp, b, this[b]);
						break;
					case "object":
						if(this[b] instanceof __itemStack) this.constructItemStack(comp, b, this[b]);
						if(this[b] instanceof __fluidStack) this.constructFluidStack(comp, b, this[b]);
						if(this[b] instanceof __nbtBase) this.constructTag(comp, b, this[b]);
						break;
				}
			}
		}
		this.compound = comp;
		return this.compound;
	};

	return this;
}


// I was hoping that I would use this somewhere... oh well...
function sendRuntimeIMCMessage(target, key, value){
	if (typeof target != "string") throw("sendIMCMessage: target must be a string");
	if (!__fml.common.FMLCommonHandler.instance().findContainerFor(target)) throw("sendIMCMessage: target must the mod ID of an installed mod.");
	if (typeof key != "string") throw("sendIMCMessage: key must be a string");
	__fml.common.event.FMLInterModComms.sendRuntimeMessage(modID, target, key, value);
}
function sendIMCMessage(to, key, value){
	if (typeof to != "string") throw("sendIMCMessage: to must be a string");
	if (typeof key != "string") throw("sendIMCMessage: key must be a string");
	if (!__fml.common.FMLCommonHandler.instance().findContainerFor(to)) throw("sendIMCMessage: to must the mod ID of an installed mod.");
	try{__mE.sendIMC(to, key, value);}
	catch(e){throw e;}
}

log("Found the core!");
