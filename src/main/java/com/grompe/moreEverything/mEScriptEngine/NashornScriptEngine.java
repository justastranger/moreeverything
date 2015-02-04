package com.grompe.moreEverything.mEScriptEngine;

import javax.script.*;
import java.io.Reader;

import static com.grompe.moreEverything.mod_moreEverything.logRhinoException;

public class NashornScriptEngine {
    public static ScriptEngineManager engineManager = new ScriptEngineManager();
    public static ScriptEngine nashornEngine = engineManager.getEngineByName("nashorn");
    public static Bindings global;

    public NashornScriptEngine() {
        global = new SimpleBindings();
        nashornEngine.setBindings(global, ScriptContext.ENGINE_SCOPE);
    }

    public Object eval(Reader var1){
        if(var1 == null)
        {
            throw new NullPointerException("null script");
        } else {
            try {
                return nashornEngine.eval(var1);
            } catch (ScriptException e) {
                logRhinoException(e);
            }
        }
    }

    public void put(String s, Object o){
        global.put(s, o);
    }

    public Object get(String s){
        return global.get(s);
    }

}
