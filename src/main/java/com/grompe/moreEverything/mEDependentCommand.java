package com.grompe.moreEverything;

import net.minecraft.command.CommandBase;
import net.minecraft.command.ICommand;
import net.minecraft.command.ICommandSender;

import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.util.ArrayList;
import java.util.List;


class mEDependentCommand extends CommandBase
{
	
	private final List aliases = new ArrayList();
	public mEDependentCommand()
	{
		this.aliases.add("eval");
	}
	
	@Override
	public String getCommandName()
	{
		return "eval";
	}
	@Override
	public String getCommandUsage(ICommandSender ICommandSender)
	{
		return "commands.eval.usage";
	}
	@Override
	public void processCommand(ICommandSender caller, String[] args)
	{
		if (args.length == 0)
		{
			ChatMessageHandler.iCommandSenderReply(caller, "\u00a7cUsage: /eval <JavaScript code>");
			return;
		}
		StringBuilder sb = new StringBuilder();
		sb.append(args[0]);
		for (int i = 1; i < args.length; i++) sb.append(" ").append(args[i]);
		String command = sb.toString();
		moreEverything.engine.put(ScriptEngine.FILENAME, "chat");
		try
		{
			Object obj = moreEverything.engine.eval("eval('"+command.replaceAll("'", "\\\\'")+"')");
			String result;
			if (obj != null) 
			{
				result = (String)moreEverything.engine.eval("'' + eval('"+command.replaceAll("'", "\\\\'")+"')").toString().replace("\r\n","\n").replace("\t", "    ");
			} else {
				result = "null";
			}
			ChatMessageHandler.multiLineCommandSenderReply(caller,("\u00a77>>> "+command+"\n\u00a7r"+result));
		}
		catch(ScriptException e)
		{
			String msg = moreEverything.me.getScriptStacktrace(e);
			// Leave only the interesting part of the message
			moreEverything.log(msg);
			msg = msg.substring(0, msg.indexOf("\tat com.grompe.moreEverything.mEScriptEngine.NashornScriptEngine")-2).replace("\t", "    ").replace("\r\n", "\n\u00a7c");
			ChatMessageHandler.multiLineCommandSenderReply(caller,("\u00a77>>> "+command+"\n\u00a7c"+msg));
		}
		catch(Exception e)
		{
			String msg = e.toString();
			moreEverything.log(msg);
		}
	}
	public int compareTo(Object obj)
	{
		return compareTo((ICommand)obj);
	}
}
