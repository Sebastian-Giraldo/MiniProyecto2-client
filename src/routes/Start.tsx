import React, { useEffect, useRef, useState } from "react";
import { socketServer } from "../socket/server-websockets";

const App: React.FC = () => {
    const inputMessageRef = useRef<HTMLInputElement>(null);
    const textAreaMessagesRef = useRef<HTMLTextAreaElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null); // Referencia al elemento de vídeo
    const videoRef2 = useRef<HTMLVideoElement>(null);
  
    const [isVideoEnabled, setIsVideoEnabled] = useState(false); // Estado para controlar si el vídeo está habilitado
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
    const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const newMessage = inputMessageRef.current?.value;
      if (newMessage) {
        socketServer.emit("new-message", newMessage);
        inputMessageRef.current!.value = "";
      }
    };

    const toggleMic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsAudioEnabled(!isAudioEnabled);
      };
    
      const toggleCamera = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsVideoEnabled(!isVideoEnabled); 
      };
  
    useEffect(() => {
      socketServer.on("new-message", (newMessage: string) => {
        console.log(newMessage);
        if (textAreaMessagesRef.current) {
          textAreaMessagesRef.current.value += newMessage + "\n";
        }
      });
      return () => {
        socketServer.off("new-message"); // Limpiar el listener en el desmontaje
      };
    }, []);
  
    return (
      <div className="container-app">
        <div className="chat">
          <h1> Chat </h1>
          <textarea ref={textAreaMessagesRef} rows={4} cols={50} />
          <input ref={inputMessageRef} placeholder="Escribe tu mensaje..." />
          <button onClick={(e) => sendMessage(e)}>Enviar</button>
        </div>
        <button onClick={(e) => toggleMic(e)}>
          {isAudioEnabled ? "Desactivar Micrófono" : "Activar Micrófono"}
        </button>
        <button onClick={(e) => toggleCamera(e)}>
          {isVideoEnabled ? "Desactivar Cámara" : "Activar Cámara"}
        </button>
        <div className="video-container">
            <video ref={videoRef} autoPlay playsInline className="video-element" />
            <video style={{marginLeft: '15px'}} ref={videoRef2} autoPlay playsInline className="video-element" />
        </div>
      </div>
    );
  };
  
  export default App;