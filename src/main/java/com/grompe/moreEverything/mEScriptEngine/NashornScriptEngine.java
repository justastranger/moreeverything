package com.grompe.moreEverything.mEScriptEngine;

import com.google.common.io.ByteSource;
import com.google.common.io.Resources;
import com.grompe.moreEverything.moreEverything;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;

public class NashornScriptEngine {
    public ScriptEngine nashornEngine;

    public NashornScriptEngine() {
        nashornEngine = new ScriptEngineManager(null).getEngineByName("nashorn");
    }

    public void execResource(String str) throws ScriptException
    {
        try
        {
            ByteSource resource = Resources.asByteSource(Resources.getResource(str));
            InputStream is = resource.openStream();
            if (is == null)
            {
                moreEverything.log("Error: unable to find '%s' to include", str);
                return;
            }
            execStream(new InputStreamReader(is), str);
        }
        catch(IOException e)
        {
            moreEverything.log("Error: unable to find '%s' to include", str);
            moreEverything.log(e.toString());
        }
    }

    public void execStream(Reader reader, String name) throws ScriptException
    {
        this.put("javax.script.filename", name);
        this.eval(reader);
    }

    public Object eval(Reader var1) throws ScriptException {
        if(var1 == null)
        {
            throw new NullPointerException("null script");
        } else {
            return nashornEngine.eval(var1);
        }
    }

    public Object eval(String var1) throws ScriptException {
        if(var1 == null)
        {
            throw new NullPointerException("null script");
        } else {
            return nashornEngine.eval((Reader)(new StringReader(var1)));
        }
    }

    public void put(String s, Object o){
        nashornEngine.put(s,o);
    }

    public Object get(String s){
        return nashornEngine.get(s);
    }

}
