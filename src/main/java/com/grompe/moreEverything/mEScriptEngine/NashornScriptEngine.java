package com.grompe.moreEverything.mEScriptEngine;

import javax.script.*;
import java.io.Reader;
import java.io.StringReader;

public class NashornScriptEngine {
    public static ScriptEngineManager engineManager = new ScriptEngineManager();
    public static ScriptEngine nashornEngine = engineManager.getEngineByName("nashorn");
    public static Bindings global = new SimpleBindings();

    public NashornScriptEngine() {

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
        global.put(s, o);
    }

    public Object get(String s){
        return global.get(s);
    }

}
