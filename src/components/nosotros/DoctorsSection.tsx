import { Link } from "react-router-dom";
import doctor01 from "../../assets/images/doctores/doctoraInfo01.jpg";
import doctor02 from "../../assets/images/doctores/doctoraInfo02.jpg";
import doctor03 from "../../assets/images/doctores/doctoraInfo03.jpg";

export default function DoctorsSection() {
  const doctors = [
    {
      name: "Milena Ramírez",
      role: "Doctora especializada",
      image: doctor01,
    },
    {
      name: "Jorge Medina",
      role: "Médico especialista",
      image: doctor02,
    },
    {
      name: "Carla Ugarte",
      role: "Doctora especializada",
      image: doctor03,
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFC] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Nuestros Doctores
          </h2>

          <Link
            to="/doctors"
            className="
              bg-white border border-blue-500 text-blue-600 
              px-5 py-2 rounded-lg text-sm font-medium
              shadow-sm hover:bg-blue-50 transition
            "
          >
            Ver doctores
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.map((doc, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {doc.name}
              </h3>

              <p className="text-gray-600 text-sm">{doc.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
