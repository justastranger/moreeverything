// Made by Grom PE, public domain
// Contact site: http://grompe.org.ru/
// Contact XMPP/email: i@grompe.org.ru
package com.grompe.moreEverything;

import com.google.common.io.ByteSource;
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

//import sun.org.mozilla.javascript.internal.RhinoException;

@Mod(modid="mod_moreEverything", name="moreEverything", version=mod_moreEverything.VERSION_TEXT)
public class mod_moreEverything
{
    public static final String VERSION_TEXT = "@VERSION@";
    public static final int WILDCARD = 32767;
	public static Logger logger;
	public static Map<Item, String> itemMap = new HashMap<Item, String>();
    public static List<String> includePost = new ArrayList<String>();
    public static List<String> includeInit = new ArrayList<String>();
    protected static File configDir;
    protected static boolean standalone = false;
    protected static boolean loaded = false;
    //protected static RhinoScriptEngine engine = new RhinoScriptEngine();
    protected static NashornScriptEngine engine;// = new NashornScriptEngine();
    //public static ScriptEngineManager engineManager = new ScriptEngineManager();
    //public static ScriptEngine nashornEngine = engineManager.getEngineByName("nashorn");
    protected static ScriptHandler sH = new ScriptHandler();
    protected static int warnings = 0;
    protected static int errors = 0;

	
	public static void itemAdd(Item key, String value)
	{
		itemMap.put(key, value);
	}

    public void postAdd(String file){
        includePost.add(file);
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

    private static File getConfigDir()
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
    
    public static class ScriptHandler
    {

        public static String __getConfigDir()
        {
            return configDir.toString();
        }
		
		public static void log(String s)
		{
			logger.info(s);
		}
		
		public static void log(String s, Object... fmt)
		{
			log(String.format(s, fmt));
		}
		
        public static void __include(String str) throws ScriptException
        {
            File file = new File(configDir, str);
            if (!file.exists())
            {
                if (hasResource(str))
                {
                    extractFromJar(str, configDir);
                    log("Including '%s' (extracted from jar)", str);
                } else {
                    log("Error: unable to find '%s' to include", str);
                    return;
                }
            } else {
                log("Including '%s'", str);
            }
            execConfigFile(file);
        }

        public static void __includeInternal(String str) throws ScriptException
        {
            log("Including '%s' inside jar", str);
            execResource(str);
        }

        // if running without Minecraft
        public static boolean __isStandalone()
        {
            return standalone;
        }


        // Java 6 doesn't like to provide these deep-code-digging functions
        // to JavaScript, so have to provide it with the following few helpers

        public static Method __getMethod(Class<?> c, String name, Class... paramtypes) throws Exception
        {
           return c.getMethod(name, paramtypes);
        }

        public static Object __newInstance(Constructor c, Object... initargs) throws Exception
        {
           return c.newInstance(initargs);
        }

        public static Constructor<?> __getConstructor(Class<?> c, Class... paramtypes) throws Exception
        {
           return c.getConstructor(paramtypes);
        }

        public static String __getMethodName(Method meth)
        {
            return meth.getName();
        }

        public static Class[] __getParameterTypes(Method meth)
        {
            return meth.getParameterTypes();
        }

        public static Class __getReturnType(Method meth)
        {
            return meth.getReturnType();
        }

        public static Object __invoke(Method meth, Object o, Object... args) throws Exception
        {
            return meth.invoke(o, args);
        }

        public static Object __invokeStatic(Method meth, Object... args) throws Exception
        {
            return meth.invoke(null, args);
        }

        // Various utility functions

        public static Object __unwrap(Object o)
        {
            return o;
        }
        
        public static void __testException() throws Exception
        {
            throw new IllegalArgumentException("O_O");
        }

        public static int __incWarnings(int amount)
        {
            return warnings += amount;
        }

        public static int __incErrors(int amount)
        {
            return errors += amount;
        }
    
    }

    public static void logRhinoException(ScriptException ex)
    {
        log("!SE! " + getScriptStacktrace(ex));
    }

    public static String getScriptStacktrace(ScriptException ex)
    {
        errors += 1;
        CharArrayWriter ca = new CharArrayWriter();
        ex.printStackTrace(new PrintWriter(ca));
        String boring = "sun\\.org\\.mozilla\\.javascript\\.internal\\.";
        return ca.toString().replaceAll("\tat "+boring+"[^\n]+\n", "").replaceFirst(boring, "");
    }

    public static void execResource(String str) throws ScriptException
    {
		try
		{
			ByteSource resource = Resources.asByteSource(Resources.getResource(str));
			InputStream is = resource.openStream();
			//InputStream s = mod_moreEverything.class.getResourceAsStream(str);
			if (is == null)
			{
				log("Error: unable to find '%s' to include", str);
				return;
			}
			execStream(new InputStreamReader(is), str);
		}
		catch(IOException e)
		{
			log("Error: unable to find '%s' to include", str);
			log(e.toString());
		}
    }
    
    public static void execStream(Reader reader, String name) throws ScriptException
    {
        engine.put(ScriptEngine.FILENAME, name);
        engine.eval(reader);
    }

    public static void execConfigFile(File file) throws ScriptException
    {
        try
        {
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "UTF-8");
            execStream(reader, file.getName());
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

    public static boolean hasResource(String name)
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
    
	
    public static void extractFromJar(String name, File outdir)
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

    private static void extractDefaultConfig()
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
            logRhinoException(e);
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

    public void sendIMC(String to, String key, NBTTagCompound value){
        FMLInterModComms.sendMessage(to, key, value);
    }
    public void sendIMC(String to, String key, ItemStack value){
        FMLInterModComms.sendMessage(to, key, value);
    }
    public void sendIMC(String to, String key, String value){
        FMLInterModComms.sendMessage(to, key, value);
    }


    @EventHandler
	public void preInit(FMLPreInitializationEvent event)
	{
        logger = event.getModLog();
        GameRegistry.registerFuelHandler(new mEFuelHandler());
        mod_moreEverything me = new mod_moreEverything();
        me.standalone = false;
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
                    logRhinoException(e);
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
                    logRhinoException(e);
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
