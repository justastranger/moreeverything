/*
	Credits go to SackCastellon for this one, since I was a bit too lazy to do something similar on my own.
	From SKC-Core: https://github.com/SackCastellon/SKC-Core/blob/master/java/SackCastellon/core/handler/ChatMessageHandler.java
	This file is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
		https://creativecommons.org/licenses/by-nc-sa/3.0/
*/


package com.grompe.moreEverything;

import net.minecraft.command.ICommandSender;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.server.MinecraftServer;
import net.minecraft.util.ChatComponentText;
import net.minecraft.util.IChatComponent;

class ChatMessageHandler {
    public static void iCommandSenderReply(ICommandSender player, String message) {
        sendChatToPlayer((EntityPlayer)player, message);
    }
	
	public static void multiLineCommandSenderReply(ICommandSender player, String message) {
		String[] lines = message.split("\n");
		for(String i : lines) {
			iCommandSenderReply(player, i);
		}
	}

    private static IChatComponent createChatComponent(String message) {
        return new ChatComponentText(message);
    }

    private static void sendChatToPlayer(EntityPlayer player, String message) {
        player.addChatComponentMessage(createChatComponent(message));
    }

    public static void broadcastMessageToPlayers(String message){
        MinecraftServer.getServer().getConfigurationManager().sendChatMsg(createChatComponent(message));
    }
}