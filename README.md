# API server
  Environment: Nodejs
  
  Port : 3000
  
## 1) Signing and verifying

### a) Signing
  - **Path**:localhost:3000/api/signature 
  - **Parameter**:
    + **privKey**: private key
    + **message**: input text (it is not hash)
  - **Example**: 
    + **privKey**: efdc49366a47fcc1962d81e4f913c4d15d0ed615a7fe7a624bf22cd64f3ef187
    + **message**: hello
    
    ==> **Url**: localhost:3000/api/signature?privKey=efdc49366a47fcc1962d81e4f913c4d15d0ed615a7fe7a624bf22cd64f3ef187&message=hello
    
    ==> **Result**:  30460221008eb90e5d917aebd8928deca1dccde03f0a9f46bb3ae178c599879d0cf1243162022100d24d7fa4f612e642d889334462dd85fafa1c82b090074845ba8799ff9cdd0cfc
 
 ### b) Verifying
  - **Path**: localhost:300/api/verify
  - **Parameter**:
    + **pubKey**: public key
    + **message**: input text (it is not hash)
    + **signature**: signature of text after signing 
  - **Example**:
    + **pubKey**: 04333a6cb789c16b0f32066b6506153cd1b4a172c89bb243602fc75f3b26b355cc945025b60600932b6a0f8224e72ad3e332a19aed004b166b54901fe176f58500
    + **message**: hello
    + **signature**: 30460221008eb90e5d917aebd8928deca1dccde03f0a9f46bb3ae178c599879d0cf1243162022100d24d7fa4f612e642d889334462dd85fafa1c82b090074845ba8799ff9cdd0cfc
    
    ==> **Url**: localhost:3000/api/verify?pubKey=04333a6cb789c16b0f32066b6506153cd1b4a172c89bb243602fc75f3b26b355cc945025b60600932b6a0f8224e72ad3e332a19aed004b166b54901fe176f58500&message=hello&signature=30460221008eb90e5d917aebd8928deca1dccde03f0a9f46bb3ae178c599879d0cf1243162022100d24d7fa4f612e642d889334462dd85fafa1c82b090074845ba8799ff9cdd0cfc
    
    ==> **Result**: true
   
  
  _Note: Hash function used for input text is sha256_

## 2) Get information of ERC20 transaction

  - **Path**: localhost:3000/api/getTransactionERC20
  - **Parameter**:
    + **transactionHash**: transaction hash
  - **Example**:
    + **transactionHash**: 0x6cdb1d1d2828afe634323331e73c65b9d67b2fd1b71c95b3ff4597ec588c09b2
    
    ==> **Url**: localhost:3000/api/getTransactionERC20?transactionHash=0x6cdb1d1d2828afe634323331e73c65b9d67b2fd1b71c95b3ff4597ec588c09b2
    
   - **Result**: 
    
    {
        "transfer": [
          {
            "from":"0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2",
            "to": "0x44afdb354acdc98dc53975584a71d89d98b42765",
            "amount": 2106
          }
        ],
        "hash": "0x6cdb1d1d2828afe634323331e73c65b9d67b2fd1b71c95b3ff4597ec588c09b2",
        "blockHeight": 13006428,
        "contractAddress": "0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25"
    }
   
   _Note: Endpoint configed in Infura is **mainnet** (file: .env)_
 
# Web interface
## **1) Signing and verifying**
  **URL to access: http://localhost:3000/**
  
###  a) Generate key:
   ![image](https://user-images.githubusercontent.com/48994663/137430670-c062d8f9-bed8-40bb-987e-d41f45aa57f2.png)
###  b) Signing
  ![image](https://user-images.githubusercontent.com/48994663/137430795-edaac81c-94f9-4a8a-b0be-6eb00ce6cede.png)
###  c) Verifying
  ![image](https://user-images.githubusercontent.com/48994663/137430837-63a789dd-669b-4235-bcfd-097dad840254.png)

## **2) Information of ERC20 transaction**

  **URL to access: http://localhost:3000/transaction**
  
  ![image](https://user-images.githubusercontent.com/48994663/137440885-2827b6fe-8efc-49ba-90ee-c94065ce240f.png)
  
