import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Api';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { selectuser } from '../Utils/userSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { selectWatchlist } from '../Utils/watchlistSlice';

const CoinLeftBar = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const currency = useSelector((store) => store.currency.currency);
  const { id } = useParams();
  const user = useSelector(selectuser);
  const watchlist = useSelector(selectWatchlist);
  const [inWatchlist, setInWatchlist] = useState(watchlist?.includes(id));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(SingleCoin(id));
        setCoin(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const currencySymbol = currency === 'usd' ? '$' : '₹';

  const handleAddToWatchlist = async () => {
    if (!coin) return;
    const coinRef = doc(db, 'watchlist', user.user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin.id] : [coin.id] }, { merge: true });
      setInWatchlist(true);
      alert(`${coin.name} Added to the Watchlist!`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!coin) return;
    const coinRef = doc(db, 'watchlist', user.user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist.filter((wish) => wish !== coin.id) }, { merge: true });
      setInWatchlist(false);
      alert(`${coin.name} Removed from the Watchlist!`);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-[100vw] lg:w-[25vw] h-screen flex items-center justify-center text-[#FAF0E6] bg-gray-800/50 rounded-lg shadow-lg">
        Loading...
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="w-[100vw] lg:w-[25vw] h-screen flex items-center justify-center text-[#FAF0E6] bg-gray-800/50 rounded-lg shadow-lg">
        Coin not found.
      </div>
    );
  }

  return (
    <div className="w-[100vw] lg:w-[25vw] h-screen flex flex-col text-[#FAF0E6] p-4 lg:p-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl overflow-y-auto transition-all duration-300">
      <div className="w-full flex flex-col items-center text-center">
        <img
          className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full border-4 border-[#87CEEB]/30 shadow-md mb-4 transform hover:scale-105 transition-transform duration-300"
          src={coin.image.large}
          alt={coin.name}
        />
        <h3 className="text-3xl lg:text-3xl font-bold mb-2">{coin.name}</h3>
      </div>
      <div className="w-full flex flex-col items-start gap-4 mt-4 border-t border-[#87CEEB]/20 pt-4">
        <p className="text-sm lg:text-base line-clamp-3">{ReactHtmlParser(coin.description.en.split('. ')[0])}.</p>
        <div className="text-lg w-full border-b border-[#87CEEB]/10 pb-2">
          <span className="font-semibold">Rank:</span> {coin.market_cap_rank}
        </div>
        <div className="text-lg w-full border-b border-[#87CEEB]/10 pb-2">
          <span className="font-semibold">Current Price:</span> {currencySymbol}{coin.market_data.current_price[currency].toLocaleString()}
        </div>
        <div className="text-lg w-full">
          <span className="font-semibold">Market Cap:</span> {currencySymbol}{Number((coin.market_data.market_cap[currency] / 1000000).toFixed(0)).toLocaleString()} M
        </div>
        {user && (
          <button
            onClick={inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
            className={`mt-4 w-full py-2 px-4 rounded-md text-black font-semibold transition-all duration-300 ${
              inWatchlist ? 'bg-red-500 hover:bg-red-600' : 'bg-[#87CEEB] hover:bg-[#5ABDE3] hover:shadow-md'
            }`}
          >
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinLeftBar;
