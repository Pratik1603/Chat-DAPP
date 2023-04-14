import abi from "./contract/chatApp.json";
import './App.css';
import {ethers} from "ethers";
import {useState,useEffect} from "react";


function App() {
  const [state,setState]=useState({
      proveder:null,
      signer:null,
      contract:null,
  })
  const [name,setName]=useState();
  const {contract}=state;
  const [friendlist,setFriendList]=useState();
  const [FriendId,setFriendId]=useState();
  const [Friendname,setFriendname]=useState();
  const [account,setAccount]=useState("None");
  const [selectName,setSelectName]=useState();
  const [selectId,setSelectId]=useState();
  const [message,setMessage]=useState();
  const [messageList,setMessageList]=useState();
  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress="0x219D8689681Ed23a2d0cc465b27f98846F8FC447";
      const contractAbi=abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const account=await ethereum.request({method:"eth_requestAccounts",})
          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })
          window.ethereum.on("accountChanged",()=>{
            window.location.reload();
          })
        
        const provider=new ethers.providers.Web3Provider(ethereum);
        const signer=provider.getSigner();
        const contract=new ethers.Contract(contractAddress,contractAbi,signer);
        setAccount(account);
        setState({provider,signer,contract});
        }
        else{
          alert("Please Install Metamask");
        }
      }
      catch(e){
        console.log(e);
      }
    }
    connectWallet();
  },[]);
  const createAccount=async(e)=>{
    e.preventDefault();
    console.log(name);
    await contract.createAccount(name);
    console.log("Account Created");
  }
  const addFriend=async(e)=>{
   e.preventDefault();
   await contract.addFriend(FriendId,Friendname);
   console.log("Friend Added");
  }
  useEffect(()=>{
   const getFriendList=async()=>{
     const friendList=await contract.getFriendList();
    //  console.log(friendList);
     setFriendList(friendList);
    //  console.log(friendlist);
   }
   contract && getFriendList();
  },[contract])
  const selectFriend=(id,name)=>{
    setSelectName(name);
    setSelectId(id);
  }
  const sendMessage=async()=>{
    const Message=await contract.sendMessage(selectId,message);
    console.log(Message);
    
     
  }
  
  useEffect(()=>{
    const readMsg=async()=>{
      const read=await contract.readMessage(selectId);
      setMessageList(read);
      
    } 
    readMsg();
  })
  
 
 
  return (
    <div className="App">
      {/* <div onClick={readMsg}>READ</div> */}
      <div>Create Account</div><br></br>
      <form>
        <label>Enter Your Name : </label>
        <input type="text" placeholder="Name"  onChange={(e) => { setName(e.target.value) }}></input>
        <div style={{border:"1px solid black",width:"150px",margin:"auto",marginTop:"20px"}} onClick={createAccount}>Create Account</div>
      </form>
      <br></br>
      <div>Add Friend</div><br></br>
      <form>
        <label>Add Key : </label>
        <input type="text" onChange={(e)=>{setFriendId(e.target.value)}}></input><br></br><br></br>
        <label>Enter Name : </label>
        <input type="text" onChange={(e)=>{setFriendname(e.target.value)}}></input>
        <div style={{border:"1px solid black",width:"150px",margin:"auto",marginTop:"20px"}} onClick={addFriend}>ADD</div>
      </form>
      <table>
        <tr>
          <td><div style={{width:"500px",border:"1px solid black",height:"500px"}}>Friends
          <div>
          <br></br>
          {friendlist && friendlist.map((friend)=>{return(
            <div style={{width:"100%",border:"2px solid black",height:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}} onClick={()=>selectFriend(friend.pubkey,friend.name)}><div>{friend.pubkey}</div><div>{friend.name}</div></div>
          );})} 
          </div>
          </div>
          </td>
          <td><div style={{width:"500px",border:"1px solid black",height:"500px"}}>Messages
          <div style={{width:"100%",height:"50px",border:"1px solid black",textAlign:"left"}}>
              {selectName}<br></br>{selectId}
          </div>
          
          <div style={{height:"350px",border:"1px solid black",position:"relative",overflow:"scroll"}}>
          {messageList && messageList.map((message)=>{return(
            <div style={{width:"100%"}}> <div style={{width:"200px",height:"50px",border:"1px solid black",margin:"20px"}} className={selectId!=message.sender?"left":"right"}>{message.msg}</div></div>
           
            )
          })}
           
          

          </div>
          <div style={{padding:"10px"}}>
            <label>Enter Your message : </label>
            <input placeholder="message" onChange={(e)=>{setMessage(e.target.value)}}></input>
            <div style={{border:"1px solid black",width:"60px",margin:"auto"}} onClick={sendMessage}>Send</div>
          </div>
          </div>
          </td>
        </tr>
      </table>

    </div>
  );
}

export default App;
