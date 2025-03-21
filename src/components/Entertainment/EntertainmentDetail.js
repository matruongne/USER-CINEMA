import React from "react";
import { useParams } from "react-router-dom";
import { entertainmentData } from "../../data/entertainmentData";
import { Link } from "react-router-dom";

const EntertainmentDetail = () => {
  const { id } = useParams();
  const item = entertainmentData.find((ent) => ent.id === parseInt(id));

  if (!item) {
    return <div className="text-center text-white py-10">Loại hình giải trí không tồn tại.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400">{item.title}</h1>
      <div className="mt-6 flex flex-col items-center">
        <img src={item.image} alt={item.title} className="w-full max-w-2xl h-64 object-cover rounded-md" />
        <p className="text-white mt-4">{item.details}</p>
        <Link to="/entertainment" className="mt-6 text-yellow-400 hover:text-yellow-300 transition font-semibold">
          ← Quay lại danh sách
        </Link>
      </div>
    </div>
  );
};

export default EntertainmentDetail;
