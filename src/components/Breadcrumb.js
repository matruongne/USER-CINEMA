import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumb = ({ items }) => {
  return (
    <div className="flex items-center text-sm text-gray-400 mb-6">
      <Link to="/" className="flex items-center hover:text-yellow-400">
        <FaHome className="mr-1" />
        <span>Trang chủ</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <FaChevronRight className="mx-2 text-xs" />
          {index === items.length - 1 ? (
            <span className="text-yellow-400">{item.label}</span>
          ) : (
            <Link to={item.path} className="hover:text-yellow-400">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
