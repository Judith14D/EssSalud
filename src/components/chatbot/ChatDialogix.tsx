import { useEffect, useState, useRef } from "react";
import { X, Send, RotateCcw, Mic } from "lucide-react";
import { enviarMensaje, resetConversacion } from "../../service/api";
import { MenuOptions } from "../chatbot/block/MenuOptions";
import { SpecialtiesCards } from "../chatbot/block/SpecialtiesCards";
import { DoctorCards } from "../chatbot/block/DoctorCards";
import { ScheduleOption } from "../chatbot/block/ScheduleOption";
import { ConfirmationCard } from "../chatbot/block/ConfirmationCard";
import { HistorialCitasCard } from "../chatbot/block/HistorialCitasCard";
import { ResultadosCard } from "../chatbot/block/ResultadosCard";
import { CancelCard } from "../chatbot/block/CancelCard";
import { AsesorCard } from "../chatbot/block/AsesorCard";
import { FinConversacionCard } from "../chatbot/block/FinConversacionCard";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";

export const ChatDialogix = () => {
  const {
    openChat: open,
    setOpenChat: setOpen,
    messages,
    setMessages,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [isIAConversation, setIsIAConversation] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrarFinConversacion = () => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];

      if (
        last?.from === "bot-block" &&
        last.block?.type === "fin-conversacion"
      ) {
        return prev;
      }

      return [
        ...prev,
        {
          from: "bot-block",
          text: "¿Desea finalizar la conversación?",
          block: {
            type: "fin-conversacion",
            finalizar: "Finalizar",
            menu: "Volver al menú",
          },
          time: getFormattedTime(),
          date: new Date(),
        },
      ];
    });
  };

  const resetInactivityTimer = () => {
    if (!isIAConversation) return;

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      console.log("IA: 1 minuto sin actividad");
      mostrarFinConversacion();
    }, 60000);
  };

  useEffect(() => {
    if (!isIAConversation) return;

    const last = messages[messages.length - 1];

    if (last?.from === "user") {
      resetInactivityTimer();
    }
  }, [messages, isIAConversation]);

  useEffect(() => {
    if (!isIAConversation && inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
  }, [isIAConversation]);

  useEffect(() => {
    if (!open && inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }
  }, [open]);

  const addUserMessage = (textoVisual: string) => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: textoVisual,
        time: getFormattedTime(),
        date: new Date(),
      },
    ]);
  };

  const parseBotText = (raw: string) => {
    raw = raw.trim();

    if (raw.toLowerCase().includes("seleccione una opción")) {
      const [titulo, opciones] = raw.split("seleccione una opción");

      const items = opciones
        .replace(/^:/, "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && line !== ":" && line !== "-");

      return {
        text: titulo.trim() + " seleccione una opción:",
        block: {
          type: "menu-options",
          items,
        },
      };
    }

    // ESPECIALIDADES
    if (raw.toLowerCase().includes("indique a la especialidad")) {
      return {
        text: raw.split(":")[0] + ":",
        block: {
          type: "specialties",
          items: raw
            .split("|")
            .slice(1)
            .map((x) => x.trim()),
        },
      };
    }

    // DOCTORES
    if (raw.startsWith("Escoja un doctor")) {
      return {
        text: raw.split(":")[0] + ":",
        block: {
          type: "doctors",
          items: raw.split("|").slice(1),
        },
      };
    }

    // HORARIOS
    if (raw.startsWith("Escoje un horario")) {
      return {
        text: raw.split("|")[0],
        block: {
          type: "horarios",
          items: raw.split("|").slice(1),
        },
      };
    }

    // CONFIRMACION DE CITA
    if (raw.startsWith("Su cita está lista para ser generada")) {
      const fields = raw.split("|").slice(1);
      const parsed = Object.fromEntries(
        fields.map((f) => {
          const [k, v] = f.split(": ");
          return [k.trim(), v?.trim()];
        })
      );

      return {
        text: "Validación de datos:",
        block: {
          type: "confirmacion",
          data: parsed,
        },
      };
    }

    // CANCELAR CITA
    if (raw.startsWith("Usted tiene programada la siguiente cita")) {
      const fields = raw.split("|").slice(1);
      const parsed: any = {};
      fields.forEach((f) => {
        const [k, ...rest] = f.split(":");
        const v = rest.join(":").trim();
        if (k) parsed[k.trim()] = v || "No especificado";
      });

      return {
        text: "Cancelación de cita médica",
        block: {
          type: "cancelar-cita",
          data: parsed,
        },
      };
    }

    // CONSULTAR RESULTADOS MÉDICOS
    if (raw.startsWith("Usted tiene")) {
      const partes = raw.split("*").filter((p) => p.trim() !== "");

      const header = partes[0].trim();
      const bloques = partes.slice(1);

      const results = bloques.map((bloque) => {
        const fields = bloque.split("|").slice(1);

        const parsed = Object.fromEntries(
          fields.map((f) => {
            const [k, v] = f.split(": ");
            return [k.trim(), v?.trim()];
          })
        );

        return {
          examen: parsed["Tipo de examen"] ?? "",
          estado: parsed["Estado"] ?? "",
          fecha: parsed["Fecha de registro"] ?? "",
        };
      });

      return {
        text: header,
        block: {
          type: "resultados",
          data: results,
        },
      };
    }

    // HISTORIAL DE CITAS
    if (raw.includes("Especialidad:")) {
      const bloques = raw
        .split("*")
        .map((b) => b.trim())
        .filter((b) => b.startsWith("|"));

      const parsed = bloques
        .map((b) => {
          const campos = b.split("|").slice(1);
          const obj: any = {};

          campos.forEach((campo) => {
            const [k, ...rest] = campo.split(":");
            const v = rest.join(":").trim();

            if (k && v) obj[k.trim()] = v;
          });

          return obj;
        })
        .filter((item) => Object.keys(item).length > 0);

      return {
        text: "Historial de citas médicas",
        block: {
          type: "historial-citas",
          items: parsed,
        },
      };
    }

    // CANALES DE ASESOR
    if (raw.startsWith("CANALES_ASESOR|")) {
      const fields = raw.split("|").slice(1);

      const parsed = Object.fromEntries(
        fields.map((f) => {
          const [k, ...rest] = f.split(":");
          return [k.trim(), rest.join(":").trim()];
        })
      );

      return {
        text: "",
        block: {
          type: "canales-asesor",
          data: parsed,
        },
      };
    }

    if (raw.startsWith("BOT_FIN_CONVERSACION|")) {
      const parts = raw.split("|");

      return {
        text: parts[1] ?? "¿Desea finalizar la conversación?",
        block: {
          type: "fin-conversacion",
          finalizar: parts[2] ?? "Finalizar",
          menu: parts[3] ?? "Volver al menú",
        },
      };
    }

    return {
      text: raw,
      block: null,
    };
  };

  const startedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      startedRef.current = false;
      return;
    }

    if (open && messages.length === 0 && !startedRef.current) {
      startedRef.current = true;

      (async () => {
        setBotTyping(true);
        const bienvenida = await enviarMensaje("start");
        setMessages([
          {
            from: "bot",
            text: bienvenida,
            time: getFormattedTime(),
            date: new Date(),
          },
        ]);
        setBotTyping(false);
      })();
    }
  }, [open, messages.length]);

  const getFormattedTime = () => {
    return new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDayLabel = (date: Date) => {
    const today = new Date();
    const msgDate = new Date(date);

    const isToday = today.toDateString() === msgDate.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = yesterday.toDateString() === msgDate.toDateString();

    if (isToday) return "Hoy";
    if (isYesterday) return "Ayer";

    return msgDate.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const resetChat = async () => {
    setIsIAConversation(false);
    await resetConversacion();

    setMessages([]);
    setInput("");
    setBotTyping(false);
    stopListening?.();

    const bienvenida = await enviarMensaje("start");

    setMessages([
      {
        from: "bot",
        text: bienvenida,
        time: getFormattedTime(),
        date: new Date(),
      },
    ]);
  };
  type ConfirmationContext = "agendar" | "cancelar";

  const mapUserConfirmation = (
    input: string,
    context: ConfirmationContext = "agendar"
  ): "1" | "2" | "0" | null => {
    const text = input.trim().toLowerCase();

    const positivos = ["sí", "si", "claro", "confirmo", "acepto", "ok", "okey"];
    const negativos = ["no", "nunca", "rechazo", "no acepto", "mantener"];

    if (context === "agendar") {
      if (positivos.some((p) => text === p || text.startsWith(p))) return "1";
      if (negativos.some((n) => text === n || text.startsWith(n))) return "2";
    }

    if (context === "cancelar") {
      if (positivos.some((p) => text === p || text.startsWith(p))) return "1";
      if (negativos.some((n) => text === n || text.startsWith(n))) return "0";
    }

    return null;
  };

  const sendMessage = async (
    forcedText?: string,
    addToChat: boolean = true
  ) => {
    const text = forcedText ?? input.trim();
    if (!text) return;
    const mapped = mapUserConfirmation(text);

    if (addToChat) {
      setMessages((prev) => [
        ...prev,
        { from: "user", text, time: getFormattedTime(), date: new Date() },
      ]);
    }

    setInput("");
    setBotTyping(true);

    try {
      const toSend = mapped ?? text;
      if (toSend === "5") {
        setIsIAConversation(true);
        resetInactivityTimer();
      }
      const respuesta = await enviarMensaje(toSend);
      const parsed = parseBotText(respuesta);
      if (respuesta.includes("Conversación finalizada correctamente")) {
        setTimeout(() => setOpen(false), 800);
      }

      setMessages((prev) => {
        const newMessages = [...prev];

        if (parsed.block === null) {
          newMessages.push({
            from: "bot",
            text: parsed.text,
            time: getFormattedTime(),
            date: new Date(),
          });
        }

        if (parsed.block) {
          newMessages.push({
            from: "bot-block",
            block: parsed.block,
            text: parsed.text,
            time: getFormattedTime(),
            date: new Date(),
          });
        }

        return newMessages;
      });

      setBotTyping(false);
    } catch (err) {
      setBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Hubo un problema al conectarse con el servidor.",
          time: getFormattedTime(),
          date: new Date(),
        },
      ]);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "es-PE";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, botTyping, open]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [open]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const MessageRenderer = ({ text }: { text: string }) => {
    return (
      <div
        className="
        prose 
        prose-sm 
        max-w-full 
        text-[13px] 
        leading-relaxed 

        /* Espaciado de títulos y subtítulos */
        prose-headings:font-semibold
        prose-h1:mb-1 prose-h2:mb-1 prose-h3:mb-1
        prose-h1:text-[16px] prose-h2:text-[15px] prose-h3:text-[14px]

        /* Espaciado entre párrafos */
        prose-p:mb-1

        /* Listas mucho más limpias */
        prose-li:mb-1 
        prose-ul:pl-4 
        prose-ol:pl-5

        /* MUY IMPORTANTE → mantiene solo 1 salto entre líneas */
        whitespace-pre-wrap
      "
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleBackgroundClick}
          style={{ backgroundColor: "transparent" }}
        >
          <div
            className="
            fixed bottom-6 right-6
            w-[380px] h-[540px]
            bg-white/95 backdrop-blur-md
            shadow-[0_18px_45px_rgba(6,33,79,0.28)]
            border border-[#E3EBFF]
            rounded-3xl overflow-hidden
            flex flex-col 
            z-50 animate-slide-left
          "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#245AB8] to-[#3C7DDF] text-white px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/12 border border-white/25 flex items-center justify-center text-[11px] font-semibold">
                  ES
                </div>
                <div>
                  <span className="text-sm font-semibold">Dialogix</span>
                  <br />
                  <span className="text-[11px] text-white/80">
                    Asistente virtual EsSalud
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw
                  size={18}
                  className="cursor-pointer transition-opacity duration-150 hover:opacity-60"
                  onClick={resetChat}
                />

                <X
                  size={20}
                  className="cursor-pointer transition-opacity duration-150 hover:opacity-60"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-0 py-0 space-y-3 bg-gradient-to-b from-white to-[#F3F6FF]">
              <div className="w-full bg-[#F5F7FF] px-4 py-4 text-center">
                <h3 className="text-[15px] font-semibold text-[#102A6B]">
                  ChatBot con IA
                </h3>
                <p className="text-[11px] text-[#4A5B87] mt-1.5 leading-relaxed">
                  ¡Hola! Soy Dialogix, tu asistente virtual de salud. Puedo
                  ayudarte con tus citas, resultados o información general.
                </p>
              </div>

              {messages.map((msg, i) => {
                const prevMsg = messages[i - 1];
                const showDateSeparator =
                  !prevMsg ||
                  new Date(prevMsg.date).toDateString() !==
                    new Date(msg.date).toDateString();

                if (msg.from === "bot-block") {
                  const block = msg.block;

                  const BotBubble = ({
                    children,
                  }: {
                    children: React.ReactNode;
                  }) => (
                    <div className="flex w-full justify-start">
                      <div className="w-7 h-7 rounded-full bg-[#245AB8]/8 border border-[#245AB8]/20 flex items-center justify-center text-[10px] font-semibold text-[#245AB8] mr-2">
                        ES
                      </div>

                      <div className="px-4 py-3 bg-[#F4F7FF] text-[#1C274C] border border-[#E0E6FF] rounded-2xl rounded-bl-none shadow-sm max-w-[75%] space-y-3">
                        {msg.text &&
                          block.type !== "cancelar-cita" &&
                          block.type !== "fin-conversacion" && (
                            <MessageRenderer text={msg.text} />
                          )}

                        {children}
                        <div className="text-[10px] text-right opacity-60 pt-1">
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  );

                  let content: React.ReactNode = null;

                  switch (block.type) {
                    case "menu-options":
                      content = (
                        <MenuOptions
                          options={block.items}
                          onSelect={(val) => sendMessage(val)}
                        />
                      );
                      break;
                    case "specialties":
                      content = (
                        <SpecialtiesCards
                          specialties={block.items}
                          onSelect={(val) => sendMessage(val)}
                        />
                      );
                      break;
                    case "doctors":
                      content = (
                        <DoctorCards
                          doctors={block.items}
                          onSelect={(val) => {
                            if (val === "volver") {
                              addUserMessage("Volver");
                              sendMessage("volver", false);
                              return;
                            }

                            sendMessage(val);
                          }}
                        />
                      );
                      break;
                    case "horarios":
                      content = (
                        <div className="space-y-2">
                          {block.items.map((h: string, idx: number) => (
                            <ScheduleOption
                              key={idx}
                              hour={h}
                              index={idx}
                              onSelect={(val) => {
                                if (val === "volver") {
                                  addUserMessage("Volver");
                                  sendMessage("volver", false);
                                  return;
                                }

                                sendMessage(val);
                              }}
                            />
                          ))}
                        </div>
                      );
                      break;
                    case "confirmacion":
                      content = (
                        <ConfirmationCard
                          data={block.data}
                          onSelect={(val) => {
                            const textoUsuario =
                              val === "1"
                                ? "Sí"
                                : val === "2"
                                ? "No"
                                : "Volver";

                            addUserMessage(textoUsuario);
                            sendMessage(val, false);
                          }}
                        />
                      );
                      break;

                    case "cancelar-cita":
                      content = (
                        <CancelCard
                          data={block.data}
                          onConfirm={(val) => {
                            const textoUsuario =
                              val === "1"
                                ? "Sí, cancelar"
                                : val === "0"
                                ? "No, mantener"
                                : val;

                            setMessages((prev) => [
                              ...prev,
                              {
                                from: "user",
                                text: textoUsuario,
                                time: getFormattedTime(),
                                date: new Date(),
                              },
                            ]);

                            sendMessage(val, false);
                          }}
                        />
                      );
                      break;

                    case "resultados":
                      content = <ResultadosCard data={block.data} />;
                      break;
                    case "historial-citas":
                      content = <HistorialCitasCard data={block.items} />;
                      break;
                    case "canales-asesor":
                      content = <AsesorCard data={block.data} />;
                      break;
                    case "fin-conversacion":
                      content = (
                        <FinConversacionCard
                          text={String(
                            msg.text || "¿Desea finalizar la conversación?"
                          )}
                          finalizar={block.finalizar ?? "Finalizar"}
                          menu={block.menu ?? "Volver al menú"}
                          onSelect={(valor) => {
                            if (valor === "finalizar") {
                              setIsIAConversation(false);
                              addUserMessage("Finalizar");
                              sendMessage("finalizar", false);
                              setTimeout(() => setOpen(false), 500);
                            }

                            if (valor === "menu") {
                              setIsIAConversation(false);
                              addUserMessage("Volver al menú");
                              sendMessage("menu", false);
                            }
                          }}
                        />
                      );
                      break;

                    default:
                      content = null;
                  }

                  return (
                    <div key={i}>
                      {showDateSeparator && (
                        <div className="flex justify-center my-2">
                          <span className="px-3 py-1 text-[11px] rounded-full bg-[#E9EEFF] text-[#445AA3] shadow-sm">
                            {getDayLabel(msg.date)}
                          </span>
                        </div>
                      )}
                      <BotBubble>{content}</BotBubble>
                    </div>
                  );
                }

                return (
                  <div key={i}>
                    {showDateSeparator && (
                      <div className="flex justify-center my-2">
                        <span className="px-3 py-1 text-[11px] rounded-full bg-[#E9EEFF] text-[#445AA3] shadow-sm">
                          {getDayLabel(msg.date)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex w-full ${
                        msg.from === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.from !== "user" && (
                        <div className="w-7 h-7 rounded-full bg-[#245AB8]/8 border border-[#245AB8]/20 flex items-center justify-center text-[10px] font-semibold text-[#245AB8] mr-2">
                          ES
                        </div>
                      )}

                      <div
                        className={`px-4 py-2.5 text-[13px] rounded-2xl shadow-sm max-w-[75%] ${
                          msg.from === "user"
                            ? "bg-[#245AB8] text-white rounded-br-none"
                            : "bg-[#F4F7FF] text-[#1C274C] border border-[#E0E6FF] rounded-bl-none"
                        }`}
                      >
                        <MessageRenderer text={msg.text ?? ""} />

                        <div className="text-[10px] mt-1 text-right opacity-60">
                          {msg.time}
                        </div>
                      </div>

                      {msg.from === "user" && (
                        <div className="w-7 h-7 rounded-full bg-[#E5ECFF] border border-[#D0DBFF] flex items-center justify-center ml-2 text-[10px]">
                          Tú
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {botTyping && (
                <div className="flex w-full gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#245AB8]/8 border border-[#245AB8]/20 flex items-center justify-center text-[10px] font-semibold text-[#245AB8]">
                    ES
                  </div>
                  <div className="px-4 py-2.5 bg-[#F4F7FF] rounded-2xl border border-[#E0E6FF] shadow-sm">
                    <div className="flex items-center gap-1 typing-dots text-[#245AB8] text-[18px]">
                      <span className="dot">●</span>
                      <span className="dot">●</span>
                      <span className="dot">●</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 bg-white border-t border-[#E3EBFF]">
              <div className="flex items-center w-full bg-[#F7F8FC] border border-[#DFE5FB] rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-transparent focus:outline-none text-[13px]"
                />

                <div className="flex items-center gap-1.5">
                  {input.trim() === "" ? (
                    <button
                      onClick={handleVoiceInput}
                      className={`w-9 h-9 flex items-center justify-center rounded-full ${
                        isListening
                          ? "bg-red-500 animate-pulse"
                          : "hover:bg-[#E4ECFF]"
                      }`}
                    >
                      <Mic
                        size={18}
                        className={
                          isListening ? "text-white" : "text-[#245AB8]"
                        }
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => sendMessage()}
                      className="w-9 h-9 flex items-center justify-center bg-[#245AB8] hover:bg-[#1D4A96] rounded-full shadow-sm"
                    >
                      <Send size={16} className="text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
  /* Dots typing animation */
  .typing-dots .dot {
    opacity: 0.25;
    animation: blink 1.4s infinite;
  }
  .typing-dots .dot:nth-child(1) { animation-delay: 0s; }
  .typing-dots .dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes blink {
    0% { opacity: .25; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-2px); }
    100% { opacity: .25; transform: translateY(0); }
  }

  /* Fade + slide animation */
  .animate-fade-slide {
    animation: fadeSlide 0.45s ease-out forwards;
  }

  @keyframes fadeSlide {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
    </>
  );
};
