//here we are define the Broswer Supports

export const isWebRtcSupported='RTCPeerConnection' in window
export const isWebSocketSupported='WebSocket' in window && 2 == window.WebSocket.CLOSING
export const isShareSupported= navigator.share

export const browserCompactible=Boolean(isWebRtcSupported && isWebSocketSupported && isShareSupported)


