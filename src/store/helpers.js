import messagesStore from "./modules/messages";

const getMessageIndexById = ({ messageId }) => {
  const messages = messagesStore.state.messages;
  return messages.findIndex(message => message.id === messageId);
};

export { getMessageIndexById };
