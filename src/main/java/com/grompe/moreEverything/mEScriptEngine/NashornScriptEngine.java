package com.grompe.moreEverything.mEScriptEngine;

import javax.script.*;
import java.io.Reader;
import java.io.StringReader;

public class NashornScriptEngine {
    public static ScriptEngineManager engineManager = new ScriptEngineManager();
    public static ScriptEngine nashornEngine;// = engineManager.getEngineByName("nashorn");
    // public static Bindings bindings = nashornEngine.getBindings(ScriptContext.ENGINE_SCOPE);

    public NashornScriptEngine() {
        this.nashornEngine = engineManager.getEngineByName("nashorn");
    }

    public Object eval(Reader var1) throws ScriptException {
        if(var1 == null)
        {
            throw new NullPointerException("null script");
        } else {
            return this.nashornEngine.eval(var1);
        }
    }

    public Object eval(String var1) throws ScriptException {
        if(var1 == null)
        {
            throw new NullPointerException("null script");
        } else {
            return this.nashornEngine.eval((Reader)(new StringReader(var1)));
        }
    }

    public void put(String s, Object o){
        this.nashornEngine.put(s,o);
    }

    public Object get(String s){
        return this.nashornEngine.get(s);
    }

}
