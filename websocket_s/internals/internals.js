class Rooms{
  constructor(){
    this.roomsList={};
    this.saveRoom= this.saveRoom.bind(this);
  }
  saveRoom(id){
      this.roomsList[id] = {
        id : id,
        clients : []
      }
  }
  addClientToRoom(room_id,client_id,websocketConnection){
    console.log(this.isRoomValid(room_id));
    if(this.size() > 0 && this.isRoomValid(room_id)){
/*       this.roomsList[room_id].clients[client_id] = websocketConnection; */
        this.roomsList[room_id].clients.push({
          websocketConnection,
          client_id
        });
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
    Rooms
}