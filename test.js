// const dotenv = require("dotenv");
// dotenv.config();
// const mysql = require("mysql2/promise");
// const axios = require('axios')

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// const seenIds = new Set();

// async function fetchProcessingTransactions() {
//   const query =
//     'SELECT * FROM 2settle_transaction_table WHERE status = "Processing"';

//   try {
//     let [rows, fields] = await pool.query(query);
//     // console.log("Query result:", rows);

//     if (!Array.isArray(rows) || rows.length === 0) {
//       return [];
//     }

//     return rows;
//   } catch (error) {
//     console.error("Error fetching processing transactions:", error);
//     return [];
//   }
// }

// // Function to sort transactions based on network and make each transaction unique by their id
// function sortTransactionsByNetwork(transactions, seenIds) {
//   const sortedTransactions = {
//     ETH: [],
//     BNB: [],
//     TRX: [],
//     ERC20: [],
//     BEP20: [],
//     TRC20: [],
//     BTC: [],
//     others: [],
//   };

//   // Iterate over the transactions
//   transactions.forEach((transaction) => {
//     const network = transaction.network;
//     const id = transaction.id;

//     if (!seenIds.has(id)) {
//       seenIds.add(id); // Add the unique id to the set
//       // Sort by network
//       switch (network.toUpperCase()) {
//         case "ETH":
//           sortedTransactions.ETH.push(transaction);
//           break;
//         case "BNB":
//           sortedTransactions.BNB.push(transaction);
//           break;
//         case "TRX":
//           sortedTransactions.TRX.push(transaction);
//           break;
//         case "ERC20":
//           sortedTransactions.ERC20.push(transaction);
//           break;
//         case "BEP20":
//           sortedTransactions.BEP20.push(transaction);
//           break;
//         case "TRC20":
//           sortedTransactions.TRC20.push(transaction);
//           break;
//         case "BTC":
//           sortedTransactions.BTC.push(transaction);
//           break;
//         default:
//           sortedTransactions.others.push(transaction);
//           break;
//       }
//     }
//   });

//   return sortedTransactions;
// }

// // Function to process one transaction with logging based on the network
// async function processTransaction(transaction) {
// const {id,wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate,network} = transaction;

//   try {
//     // Network-specific logging before processing
//     if (network === "BTC") {
//       console.log(`Processing transaction with id ${id} and network BTC`);
//     //   await checkBTCTransaction(walletAddress, amountToCheck);
//     } else if (network === "ETH") {
//       console.log(`Processing transaction with id ${id} and network ETH`);
//     } else if (network === "BNB") {
//       console.log(`Processing transaction with id ${id} and network BNB`);
//     } else if (network === "TRX") {
//       console.log(`Processing transaction with id ${id} and network TRX`);
//     } else if (network === "ERC20") {
//      console.log(`Processing transaction with id ${id} and network ERC20`);
//      erc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate)
//     } else if (network === "BEP20") {
//     console.log(`Processing transaction with id ${id} and network BEP20`);
//      bep20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate)
//     } else if (network === "TRC20") {
//       console.log(`Processing transaction with id ${id} and network TRC20`);
//     } else {
//       console.log(
//         `Processing transaction with id ${id} and network ${network}`
//       );
//     }

//     // Simulate processing time
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async call
//   } finally {
//     // After processing is done, remove the id from the seenIds set
//     seenIds.delete(id);
//     console.log(`Transaction with id ${id} and network ${network} done`);
//   }
// }

// // Function to handle concurrent processing
// async function processConcurrentNetworkTransactions(sortedTransactions) {
//   // Create promises for each network's transaction processing
//   const processingPromises = Object.entries(sortedTransactions).map(
//     async ([network, transactionList]) => {
//       if (transactionList.length > 0) {
//         // For each network, process transactions one by one, but start processing first transaction of each network in parallel
//         await processNetworkQueue(network, transactionList);
//       }
//     }
//   );

//   // Wait for all networks to finish processing
//   await Promise.all(processingPromises);
//   console.log("All networks' transactions processed");
// }

// // Function to process the first transaction from each network concurrently, and continue processing the rest
// async function processNetworkQueue(network, transactions) {
//   let index = 0;

//   async function processNextTransaction() {
//     if (index < transactions.length) {
//       const transaction = transactions[index];
//       index++;

//       // Process the current transaction
//       await processTransaction(transaction);

//       // Remove the processed transaction from the list
//       transactions.shift();
//       // console.log("The transactions left:", transactions);
//       // Once done, process the next one
//       processNextTransaction();
//     }
//   }

//   // Start processing the first transaction
//   processNextTransaction();
// }

// // Main function that fetches, sorts, and starts processing transactions
// async function processTransactions() {
//   const transactions = await fetchProcessingTransactions();
//   const sortedTransactions = sortTransactionsByNetwork(transactions, seenIds);

//   // Start processing all networks concurrently
//   await processConcurrentNetworkTransactions(sortedTransactions);
// }

