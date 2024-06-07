const axios = require('axios');
module.exports.config = {
  name: 'artorias',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt', 'openai'],
  description: "An Artorias command powered by GPT-4",
  usage: "Artorias [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'artorias'. For example: 'Artoriae What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://soyeon-api.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nhttps://bit.ly/create-chatbot-me', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
