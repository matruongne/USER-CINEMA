import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const cinemas = [
  {
    name: "Cinestar Quốc Thanh",
    dates: [
      {
        date: "2025-04-14",
        times: ["10:00", "14:00", "18:00"],
      },
      {
        date: "2025-04-15",
        times: ["09:00", "13:00", "17:00"],
      },
    ],
  },
  {
    name: "Cinestar Huỳnh Thúc Kháng",
    dates: [
      {
        date: "2025-04-14",
        times: ["11:00", "15:00", "19:00"],
      },
    ],
  },
];

const seats = [
  ["A1", "A2", "A3", "A4", "A5", "A6"],
  ["B1", "B2", "B3", "B4", "B5", "B6"],
  ["C1", "C2", "C3", "C4", "C5", "C6"],
];

const BookingPage = () => {
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatToggle = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const total = selectedSeats.length * 70000;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Chọn rạp */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Chọn rạp:</h2>
        <div className="flex flex-wrap gap-3">
          {cinemas.map((c) => (
            <Button
              key={c.name}
              onClick={() => {
                setCinema(c.name);
                setDate("");
                setTime("");
                setSelectedSeats([]);
              }}
              className={`$ {
                cinema === c.name ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Chọn ngày */}
      {cinema && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Chọn ngày:</h2>
          <div className="flex flex-wrap gap-3">
            {cinemas
              .find((c) => c.name === cinema)
              ?.dates.map((d) => (
                <Button
                  key={d.date}
                  onClick={() => {
                    setDate(d.date);
                    setTime("");
                    setSelectedSeats([]);
                  }}
                  className={`$ {
                    date === d.date ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {d.date}
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* Chọn suất chiếu */}
      {date && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Chọn suất chiếu:</h2>
          <div className="flex flex-wrap gap-3">
            {cinemas
              .find((c) => c.name === cinema)
              ?.dates.find((d) => d.date === date)
              ?.times.map((t) => (
                <Button
                  key={t}
                  onClick={() => {
                    setTime(t);
                    setSelectedSeats([]);
                  }}
                  className={`$ {
                    time === t ? "bg-purple-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {t}
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* Chọn ghế */}
      {time && (
        <div>
          <h2 className="text-xl font-bold mb-4">Chọn ghế:</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {seats.map((row, i) => (
                  <div key={i} className="flex gap-2 justify-center">
                    {row.map((seat) => (
                      <button
                        key={seat}
                        onClick={() => handleSeatToggle(seat)}
                        className={`w-10 h-10 rounded-full font-semibold text-sm ${
                          selectedSeats.includes(seat)
                            ? "bg-red-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-lg font-semibold text-right">
            Tổng tiền: {total.toLocaleString()}₫
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;