import CommunityHead from "../Components/community/CommunityHead";
import Navbar from "../Components/Navbar";
import TopSectionPic from "../assets/TopSectionImage.png";
import ChatWindow from '../Components/community/chat/ChatWindow';
import MessageInput from '../Components/community/chat/MessageInput';

function Community() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={TopSectionPic}
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar transparent />
      </div>

      <main className="relative z-10 w-full max-w-5xl h-[calc(100vh-120px)] mt-20 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/20 mx-auto">
        <CommunityHead />
        <ChatWindow />
        <MessageInput />
      </main>
    </div>
  );
}

export default Community;