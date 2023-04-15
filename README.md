# Chat DApp
Chat Decentralized Application (abbreviated as Chat DApp) is a blockchain-based decentralized chatting application that helps you chat with your friends securely. This chat app is more secure than the existing chat softwares as it is backed with the security of a blockchain network, namely Ethereum. The frontend is made using a JavaScript library, ReactJS.

## Languages used

#### Backend languages:
- Solidity (for writing Smart Contracts)
#### Frontend languages:
- ReactJS (for creating frontend UI)
- CSS

## How to run the application
1. Clone the repository on the local machine by executing the following commands:
```shell
git clone https://github.com/Pratik1603/Chat-DAPP
```

2. Install the required dependencies:
```shell
npm install
cd ./client
npm install
```

3. Run the React Application:
```shell
npm run start
```

## How to chat on the application
1. The prerequisites to use the application is to have preinstalled **Metamask** extension on your browser. Metamask is an extension that allows the user to connect and create accounts to perform transactions of **Ether**. If the Metamask is installed, then create a new account on the Metamask, if not having any account beforehand.

2. If the Metamask is installed, enter a name in the create account field and create account. A transaction will be initiated with the name **`Create Account`**.

3. When the transaction is successful, then your account has been successfully created.

4. To add friends to your account and to chat with them, you need the **`public key`**  of the friend you want to connect to.

***Disclaimer : You should never share your private key with anyone. Only share the public key.***

5. Once the public key is known to you , give a nickname to your friend and add the friend by clicking on the **`Add Friend`** button.

## Division of work between team members
### 1. Frontend Development:
1. Devvrat Gupta
2. Kartik Joshi
### 2. Blockchain coding: 
1. Pratik Gupta
### 3. Non-coding stuff (Description writing): 
1. Ansh Agarwal

## Regarding Integration of Google Cloud Services and AMD Engineers

The google cloud integration was not possible due to some reasons. But, instead of just leaving it, we have written down how we would have deployed our application on the google cloud.
Since, google cloud services provide users with virtual machines, we would have created our own virtual machine on the cloud with required specifications. This VM could have a processor of AMD Engineers. This could have been used for deploying our application on it.
