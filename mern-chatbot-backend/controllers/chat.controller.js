import Chat from "../models/chat.model.js";
import { generateResponse } from "../services/gemini.service.js";

export const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  let chat;

  if (chatId) {
    chat = await Chat.findById(chatId);
  } else {
    chat = await Chat.create({
      user: req.user.id,
      messages: [],
    });
  }

  chat.messages.push({ role: "user", content: message });

  const aiResponse = await generateResponse(message);

  chat.messages.push({ role: "assistant", content: aiResponse });

  await chat.save();

  res.json(chat);
};

export const getChats = async (req, res) => {
  const chats = await Chat.find({ user: req.user.id }).sort({
    updatedAt: -1,
  });

  res.json(chats);
};