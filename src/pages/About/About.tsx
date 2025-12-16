import HeroNosotros from "../../components/nosotros/HeroNosotros";
import SectionNosotros from "../../components/nosotros/SectionNosotros";
import SectionCompromiso from "../../components/nosotros/SectionCompromiso";
import DoctorsSection from "../../components/nosotros/DoctorsSection";
import TestimonialsSection from "../../components/nosotros/TestimonialsSection";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";

export default function About() {
  return (
    <>
      <HeroNosotros />
      <SectionNosotros />
      <SectionCompromiso />
      <DoctorsSection />
      <TestimonialsSection />
      <FloatingButtons />
      <ChatDialogix />
    </>
  );
}
