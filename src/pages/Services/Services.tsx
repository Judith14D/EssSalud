import HeroBannerServices from "../../components/servicios/HeroBannerServices";
import ServicesGrid from "../../components/servicios/ServicesGrid";
import HowItWorks from "../../components/servicios/HowItWorks";
import ScheduleSection from "../../components/servicios/ScheduleSection";
import DialogixBanner from "../../components/servicios/DialogixBanner";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";

export default function Services() {
  return (
    <div>
      <HeroBannerServices />
      <ServicesGrid />
      <HowItWorks />
      <ScheduleSection />
      <DialogixBanner />
      <FloatingButtons />
      <ChatDialogix />
      <section className="max-w-6xl mx-auto px-6 py-20"></section>
    </div>
  );
}
