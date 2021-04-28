//Stateful websocket connection
class Client{
  constructor(id,websocketConnection){
    this.id = id;
    this.websocketConnection = websocketConnection;
  }
}
class Room{
  constructor(id){
    this.id = id;
    this.clients = [];
  }
  addClient(client_id,websocketConnection){
      this.clients.push(new Client(client_id,websocketConnection));
  }
  removeClient(client_id){
    if(typeof client_id === "string"){
        for (let i =0; i<this.clients.length;i++){
          let client = this.clients[i];
          if(client.id === client_id  && client.websocketConnection.state === "closed") {
                this.clients.splice(i,1);
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
  addClientToRoom(room_id,client_id,websocketConnection){
    if(this.size() > 0 && this.isRoomValid(room_id)){
        this.roomsList[room_id].addClient(client_id,websocketConnection);
    }
   return 0; 
  }
  /*Validates if room exists*/
  isRoomValid(room_name){
    return typeof this.roomsList[room_name] !== 'undefined'
  }
  getClientsFromRoom(roomid){
    return this.roomsList[roomid].clients;
  }
  size(){
    return Object.entries(this.roomsList).length;
  }
}
module.exports ={
   RoomList 
}