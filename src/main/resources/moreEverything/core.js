// moreEverything Core
// Original by gromPE
// re-organized by justastranger


var __int = Java.type("java.lang.Integer");
var __long = Java.type("java.lang.Long");
var __float = Java.type("java.lang.Float");
var __string = Java.type("java.lang.String");
var __boolean = Java.type("java.lang.Boolean");
var __char = Java.type("java.lang.Character");
var __class = Java.type("java.lang.Class");
var __objectArray = Java.type("java.lang.Object[]");
var __method = Java.type("java.lang.reflect.Method");
var __item = Java.type("net.minecraft.item.Item");
var __block = Java.type("net.minecraft.block.Block");
var __fluid = Java.type("net.minecraftforge.fluids.Fluid");
var __itemStack = Java.type("net.minecraft.item.ItemStack");
var __fluidStack = Java.type("net.minecraftforge.fluids.FluidStack");
var __nbtBase = Java.type("net.minecraft.nbt.NBTBase");
var __nbtTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
var __itemsList;
var logLevel = { debug : 0, info : 1, warning : 2, error : 3 };

var __fml = Packages.cpw.mods.fml;
var __forge = Packages.net.minecraftforge;
var __mE = Packages.com.grompe.moreEverything.moreEverything;
var modID = "moreEverything";
var __fuelHandler = Packages.com.grompe.moreEverything.mEFuelHandler;

// var hasForge = !isEmpty(__fml.common.registry.GameRegistry); // We are kind of assuming that we are using Forge...
var isDedicatedServer = (isEmpty(Packages.net.minecraft.client.Minecraft) && isEmpty(Packages.net.minecraft.client.main.Main));
var currentLogLevel = logLevel.info;

var WILDCARD = __forge.oredict.OreDictionary.WILDCARD_VALUE;


var modList = {};

(function(){
	// This creates a reverse look up map so that you can get the item name from an item stack without too much work.
	// It's hideous and I wish the ItemRegistry was a BiMap
	var itemNames = __fml.common.registry.GameData.getItemRegistry().func_148742_b().toArray();

	for (var i = 0; i < itemNames.length; i++){
		var itemKey = getItem(itemNames[i]);
		__mE.itemAdd(itemKey, itemNames[i]);
	}

	// THIS, however, sorts all item names into mod-specific arrays for debug purposes.
	// It's also used to detect the presence of mods in a simple, global way.
	// The only limitation is that it doesn't detect mods without blocks or items.
	var itemListArray = __mE.getItemMap().values().toArray();
	var modID = "";

	// Create an array for each mod
	for (var i = 0; i < itemListArray.length; i++){
		modID = itemListArray[i].substring(0, itemListArray[i].indexOf(':'));
		if (typeof modList[modID] == "undefined") modList[modID] = [];
	}

	// Populate the arrays
	for (var i = 0; i < itemListArray.length; i++){
		var item = itemListArray[i];
		modID = item.substring(0, item.indexOf(':'));
		modList[modID].push(item);
	}

	log("Sorting Machine completed.")
})();

// Returns an array of all of the current mods with items/blocks
function getMods(){
	var l = [];
	for (var i in modList){
		l.push(i)
	}
	return l
}

// I think this is the incorrect usage.....
function getClass(s){
	return Java.type(s);
}

// Used for catching empty arrays and objects
function isEmpty(obj){
	try{
		for (var i in obj) return false;
	}
	catch (e) {
	}
	return true;
}

// Sugar for instanceof, which should replace it since it actually works in Rhino.
function isJavaClass(thing, cls){
	return (typeof thing != "undefined") && (typeof thing.getClass != "undefined") && (thing.getClass() == cls);
}

// Because who has time for java.lang.Character.valueOf(s);?
function chr(s){
	//return java.lang.Character.valueOf(s);
	return __char.valueOf(s);
}

// Exactly what it says on the tin.
function lowerCase(s){
	return __string(s).toLowerCase();
}

// Creates a java array of the specified type, using the given array.
// TODO have javaArray try/catch for when someone tries putting a string into an Integer[]
function javaArray(arrtype, arr){
	var t = Java.type(arrtype+"[]");
	if (arr instanceof Array){
		var j = new t(arr.length);
		for (var i = 0; i < arr.length; i++) j[i] = arr[i];
	} else {
		var j = new t(1);
		j[0] = arr;
	}
	return j;
}

