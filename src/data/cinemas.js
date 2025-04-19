const cinemas = [
  {
    id: 1,
    name: "CineStar Quốc Thanh",
    slug: "cinestar-quoc-thanh",
    address:
      "Lầu 3, Vincom Center Landmark 81, 720A Điện Biên Phủ, P.22, Q.Bình Thạnh, TP.HCM",
    phone: "1900 6017",
    image: "/images/cinestar-quoc-thanh.jpg",
    description:
      "Rạp chiếu phim hiện đại với 8 phòng chiếu, trang bị công nghệ IMAX và Dolby Atmos",
    facilities: ["IMAX", "Dolby Atmos", "4DX", "Gold Class", "Starium"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.7947,
      lng: 106.7219,
    },
    specialFeatures: [
      "Phòng chiếu IMAX đầu tiên tại Việt Nam",
      "Hệ thống âm thanh Dolby Atmos",
      "Phòng chiếu 4DX với hiệu ứng đặc biệt",
      "Phòng chiếu Gold Class với ghế massage",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Landmark 81",
      "Công viên Vinhomes Central Park",
      "Bảo tàng Mỹ thuật TP.HCM",
      "Chợ Bình Tây",
    ],
    transportation: [
      "Xe buýt: Tuyến 01, 02, 03, 04, 05",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Tàu điện ngầm: Ga Bình Thạnh (tương lai)",
    ],
  },
  {
    id: 2,
    name: "CineStar Hai Bà Trưng",
    slug: "cinestar-hai-ba-trung",
    address: "Lầu 4, Vincom Center, 72 Lê Thánh Tôn, P.Bến Nghé, Q.1, TP.HCM",
    phone: "1900 6017",
    image: "/images/cinestar-hai-ba-trung.jpg",
    description:
      "Rạp chiếu phim cao cấp với 6 phòng chiếu, trang bị công nghệ Dolby Atmos",
    facilities: ["Dolby Atmos", "Gold Class", "Starium"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.7756,
      lng: 106.7019,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Atmos",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Nhà thờ Đức Bà",
      "Bưu điện Thành phố",
      "Dinh Độc Lập",
      "Chợ Bến Thành",
    ],
    transportation: [
      "Xe buýt: Tuyến 01, 02, 03, 04, 05",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Tàu điện ngầm: Ga Bến Thành (tương lai)",
    ],
  },
  {
    id: 3,
    name: "CineStar Nguyễn Du",
    slug: "cinestar-nguyen-du",
    address: "Lầu 4, Vincom Center, 45A Lý Tự Trọng, P.Bến Nghé, Q.1, TP.HCM",
    phone: "1900 6017",
    image: "/images/cinestar-nguyen-du.jpg",
    description:
      "Rạp chiếu phim hiện đại với 5 phòng chiếu, trang bị công nghệ Dolby Atmos",
    facilities: ["Dolby Atmos", "Gold Class"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.7756,
      lng: 106.7019,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Atmos",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Nhà hát Thành phố",
      "Công viên 23/9",
      "Chợ Bến Thành",
      "Dinh Độc Lập",
    ],
    transportation: [
      "Xe buýt: Tuyến 01, 02, 03, 04, 05",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Tàu điện ngầm: Ga Bến Thành (tương lai)",
    ],
  },
  {
    id: 4,
    name: "CineStar Phạm Văn Đồng",
    slug: "cinestar-pham-van-dong",
    address:
      "Lầu 3, Vincom Center, 720A Điện Biên Phủ, P.22, Q.Bình Thạnh, TP.HCM",
    phone: "1900 6017",
    image: "/images/cinestar-pham-van-dong.jpg",
    description:
      "Rạp chiếu phim hiện đại với 7 phòng chiếu, trang bị công nghệ Dolby Atmos",
    facilities: ["Dolby Atmos", "Gold Class", "Starium"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.7947,
      lng: 106.7219,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Atmos",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Công viên Gia Định",
      "Chợ Phạm Văn Đồng",
      "Trung tâm thương mại Vincom",
      "Công viên nước Đầm Sen",
    ],
    transportation: [
      "Xe buýt: Tuyến 01, 02, 03, 04, 05",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Tàu điện ngầm: Ga Phạm Văn Đồng (tương lai)",
    ],
  },
  {
    id: 5,
    name: "Cinestar Mỹ Tho",
    slug: "cinestar-my-tho",
    address:
      "Lầu 3, Vincom Plaza Mỹ Tho, 209 Đại Lộ Đông, P.8, TP.Mỹ Tho, Tiền Giang",
    phone: "1900 6017",
    image: "/images/cinestar-my-tho.jpg",
    description:
      "Rạp chiếu phim hiện đại với 4 phòng chiếu, trang bị công nghệ Dolby Digital",
    facilities: ["Dolby Digital", "Gold Class"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.3549,
      lng: 106.342,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Digital",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Chùa Vĩnh Tràng",
      "Chợ Mỹ Tho",
      "Bảo tàng Tiền Giang",
      "Công viên Mỹ Tho",
    ],
    transportation: [
      "Xe buýt: Tuyến Mỹ Tho - TP.HCM",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Xe khách: Bến xe Mỹ Tho",
    ],
  },
  {
    id: 6,
    name: "Cinestar Kiên Giang",
    slug: "cinestar-kien-giang",
    address:
      "Lầu 3, Vincom Plaza Rạch Sỏi, Q.Rạch Sỏi, TP.Rạch Giá, Kiên Giang",
    phone: "1900 6017",
    image: "/images/cinestar-kien-giang.jpg",
    description:
      "Rạp chiếu phim hiện đại với 4 phòng chiếu, trang bị công nghệ Dolby Digital",
    facilities: ["Dolby Digital", "Gold Class"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 9.9902,
      lng: 105.0899,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Digital",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Chợ Rạch Sỏi",
      "Công viên Rạch Giá",
      "Bảo tàng Kiên Giang",
      "Chùa Tam Bảo",
    ],
    transportation: [
      "Xe buýt: Tuyến Rạch Giá - Hà Tiên",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Xe khách: Bến xe Rạch Giá",
    ],
  },
  {
    id: 7,
    name: "Cinestar Sinh Viên",
    slug: "cinestar-sinh-vien",
    address:
      "Lầu 3, Vincom Plaza Thủ Dầu Một, P.Phú Cường, TP.Thủ Dầu Một, Bình Dương",
    phone: "1900 6017",
    image: "/images/cinestar-sinh-vien.jpg",
    description:
      "Rạp chiếu phim hiện đại với 5 phòng chiếu, trang bị công nghệ Dolby Digital",
    facilities: ["Dolby Digital", "Gold Class"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 10.9794,
      lng: 106.6507,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Digital",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
      "Ưu đãi đặc biệt cho sinh viên",
    ],
    nearbyAttractions: [
      "Đại học Thủ Dầu Một",
      "Chợ Thủ Dầu Một",
      "Công viên Thủ Dầu Một",
      "Bảo tàng Bình Dương",
    ],
    transportation: [
      "Xe buýt: Tuyến Thủ Dầu Một - TP.HCM",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Xe khách: Bến xe Thủ Dầu Một",
    ],
  },
  {
    id: 8,
    name: "Cinestar Lâm Đồng",
    slug: "cinestar-lam-dong",
    address: "Lầu 3, Vincom Plaza Đức Trọng, Q.Đức Trọng, Lâm Đồng",
    phone: "1900 6017",
    image: "/images/cinestar-lam-dong.jpg",
    description:
      "Rạp chiếu phim hiện đại với 4 phòng chiếu, trang bị công nghệ Dolby Digital",
    facilities: ["Dolby Digital", "Gold Class"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 11.7504,
      lng: 108.2317,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Digital",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Chợ Đức Trọng",
      "Công viên Đức Trọng",
      "Bảo tàng Lâm Đồng",
      "Chùa Linh Quang",
    ],
    transportation: [
      "Xe buýt: Tuyến Đức Trọng - Đà Lạt",
      "Taxi: Mai Linh, Vinasun, Grab",
      "Xe khách: Bến xe Đức Trọng",
    ],
  },
  {
    id: 9,
    name: "Cinestar Huế",
    slug: "cinestar-hue",
    address:
      "Lầu 3, Vincom Plaza Huế, 50A Hùng Vương, P.Phú Nhuận, TP.Huế, Thừa Thiên Huế",
    phone: "1900 6017",
    image: "/images/cinestar-hue.jpg",
    description:
      "Rạp chiếu phim hiện đại với 6 phòng chiếu, trang bị công nghệ Dolby Atmos và Gold Class",
    facilities: ["Dolby Atmos", "Gold Class", "Starium"],
    openingHours: "8:00 - 23:00",
    parking: "Có bãi đỗ xe",
    location: {
      lat: 16.4637,
      lng: 107.5909,
    },
    specialFeatures: [
      "Phòng chiếu Gold Class với ghế massage",
      "Hệ thống âm thanh Dolby Atmos",
      "Màn hình LED 4K",
      "Dịch vụ đặt đồ ăn tại chỗ",
    ],
    nearbyAttractions: [
      "Chùa Thiên Mụ",
      "Đại Nội Huế",
      "Chợ Đông Ba",
      "Cầu Tràng Tiền",
    ],
    transportation: [
      "Xe buýt: Tuyến 1, 2, 3, 4, 5",
      "Taxi: Mai Linh, Vinasun, Taxi Huế",
      "Grab: Có sẵn dịch vụ GrabCar và GrabBike",
    ],
  },
];

export default cinemas;
