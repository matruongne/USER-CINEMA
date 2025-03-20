import React from "react";
import { Link } from "react-router-dom";
import "./OtherServices.css"; // Import CSS

const services = [
  { name: "RẠP CHIẾU PHIM", image: "/images/cinema.jpg", link: "/service-detail/cinema" },
  { name: "NHÀ HÁT OPERA", image: "/images/opera.jpg", link: "/service-detail/opera" },
  { name: "KIDZONE", image: "/images/kidzone.jpg", link: "/service-detail/kidzone" },
  { name: "BOWLING", image: "/images/bowling.jpg", link: "/service-detail/bowling" },
  { name: "NHÀ HÀNG", image: "/images/restaurant.jpg", link: "/service-detail/restaurant" },
  { name: "BILLIARDS", image: "/images/billiards.jpg", link: "/service-detail/billiards" },
];

const OtherServices = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">CÁC DỊCH VỤ CHO THUÊ KHÁC</h2>
      <p>Bạn đang tìm kiếm một địa điểm để...</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <Link to={service.link} key={index} className="service-item">
            <img src={service.image} alt={service.name} />
            <div className="service-name">{service.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;
