import {useState} from 'react';

export default function Player({initialName,symbol,isActive,onChangeName}){

const [playerName,setPlayerName]=useState(initialName)
const [isEditing,setIsEditing]=useState(false);

const handleEditClick=()=>{
    setIsEditing((editing)=>!editing) 
    if(isEditing){

      onChangeName(symbol,playerName)
    } 
  //setIsEditing(!isEditing);
   //setIsEditing(isEditing ? false :true);
}
function HandleChange(event){
  console.log(event)
  console.log(event.target)
  console.log(event.target.value)
  setPlayerName(event.target.value);
}
let EditiablePLayerName= <span className="player-name">{playerName}</span>

if(isEditing){
  EditiablePLayerName=<input type="text" required value={playerName} onChange={HandleChange}/>
  }

  return(
      <li className={isActive ? 'active':undefined}>  
      <span className='player'>
     {EditiablePLayerName}
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? 'Save':'Edit'}</button>
      
    </span>
    </li>
  );
}