// Syntactic sugar
function objectArray(arr){
	return javaArray("java.lang.Object", arr);
}

// More sugar
function intArray(arr){
	return javaArray("java.lang.Integer", arr);
}

// Convert a java array into a javascript
function nativeArray(arr){
	var tmp = [];
	for (var i = 0; i < arr.length; i++) tmp.push(arr[i]);
	return tmp;
}

// Create an arbitrarily long array consisting of a single item
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

// Deprecated: Was used in parsing pre-1.7.x config files for block/item IDs
// Maybe someone will find a use for it.
function findIntMatch(regex){
	var res = FindMatch(regex);
	if (res) return parseInt(res);
	throw("FindIntMatch: Couldn't find "+regex);
}

// Returns null if the name is invalid
function getItem(name){
	return __fml.common.registry.GameData.getItemRegistry().func_82594_a(name);
}

// A stack of 35 apples will return 35
function getItemStackSize(stack){
	return stack.field_77994_a;
}
function setItemStackSize(stack, size){
	stack.field_77994_a = size;
	return stack;
}

// Metadata stuff, will become deprecated for 1.8.x
function getItemDamage(stack){
	return stack.func_77960_j();
}
function setItemDamage(stack, damage){
	stack.field_77991_e = damage;
	return stack;
}


function setItemMaxStackSize(item, size){
	if (typeof item == "string") var item = getItem(item);
	else if (item instanceof __itemStack) item = getItemFromStack(item);
	else if (!item instanceof __item) throw("setItemMaxStackSize: item must be the name of the item, or the actual item.");
	if (size > 64) throw("setItemIDMaxStackSize: size can not be larger than 64.");
	if (size < 1) throw("setItemIDMaxStackSize: size can not be less than 1");
	item.func_77639_j(size)
}
function getItemMaxStackSize(item){
	if (typeof item == "string") var item = getItem(item);
	else if (item instanceof __itemStack) item = getItemFromStack(item);
	else if (!item instanceof __item) throw("getItemMaxStackSize: item must be the name of the item, or the actual item.");
	return item.func_77639_j()
}
function getItemFromStack(stack){
	return stack.func_77973_b();
}
function getItemName(itemOrStack){
	if (isJavaClass(itemOrStack, __itemStack)) itemOrStack = getItemFromStack(itemOrStack);
	return __mE.itemGet(itemOrStack);
}

// Syntactic sugar to convert whatever into an ItemStack, even if it already is.
function _lazyStack(name){
	if (name instanceof __itemStack) return name;
	if (typeof name == "string"){
		name = (name.indexOf(':') > 0) ? new ItemStack(name).getStack() : getOres(name)[0];
	} else if (name instanceof ItemStack) {
		name = name.getStack();
	} else {
		throw("Expected string, got: "+ typeof name);
	}
	return name
}

// More sugar, this time in fluid form.
function _lazyFluidStack(nameIDorStack, amount){
	if (nameIDorStack instanceof  __fluidStack) {
		return nameIDorStack;
	} else if (stringOrNumber(nameIDorStack)){
		nameIDorStack = new FluidStack(nameIDorStack, amount);
	} else if (nameIDorStack instanceof FluidStack) {
		return nameIDorStack.getStack();
	} else {
		throw("Expected string, number, or FluidStack, got: " + typeof nameIDorStack);
	}
	return nameIDorStack
}

function getOres(name){
	var list = __forge.oredict.OreDictionary.getOres(name);
	return nativeArray(list.toArray());
}

function getOreNames(){
	return __forge.oredict.OreDictionary.getOreNames();
}

function getBlock(itemName){
	var split = itemName.split(":"); // Split Item Name into mod id and item name.
	return __fml.common.registry.GameData.findBlock(split[0], split[1]);
}

function registerOre(name, stackOrBlockName, itemDamage){
	if (typeof stackOrBlockName == "string"){
		stackOrBlockName = newItemStack(stackOrBlockName, 1, typeof itemDamage == "number" ? itemDamage : WILDCARD);
	}
	__forge.oredict.OreDictionary.registerOre(name, stackOrBlockName);
	return true;
}

