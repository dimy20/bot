//Stateful websocket connection
class Client{
  constructor(id,roomName,websocketConnection){
    this.websocketConnection = websocketConnection;
    this.websocketConnection.id = id;
    this.websocketConnection.roomName= roomName;
  }
}
class Room{
  constructor(id){
    this.id = id;
    this.clients = [];
  }
  // pushes a new client object to the room
  addClient(client_id,roomName,websocketConnection){
      this.clients.push(new Client(client_id,roomName,websocketConnection));
  }
  removeClient(client_id){
    if(typeof client_id === "string"){
        for (let i =0; i<this.clients.length;i++){
          let client = this.clients[i];
          if(client.websocketConnection.id === client_id  && client.websocketConnection.state === "closed") {
                this.clients.splice(i,1);
                console.log(`user ${client.websocketConnection.id} left, ${this.clients.length} users online on ${client.websocketConnection.roomName}`);
         }else{
           throw new Error(`client ${client_id} is not connected to the room`);
         }
        }
    }else{
      throw new Error("client_id must be of type string");
    }
  }

}
class RoomList{
  constructor(){
    this.roomsList={};
    this.saveRoom= this.saveRoom.bind(this);
  }
  saveRoom(id){
      this.roomsList[id] = new Room(id);
  }
  addClientToRoom(roomName,client_id,websocketConnection){
    if(this.size() > 0 && this.isLoaded(roomName)){
        this.roomsList[roomName].addClient(client_id,roomName,websocketConnection);
    }else{
      throw new Error(`${roomName} is not available for users`);
    }
   return 0; 
  }
  /*Checks if the room is loaded from the db*/
  isLoaded(room_name){
    return typeof this.roomsList[room_name] !== 'undefined'
  }
  size(){
    return Object.entries(this.roomsList).length;
  }
}
// this class defines the type of request to be sent to other processes over tcp
class IpcRequest{
  //type must be an enum_ipc_request
  constructor(host,type,data){
      // must be of type number, given that is trying to simulate an enum
      if(typeof type === "number" && typeof data === "object" && typeof host === "string"){
        this.type = type;
        this.data = data;
        this.host= host;
      }
      if(!this.data || !this.type) throw new Error("invalid args");
  }
}
class ClientMessage{
  constructor(user_id,room_id,msg){
      this.user_id = new String(user_id);
      this.room_id= new String(room_id);
      this.msg= new String(msg);
  }
}
module.exports ={
   RoomList,
   IpcRequest,
   ClientMessage
}