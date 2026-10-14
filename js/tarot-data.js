/**
 * Canonical 78-Card Rider-Waite-Smith Tarot Deck
 * Conforms to SPEC.md Section 3 & 4.1
 */

const TAROT_DECK = [
  {
    "id": "major-00-fool",
    "number": 0,
    "nameEn": "The Fool",
    "nameVi": "Kẻ Khờ",
    "arcana": "major",
    "suit": null,
    "rank": 0,
    "meaningUpright": "Một khởi đầu mới đầy tự do, tin tưởng vào hành trình và sẵn sàng dấn thân vào những điều chưa biết.",
    "keywords": [
      "khởi đầu",
      "tự do",
      "ngây thơ",
      "dấn thân"
    ],
    "image": "assets/tarot/major-00-fool.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-01-magician",
    "number": 1,
    "nameEn": "The Magician",
    "nameVi": "Nhà Ảo Thuật",
    "arcana": "major",
    "suit": null,
    "rank": 1,
    "meaningUpright": "Khả năng làm chủ nguồn lực, hiện thực hóa ý tưởng bằng kỹ năng, ý chí và sự tập trung cao độ.",
    "keywords": [
      "kỹ năng",
      "sáng tạo",
      "ý chí",
      "hành động"
    ],
    "image": "assets/tarot/major-01-magician.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-02-high-priestess",
    "number": 2,
    "nameEn": "The High Priestess",
    "nameVi": "Nữ Tư Tế",
    "arcana": "major",
    "suit": null,
    "rank": 2,
    "meaningUpright": "Lắng nghe trực giác bên trong, sự tĩnh lặng, những bí mật và tri thức sâu sắc chưa lộ diện.",
    "keywords": [
      "trực giác",
      "bí ẩn",
      "tiềm thức",
      "tĩnh lặng"
    ],
    "image": "assets/tarot/major-02-high-priestess.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-03-empress",
    "number": 3,
    "nameEn": "The Empress",
    "nameVi": "Hoàng Hậu",
    "arcana": "major",
    "suit": null,
    "rank": 3,
    "meaningUpright": "Sự sinh sôi nảy nở, trù phú, nuôi dưỡng và vẻ đẹp dịu dàng của tình mẫu tử và thiên nhiên.",
    "keywords": [
      "trù phú",
      "nuôi dưỡng",
      "sáng tạo",
      "yêu thương"
    ],
    "image": "assets/tarot/major-03-empress.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-04-emperor",
    "number": 4,
    "nameEn": "The Emperor",
    "nameVi": "Hoàng Đế",
    "arcana": "major",
    "suit": null,
    "rank": 4,
    "meaningUpright": "Cấu trúc, kỷ luật, uy quyền và sự ổn định vững chắc xây dựng trên nền tảng vững vàng.",
    "keywords": [
      "quyền lực",
      "trật tự",
      "kỷ luật",
      "vững chãi"
    ],
    "image": "assets/tarot/major-04-emperor.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-05-hierophant",
    "number": 5,
    "nameEn": "The Hierophant",
    "nameVi": "Giáo Hoàng",
    "arcana": "major",
    "suit": null,
    "rank": 5,
    "meaningUpright": "Truyền thống, niềm tin tâm linh, học hỏi từ người thầy và những giá trị chuẩn mực đạo đức.",
    "keywords": [
      "truyền thống",
      "học hỏi",
      "đạo đức",
      "hướng dẫn"
    ],
    "image": "assets/tarot/major-05-hierophant.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-06-lovers",
    "number": 6,
    "nameEn": "The Lovers",
    "nameVi": "Những Người Yêu",
    "arcana": "major",
    "suit": null,
    "rank": 6,
    "meaningUpright": "Sự hòa hợp, tình yêu gắn kết và những lựa chọn quan trọng dựa trên tiếng gọi của trái tim.",
    "keywords": [
      "tình yêu",
      "gắn kết",
      "lựa chọn",
      "hòa hợp"
    ],
    "image": "assets/tarot/major-06-lovers.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-07-chariot",
    "number": 7,
    "nameEn": "The Chariot",
    "nameVi": "Cỗ Xe",
    "arcana": "major",
    "suit": null,
    "rank": 7,
    "meaningUpright": "Ý chí kiên định, vượt qua mọi nghịch cảnh và hướng thẳng đến mục tiêu với lòng quyết tâm.",
    "keywords": [
      "ý chí",
      "chiến thắng",
      "quyết tâm",
      "kiểm soát"
    ],
    "image": "assets/tarot/major-07-chariot.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-08-strength",
    "number": 8,
    "nameEn": "Strength",
    "nameVi": "Sức Mạnh",
    "arcana": "major",
    "suit": null,
    "rank": 8,
    "meaningUpright": "Sức mạnh nội tâm, lòng can đảm bền bỉ, sự kiên nhẫn và lòng trắc ẩn chế ngự bản năng.",
    "keywords": [
      "can đảm",
      "nhẫn nại",
      "sức mạnh nội tại",
      "trắc ẩn"
    ],
    "image": "assets/tarot/major-08-strength.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-09-hermit",
    "number": 9,
    "nameEn": "The Hermit",
    "nameVi": "Ẩn Sĩ",
    "arcana": "major",
    "suit": null,
    "rank": 9,
    "meaningUpright": "Khoảng lặng để tự vấn lương tâm, tìm kiếm ánh sáng chân lý từ bên trong qua sự chiêm nghiệm.",
    "keywords": [
      "suy ngẫm",
      "cô độc",
      "soi sáng",
      "nội tâm"
    ],
    "image": "assets/tarot/major-09-hermit.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-10-wheel-of-fortune",
    "number": 10,
    "nameEn": "Wheel of Fortune",
    "nameVi": "Bánh Xe Số Phận",
    "arcana": "major",
    "suit": null,
    "rank": 10,
    "meaningUpright": "Chu kỳ chuyển vần của số phận, những bước ngoặt bất ngờ và cơ hội mới đang mở ra.",
    "keywords": [
      "vận may",
      "chu kỳ",
      "thay đổi",
      "cơ duyên"
    ],
    "image": "assets/tarot/major-10-wheel-of-fortune.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-11-justice",
    "number": 11,
    "nameEn": "Justice",
    "nameVi": "Công Lý",
    "arcana": "major",
    "suit": null,
    "rank": 11,
    "meaningUpright": "Sự thật, công bằng, nhân quả và quyết định sáng suốt dựa trên lý trí và sự trung thực.",
    "keywords": [
      "công bằng",
      "sự thật",
      "trách nhiệm",
      "nhân quả"
    ],
    "image": "assets/tarot/major-11-justice.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-12-hanged-man",
    "number": 12,
    "nameEn": "The Hanged Man",
    "nameVi": "Người Treo Ngược",
    "arcana": "major",
    "suit": null,
    "rank": 12,
    "meaningUpright": "Buông bỏ sự kiểm soát, nhìn nhận vấn đề từ góc độ mới và chấp nhận khoảng lặng cần thiết.",
    "keywords": [
      "buông bỏ",
      "góc nhìn mới",
      "chờ đợi",
      "hy sinh"
    ],
    "image": "assets/tarot/major-12-hanged-man.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-13-death",
    "number": 13,
    "nameEn": "Death",
    "nameVi": "Chuyển Hóa (Death)",
    "arcana": "major",
    "suit": null,
    "rank": 13,
    "meaningUpright": "Sự kết thúc của giai đoạn cũ để mở đường cho sự tái sinh, lột xác và khởi đầu mới mẻ.",
    "keywords": [
      "kết thúc",
      "chuyển hóa",
      "tái sinh",
      "buông xả"
    ],
    "image": "assets/tarot/major-13-death.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-14-temperance",
    "number": 14,
    "nameEn": "Temperance",
    "nameVi": "Tiết Chế",
    "arcana": "major",
    "suit": null,
    "rank": 14,
    "meaningUpright": "Sự cân bằng, điều độ, hòa hợp giữa các yếu tố đối lập và sự kiên nhẫn tích cực.",
    "keywords": [
      "cân bằng",
      "điều độ",
      "hòa hợp",
      "kiên nhẫn"
    ],
    "image": "assets/tarot/major-14-temperance.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-15-devil",
    "number": 15,
    "nameEn": "The Devil",
    "nameVi": "Ác Quỷ",
    "arcana": "major",
    "suit": null,
    "rank": 15,
    "meaningUpright": "Nhận diện những ràng buộc vật chất, sự ám ảnh, thói quen tiêu cực và ảo tưởng giam cầm bản thân.",
    "keywords": [
      "ràng buộc",
      "cám dỗ",
      "ảo tưởng",
      "thức tỉnh"
    ],
    "image": "assets/tarot/major-15-devil.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-16-tower",
    "number": 16,
    "nameEn": "The Tower",
    "nameVi": "Tòa Tháp",
    "arcana": "major",
    "suit": null,
    "rank": 16,
    "meaningUpright": "Sự sụp đổ bất ngờ của những nền tảng sai lầm, dọn sạch để xây dựng lại chân thực và vững bền hơn.",
    "keywords": [
      "sụp đổ",
      "đột phá",
      "thức tỉnh",
      "giải phóng"
    ],
    "image": "assets/tarot/major-16-tower.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-17-star",
    "number": 17,
    "nameEn": "The Star",
    "nameVi": "Ngôi Sao",
    "arcana": "major",
    "suit": null,
    "rank": 17,
    "meaningUpright": "Hy vọng, niềm tin tươi sáng, sự chữa lành tâm hồn và nguồn cảm hứng thanh khiết.",
    "keywords": [
      "hy vọng",
      "chữa lành",
      "niềm tin",
      "bình an"
    ],
    "image": "assets/tarot/major-17-star.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-18-moon",
    "number": 18,
    "nameEn": "The Moon",
    "nameVi": "Mặt Trăng",
    "arcana": "major",
    "suit": null,
    "rank": 18,
    "meaningUpright": "Những nỗi sợ tiềm ẩn, sự bất an và những điều mơ hồ cần trực giác soi tỏ.",
    "keywords": [
      "bất an",
      "ảo tưởng",
      "tiềm thức",
      "mơ hồ"
    ],
    "image": "assets/tarot/major-18-moon.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-19-sun",
    "number": 19,
    "nameEn": "The Sun",
    "nameVi": "Mặt Trời",
    "arcana": "major",
    "suit": null,
    "rank": 19,
    "meaningUpright": "Niềm vui trọn vẹn, sự thành công rực rỡ, năng lượng tích cực và sự ấm áp lan tỏa.",
    "keywords": [
      "thành công",
      "rực rỡ",
      "hạnh phúc",
      "năng lượng"
    ],
    "image": "assets/tarot/major-19-sun.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-20-judgement",
    "number": 20,
    "nameEn": "Judgement",
    "nameVi": "Phán Quyết",
    "arcana": "major",
    "suit": null,
    "rank": 20,
    "meaningUpright": "Tiếng gọi thức tỉnh, sự tái sinh tâm linh, tha thứ và bước sang một cấp độ phát triển mới.",
    "keywords": [
      "thức tỉnh",
      "phán quyết",
      "tái sinh",
      "tha thứ"
    ],
    "image": "assets/tarot/major-20-judgement.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "major-21-world",
    "number": 21,
    "nameEn": "The World",
    "nameVi": "Thế Giới",
    "arcana": "major",
    "suit": null,
    "rank": 21,
    "meaningUpright": "Sự hoàn tất trọn vẹn một hành trình lớn, sự thành tựu, thăng hoa và hòa nhập viên mãn.",
    "keywords": [
      "trọn vẹn",
      "thành tựu",
      "hoàn thành",
      "tự do"
    ],
    "image": "assets/tarot/major-21-world.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-ace",
    "number": 1,
    "nameEn": "Ace of Wands",
    "nameVi": "Át Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 1,
    "meaningUpright": "Ý tưởng mới xuất hiện, tia lửa nhiệt huyết và cảm hứng sáng tạo mạnh mẽ mở ra hướng đi đầy tiềm năng.",
    "keywords": [
      "khởi đầu",
      "động lực",
      "sáng tạo",
      "nhiệt huyết"
    ],
    "image": "assets/tarot/wands-ace.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-02",
    "number": 2,
    "nameEn": "Two of Wands",
    "nameVi": "Hai Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 2,
    "meaningUpright": "Lập kế hoạch dài hạn, mở rộng tầm nhìn và chuẩn bị tinh thần bước ra khỏi vùng an toàn.",
    "keywords": [
      "kế hoạch",
      "tầm nhìn",
      "quyết định",
      "tiến bước"
    ],
    "image": "assets/tarot/wands-02.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-03",
    "number": 3,
    "nameEn": "Three of Wands",
    "nameVi": "Ba Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 3,
    "meaningUpright": "Những thành quả bước đầu đang tới, cơ hội mở rộng và sự tự tin nhìn về tương lai.",
    "keywords": [
      "mở rộng",
      "triển vọng",
      "thành quả",
      "khám phá"
    ],
    "image": "assets/tarot/wands-03.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-04",
    "number": 4,
    "nameEn": "Four of Wands",
    "nameVi": "Bốn Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 4,
    "meaningUpright": "Niềm vui sum họp, sự ổn định trong tổ ấm, chúc mừng một cột mốc thành công đáng nhớ.",
    "keywords": [
      "kỷ niệm",
      "hòa hợp",
      "ổn định",
      "hạnh phúc"
    ],
    "image": "assets/tarot/wands-04.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-05",
    "number": 5,
    "nameEn": "Five of Wands",
    "nameVi": "Năm Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 5,
    "meaningUpright": "Cạnh tranh, xung đột quan điểm hoặc những bất đồng nhỏ là cơ hội để tôi luyện bản lĩnh.",
    "keywords": [
      "cạnh tranh",
      "thử thách",
      "mâu thuẫn",
      "rèn luyện"
    ],
    "image": "assets/tarot/wands-05.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-06",
    "number": 6,
    "nameEn": "Six of Wands",
    "nameVi": "Sáu Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 6,
    "meaningUpright": "Chiến thắng xứng đáng, được mọi người công nhận và tôn vinh sau những nỗ lực bền bỉ.",
    "keywords": [
      "chiến thắng",
      "công nhận",
      "tự hào",
      "thành công"
    ],
    "image": "assets/tarot/wands-06.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-07",
    "number": 7,
    "nameEn": "Seven of Wands",
    "nameVi": "Bảy Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 7,
    "meaningUpright": "Kiên định bảo vệ lập trường của mình trước áp lực và thử thách từ môi trường xung quanh.",
    "keywords": [
      "kiên định",
      "bảo vệ",
      "bản lĩnh",
      "vững vàng"
    ],
    "image": "assets/tarot/wands-07.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-08",
    "number": 8,
    "nameEn": "Eight of Wands",
    "nameVi": "Tám Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 8,
    "meaningUpright": "Tốc độ chuyển biến nhanh chóng, thông điệp quan trọng đang đến và các kế hoạch tiến triển thuận lợi.",
    "keywords": [
      "tốc độ",
      "chuyển động",
      "thông điệp",
      "tiến triển"
    ],
    "image": "assets/tarot/wands-08.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-09",
    "number": 9,
    "nameEn": "Nine of Wands",
    "nameVi": "Chín Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 9,
    "meaningUpright": "Sức bền và lòng kiên cường ở chặng đường cuối, cảnh giác nhưng không bao giờ từ bỏ hy vọng.",
    "keywords": [
      "kiên trì",
      "sức bền",
      "cảnh giác",
      "vượt khó"
    ],
    "image": "assets/tarot/wands-09.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-10",
    "number": 10,
    "nameEn": "Ten of Wands",
    "nameVi": "Mười Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 10,
    "meaningUpright": "Gánh nặng trách nhiệm quá lớn gây áp lực, hãy học cách buông bớt và chia sẻ cùng người khác.",
    "keywords": [
      "gánh nặng",
      "trách nhiệm",
      "áp lực",
      "buông bớt"
    ],
    "image": "assets/tarot/wands-10.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-page",
    "number": 11,
    "nameEn": "Page of Wands",
    "nameVi": "Tiểu Đồng Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 11,
    "meaningUpright": "Lòng nhiệt huyết trẻ trung, đam mê khám phá điều mới và những tin tức khởi sắc cho dự định.",
    "keywords": [
      "nhiệt huyết",
      "khám phá",
      "ý tưởng",
      "tin vui"
    ],
    "image": "assets/tarot/wands-page.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-knight",
    "number": 12,
    "nameEn": "Knight of Wands",
    "nameVi": "Kỵ Sĩ Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 12,
    "meaningUpright": "Hành động quyết đoán, dám nghĩ dám làm, tinh thần phiêu lưu và nguồn năng lượng dồi dào.",
    "keywords": [
      "năng động",
      "quyết liệt",
      "phiêu lưu",
      "tự tin"
    ],
    "image": "assets/tarot/wands-knight.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-queen",
    "number": 13,
    "nameEn": "Queen of Wands",
    "nameVi": "Nữ Hoàng Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 13,
    "meaningUpright": "Sự tự tin, quyến rũ, ấm áp và khả năng truyền cảm hứng mạnh mẽ cho cộng đồng.",
    "keywords": [
      "tự tin",
      "quyến rũ",
      "độc lập",
      "ấm áp"
    ],
    "image": "assets/tarot/wands-queen.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "wands-king",
    "number": 14,
    "nameEn": "King of Wands",
    "nameVi": "Vua Gậy",
    "arcana": "minor",
    "suit": "wands",
    "rank": 14,
    "meaningUpright": "Tầm nhìn lãnh đạo xuất sắc, bản lĩnh vững vàng và khả năng hiện thực hóa những mục tiêu lớn.",
    "keywords": [
      "lãnh đạo",
      "bản lĩnh",
      "tầm nhìn",
      "uy quyền"
    ],
    "image": "assets/tarot/wands-king.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-ace",
    "number": 1,
    "nameEn": "Ace of Cups",
    "nameVi": "Át Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 1,
    "meaningUpright": "Tình cảm dạt dào, sự khởi sắc của trái tim, lòng trắc ẩn và những khởi đầu đong đầy cảm xúc.",
    "keywords": [
      "yêu thương",
      "cảm xúc",
      "trực giác",
      "khởi sắc"
    ],
    "image": "assets/tarot/cups-ace.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-02",
    "number": 2,
    "nameEn": "Two of Cups",
    "nameVi": "Hai Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 2,
    "meaningUpright": "Sự kết nối chân thành, thấu hiểu lẫn nhau và sự hòa hợp sâu sắc trong mối quan hệ đôi bên.",
    "keywords": [
      "kết nối",
      "hòa hợp",
      "thấu hiểu",
      "gắn kết"
    ],
    "image": "assets/tarot/cups-02.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-03",
    "number": 3,
    "nameEn": "Three of Cups",
    "nameVi": "Ba Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 3,
    "meaningUpright": "Tình bạn gắn bó, niềm vui chia sẻ cùng bạn bè, kỷ niệm và sự nâng đỡ lẫn nhau trong cuộc sống.",
    "keywords": [
      "tình bạn",
      "chia sẻ",
      "kỷ niệm",
      "niềm vui"
    ],
    "image": "assets/tarot/cups-03.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-04",
    "number": 4,
    "nameEn": "Four of Cups",
    "nameVi": "Bốn Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 4,
    "meaningUpright": "Cảm giác thờ ơ, chán chường tạm thời khiến bạn dễ bỏ lỡ những cơ hội tốt đẹp đang ở ngay trước mắt.",
    "keywords": [
      "thờ ơ",
      "trầm ngâm",
      "chán nản",
      "bỏ lỡ"
    ],
    "image": "assets/tarot/cups-04.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-05",
    "number": 5,
    "nameEn": "Five of Cups",
    "nameVi": "Năm Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 5,
    "meaningUpright": "Nỗi buồn về những mất mát đã qua, nhưng hãy nhìn lại hai chiếc cốc phía sau vẫn còn nguyên vẹn.",
    "keywords": [
      "tiếc nuối",
      "mất mát",
      "chữa lành",
      "hy vọng"
    ],
    "image": "assets/tarot/cups-05.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-06",
    "number": 6,
    "nameEn": "Six of Cups",
    "nameVi": "Sáu Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 6,
    "meaningUpright": "Những ký ức ngọt ngào xưa cũ, lòng tốt ngây thơ trong sáng và sự gặp lại của những mối duyên lành.",
    "keywords": [
      "hoài niệm",
      "ngây thơ",
      "tốt lành",
      "ấm áp"
    ],
    "image": "assets/tarot/cups-06.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-07",
    "number": 7,
    "nameEn": "Seven of Cups",
    "nameVi": "Bảy Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 7,
    "meaningUpright": "Nhiều lựa chọn và ảo mộng bày ra trước mắt, cần tỉnh táo nhìn nhận thực tế để chọn đúng hướng.",
    "keywords": [
      "ảo tưởng",
      "lựa chọn",
      "mơ mộng",
      "tỉnh táo"
    ],
    "image": "assets/tarot/cups-07.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-08",
    "number": 8,
    "nameEn": "Eight of Cups",
    "nameVi": "Tám Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 8,
    "meaningUpright": "Chủ động rời bỏ những điều không còn mang lại giá trị tinh thần để tìm kiếm ý nghĩa sâu sắc hơn.",
    "keywords": [
      "buông bỏ",
      "rời đi",
      "tìm kiếm",
      "trưởng thành"
    ],
    "image": "assets/tarot/cups-08.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-09",
    "number": 9,
    "nameEn": "Nine of Cups",
    "nameVi": "Chín Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 9,
    "meaningUpright": "Ước nguyện thành hiện thực, cảm giác thỏa mãn, bình yên và viên mãn trong thế giới nội tâm.",
    "keywords": [
      "mãn nguyện",
      "ước nguyện",
      "hài lòng",
      "viên mãn"
    ],
    "image": "assets/tarot/cups-09.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-10",
    "number": 10,
    "nameEn": "Ten of Cups",
    "nameVi": "Mười Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 10,
    "meaningUpright": "Hạnh phúc gia đình tròn đầy, sự gắn kết yêu thương bền vững và bình yên bên những người thân yêu.",
    "keywords": [
      "hạnh phúc",
      "gia đình",
      "trọn vẹn",
      "bình yên"
    ],
    "image": "assets/tarot/cups-10.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-page",
    "number": 11,
    "nameEn": "Page of Cups",
    "nameVi": "Tiểu Đồng Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 11,
    "meaningUpright": "Tâm hồn nghệ sĩ nhạy cảm, trực giác tinh tế và những thông điệp tình cảm ngọt ngào đang mở ra.",
    "keywords": [
      "trực giác",
      "nhạy cảm",
      "nghệ thuật",
      "tin nhắn"
    ],
    "image": "assets/tarot/cups-page.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-knight",
    "number": 12,
    "nameEn": "Knight of Cups",
    "nameVi": "Kỵ Sĩ Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 12,
    "meaningUpright": "Sự lãng mạn, theo đuổi tiếng gọi trái tim, lòng trung thực và những lời mời gọi đầy thiện chí.",
    "keywords": [
      "lãng mạn",
      "lý tưởng",
      "chân thành",
      "kết nối"
    ],
    "image": "assets/tarot/cups-knight.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-queen",
    "number": 13,
    "nameEn": "Queen of Cups",
    "nameVi": "Nữ Hoàng Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 13,
    "meaningUpright": "Lòng trắc ẩn sâu sắc, khả năng lắng nghe thấu cảm và trực giác nhạy bén dẫn lối tâm hồn.",
    "keywords": [
      "trắc ẩn",
      "thấu cảm",
      "trực giác",
      "dịu dàng"
    ],
    "image": "assets/tarot/cups-queen.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "cups-king",
    "number": 14,
    "nameEn": "King of Cups",
    "nameVi": "Vua Cốc",
    "arcana": "minor",
    "suit": "cups",
    "rank": 14,
    "meaningUpright": "Làm chủ cảm xúc tuyệt vời, sự điềm đạm, khoan dung và là chỗ dựa tinh thần đáng tin cậy.",
    "keywords": [
      "điềm tĩnh",
      "khoan dung",
      "làm chủ cảm xúc",
      "chỗ dựa"
    ],
    "image": "assets/tarot/cups-king.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-ace",
    "number": 1,
    "nameEn": "Ace of Swords",
    "nameVi": "Át Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 1,
    "meaningUpright": "Tư duy sáng suốt, sự thật được phơi bày rõ ràng và sự quyết đoán mở ra bước ngoặt đột phá.",
    "keywords": [
      "sáng suốt",
      "sự thật",
      "đột phá",
      "quyết đoán"
    ],
    "image": "assets/tarot/swords-ace.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-02",
    "number": 2,
    "nameEn": "Two of Swords",
    "nameVi": "Hai Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 2,
    "meaningUpright": "Sự bế tắc do tránh né sự thật hoặc lưỡng lự, cần tháo băng bịt mắt và dũng cảm đưa ra lựa chọn.",
    "keywords": [
      "lưỡng lự",
      "bế tắc",
      "lựa chọn",
      "cân nhắc"
    ],
    "image": "assets/tarot/swords-02.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-03",
    "number": 3,
    "nameEn": "Three of Swords",
    "nameVi": "Ba Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 3,
    "meaningUpright": "Nỗi đau từ sự thật mất lòng hoặc tổn thương tình cảm, cần thời gian để trái tim được chữa lành.",
    "keywords": [
      "tổn thương",
      "nỗi đau",
      "buồn bã",
      "chữa lành"
    ],
    "image": "assets/tarot/swords-03.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-04",
    "number": 4,
    "nameEn": "Four of Swords",
    "nameVi": "Bốn Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 4,
    "meaningUpright": "Khoảng thời gian nghỉ ngơi tĩnh tâm, phục hồi năng lượng và tái tạo tinh thần sau giông bão.",
    "keywords": [
      "nghỉ ngơi",
      "tĩnh tâm",
      "phục hồi",
      "bình lặng"
    ],
    "image": "assets/tarot/swords-04.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-05",
    "number": 5,
    "nameEn": "Five of Swords",
    "nameVi": "Năm Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 5,
    "meaningUpright": "Xung đột thắng thua của cái tôi, bài học về sự nhượng bộ và nhận thức rằng không phải chiến thắng nào cũng đáng giá.",
    "keywords": [
      "xung đột",
      "cái tôi",
      "thất bại",
      "bài học"
    ],
    "image": "assets/tarot/swords-05.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-06",
    "number": 6,
    "nameEn": "Six of Swords",
    "nameVi": "Sáu Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 6,
    "meaningUpright": "Vượt qua giai đoạn khó khăn để hướng tới bến đỗ bình yên hơn, vết thương đang dần hồi phục.",
    "keywords": [
      "chuyển đổi",
      "hồi phục",
      "bình yên",
      "vượt khó"
    ],
    "image": "assets/tarot/swords-06.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-07",
    "number": 7,
    "nameEn": "Seven of Swords",
    "nameVi": "Bảy Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 7,
    "meaningUpright": "Chiến thuật khéo léo, cẩn trọng trong từng bước đi và đề phòng sự thiếu trung thực từ xung quanh.",
    "keywords": [
      "chiến lược",
      "cẩn trọng",
      "kín đáo",
      "linh hoạt"
    ],
    "image": "assets/tarot/swords-07.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-08",
    "number": 8,
    "nameEn": "Eight of Swords",
    "nameVi": "Tám Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 8,
    "meaningUpright": "Cảm giác bị giam cầm trong những định kiến và nỗi sợ của chính mình, chìa khóa giải thoát nằm trong tay bạn.",
    "keywords": [
      "tự giới hạn",
      "bế tắc",
      "sợ hãi",
      "giải phóng"
    ],
    "image": "assets/tarot/swords-08.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-09",
    "number": 9,
    "nameEn": "Nine of Swords",
    "nameVi": "Chín Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 9,
    "meaningUpright": "Nỗi lo âu thái quá, mất ngủ và sự căng thẳng do tâm trí tự phóng đại khó khăn.",
    "keywords": [
      "lo âu",
      "căng thẳng",
      "suy nghĩ thái quá",
      "thức tỉnh"
    ],
    "image": "assets/tarot/swords-09.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-10",
    "number": 10,
    "nameEn": "Ten of Swords",
    "nameVi": "Mười Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 10,
    "meaningUpright": "Khép lại hoàn toàn một giai đoạn khó khăn nhất, nỗi đau đã chạm đáy và ánh bình minh mới sắp ló rạng.",
    "keywords": [
      "kết thúc",
      "chạm đáy",
      "khởi đầu mới",
      "buông bỏ"
    ],
    "image": "assets/tarot/swords-10.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-page",
    "number": 11,
    "nameEn": "Page of Swords",
    "nameVi": "Tiểu Đồng Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 11,
    "meaningUpright": "Tư duy sắc sảo, ham học hỏi khám phá chân lý, quan sát nhạy bén nhưng cần tránh phán xét vội vàng.",
    "keywords": [
      "học hỏi",
      "quan sát",
      "sắc bén",
      "tò mò"
    ],
    "image": "assets/tarot/swords-page.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-knight",
    "number": 12,
    "nameEn": "Knight of Swords",
    "nameVi": "Kỵ Sĩ Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 12,
    "meaningUpright": "Tốc độ quyết đoán, lao về phía trước với mục tiêu rõ ràng và tinh thần bảo vệ sự thật không khoan nhượng.",
    "keywords": [
      "quyết liệt",
      "thẳng thắn",
      "tốc độ",
      "dũng cảm"
    ],
    "image": "assets/tarot/swords-knight.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-queen",
    "number": 13,
    "nameEn": "Queen of Swords",
    "nameVi": "Nữ Hoàng Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 13,
    "meaningUpright": "Lý trí công bằng, tư duy độc lập sắc sảo, đánh giá mọi việc khách quan và trung thực.",
    "keywords": [
      "độc lập",
      "khách quan",
      "minh bạch",
      "sắc sảo"
    ],
    "image": "assets/tarot/swords-queen.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "swords-king",
    "number": 14,
    "nameEn": "King of Swords",
    "nameVi": "Vua Kiếm",
    "arcana": "minor",
    "suit": "swords",
    "rank": 14,
    "meaningUpright": "Trí tuệ tối cao, kỷ luật thép, chuẩn mực đạo đức công lý và khả năng phán đoán chính xác tuyệt đối.",
    "keywords": [
      "trí tuệ",
      "công lý",
      "kỷ luật",
      "quyền uy"
    ],
    "image": "assets/tarot/swords-king.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-ace",
    "number": 1,
    "nameEn": "Ace of Pentacles",
    "nameVi": "Át Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 1,
    "meaningUpright": "Hạt mầm thịnh vượng, cơ hội tài chính và nền tảng vật chất mới vững chắc đang mở ra.",
    "keywords": [
      "thịnh vượng",
      "cơ hội",
      "nền tảng",
      "tài lộc"
    ],
    "image": "assets/tarot/pentacles-ace.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-02",
    "number": 2,
    "nameEn": "Two of Pentacles",
    "nameVi": "Hai Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 2,
    "meaningUpright": "Khéo léo thích ứng và cân bằng linh hoạt giữa các ưu tiên tài chính, công việc và cuộc sống.",
    "keywords": [
      "cân bằng",
      "linh hoạt",
      "thích ứng",
      "ưu tiên"
    ],
    "image": "assets/tarot/pentacles-02.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-03",
    "number": 3,
    "nameEn": "Three of Pentacles",
    "nameVi": "Ba Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 3,
    "meaningUpright": "Sự hợp tác chuyên môn ăn ý, nâng cao tay nghề và được ghi nhận qua những công trình chất lượng.",
    "keywords": [
      "hợp tác",
      "chuyên môn",
      "kỹ năng",
      "xây dựng"
    ],
    "image": "assets/tarot/pentacles-03.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-04",
    "number": 4,
    "nameEn": "Four of Pentacles",
    "nameVi": "Bốn Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 4,
    "meaningUpright": "Sự bảo toàn tài chính an toàn, nhưng cần tránh giữ khư khư quá mức dẫn đến bế tắc năng lượng.",
    "keywords": [
      "bảo vệ",
      "tích lũy",
      "an toàn",
      "kiểm soát"
    ],
    "image": "assets/tarot/pentacles-04.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-05",
    "number": 5,
    "nameEn": "Five of Pentacles",
    "nameVi": "Năm Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 5,
    "meaningUpright": "Khó khăn tài chính hay cảm giác cô đơn tạm thời, hãy ngước nhìn ánh sáng nhà thờ để tìm kiếm sự giúp đỡ.",
    "keywords": [
      "khó khăn",
      "cô độc",
      "trợ giúp",
      "kiên trì"
    ],
    "image": "assets/tarot/pentacles-05.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-06",
    "number": 6,
    "nameEn": "Six of Pentacles",
    "nameVi": "Sáu Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 6,
    "meaningUpright": "Sự hào phóng, cho và nhận trong sự cân bằng công bằng, tương trợ lẫn nhau cùng phát triển.",
    "keywords": [
      "hào phóng",
      "cho nhận",
      "cân bằng",
      "tương trợ"
    ],
    "image": "assets/tarot/pentacles-06.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-07",
    "number": 7,
    "nameEn": "Seven of Pentacles",
    "nameVi": "Bảy Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 7,
    "meaningUpright": "Kiên nhẫn chờ đợi hạt mầm đơm hoa kết trái, đánh giá lại hiệu quả đầu tư và định hướng phát triển.",
    "keywords": [
      "kiên nhẫn",
      "đánh giá",
      "thu hoạch",
      "tích lũy"
    ],
    "image": "assets/tarot/pentacles-07.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-08",
    "number": 8,
    "nameEn": "Eight of Pentacles",
    "nameVi": "Tám Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 8,
    "meaningUpright": "Chăm chỉ, tỉ mỉ rèn luyện tay nghề và cống hiến hết mình cho chất lượng công việc.",
    "keywords": [
      "chăm chỉ",
      "tỉ mỉ",
      "rèn luyện",
      "chuyên cần"
    ],
    "image": "assets/tarot/pentacles-08.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-09",
    "number": 9,
    "nameEn": "Nine of Pentacles",
    "nameVi": "Chín Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 9,
    "meaningUpright": "Độc lập tài chính, tận hưởng thành quả xứng đáng sau quá trình nỗ lực, cuộc sống tao nhã đủ đầy.",
    "keywords": [
      "độc lập",
      "sung túc",
      "tự chủ",
      "thành quả"
    ],
    "image": "assets/tarot/pentacles-09.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-10",
    "number": 10,
    "nameEn": "Ten of Pentacles",
    "nameVi": "Mười Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 10,
    "meaningUpright": "Thịnh vượng bền vững lâu dài, di sản gia đình vững chãi và an toàn tài chính qua nhiều thế hệ.",
    "keywords": [
      "thịnh vượng",
      "gia tộc",
      "di sản",
      "bền vững"
    ],
    "image": "assets/tarot/pentacles-10.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-page",
    "number": 11,
    "nameEn": "Page of Pentacles",
    "nameVi": "Tiểu Đồng Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 11,
    "meaningUpright": "Ý chí học hỏi thực tế, sự chăm chỉ cầu tiến và những tin tức khả quan về công việc, học hành.",
    "keywords": [
      "cầu tiến",
      "học hỏi",
      "thực tế",
      "cơ hội"
    ],
    "image": "assets/tarot/pentacles-page.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-knight",
    "number": 12,
    "nameEn": "Knight of Pentacles",
    "nameVi": "Kỵ Sĩ Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 12,
    "meaningUpright": "Sự kiên nhẫn, đáng tin cậy, làm việc có phương pháp kỷ luật và theo đuổi mục tiêu đến cùng.",
    "keywords": [
      "đáng tin cậy",
      "kỷ luật",
      "kiên định",
      "trách nhiệm"
    ],
    "image": "assets/tarot/pentacles-knight.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-queen",
    "number": 13,
    "nameEn": "Queen of Pentacles",
    "nameVi": "Nữ Hoàng Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 13,
    "meaningUpright": "Sự tháo vát, chu đáo nuôi dưỡng tổ ấm, quản lý tài chính thiết thực và mang lại bình an ấm cúng.",
    "keywords": [
      "chu đáo",
      "thực tế",
      "tháo vát",
      "ấm no"
    ],
    "image": "assets/tarot/pentacles-queen.jpg",
    "backImage": "assets/tarot/card-back.png"
  },
  {
    "id": "pentacles-king",
    "number": 14,
    "nameEn": "King of Pentacles",
    "nameVi": "Vua Xu",
    "arcana": "minor",
    "suit": "pentacles",
    "rank": 14,
    "meaningUpright": "Đỉnh cao của sự thành đạt vật chất, uy tín kinh doanh vững chắc, hào phóng và bản lĩnh làm chủ.",
    "keywords": [
      "thành đạt",
      "uy tín",
      "thịnh vượng",
      "bản lĩnh"
    ],
    "image": "assets/tarot/pentacles-king.jpg",
    "backImage": "assets/tarot/card-back.png"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TAROT_DECK };
} else if (typeof window !== "undefined") {
  window.TAROT_DECK = TAROT_DECK;
}