// // Call processTransactions initially and then set interval
// processTransactions(); // Initial call



// async function erc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate) {
// const messageDetails = {
//  wallet_address: wallet_address,
// acct_number: acct_number,
// bank_name: bank_name,
// bank_code: bank_code,
// receiver_name: receiver_name,
// transac_id: transac_id,
// crypto_sent: crypto_sent,
// receiver_amount: receiver_amount,
// current_rate: current_rate
// };

//  //  const message = `${messageDetails}`
// axios.post('http://127.0.0.1:3000/Erc20Api', {
//     message: messageDetails,
// }, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
// .then(response => {
//     console.log(response.data);
// })
// .catch(error => {
//     console.error('Error occurred:',  error.response.data);
// });
// }

// async function bep20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate) {
// const messageDetails = {
//  wallet_address: wallet_address,
// acct_number: acct_number,
// bank_name: bank_name,
// bank_code: bank_code,
// receiver_name: receiver_name,
// transac_id: transac_id,
// crypto_sent: crypto_sent,
// receiver_amount: receiver_amount,
// current_rate: current_rate
// };

//  //  const message = `${messageDetails}`
// axios.post('http://127.0.0.1:55000/Bep20Api', {
//     message: messageDetails,
// }, { timeout: 10000 })  // set timeout to 10 seconds (10000 ms)
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//  console.error('Error occurred:',  error);
// });
// }

// setInterval(() => {
//   processTransactions();
// }, 30 * 1000);






// async function fetchProcessingTransactions() {
//   const query =
//     'SELECT * FROM 2settle_transaction_table WHERE status = "Processing"';

//   try {
//     let [rows, fields] = await pool.query(query);
//     // console.log("Query result:", rows);

//     if (!Array.isArray(rows) || rows.length === 0) {
//       return [];
//     }

//   //  console.log(rows);
//     rows.forEach(({ wallet_address, acct_number, bank_name, bank_code, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate, network, crypto }) => { 
//       if (!timers[transac_id]) {
//         if (crypto === 'BTC') {
        
//         } else if (crypto === 'ETH') {
        
//         } else if (crypto === 'BNB') {
        
//         } else if (crypto === 'TRX') {
        
//         } else if (crypto === 'USDT' && network === 'TRC20') {
   
//       //  Trc20Api(wallet_address,acct_number,bank_name,bank_code,receiver_name,transac_id,crypto_sent,receiver_amount,current_rate)
//         } else if (crypto === 'USDT' && network === 'ERC20') {
//            const query = 'SELECT * FROM 2settle_bank_details WHERE bank_name = ?';

//   try {
//     // Execute the query using the promise-based pool
//     const [rows] =  pool.query(query, [bank_name]);

//     // Check if there are any results
//     if (!Array.isArray(rows) || rows.length === 0) {
//       console.log('No bank details found for the given bank_name.');
//       return [];
//     }

//     // Iterate through the result rows and call erc20Api for each row
//     rows.forEach(({ bank_code }) => {
//       erc20Api(
//         wallet_address,
//         acct_number,
//         bank_name,
//         bank_code,
//         receiver_name,
//         transac_id,
//         crypto_sent,
//         receiver_amount,
//         current_rate
//       );
//     });

//   } catch (err) {
//     // Handle the error
//     console.error('Error executing query:', err);
//   }
          
         
         
//         } else if (crypto === 'USDT' && network === 'BEP20') {

//         bep20Api(wallet_address, acct_number, bank_name, bank_code, receiver_name, transac_id, crypto_sent, receiver_amount, current_rate) 
          
//         }

//         timers[transac_id] = {}
//       }
//     })
//   } catch (error) {
//     console.error("Error fetching processing transactions:", error);
//     return [];
//   }
// }

    //  try {
    //        // Call the async function with a parameter and wait for the response
    //       const response = await fetchData("example data");
    //        console.log(response);  // Output: "Received data: example data"
  
    //     // Use the response to do something else
    //        const processedData = response.toUpperCase();
    //       console.log(processedData);  // Output: "RECEIVED DATA: EXAMPLE DATA"
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
//    }
    
// async function bankName(bank_name) {
//    db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
//                 if (err) {
//                   console.error('Error querying the database:', err);
//                   return;
//                 }
//                 if (result.length > 0) { 
//                    const arr = result.map((row) => row.bank_code)
//                   const bank_code = arr.toString()
//                   return bank_code
//                 }
//               })
// }

// async function bankName(bank_name) {
//    db.query('SELECT * FROM 2settle_bank_details WHERE bank_name = ?', [bank_name], (err, result) => {
//                 if (err) {
//                   console.error('Error querying the database:', err);
//                   return;
//                 }
//                 if (result.length > 0) { 
//                    const arr = result.map((row) => row.bank_code)
//                   const bank_code = arr.toString()
//                   return bank_code
//                 }
//               })
// }
