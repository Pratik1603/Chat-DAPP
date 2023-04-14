// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  //  const [owner,from1,from2,from3]=await hre.ethers.getSigners();
  // const addresses=[owner.address,officer.address,from1.address,from2.address];
  // const addresses=[owner.address,officer.address,from1.address,from2.address,from3.address];
  // consoleBalances(addresses);
  const Chat = await hre.ethers.getContractFactory("chatApp");
  const contract = await Chat.deploy();
  await contract.deployed();
  console.log("Contarct deploy address is",contract.address);
  // await contract.connect(owner).createAccount("Pratik");
  // await contract.connect(from1).createAccount("from1");
  // await contract.connect(from2).createAccount("from2");
  // await contract.connect(from3).createAccount("from3");
  // console.log("account created");
  
  // await contract.connect(owner).addFriend(from1.address,"from1");
  // await contract.connect(owner).addFriend(from2.address,"from2");
  // await contract.connect(owner).addFriend(from3.address,"from3");

  // const friendList=await contract.connect(owner).getFriendList();
  // friendList.map((friend)=>console.log(friend.name));
  // await contract.connect(owner).sendMessage(from1.address,"Hello , How are you");
  // await contract.connect(from1).sendMessage(owner.address,"I am fine");
  // const messages=await contract.connect(owner).readMessage(from1.address);
  // console.log(messages);
}

// async function consoleBalances(addresses){
//    let counter=0;
//    for(const address of addresses){
//        console.log(`Address ${counter} balance:`,await getBalances(address));
//        counter++;
//   }
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
