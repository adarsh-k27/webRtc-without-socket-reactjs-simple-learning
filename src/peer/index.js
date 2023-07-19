import peerC from "simple-peer";

export class Peer {
  constructor(initiator,stream) {
    this.initiator = initiator;
    this.stream = stream;
    this.PEER = new peerC({
      initiator: this.initiator,
      trickle:false,
      stream:this.stream
    });
  }


}
