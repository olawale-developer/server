// Import required modules
const dotenv = require("dotenv");
const mysql = require("mysql2");
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_DATABASE, // Database name
});

// Object to store timers to prevent duplicate processing
let timers = {};

// Function to fetch transactions with status "Processing" from the database
async function fetchProcessingTransactions() { 
    db.query( 'SELECT * FROM 2settle_transaction_table WHERE status = "Processing"', (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return;
        }
        // If there are results, process each transaction
        if (results.length > 0) {
          results.forEach(({ mode_of_payment, wallet_address, acct_number, bank_name, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate, network, crypto, asset_price, Date }) => { 
             // Check if the transaction is already being processed
            if (!timers[transac_id]) { 

               // Process BTC transactions
              if (crypto === 'BTC') {
              // 
              if(mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
              db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
                   // Call BTC API
                  BtcApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                }
              })
              }else if (mode_of_payment === 'Gift') {
                const bank_code = 'undefined'
                 // Call BTC API
                 BtcApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                console.log('working perfectly')
              }
        
              }
                 // Process ETH transactions
            else if (crypto === 'ETH') {
                  if(mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
              db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
                  EthApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                }
              })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
               EthApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                console.log('working perfectly')
              }
              }
                // Process BNB transactions
              else if (crypto === 'BNB') {
                  if(mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
              db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
               BnbApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                }
              })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
               BnbApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                console.log('working perfectly')
              }
   
              }
                // Process TRX transactions
            else if (crypto === 'TRX') {
               if(mode_of_payment === 'transferMoney'|| mode_of_payment === 'request') {
              db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
               TronApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                }
              })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
               TronApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date)
                console.log('working perfectly')
              }
              }
                // Process USDT (TRC20 network) transactions
            else if (crypto === 'USDT' && network === 'TRC20') {
              if(mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
              db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
               Trc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date)
                }
              })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
                 Trc20Api(wallet_address, acct_number, bank_name, bank_code, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate, mode_of_payment,Date)
                console.log('working perfectly')
              }
            }
            // Process USDT (ERC20 network) transactions
            else if (crypto === 'USDT' && network === 'ERC20') {
              if (mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
                db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                  if (err) {
                    console.error('Error querying the database:', err);
                    return;
                  }
                  if (result.length > 0) {
                    const arr = result.map((row) => row.bank_code)
                    const bank_code = arr.toString()
                       erc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date)
                  }
                })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
                  erc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date)
                 console.log('working perfectly')
              }
         
            }
            // Process USDT (BEP20 network) transactions
            else if (crypto === 'USDT' && network === 'BEP20') {
                 if (mode_of_payment === 'transferMoney' || mode_of_payment === 'request') {
                db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                  if (err) {
                    console.error('Error querying the database:', err);
                    return;
                  }
                  if (result.length > 0) {
                    const arr = result.map((row) => row.bank_code)
                    const bank_code = arr.toString()
                      bep20Api(wallet_address, acct_number, bank_name, bank_code, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate,mode_of_payment,Date) 
                  }
                })
              }else if (mode_of_payment === 'Gift') {
                 const bank_code = 'undefined'
                   bep20Api(wallet_address, acct_number, bank_name,bank_code, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate,mode_of_payment,Date) 
                   console.log('working perfectly')
              }
         }
          timers[transac_id] = {}
    
                      }
            })
        }
    })
}

// API call functions (e.g., BtcApi, EthApi, etc.) to send transaction data to their respective endpoints
async function erc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
mode_of_payment: mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://50-6-175-42.bluehost.com:3000/Erc20Api', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error occurred:',  error.response.data);
});
}

async function bep20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
  mode_of_payment: mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://50-6-175-42.bluehost.com:6000/Bep20Api', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}

async function Trc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
mode_of_payment: mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://127.0.0.1:7000/Trc20Api', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}


async function TronApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
  asset_price: asset_price,
  mode_of_payment: mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://50-6-175-42.bluehost.com:8000/TronApi', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}

async function EthApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
asset_price: asset_price,
  mode_of_payment: mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://127.0.0.1:8080/EthApi', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}

 async function BnbApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
