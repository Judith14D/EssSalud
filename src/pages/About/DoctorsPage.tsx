import { Link } from "react-router-dom";
import FloatingButtons from "../../components/chatbot/FloatingButtons";
import { ChatDialogix } from "../../components/chatbot/ChatDialogix";

export default function DoctorsPage() {
  const doctors = [
    { id: 1, name: "Doctor 01", specialty: "Especialista en neurología" },
    { id: 2, name: "Doctor 02", specialty: "Especialista en neurología" },
    { id: 3, name: "Doctor 03", specialty: "Especialista en neurología" },
    { id: 4, name: "Doctor 04", specialty: "Especialista en neurología" },
    { id: 5, name: "Doctor 05", specialty: "Especialista en neurología" },
    { id: 6, name: "Doctor 06", specialty: "Especialista en neurología" },
    { id: 7, name: "Doctor 07", specialty: "Especialista en neurología" },
    { id: 8, name: "Doctor 08", specialty: "Especialista en neurología" },
    { id: 9, name: "Doctor 09", specialty: "Especialista en neurología" },
  ];

  return (
    <>
      <section className="w-full min-h-screen bg-[#F9FAFC] py-20">
        <div className="max-w-7xl mx-auto px-6 m-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nuestros Doctores
            </h2>

            <Link
              to="/nosotros"
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
            >
              Volver
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
              >
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-sm">Imagen del doctor</span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {d.name}
                  </h3>
                  <p className="text-sm text-gray-600">{d.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FloatingButtons />
      <ChatDialogix />
    </>
  );
}
