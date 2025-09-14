import ChatRAG from './ChatRAG';
import WhatsAppButton from './WhatsAppButton';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-0 right-0 z-30">
      <ChatRAG />
      <WhatsAppButton />
    </div>
  );
};

export default FloatingButtons;