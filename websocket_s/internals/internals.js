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
    if(this.size() > 0 && this.isRoomValid(roomName)){
        this.roomsList[roomName].addClient(client_id,roomName,websocketConnection);
    }else{
      throw new Error(`${roomName} doesnt exist or there are no rooms available`);
    }
   return 0; 
  }
  /*Validates if room exists*/
  isRoomValid(room_name){
    return typeof this.roomsList[room_name] !== 'undefined'
  }
  size(){
    return Object.entries(this.roomsList).length;
  }
}
module.exports ={
   RoomList 
}