asset_price: asset_price,
mode_of_payment:mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://127.0.0.1:9000/BnbApi', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}

 async function BtcApi(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,asset_price,mode_of_payment,Date) {
const messageDetails = {
 wallet_address: wallet_address,
acct_number: acct_number,
bank_name: bank_name,
bank_code: bank_code,
receiver_name: receiver_name,
transac_id: transac_id,
crypto_sent: crypto_sent,
receiver_amount: receiver_amount,
current_rate: current_rate,
asset_price: asset_price,
mode_of_payment:mode_of_payment,
date:Date
};

 //  const message = `${messageDetails}`
axios.post('http://50-6-175-42.bluehost.com:5050/BtcApi', {
    message: messageDetails,
}, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
.then(response => {
  console.log(response.data);
})
.catch(error => {
 console.error('Error occurred:',  error);
});
}



// FUNCTION TO FETCH ANY PROCESSING GIFT TRANSACTIONS AND TRIGGER MONGOROAPI TO DO THE PAYMENT 
async function fetchGiftProcessingTransactions() { 
  db.query('SELECT * FROM 2settle_transaction_table WHERE gift_status = "Processing"', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return;
    }
    if (results.length > 0) { 
      results.forEach(({ acct_number, bank_name, receiver_name, transac_id, Settle_amount_sent }) => {
             db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                if (result.length > 0) { 
                   const arr = result.map((row) => row.bank_code)
                  const bank_code = arr.toString()
                   mongoroApi(acct_number, bank_name, bank_code, receiver_name,transac_id,Settle_amount_sent)
                }
              })
         
      })

    }
  })
}
 
// THIS IS MONOGORO API FUNCITON THAT TRIGGER IF THERE IS ANY PROCESSING GIFT 
async function mongoroApi(acct_number, bank_name, bank_code, receiver_name,transac_id,Settle_amount_sent) {
    console.log(receiver_name)
    const user = {
        accountNumber: acct_number,
        accountBank: bank_code,
        bankName: bank_name,
        amount: Settle_amount_sent,
        saveBeneficiary: false,
        accountName: receiver_name,
        narration: "Sirftiech payment",
        currency: "NGN",
        callbackUrl: "http://localhost:3000/payment/success",
        debitCurrency: "NGN",
        pin: "111111"
    };
    
    try {
        const response = await fetch('https://api-biz-dev.mongoro.com/api/v1/openapi/transfer', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json',    // Content type
                'accessKey': '117da1d3e93c89c3ca3fbd3885e5a6e29b49001a',
                'token': '75bba1c960a6ce7b608e001d9e167c44a9713e40'
            },
            body: JSON.stringify(user) // Data to be sent
        });

        const responseData = await response.json();

        if (!response.ok) {
            
            customerSupport(acct_number, bank_name,  receiver_name,transac_id,Settle_amount_sent)
            // throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);

        }
        if (responseData) {
            console.log('working baby')
             const user = { status: 'Successful' };
         db.query(`UPDATE 2settle_transaction_table SET ? WHERE transac_id = ?`, [user, transac_id]);
        }
        console.log('Transaction successful:', responseData);
    } catch (error) {
        console.error('Error:', error);
        customerSupport(acct_number, bank_name,  receiver_name,transac_id,Settle_amount_sent)
    }
}


function customerSupport(acct_number, bank_name,  receiver_name,transac_id,Settle_amount_sent) {
       const messageDetails = [
          `Name: ${receiver_name}`,
          `Bank name: ${bank_name}`,
          `Account number: ${acct_number}`,
          `Receiver Amount: ${Settle_amount_sent}`,
        ];
        const menuOptions = [
          [{ text: 'Successful', callback_data: `Transaction_id: ${transac_id} Successful` }]
        ];

            const message = `${messageDetails.join('\n')}}`
              axios.post('http://50-6-175-42.bluehost.com:5000/message', {
                message: message,
                menuOptions: menuOptions,
             }, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms))
            
}

// THIS FUNCTION RUN THE fetchProcessingTransactions FUNCTION  VERY 30SECS
setInterval(() => {
  fetchProcessingTransactions();
}, 30 * 1000);

// 
setInterval(() => {
  fetchGiftProcessingTransactions();
}, 20 * 1000);