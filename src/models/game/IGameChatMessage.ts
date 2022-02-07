interface IGameChatMessage {
  sender: string;
  message: string;
  time: string;
  isLeader: boolean;
}

export default IGameChatMessage;