// This is more of a debug function for discovering public methods in an object or class.
function forInObject(object){
	for (var a in object) log(a);
}

function addSmelting(input, output, experience){
	if (typeof input != "string" && !input instanceof __itemStack) throw("addSmelting: input must be a string or ItemStack.");
	if (typeof output != "string" && !output instanceof __itemStack) throw("addSmelting: output must be a string or ItemStack.");
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
	stack = _lazyStack(stack);
	for (var i = 0; i < arr.length; i++){
		if (~arr[i].indexOf(":")) arr[i] = _lazyStack(arr[i]);
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
	stack = _lazyStack(stack);
	for (var i = 0; i < arr.length; i++){
		if (~arr[i].indexOf(':')) arr[i] = _lazyStack(arr[i]);
	}
	var recipe = new __forge.oredict.ShapedOreRecipe(stack, objectArray(arr));
	__fml.common.registry.GameRegistry.addRecipe(recipe);
	log("Added shaped recipe for "+stack+".", logLevel.debug);
	return true;
}

function addFuel(burnTime, id, damage){
	if (isNaN(burnTime) || (burnTime <= 0)) throw("addFuel: burnTime argument must be a number greater than 0.");
	if (typeof id == "String" && !id.indexOf(":") > 0) throw("addFuel: id must be an item name");
	if (typeof damage == "undefined") damage = WILDCARD; // Java program always uses 32767 as wildcard
	__fuelHandler.__addFuel(id, damage, burnTime);
	var logitem = (damage != 32767) ? (id+":"+damage) : id;
	log("Added fuel: ID "+logitem+" to burn for "+burnTime+" ticks.", logLevel.debug);
	return true;
}

function getFuel(name, damage){
	damage = typeof damage != "undefined" ? damage : WILDCARD;
	if (typeof name == "string") return __fuelHandler.__getBurnTime(name, damage);
	if (isJavaClass(name, __itemStack)) return __fuelHandler.getBurnTime(name);
}

// Functions for working with __itemStacks
function newItemStack(item, amount, metadata){
	if (getItem(item) == null) throw("newItemStack: item does not exist.");
	if (typeof item == "string" || item instanceof __string) item = getItem(item);
	if (typeof amount == "undefined") amount = 1;
	if (typeof metadata == "undefined") metadata = 0;
	return new __itemStack(item, amount, metadata)
}

function ItemStack(name, amount, meta){
	if(getItem(name) != null){
		this.name = name;
		this.itemDamage = meta ? meta : 0;
		this.stackSize = amount ? amount : 1;
		this.item = getItem(this.name);
		this.stack = new __itemStack(this.item, this.stackSize, this.itemDamage);
	} else {
		throw("ItemStack: Invalid Item Name.")
	}
	this.setStackSize = function(amount){
		this.stackSize = amount;
		this.update();
		return this;
	};
	this.setItemDamage = function(meta){
		this.itemDamage = meta;
		this.update();
		return this;
	};
	this.setItem = function(nameOrItem){
		if(typeof nameOrItem == "string" && getItem(nameOrItem) != null){
			this.name = nameOrItem;
			this.item = getItem(nameOrItem);
		} else if (nameOrItem instanceof __item){
			this.name = getItemName(nameOrItem);
			this.item = nameOrItem;
		} else {
			throw("ItemStack.setItem: Invalid Item Name.");
		}
		this.update();
		return this;
	};
	this.getItem = function(){
		return this.item;
	};
	this.getItemName = function(){
		return this.name;
	};
	this.getStackSize = function(){
		return this.stackSize;
	};
	this.getItemDamage = function(){
		return this.itemDamage;
	};
	this.getStack = function(){
		return this.stack;
	};

	// Behind the scenes function, gets called whenever one of the three constructors gets changed
	this.update = function(){
		this.stack = new __itemStack(this.item, this.stackSize, this.itemDamage);
	};

	return this;
}

// Functions for working with __fluidStacks
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
function newFluidStack(id, amount){
	if (typeof id == "string" || id instanceof __string) id = getFluidID(id);
	if (typeof amount == "undefined") amount = 1000;
	return new __forge.fluids.FluidStack(id, amount);
}
function stringOrNumber(thing){
	return !!(typeof thing == "string" || typeof thing == "number");
}

function FluidStack(fluid, amount){
	this.fluidID = typeof fluid == "string" ? getFluidID(fluid) : fluid;
	this.amount = amount ? amount : 1000; // 1000 = 1 bucket
	this.stack = new __forge.fluids.FluidStack(this.fluidID, this.amount);

	this.setFluid = function(nameIDorFluid){
		switch (typeof(nameIDorFluid)) {
			case "number": // a fluid ID
				this.fluidID = nameIDorFluid;
				break;
			case "string": // a fluid name
				this.fluidID = getFluidID(nameIDorFluid);
				break;
			case "object": // an object of some sort
				if(nameIDorFluid instanceof __fluid){ // a fluid
					this.fluidID = getFluidID(nameIDorFluid);
				} else { // something that isn't a fluid.
					throw("FluidStack.setFluid: expected string, number, or Fluid, got " + nameIDorFluid.getClass());
				}
				break;
			default: // Something that isn't a java object that we don't care about.
				throw("FluidStack.setFluid: expected string, number, or Fluid, got " + typeof nameIDorFluid);
		}
		this.update();
	};

	this.getFluid = function(){
		return __forge.fluids.FluidRegistry.getFluid(this.fluidID);
	};

	this.getFluidName = function(){
		return __forge.fluids.FluidRegistry.getFluidName(this.fluidID);
	};

	this.setAmount = function(amount){
		this.amount = amount;
		return this;
	};

	this.getAmount = function(){
		return this.amount;
	};

	this.getStack = function(){
		return this.stack;
	};

	this.update = function(){
		this.stack = new __forge.fluids.FluidStack(this.fluidID, this.amount);
	};

	return this;
}

// Functions for working with __nbtTagCompounds
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
	var fs = fluidStack.writeToNBT(newNBTTagCompound());
	compound.func_74782_a(key, fs);
}

