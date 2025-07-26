import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { message } = req.body;
    if (!senderId || !message) {
      return res.status(400).json({ error: true, success: false, msg: "SenderId or Message is not available" });
    }
    const newMessage = new Message({
      sender: senderId,
      message,
    });
    await newMessage.save();
    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      msg: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({}).populate("sender");
    if (!messages || messages.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      error: true,
      success: false,
    });
  }
};
