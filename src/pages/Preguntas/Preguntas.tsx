import { useState } from "react";
import HeroBannerPreguntas from "../../components/preguntas/HeroBannerPreguntas";
import FAQList from "../../components/preguntas/FAQGeneral";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";

export default function Preguntas() {
  const [search, setSearch] = useState("");

  return (
    <>
      <HeroBannerPreguntas search={search} setSearch={setSearch} />
      <FAQList search={search} setSearch={setSearch} />
      <FloatingButtons />
      <ChatDialogix />
    </>
  );
}
