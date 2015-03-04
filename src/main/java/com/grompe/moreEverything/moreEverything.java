// Made by Grom PE, public domain
// Contact site: http://grompe.org.ru/
// Contact XMPP/email: i@grompe.org.ru
package com.grompe.moreEverything;

import com.google.common.io.Files;
import com.google.common.io.Resources;
import com.grompe.moreEverything.mEScriptEngine.NashornScriptEngine;
import cpw.mods.fml.common.Mod;
import cpw.mods.fml.common.Mod.EventHandler;
import cpw.mods.fml.common.event.*;
import cpw.mods.fml.common.registry.GameRegistry;
import net.minecraft.item.Item;
import net.minecraft.item.ItemStack;
import net.minecraft.nbt.NBTTagCompound;
import org.apache.logging.log4j.Logger;

import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.io.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Mod(modid="moreEverything", name="moreEverything", version=moreEverything.VERSION_TEXT, dependencies = "after:*")
public class moreEverything
{
    public static final String VERSION_TEXT = "@VERSION@";
    public final int WILDCARD = 32767;
	public static Logger logger;
	public static Map<Item, String> itemMap = new HashMap<Item, String>();
    public static List<String> includePost = new ArrayList<String>();
    public static List<String> includeInit = new ArrayList<String>();
    protected static File configDir;
    protected static boolean standalone = false;
    protected static boolean loaded = false;
    protected NashornScriptEngine engine;
    protected ScriptHandler sH = new ScriptHandler();
    protected static moreEverything me;
    protected static int warnings = 0;
    protected static int errors = 0;

	
	public static void itemAdd(Item key, String value)
	{
		itemMap.put(key, value);
	}

    public static void postAdd(String file){
        includePost.add(file);
    }

	public static void initAdd(String file){
        includeInit.add(file);
    }

	public static String itemGet(Item key)
	{
		return itemMap.get(key);
	}
	
	public static Map<Item, String> getItemMap()
	{
		return itemMap;
	}
	
    public static void log(String s)
    {
        logger.info(s);
    }

    public static void log(String s, Object... fmt)
    {
        log(String.format(s, fmt));
    }

    private File getConfigDir()
    {
        if (standalone) return new File("config");
        try
		{
			Class<?> cls = Class.forName("net.minecraft.client.main.Main");
			log("Have Minecraft 1.6+, trying to get its working directory from the command line.");
			String cmd = System.getProperty("sun.java.command");
			if (cmd != null)
			{
				Pattern p = Pattern.compile("--gameDir ((?:\"[^\"]+\")|(?:'[^']+')|(?:[^ ]+))");
				Matcher m = p.matcher(cmd);
				if (m.find())
				{
					String workDir = m.group(1);
					if ((workDir.charAt(0) == '"') || (workDir.charAt(0) == '\''))
					{
						workDir = workDir.substring(1, workDir.length()-1);
					}
					log((String)workDir);
					return new File(workDir, "config");
				} else {
					log("Couldn't get workDir, using current directory.");
				}
			} else {
				log("Couldn't get command line arguments, using current directory.");
			}
		}
		catch(ClassNotFoundException e2)
		{
			log("Client not found, using current directory (server).");
		}
		return new File("config");
	}
    
    public class ScriptHandler
    {

        public String __getConfigDir()
        {
            return configDir.toString();
        }
		
		public void log(String s)
		{
			logger.info(s);
		}
		
		public void log(String s, Object... fmt)
		{
			log(String.format(s, fmt));
		}
		
        public void __include(String str) throws ScriptException
        {
            File file = new File(configDir, str);
            if (!file.exists())
            {
                if (me.hasResource(str))
                {
                    me.extractFromJar(str, configDir);
                    log("Including '%s' (extracted from jar)", str);
                } else {
                    log("Error: unable to find '%s' to include", str);
                    return;
                }
            } else {
                log("Including '%s'", str);
            }
            me.execConfigFile(file);
        }

        public void __includeInternal(String str) throws ScriptException
        {
            log("Including '%s' inside jar", str);
            engine.execResource(str);
        }

        // if running without Minecraft
        public boolean __isStandalone()
        {
            return standalone;
        }


        // Java 6 doesn't like to provide these deep-code-digging functions
        // to JavaScript, so have to provide it with the following few helpers
        // Not sure these are necessary anymore so they might get removed soon.
        public Method __getMethod(Class<?> c, String name, Class... paramtypes) throws Exception
        {
           return c.getMethod(name, paramtypes);
        }

        public Object __newInstance(Constructor c, Object... initargs) throws Exception
        {
           return c.newInstance(initargs);
        }

        public Constructor<?> __getConstructor(Class<?> c, Class... paramtypes) throws Exception
        {
           return c.getConstructor(paramtypes);
        }

        public String __getMethodName(Method meth)
        {
            return meth.getName();
        }

        public Class[] __getParameterTypes(Method meth)
        {
            return meth.getParameterTypes();
        }

        public Class __getReturnType(Method meth)
        {
            return meth.getReturnType();
        }

