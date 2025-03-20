import React from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetail.css";

const serviceDetails = {
  cinema: {
    title: "RẠP CHIẾU PHIM",
    description: "Không gian rộng rãi, màn hình lớn, âm thanh sống động.",
    image: "/images/cinema-detail.jpg",
  },
  opera: {
    title: "NHÀ HÁT OPERA",
    description: "Không gian sân khấu hoành tráng, phù hợp tổ chức sự kiện lớn.",
    image: "/images/opera-detail.jpg",
  },
  kidzone: {
    title: "KIDZONE",
    description: "Khu vui chơi trẻ em với nhiều trò giải trí hấp dẫn.",
    image: "/images/kidzone-detail.jpg",
  },
  bowling: {
    title: "BOWLING",
    description: "Trải nghiệm chơi bowling chuyên nghiệp với bạn bè.",
    image: "/images/bowling-detail.jpg",
  },
  restaurant: {
    title: "NHÀ HÀNG",
    description: "Thưởng thức những bữa ăn ngon với không gian sang trọng.",
    image: "/images/restaurant-detail.jpg",
  },
  billiards: {
    title: "BILLIARDS",
    description: "Không gian giải trí dành cho những người yêu thích billiards.",
    image: "/images/billiards-detail.jpg",
  },
};

const ServiceDetail = () => {
  const { service } = useParams();
  const detail = serviceDetails[service] || {};

  return (
    <div className="service-detail">
      <img src={detail.image} alt={detail.title} className="service-detail-img" />
      <h2 className="service-detail-title">{detail.title}</h2>
      <p className="service-detail-description">{detail.description}</p>
      <button className="contact-btn" onClick={() => window.location.href = "mailto:Beoruiden1231242125@gmail.com"}>
        LIÊN HỆ NGAY
      </button>
    </div>
  );
};

export default ServiceDetail;
