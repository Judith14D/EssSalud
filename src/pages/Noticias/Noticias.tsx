import HeroBannerNoticias from "../../components/noticias/HeroBannerNoticias";
import NewsSection from "../../components/noticias/NewsSection";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";

export default function Noticias() {
  return (
    <div>
      <HeroBannerNoticias />
      <NewsSection />
      <FloatingButtons />
      <ChatDialogix />
    </div>
  );
}
