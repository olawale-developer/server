# Transaction Processor Script

This project contains a Node.js script to monitor and process cryptocurrency transactions for different payment methods and networks. It interacts with a MySQL database and makes API calls to external services for processing transactions.

## Features
- Fetches and processes transactions with the status `Processing` from a MySQL database.
- Supports multiple cryptocurrencies, including BTC, ETH, BNB, TRX, and USDT.
- Handles USDT on TRC20, ERC20, and BEP20 networks.
- Differentiates transaction processing based on the mode of payment (`transferMoney`, `request`, or `Gift`).
- Sends transaction details to external APIs for further processing.

## Requirements

### Prerequisites
Ensure the following tools and libraries are installed:
- Node.js (v16 or higher)
- MySQL database

### Environment Variables
Create a `.env` file in the root directory and provide the following environment variables:
```env
DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_DATABASE=<your_database_name>
```

### Dependencies
The following npm packages are required:
- dotenv
- mysql2
- axios

Install them using the following command:
```bash
npm install dotenv mysql2 axios
```

## Script Description

### Main Functionality
1. **Database Connection**: Establishes a connection to the MySQL database using credentials from `.env`.
2. **Transaction Processing**:
   - Queries transactions with `status = 'Processing'` from the `2settle_transaction_table`.
   - For each transaction, calls the appropriate API based on the cryptocurrency and network.
   - Differentiates logic for `transferMoney`, `request`, and `Gift` modes of payment.
3. **API Calls**:
   - Sends transaction details to external services using HTTP POST requests.

### Supported Cryptocurrencies and Networks
- **BTC**
- **ETH**
- **BNB**
- **TRX**
- **USDT**
  - TRC20
  - ERC20
  - BEP20

### API Integration
Each cryptocurrency is processed via an API endpoint. Example endpoints:
- `http://<host>:3000/Erc20Api`
- `http://<host>:6000/Bep20Api`

## Usage

1. **Start the Script**:
   Run the script using Node.js:
   ```bash
   node server.js
   ```

2. **Monitor Logs**:
   Check the console for log messages to monitor transaction processing and error handling.

## Code Structure

### Core Functions
- `fetchProcessingTransactions()`: Queries the database for transactions with `status = 'Processing'` and delegates processing to API functions.
- `BtcApi`, `EthApi`, `BnbApi`, `TronApi`, `Trc20Api`, `erc20Api`, `bep20Api`: Functions to make HTTP POST requests to external APIs.

### Error Handling
- Logs all database and API errors to the console for debugging.

## Notes
- Ensure the MySQL database schema matches the table names and column names used in the script.
- API endpoints must be active and accessible from the host machine.

## Future Enhancements
- Add retry logic for failed API calls.
- Introduce more robust logging mechanisms.
- Implement unit tests for better reliability.
- Secure sensitive data like API keys and credentials.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.