        public Object __invoke(Method meth, Object o, Object... args) throws Exception
        {
            return meth.invoke(o, args);
        }

        public Object __invokeStatic(Method meth, Object... args) throws Exception
        {
            return meth.invoke(null, args);
        }

        // Various utility functions

        public Object __unwrap(Object o)
        {
            return o;
        }
        
        public void __testException() throws Exception
        {
            throw new IllegalArgumentException("O_O");
        }

        public int __incWarnings(int amount)
        {
            return warnings += amount;
        }

        public int __incErrors(int amount)
        {
            return errors += amount;
        }
    
    }

    public void logScriptException(ScriptException ex)
    {
        log("!SE! " + getScriptStacktrace(ex));
    }

    public String getScriptStacktrace(ScriptException ex)
    {
        errors += 1;
        CharArrayWriter ca = new CharArrayWriter();
        ex.printStackTrace(new PrintWriter(ca));
        String boring = "sun\\.org\\.mozilla\\.javascript\\.internal\\.";
        return ca.toString().replaceAll("\tat "+boring+"[^\n]+\n", "").replaceFirst(boring, "");
    }

    public void execConfigFile(File file) throws ScriptException
    {
        try
        {
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "UTF-8");
            engine.execStream(reader, file.getName());
            reader.close();
        }
        catch(FileNotFoundException e)
        {
            log("File %s not found, ignoring.", file.getName());
        }
        catch(IOException e)
        {
            log("Error while reading the configuration file.");
        }
    }

    public boolean hasResource(String name)
    {
		try
		{
			byte[] resource = Resources.toByteArray(Resources.getResource(name));
			if(resource == null) return false;
		}
		catch (IOException e)
		{
			log("something went wrong");
			log(e.toString());
		}
		return true;
    }
    
	
    public void extractFromJar(String name, File outdir)
    {
		try
		{
			byte[] resource = Resources.toByteArray(Resources.getResource(name));
			File js = new File(outdir.getPath()+"/"+name);
			File p = new File(js.getPath().substring(0, js.getPath().lastIndexOf("\\")+1));
			p.mkdirs();
			if(js.createNewFile()) Files.write(resource, js);
			
		}
		catch(Exception e)
		{
			log("Error: unable to extract %s.", name);
			log(e.toString());
			
		}
    }

    private void extractDefaultConfig()
    {
        log("Extracting default configuration file.");
        configDir.mkdir();
        extractFromJar("mod_moreEverything.js", configDir);
    }
	
    public void load()
    {
    }

    // Need to load after all other mods...
    public void modsLoaded()
    {
        configDir = getConfigDir();
        File file = new File(configDir, "mod_moreEverything.js");
        if(!file.exists()) extractDefaultConfig();

        //engine = new RhinoScriptEngine();
        engine = new NashornScriptEngine();
        sH = new ScriptHandler();

        engine.put("__api", sH);
        try
        {
            execConfigFile(file);
            //execResource("moreEverything/core.js");
        }
        catch(ScriptException e)
        {
            logScriptException(e);
        }
        engine.put(ScriptEngine.FILENAME, null);
        loaded = true;
        log("Script load complete. "+warnings+" warnings, "+errors+" errors.");
    }


    public String getVersion()
    {
        return VERSION_TEXT;
    }

    public String Version()
    {
        return VERSION_TEXT;
    }

    /*public static void main(String[] args)
    {
        mod_moreEverything me = new mod_moreEverything();
        me.standalone = true;
        me.modsLoaded();
    }*/

    public static void sendIMC(String to, String key, NBTTagCompound value){
        log("Sending IMC message to " + to + " for " + key);
        FMLInterModComms.sendMessage(to, key, value);
    }
    public static void sendIMC(String to, String key, ItemStack value){
        log("Sending IMC message to " + to + " for " + key);
        FMLInterModComms.sendMessage(to, key, value);
    }
    public static void sendIMC(String to, String key, String value){
        log("Sending IMC message to " + to + " for " + key);
        FMLInterModComms.sendMessage(to, key, value);
    }


    @EventHandler
	public void preInit(FMLPreInitializationEvent event)
	{
        logger = event.getModLog();
        GameRegistry.registerFuelHandler(new mEFuelHandler());
        me = new moreEverything();
        standalone = false;
        me.modsLoaded();
	}

    @EventHandler
    public void init(FMLInitializationEvent event)
    {
        // IMC should happen here
        if (includeInit != null) {
            for(String a : includeInit) {
                try {
                    sH.__include(a);
                } catch(ScriptException e) {
                    logScriptException(e);
                }
            }
        }
    }

	@EventHandler
	public void postInit(FMLPostInitializationEvent event)
	{
        if (includePost != null) {
            for(String a : includePost) {
                try {
                    sH.__include(a);
                } catch (ScriptException e) {
                    logScriptException(e);
                }
            }
        }
	}
	@EventHandler
	public void serverLoad(FMLServerStartingEvent event)
	{
		event.registerServerCommand(new mEDependentCommand());
	}
}