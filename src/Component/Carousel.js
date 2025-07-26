import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { TrendingCoins } from "../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Carousel = () => {
  const currency = useSelector((store) => store.currency.currency);
  const [arr, setArr] = useState([]); // Initialized as empty array for safety
  const [loading, setLoading] = useState(true); // Added for better UX
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(TrendingCoins(currency));
        setArr(response.data);
      } catch (error) {
        console.log("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currency]);

  const getChangeClass = (val) => {
    const numericVal = Number(val);
    return numericVal < 0 ? "text-red-500" : "text-green-500";
  };

  const currencySymbol = currency === "usd" ? "$" : "₹";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[40vh] text-[#FAF0E6]">
        Loading trending coins...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-xl mx-4 lg:mx-0 transition-all duration-500 Carouselimg">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl p-4 font-bold text-[#87CEEB] drop-shadow-lg hover:text-[#5ABDE3] transition-colors duration-300">
        CryptoPulse
      </h1>
      <p className="text-center text-sm lg:text-base text-[#FAF0E6] mb-6 max-w-md">
        Get All The Information Regarding Crypto Currency
      </p>
      <AliceCarousel
        autoPlay
        infinite
        autoPlayInterval={1800}
        disableButtonsControls
        disableDotsControls
        responsive={{
          0: { items: 2 },
          476: { items: 3 },
          768: { items: 4 },
          1024: { items: 6 }, // Added for larger screens
        }}
        mouseTracking
        items={arr?.map((curr) => (
          <div
            key={curr.id}
            onClick={() => navigate(`/coins/${curr.id}`)}
            className="flex flex-col justify-center items-center p-4 text-[#FAF0E6] cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-md hover:border-[#87CEEB]/50 border border-transparent rounded-lg"
          >
            <img
              className="h-[60px] sm:h-[75px] lg:h-[90px] rounded-full border-2 border-[#87CEEB]/30 mb-2"
              src={curr.image}
              alt={curr.name}
            />
            <p className="text-center font-semibold text-sm lg:text-base">{curr.name}</p>
            <p className="text-center text-xs lg:text-sm mt-1">
              {currencySymbol} {curr.current_price.toLocaleString()}
            </p>
            <span
              className={`flex items-center gap-1 mt-1 text-xs lg:text-sm font-bold ${getChangeClass(
                curr.price_change_percentage_24h_in_currency
              )}`}
            >
              {curr.price_change_percentage_24h_in_currency.toFixed(2)}%{" "}
              {Number(curr.price_change_percentage_24h_in_currency) < 0 ? "↓" : "↑"}
            </span>
          </div>
        ))}
      />
    </div>
  );
};

export default Carousel;
