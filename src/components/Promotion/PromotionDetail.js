import React from "react";
import { useParams } from "react-router-dom";
import { promotionsData } from "./promotionsData";
import { Link } from "react-router-dom";

const PromotionDetail = () => {
  const { id } = useParams();
  const promo = promotionsData.find((item) => item.id === parseInt(id));

  if (!promo) {
    return (
      <div className="text-center text-white py-10">
        Khuyến mãi không tồn tại.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400">
        {promo.title}
      </h1>
      <div className="mt-6 flex flex-col items-center">
        <img
          src={promo.image}
          alt={promo.title}
          className="w-full max-w-2xl h-64 object-cover rounded-md"
        />
        <p className="text-white mt-4">{promo.details}</p>
        <Link
          to="/promotions"
          className="mt-6 text-yellow-400 hover:text-yellow-300 transition font-semibold"
        >
          ← Quay lại danh sách khuyến mãi
        </Link>
      </div>
    </div>
  );
};

export default PromotionDetail;