function setNBTTagInteger(compound, key, value){
	compound.func_74768_a(key, value);
}

function NBTTagCompound(){
	this.blankCompound = function(){
		return new __nbtTagCompound();
	};
	this.setInteger = function(key, num){
		if (typeof num == "number" && Math.floor(num) == num) this[key] = num;
		return this;
	};
	this.setFluidStack = function(key, fluidStack){
		if (fluidStack instanceof __fluidStack) this[key] = fluidStack;
		return this;
	};
	this.setItemStack = function(key, itemStack){
		if (itemStack instanceof __itemStack)this[key] = itemStack;
		return this;
	};
	this.setBoolean = function(key, bool){
		if (typeof bool == "boolean") this[key] = bool;
		return this;
	};
	this.setString = function(key, string){
		if (typeof string == "string") this[key] = string;
		return this;
	};
	this.setFloat = function(key, fl){
		if (typeof fl == "number" && Math.floor(fl) != fl) this[key] = fl;
		return this;
	};
	this.constructInteger = function(comp, key, num){
		comp.func_74768_a(key, num);
		return comp;
	};
	this.constructFloat = function(comp, key, num){
		comp.func_74776_a(key, num);
		return comp;
	};
	this.constructFluidStack = function(comp, key, fluid){
		var fs = fluid.writeToNBT(this.blankCompound());
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
		for (var b in this){
			if (typeof this[b] != "function"){
				switch (typeof this[b]){
					case "number":
						if (Math.floor(this[b]) == this[b]) this.constructInteger(comp, b, this[b]);
						if (Math.floor(this[b]) != this[b]) this.constructFloat(comp, b, this[b]);
						break;
					case "string":
						this.constructString(comp, b, this[b]);
						break;
					case "boolean":
						this.constructBoolean(comp, b, this[b]);
						break;
					case "object":
						if (this[b] instanceof __itemStack) this.constructItemStack(comp, b, this[b]);
						if (this[b] instanceof __fluidStack) this.constructFluidStack(comp, b, this[b]);
						if (this[b] instanceof __nbtBase) this.constructTag(comp, b, this[b]);
						break;
				}
			}
		}
		this.compound = comp;
		return this.compound;
	};

	return this;
}


// Do any mods actually have runtime IMC support?
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
	try{
		__mE.sendIMC(to, key, value);
	}
	catch (e) {
		throw e;
	}
}

log("Found the core!");
