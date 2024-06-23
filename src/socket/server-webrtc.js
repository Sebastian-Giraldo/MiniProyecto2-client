// server-webrtc.js

import Peer from "simple-peer";
import io from "socket.io-client";
import nodeLibs from 'node-libs-browser';
nodeLibs({
  'events': require.resolve('events/'),
  'buffer': require.resolve('buffer/'),
  // Add other modules as needed by your dependencies
});

const serverWebRTCUrl = "http://localhost:8000";

let socket = null;
let peers = {};
let localMediaStream = null;
let isAudioEnabled = false;
let isVideoEnabled = false; // Variable para controlar el estado del video
let video = false
let audio = false

async function toggleAudio() {
  if (Peer.WEBRTC_SUPPORT) {
    audio = true;
    localMediaStream = await getMedia();
    initSocketConnection();
  } else {
    return;
  }
  
  if (!localMediaStream) return; // Si no hay stream local, salimos de la función

  if (!isAudioEnabled) {
    // Si el video no está habilitado, intentamos obtener el stream de video
    try {
      audio = true;
      const videoStream = await navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
      localMediaStream.addTrack(videoStream.getAudioTracks()[0]);
      isAudioEnabled = true;
      return localMediaStream;
    } catch (err) {
      console.error("Failed to toggle video:", err);
      isAudioEnabled = false;
      throw err; // Lanzamos el error para manejarlo en el componente React
    }
  } else {
    audio = false;
    // Si el video está habilitado, lo removemos del stream local
    localMediaStream.getAudioTracks().forEach((track) => {
      localMediaStream.removeTrack(track);
    });
    isAudioEnabled = false;
    return localMediaStream;
  }
}

async function toggleVideo() {
  if (Peer.WEBRTC_SUPPORT) {
    video = true;
    localMediaStream = await getMedia();
    initSocketConnection();
  } else {
    return;
  }
  
  if (!localMediaStream) return; // Si no hay stream local, salimos de la función

  if (!isVideoEnabled) {
    // Si el video no está habilitado, intentamos obtener el stream de video
    try {
      video = true;
      const videoStream = await navigator.mediaDevices.getUserMedia({ audio: audio, video: video });
      localMediaStream.addTrack(videoStream.getVideoTracks()[0]);
      isVideoEnabled = true;
      return localMediaStream;
    } catch (err) {
      console.error("Failed to toggle video:", err);
      isVideoEnabled = false;
      throw err; // Lanzamos el error para manejarlo en el componente React
    }
  } else {
    video = false;
    // Si el video está habilitado, lo removemos del stream local
    localMediaStream.getVideoTracks().forEach((track) => {
      localMediaStream.removeTrack(track);
    });
    isVideoEnabled = false;
    return localMediaStream;
  }
}

const init = async () => {
  if (Peer.WEBRTC_SUPPORT) {
    localMediaStream = await getMedia();
    initSocketConnection();
  } else {
    return;
  }
};

async function getMedia() {
  let stream = null;
  const constraints = { audio: audio, video: video }; // Cambiamos video: false a video: true para incluir video
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.log("Failed to get user media!");
    console.warn(err);
  }
  return stream;
}

function initSocketConnection() {
  socket = io(serverWebRTCUrl);

  socket.on("introduction", (otherClientIds) => {
    for (let i = 0; i < otherClientIds.length; i++) {
      if (otherClientIds[i] !== socket.id) {
        let theirId = otherClientIds[i];
        peers[theirId] = {};

        let pc = createPeerConnection(theirId, true);
        peers[theirId].peerConnection = pc;

        createClientMediaElements(theirId);
      }
    }
  });

  socket.on("newUserConnected", (theirId) => {
    if (theirId != socket.id && !(theirId in peers)) {
      peers[theirId] = {};
      createClientMediaElements(theirId);
    }
  });

  socket.on("userDisconnected", (_id) => {
    if (_id !== socket.id) {
      removeClientAudioElementAndCanvas(_id);
      delete peers[_id];
    }
  });

  socket.on("signal", (to, from, data) => {
    if (to !== socket.id) {
      return;
    }
    let peer = peers[from];
    if (peer && peer.peerConnection) {
      peer.peerConnection.signal(data);
    } else {
      let peerConnection = createPeerConnection(from, false);
      peers[from].peerConnection = peerConnection;
      peerConnection.signal(data);
    }
  });
}

function createPeerConnection(theirSocketId, isInitiator = false) {
  let peerConnection = new Peer({
    initiator: isInitiator,
  });

  peerConnection.on("signal", (data) => {
    socket.emit("signal", theirSocketId, socket.id, data);
  });

  peerConnection.on("connect", () => {
    peerConnection.addStream(localMediaStream);
  });

  peerConnection.on("stream", (stream) => {
    updateClientMediaElements(theirSocketId, stream);
  });

  return peerConnection;
}

function disableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = false;
  });
}

function enableOutgoingStream() {
  localMediaStream.getTracks().forEach((track) => {
    track.enabled = true;
  });
}

function createClientMediaElements(_id) {
  let audioEl = document.createElement("audio");
  audioEl.setAttribute("id", _id + "_audio");
  audioEl.controls = false;
  audioEl.volume = 1;
  document.body.appendChild(audioEl);

  audioEl.addEventListener("loadeddata", () => {
    audioEl.play();
  });
}

function updateClientMediaElements(_id, stream) {
  let audioStream = new MediaStream([stream.getAudioTracks()[0]]);
  let audioEl = document.getElementById(_id + "_audio");
  audioEl.srcObject = audioStream;
}

function removeClientAudioElementAndCanvas(_id) {
  let audioEl = document.getElementById(_id + "_audio");
  if (audioEl != null) {
    audioEl.remove();
  }
}

export { init, toggleAudio, toggleVideo };
