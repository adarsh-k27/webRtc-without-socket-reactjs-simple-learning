import { useEffect, useRef, useState } from "react";
import "./App.css";
import BrowserSupport from "./components/BrowserSupports";
import SessionDesc from "./screen/session";
import { Peer } from "./peer";

function App() {
  const firstpeer = Boolean(window.location.hash);
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [peerConnection, setPeerConnection] = useState(null);
  const videoRef = useRef(null);
  const remoteVref = useRef(null);
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);

  //we need to handle PeerConnection

  const handleConnect = () => {
    if (peerConnection) {
      peerConnection.PEER.signal(answer);
    }
  };

  useEffect(() => {
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          const InitiaterPeer = new Peer(firstpeer, stream);
          setPeerConnection(InitiaterPeer);
        });
    });
  }, [firstpeer]);

  useEffect(() => {
    if (peerConnection) {
      peerConnection.PEER.on("signal", (data) => {
        setOffer(JSON.stringify(data));
      });

      peerConnection.PEER.on('stream',(stream)=> addVideo(stream))
    }
  }, [peerConnection, setMessages]);

  function handleMessageSend(e) {
    e.preventDefault();
    const message = messageRef.current.value;
    peerConnection.PEER.send(message);
  }

  const addVideo = (stream) => {
    if (remoteVref.current) {
      remoteVref.current.srcObject = stream;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>WebRTC Learning Curv</h1>
      </header>
      <BrowserSupport>
        <div>
          <h3>Here We Are Checking</h3>

          <SessionDesc type={"offer"} value={offer} setValue={setOffer} />

          <SessionDesc type={"answer"} value={answer} setValue={setAnswer} />
        </div>

        <button onClick={handleConnect}> Connect</button>

        <input
          type="text"
          name=""
          id=""
          ref={messageRef}
          placeholder="Enter Message"
        />
        <button onClick={handleMessageSend}>Send</button>
      </BrowserSupport>

      <div className="screen">{/* Here We Are Starting Code */}</div>
      <div>
        <video
          src=""
          style={{ position: "absolute", top: "5rem", left: "5rem" }}
          ref={videoRef}
          width={"90rem"}
          height={"90rem"}
          autoPlay
        ></video>
        <video
          src=""
          ref={remoteVref}
          autoPlay
          width={100}
          height={100}
        ></video>
      </div>
      <div
        className="message"
        style={{ position: "absolute", top: "10rem", right: "20rem" }}
      >
        <h1>Messages</h1>
        {messages.length &&
          messages.map((ms) => {
            return <p>{ms}</p>;
          })}
      </div>
    </div>
  );
}

export default App;
