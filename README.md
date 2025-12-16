# CryptoPulse 🚀

**CryptoPulse** (previously "Cryptoverse") is an interactive React app that visualizes cryptocurrency market data using the CoinGecko API. It provides market overviews, coin detail pages with historical charts, Google authentication, and a Firestore-backed watchlist.

---

## 🔗 Live Demo
https://cryptoverse-steel.vercel.app/  
*(If the demo is unavailable, run locally — see setup below.)*

---

## ✨ Key Features

- Browse **Top 100 cryptocurrencies** by market cap
- View **trending coins** (24h) and coin-specific details
- Interactive **historical charts** for each coin (configurable time range)
- **Google Sign-In** and email auth via Firebase
- **Personal watchlist** synced to Firestore
- Responsive UI styled with **Tailwind CSS**

---

## 🧭 Tech Stack

- React (Create React App)
- Tailwind CSS
- Redux Toolkit
- Firebase Auth & Firestore
- Chart.js & react-chartjs-2
- Axios
- CoinGecko API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Install dependencies

```bash
npm install
# or
# yarn install
```

> If you run into peer dependency errors, try: `npm install --legacy-peer-deps`.

### Run locally

```bash
npm start
# or
npm run dev
```

Open http://localhost:3000 to view the app.

### Build

```bash
npm run build
```

---

## ⚙️ Configuration

### Firebase

This project uses Firebase for authentication and Firestore for the watchlist. The repo includes `src/config/firebaseConfig.js` with configuration values. For production, it is recommended to use environment variables instead of committing credentials.

Steps to use your Firebase project:

1. Create a Firebase project and a Web App in Firebase Console.
2. Copy the config keys and update `src/config/firebaseConfig.js` or load the config from environment variables.
3. Ensure Auth (Google Sign-In) and Firestore rules are enabled as needed.

---

## 📁 Notable Files

- `src/Api.js` — CoinGecko endpoints (CoinList, SingleCoin, HistoricalChart, TrendingCoins)
- `src/firebase.js` — initializes Firebase Auth & Firestore
- `src/config/firebaseConfig.js` — Firebase config
- `src/Component/` — UI components (Chart, Carousel, Table, Nav, Wishlist, etc.)
- `src/Page/` — `Home.js` and `Coin.js`
- `src/Utils/` — Redux store & slices (currencySlice, userSlice, watchlistSlice)

---

## 📷 Screenshots

#### Homepage
![Homepage](https://user-images.githubusercontent.com/78155393/227704336-9f8d89a5-4e18-4e66-9772-311fdcedd880.png)

#### Coin Page
![Coin page](https://user-images.githubusercontent.com/78155393/227704313-b9134990-7be2-41df-936e-49e02faa02cd.png)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add ..."`
4. Push and open a PR

---

## 📝 License

No license file is included. Add a `LICENSE` (e.g., MIT) if you plan to open source the project.

---

## Contact

Open an issue if you find bugs or want to request features — include steps to reproduce and screenshots if possible.

Enjoy building with CryptoPulse! 💡