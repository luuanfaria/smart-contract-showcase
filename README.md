### Project: DonationWithCrypto

---

#### Description

**DonationWithCrypto** is a decentralized platform that allows users to create and support donation campaigns using cryptocurrencies. It consists of a set of smart contracts on Ethereum and a DApp (Decentralized Application) developed with Next.js to interact with these contracts.

---

#### Features

1. **Create Donation Campaigns:**
   - Users can create donation campaigns by specifying a title, description, contact information, and a fundraising goal.

2. **Donations:**
   - Users can donate to open campaigns directly with cryptocurrencies.

3. **Close Campaigns:**
   - The campaign author can close the campaign when the goal is reached or manually. Upon closure, funds are transferred to the campaign author.

4. **View Campaigns:**
   - Users can view open campaigns and see the details of ongoing campaigns.

5. **Load More Campaigns:**
   - Pagination to load more open campaigns as needed.

---

#### Project Structure

```
smart-contracts-dapp-showcase
├── README.md
├── packages
│   ├── dapp
│   │   ├── package.json
│   │   ├── src
│   │   └── ...
│   └── smart-contracts
│       ├── package.json
│       ├── contracts
│       └── ...
├── package.json
└── pnpm-workspace.yaml
```

---

#### Technologies Used

- **Frontend (DApp):**
  - **Framework:** Next.js
  - **Component Library:** shadcn/ui, Radix UI
  - **Styling:** Tailwind CSS
  - **Package Manager:** pnpm
  - **Blockchain Interaction:** web3.js

- **Smart Contracts:**
  - **Language:** Solidity
  - **Development Environment:** Remix Ethereum IDE

---

#### Installation and Usage

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/luuanfaria/smart-contract-dapp-showcase.git
   cd smart-contracts-dapp-showcase
   ```

2. **Install Dependencies:**
   ```sh
   pnpm install
   ```

3. **Run the DApp in Development Mode:**
   ```sh
   pnpm dev:dapp
   ```

4. **Deploy the Smart Contracts:**
   - Set up the environment in Remix Ethereum IDE.
   - Compile and deploy the contracts.
   - Update the contract address and ABI in the frontend as needed.

---

#### Using the DApp

1. **Create Campaign:**
   - Access the application and connect your wallet.
   - Navigate to the campaign creation section and provide the necessary information.
   - Confirm the transaction to create the campaign.

2. **Make Donations:**
   - Browse the list of open campaigns.
   - Select a campaign and make a donation by providing the desired amount.
   - Confirm the transaction.

3. **Close Campaign:**
   - If you are the author of a campaign, go to the details of your campaign.
   - Close the campaign manually or wait until the goal is reached.
   - Confirm the transaction to transfer the funds.

---

### Project Configuration for Monorepo

The project is organized as a monorepo using `pnpm` to manage multiple packages. The configuration is done through `pnpm-workspace.yaml` and specific scripts in the root `package.json`.

**File `pnpm-workspace.yaml`:**

```yaml
packages:
  - 'packages/*'
```

**File `package.json` in the project root:**

```json
{
  "name": "smart-contracts-dapp-showcase",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev:dapp": "pnpm --filter dapp dev",
    "build:dapp": "pnpm --filter dapp build",
    "test:smart-contracts": "pnpm --filter smart-contracts test",
    "deploy:smart-contracts": "pnpm --filter smart-contracts deploy"
  },
  "devDependencies": {
    "pnpm": "^7.0.0"
  }
}
```

---

### Conclusion

**DonationWithCrypto** is an innovative solution for donation campaigns using cryptocurrencies, allowing the creation, donation, and management of campaigns in a decentralized manner. Utilizing modern technologies such as Next.js, Tailwind CSS, and Solidity, the project aims to provide a smooth and secure experience for users.

Contributions are welcome! Feel free to open issues and pull requests on the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Created by Luan Faria

<p align="center">
  <samp>
    <a href="https://luuanfaria.dev">website</a> .
    <a href="https://linkedin.com/in/luuanfaria">linkedin</a> .
    <a href="https://twitter.com/luuanfariaf">twitter</a> .
  </samp>
</p>