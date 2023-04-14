import abi from "./contract/chatApp.json";
import './App.css';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";


function App() {
  const [state, setState] = useState({
    proveder: null,
    signer: null,
    contract: null,
  })

  const [name, setName] = useState();
  const { contract } = state;
  const [friendlist, setFriendList] = useState();
  const [FriendId, setFriendId] = useState();
  const [Friendname, setFriendname] = useState();
  const [, setAccount] = useState("None");
  const [selectName, setSelectName] = useState();
  const [selectId, setSelectId] = useState();
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState();

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x219D8689681Ed23a2d0cc465b27f98846F8FC447";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts", })
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setAccount(account);
          setState({ provider, signer, contract });
        }
        else {
          alert("Please Install Metamask");
        }
      }
      catch (e) {
        console.log(e);
      }
    }
    connectWallet();
  }, []);

  const createAccount = async (e) => {
    e.preventDefault();
    console.log(name);
    await contract.createAccount(name);
    console.log("Account Created");
  }

  const addFriend = async (e) => {
    e.preventDefault();
    await contract.addFriend(FriendId, Friendname);
    console.log("Friend Added");
  }

  useEffect(() => {
    const getFriendList = async () => {
      const friendList = await contract.getFriendList();
      //  console.log(friendList);
      setFriendList(friendList);
      //  console.log(friendlist);
    }
    contract && getFriendList();
  }, [contract])

  const selectFriend = (id, name) => {
    setSelectName(name);
    setSelectId(id);
  }

  const sendMessage = async () => {
    const Message = await contract.sendMessage(selectId, message);
    console.log(Message);
  }

  useEffect(() => {
    const readMsg = async () => {
      const read = await contract.readMessage(selectId);
      setMessageList(read);
    }
    readMsg();
  })



  return (
    <>
      <Navbar />
      <div style={{ margin: '10px' }}>
        {/* <div onClick={readMsg}>READ</div> */}
        <div style={{ fontSize: '20px', fontWeight: '1000' }}>Create Account</div>
        <form>
          <label>Enter Your Name: </label><br />
          <input style={{ width: '90%', height: '30px', padding: '5px', fontSize: '15px' }} type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }}></input>
          <br />
          <div style={{ cursor: 'pointer', border: "1px solid black", width: "150px", marginTop: "20px", textAlign: 'center', borderRadius: '10px' }} onClick={createAccount}>Create Account</div>
        </form>
        <br />
        <hr />
        <br />
        <div style={{ fontSize: '20px', fontWeight: '1000' }}>Add a friend</div>
        <form>
          <label>Enter public key: </label>
          <br />
          <input placeholder="Enter Public Key" style={{ width: '90%', height: '30px', padding: '5px', fontSize: '15px' }} type="text" onChange={(e) => { setFriendId(e.target.value) }}></input><br></br><br></br>
          <label>Enter Nickname: </label>
          <br />
          <input placeholder="Enter Nickname" style={{ width: '90%', height: '30px', padding: '5px', fontSize: '15px' }} type="text" onChange={(e) => { setFriendname(e.target.value) }}></input>
          <br />
          <div style={{ cursor: 'pointer', border: "1px solid black", width: "150px", marginTop: "20px", textAlign: 'center', borderRadius: '10px' }} onClick={addFriend}>Add</div>
        </form>
        <br />
        <div style={{ display: 'flex', margin: 'auto', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%' }}>
          <div style={{ border: "1px solid black", height: '500px', borderRadius: '10px', padding: '2px', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', padding: '10px' }}>
              Friends (Click on the friend's tile to talk to them)
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'column', height: "500px" }}>
              {friendlist && friendlist.map((friend) => {
                return (
                  <div>
                    <div style={{ cursor: 'pointer', padding: '4px', height: "40px", display: "flex", alignItems: 'center' }} onClick={() => selectFriend(friend.pubkey, friend.name)}>
                      <div style={{ textOverflow: 'ellipsis', width: '50%', overflow: 'clip' }}>
                        {friend.pubkey}
                      </div>
                      <div style={{ textOverflow: 'ellipsis', width: '50%', overflow: 'clip', textAlign: 'right' }}>
                        {friend.name}
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ border: "1px solid black", height: "500px", borderRadius: '10px', width: '100%', padding: '2px' }}>
              <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', padding: '10px' }}>
                Messages
              </div>
              <hr />
              <div style={{ height: "50px", textAlign: "left" }}>
                <div style={{ padding: '4px', height: "40px", display: "flex", alignItems: 'center' }}>
                  <div style={{ textOverflow: 'ellipsis', width: '50%', overflow: 'clip' }}>
                    {selectId}
                  </div>
                  <div style={{ textOverflow: 'ellipsis', width: '50%', overflow: 'clip', textAlign: 'right' }}>
                    {selectName}
                  </div>
                </div>
              </div>
              <hr />
              <div style={{ height: '250px', overflowY: 'scroll', overflowX: 'hidden' }}>
                {messageList && messageList.map((message) => {
                  return (
                    <div style={{ height: "auto", padding: '10px 0px' }} className={selectId !== message.sender ? "right" : "left"}><span style={{ borderRadius: selectId !== message.sender ? '10px 10px 0px' : '10px 10px 10px 0px', backgroundColor: selectId !== message.sender ? '#86f78d' : '#f7d5a1', padding: '12px' }}>{message.msg}</span></div>
                  );
                })}
              </div>
              <hr />
              <div style={{ padding: "5px", display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
                <textarea placeholder="Message" style={{ resize: 'none', fontFamily: 'Poppins', flex: '2', fontSize: '15px' }} onChange={(e) => { setMessage(e.target.value) }}></textarea>
                <div style={{ width: "60px", padding: '15px 0px', borderRadius: '50%', margin: "auto", textAlign: 'center', backgroundColor: '#02961d', color: 'white', fontSize: '20px' }} onClick={sendMessage}>
                <i class="fa-solid fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
