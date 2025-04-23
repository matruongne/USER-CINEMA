import React from "react";

const SeatLayout = ({
  layoutType = "3-zones",
  selectedSeats = [],
  bookedSeats = [],
  onSeatClick,
}) => {
  const handleSeatClick = (seat) => {
    if (onSeatClick) {
      onSeatClick(seat);
    }
  };

  const renderThreeZonesLayout = () => {
    return (
      <div className="grid gap-4 mb-6 max-w-6xl mx-auto px-8">
        {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-center font-bold text-white">{row}</span>
            <div className="grid grid-cols-17 gap-1 flex-1">
              {Array.from({ length: 17 }, (_, i) => {
                const seatNumber = (i + 1).toString().padStart(2, "0");
                const seat = `${row}${seatNumber}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-7 h-7 text-[10px] font-medium rounded ${
                      isBooked
                        ? "bg-gray-600 cursor-not-allowed"
                        : isSelected
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        : "bg-white hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center font-bold text-white">{row}</span>
          </div>
        ))}

        <div className="mt-4">
          {["I"].map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
              <div className="flex justify-center gap-4 flex-1">
                {Array.from({ length: 9 }, (_, i) => {
                  const seatNumber = (i + 1).toString().padStart(2, "0");
                  const seat = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-14 h-7 text-[10px] font-medium rounded ${
                        isBooked
                          ? "bg-gray-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                          : "bg-white hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBowShapeLayout = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const containerWidth = 900; // Chiều rộng cố định của container
    const seatWidth = 28; // Chiều rộng của mỗi ghế + khoảng cách

    return (
      <div className="grid gap-4 mb-6 max-w-[900px] mx-auto px-8">
        {rows.map((row, rowIndex) => {
          const seatCount = 10 + rowIndex * 2;
          const totalWidth = seatCount * seatWidth;
          const marginLeft = (containerWidth - totalWidth) / 2;

          return (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
              <div className="relative flex-1 h-8">
                {Array.from({ length: seatCount }, (_, i) => {
                  const seatNumber = (i + 1).toString().padStart(2, "0");
                  const seat = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      onClick={() => handleSeatClick(seat)}
                      style={{
                        position: "absolute",
                        left: `${marginLeft + i * seatWidth}px`,
                      }}
                      className={`w-6 h-6 text-[10px] font-medium rounded ${
                        isBooked
                          ? "bg-gray-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                          : "bg-white hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
            </div>
          );
        })}

        {/* Dãy I - ghế đôi trên cùng */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <span className="w-6 text-center font-bold text-white">I</span>
            <div className="flex justify-center gap-8 flex-1">
              {Array.from({ length: 5 }, (_, i) => {
                const seatNumber = (i + 1).toString().padStart(2, "0");
                const seat = `I${seatNumber}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-14 h-7 text-[10px] font-medium rounded ${
                      isBooked
                        ? "bg-gray-600 cursor-not-allowed"
                        : isSelected
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        : "bg-white hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center font-bold text-white">I</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTrapezoidalLayout = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const containerWidth = 900; // Chiều rộng cố định của container
    const seatWidth = 28; // Chiều rộng của mỗi ghế + khoảng cách

    return (
      <div className="grid gap-4 mb-6 max-w-[900px] mx-auto px-8">
        {rows.map((row, rowIndex) => {
          const seatCount = 24 - rowIndex * 2;
          const totalWidth = seatCount * seatWidth;
          const marginLeft = (containerWidth - totalWidth) / 2;

          return (
            <div key={row} className="flex items-center gap-2">
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
              <div className="relative flex-1 h-8">
                {Array.from({ length: seatCount }, (_, i) => {
                  const seatNumber = (i + 1).toString().padStart(2, "0");
                  const seat = `${row}${seatNumber}`;
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isBooked}
                      onClick={() => handleSeatClick(seat)}
                      style={{
                        position: "absolute",
                        left: `${marginLeft + i * seatWidth}px`,
                      }}
                      className={`w-6 h-6 text-[10px] font-medium rounded ${
                        isBooked
                          ? "bg-gray-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                          : "bg-white hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
              <span className="w-6 text-center font-bold text-white">
                {row}
              </span>
            </div>
          );
        })}

        {/* Dãy I - ghế đôi cuối cùng */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <span className="w-6 text-center font-bold text-white">I</span>
            <div className="flex justify-center gap-8 flex-1">
              {Array.from({ length: 5 }, (_, i) => {
                const seatNumber = (i + 1).toString().padStart(2, "0");
                const seat = `I${seatNumber}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-14 h-7 text-[10px] font-medium rounded ${
                      isBooked
                        ? "bg-gray-600 cursor-not-allowed"
                        : isSelected
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        : "bg-white hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center font-bold text-white">I</span>
          </div>
        </div>
      </div>
    );
  };

  const renderLayout = () => {
    switch (layoutType) {
      case "3-zones":
        return renderThreeZonesLayout();
      case "bowshape":
        return renderBowShapeLayout();
      case "trapezoidal":
        return renderTrapezoidalLayout();
      default:
        return renderThreeZonesLayout();
    }
  };

  return (
    <div className="relative bg-[#1a1f37] rounded-lg p-8">
      <div className="relative mb-12">
        <div className="w-full flex justify-center">
          <div className="relative w-3/4">
            <div className="absolute w-full h-6 bg-gradient-to-b from-white/20 to-transparent -top-6"></div>
            <div className="text-center text-white text-xl font-semibold mb-8">
              Màn hình
            </div>
            <div className="w-full h-0.5 bg-white/50"></div>
          </div>
        </div>
      </div>

      {renderLayout()}

      <div className="flex justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded"></div>
          <span className="text-white">Ghế Thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-14 h-7 bg-white rounded"></div>
          <span className="text-white">Ghế Đôi (2 Người)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-yellow-400 rounded"></div>
          <span className="text-white">Ghế chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-600 rounded"></div>
          <span className="text-white">Ghế đã đặt</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
