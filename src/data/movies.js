const movies = [
  {
    id: 1,
    title: "Godzilla x Kong: The New Empire",
    image: "/images/godzilla+kong.jpg",
    poster: "/images/godzilla+kong.jpg",
    description:
      "Cuộc đối đầu hoành tráng giữa Godzilla và King Kong khi một thế lực mới trỗi dậy.",
    duration: "119 phút",
    genre: "Hành động, Khoa học viễn tưởng",
    director: "Adam Wingard",
    actors: "Rebecca Hall, Brian Tyree Henry, Dan Stevens",
    releaseDate: "29/03/2024",
    rating: "T13",
    country: "Mỹ",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["10:00", "13:00", "16:00", "19:00"],
      "15/03/2024": ["09:00", "11:30", "14:00", "17:30", "20:30"],
      "16/03/2024": ["10:15", "13:15", "16:15", "19:15"],
      "17/03/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "18/03/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 2,
    title: "Dune: Part Two",
    image: "/images/dune2.jpg",
    poster: "/images/dune2.jpg",
    description:
      "Paul Atreides tiếp tục hành trình của mình trên hành tinh cát Arrakis.",
    duration: "166 phút",
    genre: "Khoa học viễn tưởng, Phiêu lưu",
    director: "Denis Villeneuve",
    actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
    releaseDate: "01/03/2024",
    rating: "T13",
    country: "Mỹ",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["09:30", "12:30", "15:30", "18:30"],
      "15/03/2024": ["10:00", "13:15", "16:30", "19:45", "22:00"],
      "16/03/2024": ["09:15", "12:15", "15:15", "18:15", "21:15"],
      "17/03/2024": ["10:15", "13:15", "16:15", "19:15"],
      "18/03/2024": ["09:45", "12:45", "15:45", "18:45", "21:45"],
    },
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    image: "/images/deadpool-wolverine.jpg",
    poster: "/images/deadpool-wolverine.jpg",
    description:
      "Deadpool cùng Wolverine đối đầu với kẻ thù mới trong cuộc phiêu lưu đa vũ trụ.",
    duration: "127 phút",
    genre: "Hành động, Hài, Siêu anh hùng",
    director: "Shawn Levy",
    actors: "Ryan Reynolds, Hugh Jackman, Emma Corrin",
    releaseDate: "26/07/2024",
    rating: "T16",
    country: "Mỹ",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "26/07/2024": ["11:00", "14:00", "17:00", "20:00"],
      "27/07/2024": ["10:15", "13:30", "16:45", "20:00", "22:30"],
      "28/07/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "29/07/2024": ["10:00", "13:00", "16:00", "19:00", "22:00"],
      "30/07/2024": ["11:15", "14:15", "17:15", "20:15"],
    },
  },
  {
    id: 4,
    title: "Inside Out 2",
    image: "/images/inside-out2.jpg",
    poster: "/images/inside-out2.jpg",
    description:
      "Những cảm xúc bên trong Riley đối mặt với những thử thách mới khi cô bé lớn lên.",
    duration: "96 phút",
    genre: "Hoạt hình, Phiêu lưu, Gia đình",
    director: "Kelsey Mann",
    actors: "Amy Poehler, Phyllis Smith, Lewis Black",
    releaseDate: "14/06/2024",
    rating: "K",
    country: "Mỹ",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/06/2024": ["08:30", "11:30", "14:30", "17:30"],
      "15/06/2024": ["09:00", "12:15", "15:30", "18:45", "21:00"],
      "16/06/2024": ["10:00", "13:00", "16:00", "19:00"],
      "17/06/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "18/06/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 5,
    title: "Kung Fu Panda 4",
    image: "/images/kungfu-panda4.jpg",
    poster: "/images/kungfu-panda4.jpg",
    description:
      "Po phải đối mặt với một kẻ thù mới và tìm kiếm người kế nhiệm mình.",
    duration: "94 phút",
    genre: "Hoạt hình, Hài, Phiêu lưu",
    director: "Mike Mitchell",
    actors: "Jack Black, Awkwafina, Viola Davis",
    releaseDate: "08/03/2024",
    rating: "K",
    country: "Mỹ",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["09:00", "11:30", "14:00", "16:30", "19:00"],
      "15/03/2024": ["10:00", "12:30", "15:00", "17:30", "20:00"],
      "16/03/2024": ["09:30", "12:00", "14:30", "17:00", "19:30"],
      "17/03/2024": ["10:30", "13:00", "15:30", "18:00", "20:30"],
      "18/03/2024": ["09:00", "11:30", "14:00", "16:30", "19:00"],
    },
  },
  {
    id: 6,
    title: "Nụ Hôn Bạc Tỷ",
    image: "/images/nu-hon-bac-ty.jpg",
    poster: "/images/nu-hon-bac-ty.jpg",
    description:
      "Hành trình tình yêu đầy hài hước của cặp đôi trong giới kinh doanh.",
    duration: "120 phút",
    genre: "Tình cảm, Hài",
    director: "Lê Thanh Sơn",
    actors: "Ninh Dương Lan Ngọc, Ngô Kiến Huy, Hứa Vĩ Văn",
    releaseDate: "14/02/2024",
    rating: "T13",
    country: "Việt Nam",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["10:00", "13:00", "16:00", "19:00"],
      "15/03/2024": ["09:00", "11:30", "14:00", "17:30", "20:30"],
      "16/03/2024": ["10:15", "13:15", "16:15", "19:15"],
      "17/03/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "18/03/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 7,
    title: "Đèn Âm Hồn",
    image: "/images/den-am-hon.jpg",
    poster: "/images/den-am-hon.jpg",
    description: "Câu chuyện ma quái xoay quanh chiếc đèn cổ bí ẩn.",
    duration: "105 phút",
    genre: "Kinh dị, Tâm lý",
    director: "Kim Jee-woon",
    actors: "Song Kang-ho, Lee Jung-jae, Kim Tae-ri",
    releaseDate: "28/02/2024",
    rating: "T16",
    country: "Hàn Quốc",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["11:00", "14:00", "17:00", "20:00"],
      "15/03/2024": ["10:15", "13:30", "16:45", "20:00", "22:30"],
      "16/03/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "17/03/2024": ["10:00", "13:00", "16:00", "19:00", "22:00"],
      "18/03/2024": ["11:15", "14:15", "17:15", "20:15"],
    },
  },
  {
    id: 8,
    title: "Bộ Tứ Báo Thủ",
    image: "/images/bo-tu-bao-thu.jpg",
    poster: "/images/bo-tu-bao-thu.jpg",
    description: "Bốn người bạn thân chiến đấu để bảo vệ thành phố.",
    duration: "130 phút",
    genre: "Hành động, Phiêu lưu",
    director: "James Gunn",
    actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
    releaseDate: "07/03/2024",
    rating: "T13",
    country: "Mỹ",
    status: "nowShowing",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "14/03/2024": ["09:30", "12:30", "15:30", "18:30"],
      "15/03/2024": ["10:00", "13:15", "16:30", "19:45", "22:00"],
      "16/03/2024": ["09:15", "12:15", "15:15", "18:15", "21:15"],
      "17/03/2024": ["10:15", "13:15", "16:15", "19:15"],
      "18/03/2024": ["09:45", "12:45", "15:45", "18:45", "21:45"],
    },
  },
  {
    id: 9,
    title: "Nhà Gia Tiên",
    image: "/images/nha-gia-tien.jpg",
    poster: "/images/nha-gia-tien.jpg",
    description: "Gia đình phát hiện bí ẩn kinh hoàng trong ngôi nhà tổ tiên.",
    duration: "110 phút",
    genre: "Kinh dị, Tâm lý",
    director: "Victor Vũ",
    actors: "Trấn Thành, Bảo Anh, Hứa Vĩ Văn",
    releaseDate: "21/03/2024",
    rating: "T16",
    country: "Việt Nam",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "21/03/2024": ["10:00", "13:00", "16:00", "19:00"],
      "22/03/2024": ["09:00", "11:30", "14:00", "17:30", "20:30"],
      "23/03/2024": ["10:15", "13:15", "16:15", "19:15"],
      "24/03/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "25/03/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 10,
    title: "Đại Chiến Người Khổng Lồ",
    image: "/images/dai-chien-nguoi-khong-lo.jpg",
    poster: "/images/dai-chien-nguoi-khong-lo.jpg",
    description: "Cuộc chiến cuối cùng giữa loài người và người khổng lồ.",
    duration: "140 phút",
    genre: "Hành động, Khoa học viễn tưởng",
    director: "Tetsurō Araki",
    actors: "Yuki Kaji, Marina Inoue, Hiroshi Kamiya",
    releaseDate: "04/04/2024",
    rating: "T13",
    country: "Nhật Bản",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "04/04/2024": ["09:30", "12:30", "15:30", "18:30"],
      "05/04/2024": ["10:00", "13:15", "16:30", "19:45", "22:00"],
      "06/04/2024": ["09:15", "12:15", "15:15", "18:15", "21:15"],
      "07/04/2024": ["10:15", "13:15", "16:15", "19:15"],
      "08/04/2024": ["09:45", "12:45", "15:45", "18:45", "21:45"],
    },
  },
  {
    id: 11,
    title: "Nhóc Quậy Và Khu Rừng Kỳ Diệu",
    image: "/images/nhoc-quay.jpg",
    poster: "/images/nhoc-quay.jpg",
    description: "Nhóc quậy khám phá khu rừng huyền bí đầy màu sắc.",
    duration: "95 phút",
    genre: "Hoạt hình, Phiêu lưu, Gia đình",
    director: "Michel Ocelot",
    actors: "Jean-Claude Donda, Julien Beramis",
    releaseDate: "11/04/2024",
    rating: "K",
    country: "Pháp",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "11/04/2024": ["08:30", "11:30", "14:30", "17:30"],
      "12/04/2024": ["09:00", "12:15", "15:30", "18:45", "21:00"],
      "13/04/2024": ["10:00", "13:00", "16:00", "19:00"],
      "14/04/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "15/04/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 12,
    title: "Quỷ Nhập Tràng",
    image: "/images/quy-nhap-trang.jpg",
    poster: "/images/quy-nhap-trang.jpg",
    description:
      "Một người đàn ông vô tình trở thành vật chủ cho thế lực tà ác.",
    duration: "110 phút",
    genre: "Kinh dị, Tâm lý",
    director: "Banjong Pisanthanakun",
    actors: "Mario Maurer, Davika Hoorne",
    releaseDate: "16/05/2024",
    rating: "T16",
    country: "Thái Lan",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "16/05/2024": ["10:00", "13:00", "16:00", "19:00"],
      "17/05/2024": ["09:00", "11:30", "14:00", "17:30", "20:30"],
      "18/05/2024": ["10:15", "13:15", "16:15", "19:15"],
      "19/05/2024": ["09:30", "12:30", "15:30", "18:30", "21:30"],
      "20/05/2024": ["10:30", "13:30", "16:30", "19:30"],
    },
  },
  {
    id: 13,
    title: "Paddington: Gấu Thủ Chu Du",
    image: "/images/paddington.jpg",
    poster: "/images/paddington.jpg",
    description: "Chú gấu Paddington tiếp tục phiêu lưu khám phá thế giới.",
    duration: "100 phút",
    genre: "Hoạt hình, Phiêu lưu, Gia đình",
    director: "Paul King",
    actors: "Ben Whishaw, Hugh Grant, Sally Hawkins",
    releaseDate: "09/05/2024",
    rating: "K",
    country: "Anh",
    status: "comingSoon",
    trailer: "https://www.youtube.com/embed/EXAMPLE",
    showtimes: {
      "09/05/2024": ["09:00", "11:30", "14:00", "16:30", "19:00"],
      "10/05/2024": ["10:00", "12:30", "15:00", "17:30", "20:00"],
      "11/05/2024": ["09:30", "12:00", "14:30", "17:00", "19:30"],
      "12/05/2024": ["10:30", "13:00", "15:30", "18:00", "20:30"],
      "13/05/2024": ["09:00", "11:30", "14:00", "16:30", "19:00"],
    },
  },
];

export default movies;
