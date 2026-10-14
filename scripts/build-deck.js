const fs = require('fs');
const path = require('path');

const deck = [
  // Major Arcana (22)
  { id: 'major-00-fool', number: 0, nameEn: 'The Fool', nameVi: 'Kẻ Khờ', arcana: 'major', suit: null, rank: 0,
    meaningUpright: 'Một khởi đầu mới đầy tự do, tin tưởng vào hành trình và sẵn sàng dấn thân vào những điều chưa biết.',
    keywords: ['khởi đầu', 'tự do', 'ngây thơ', 'dấn thân'] },
  { id: 'major-01-magician', number: 1, nameEn: 'The Magician', nameVi: 'Nhà Ảo Thuật', arcana: 'major', suit: null, rank: 1,
    meaningUpright: 'Khả năng làm chủ nguồn lực, hiện thực hóa ý tưởng bằng kỹ năng, ý chí và sự tập trung cao độ.',
    keywords: ['kỹ năng', 'sáng tạo', 'ý chí', 'hành động'] },
  { id: 'major-02-high-priestess', number: 2, nameEn: 'The High Priestess', nameVi: 'Nữ Tư Tế', arcana: 'major', suit: null, rank: 2,
    meaningUpright: 'Lắng nghe trực giác bên trong, sự tĩnh lặng, những bí mật và tri thức sâu sắc chưa lộ diện.',
    keywords: ['trực giác', 'bí ẩn', 'tiềm thức', 'tĩnh lặng'] },
  { id: 'major-03-empress', number: 3, nameEn: 'The Empress', nameVi: 'Hoàng Hậu', arcana: 'major', suit: null, rank: 3,
    meaningUpright: 'Sự sinh sôi nảy nở, trù phú, nuôi dưỡng và vẻ đẹp dịu dàng của tình mẫu tử và thiên nhiên.',
    keywords: ['trù phú', 'nuôi dưỡng', 'sáng tạo', 'yêu thương'] },
  { id: 'major-04-emperor', number: 4, nameEn: 'The Emperor', nameVi: 'Hoàng Đế', arcana: 'major', suit: null, rank: 4,
    meaningUpright: 'Cấu trúc, kỷ luật, uy quyền và sự ổn định vững chắc xây dựng trên nền tảng vững vàng.',
    keywords: ['quyền lực', 'trật tự', 'kỷ luật', 'vững chãi'] },
  { id: 'major-05-hierophant', number: 5, nameEn: 'The Hierophant', nameVi: 'Giáo Hoàng', arcana: 'major', suit: null, rank: 5,
    meaningUpright: 'Truyền thống, niềm tin tâm linh, học hỏi từ người thầy và những giá trị chuẩn mực đạo đức.',
    keywords: ['truyền thống', 'học hỏi', 'đạo đức', 'hướng dẫn'] },
  { id: 'major-06-lovers', number: 6, nameEn: 'The Lovers', nameVi: 'Những Người Yêu', arcana: 'major', suit: null, rank: 6,
    meaningUpright: 'Sự hòa hợp, tình yêu gắn kết và những lựa chọn quan trọng dựa trên tiếng gọi của trái tim.',
    keywords: ['tình yêu', 'gắn kết', 'lựa chọn', 'hòa hợp'] },
  { id: 'major-07-chariot', number: 7, nameEn: 'The Chariot', nameVi: 'Cỗ Xe', arcana: 'major', suit: null, rank: 7,
    meaningUpright: 'Ý chí kiên định, vượt qua mọi nghịch cảnh và hướng thẳng đến mục tiêu với lòng quyết tâm.',
    keywords: ['ý chí', 'chiến thắng', 'quyết tâm', 'kiểm soát'] },
  { id: 'major-08-strength', number: 8, nameEn: 'Strength', nameVi: 'Sức Mạnh', arcana: 'major', suit: null, rank: 8,
    meaningUpright: 'Sức mạnh nội tâm, lòng can đảm bền bỉ, sự kiên nhẫn và lòng trắc ẩn chế ngự bản năng.',
    keywords: ['can đảm', 'nhẫn nại', 'sức mạnh nội tại', 'trắc ẩn'] },
  { id: 'major-09-hermit', number: 9, nameEn: 'The Hermit', nameVi: 'Ẩn Sĩ', arcana: 'major', suit: null, rank: 9,
    meaningUpright: 'Khoảng lặng để tự vấn lương tâm, tìm kiếm ánh sáng chân lý từ bên trong qua sự chiêm nghiệm.',
    keywords: ['suy ngẫm', 'cô độc', 'soi sáng', 'nội tâm'] },
  { id: 'major-10-wheel-of-fortune', number: 10, nameEn: 'Wheel of Fortune', nameVi: 'Bánh Xe Số Phận', arcana: 'major', suit: null, rank: 10,
    meaningUpright: 'Chu kỳ chuyển vần của số phận, những bước ngoặt bất ngờ và cơ hội mới đang mở ra.',
    keywords: ['vận may', 'chu kỳ', 'thay đổi', 'cơ duyên'] },
  { id: 'major-11-justice', number: 11, nameEn: 'Justice', nameVi: 'Công Lý', arcana: 'major', suit: null, rank: 11,
    meaningUpright: 'Sự thật, công bằng, nhân quả và quyết định sáng suốt dựa trên lý trí và sự trung thực.',
    keywords: ['công bằng', 'sự thật', 'trách nhiệm', 'nhân quả'] },
  { id: 'major-12-hanged-man', number: 12, nameEn: 'The Hanged Man', nameVi: 'Người Treo Ngược', arcana: 'major', suit: null, rank: 12,
    meaningUpright: 'Buông bỏ sự kiểm soát, nhìn nhận vấn đề từ góc độ mới và chấp nhận khoảng lặng cần thiết.',
    keywords: ['buông bỏ', 'góc nhìn mới', 'chờ đợi', 'hy sinh'] },
  { id: 'major-13-death', number: 13, nameEn: 'Death', nameVi: 'Chuyển Hóa (Death)', arcana: 'major', suit: null, rank: 13,
    meaningUpright: 'Sự kết thúc của giai đoạn cũ để mở đường cho sự tái sinh, lột xác và khởi đầu mới mẻ.',
    keywords: ['kết thúc', 'chuyển hóa', 'tái sinh', 'buông xả'] },
  { id: 'major-14-temperance', number: 14, nameEn: 'Temperance', nameVi: 'Tiết Chế', arcana: 'major', suit: null, rank: 14,
    meaningUpright: 'Sự cân bằng, điều độ, hòa hợp giữa các yếu tố đối lập và sự kiên nhẫn tích cực.',
    keywords: ['cân bằng', 'điều độ', 'hòa hợp', 'kiên nhẫn'] },
  { id: 'major-15-devil', number: 15, nameEn: 'The Devil', nameVi: 'Ác Quỷ', arcana: 'major', suit: null, rank: 15,
    meaningUpright: 'Nhận diện những ràng buộc vật chất, sự ám ảnh, thói quen tiêu cực và ảo tưởng giam cầm bản thân.',
    keywords: ['ràng buộc', 'cám dỗ', 'ảo tưởng', 'thức tỉnh'] },
  { id: 'major-16-tower', number: 16, nameEn: 'The Tower', nameVi: 'Tòa Tháp', arcana: 'major', suit: null, rank: 16,
    meaningUpright: 'Sự sụp đổ bất ngờ của những nền tảng sai lầm, dọn sạch để xây dựng lại chân thực và vững bền hơn.',
    keywords: ['sụp đổ', 'đột phá', 'thức tỉnh', 'giải phóng'] },
  { id: 'major-17-star', number: 17, nameEn: 'The Star', nameVi: 'Ngôi Sao', arcana: 'major', suit: null, rank: 17,
    meaningUpright: 'Hy vọng, niềm tin tươi sáng, sự chữa lành tâm hồn và nguồn cảm hứng thanh khiết.',
    keywords: ['hy vọng', 'chữa lành', 'niềm tin', 'bình an'] },
  { id: 'major-18-moon', number: 18, nameEn: 'The Moon', nameVi: 'Mặt Trăng', arcana: 'major', suit: null, rank: 18,
    meaningUpright: 'Những nỗi sợ tiềm ẩn, sự bất an và những điều mơ hồ cần trực giác soi tỏ.',
    keywords: ['bất an', 'ảo tưởng', 'tiềm thức', 'mơ hồ'] },
  { id: 'major-19-sun', number: 19, nameEn: 'The Sun', nameVi: 'Mặt Trời', arcana: 'major', suit: null, rank: 19,
    meaningUpright: 'Niềm vui trọn vẹn, sự thành công rực rỡ, năng lượng tích cực và sự ấm áp lan tỏa.',
    keywords: ['thành công', 'rực rỡ', 'hạnh phúc', 'năng lượng'] },
  { id: 'major-20-judgement', number: 20, nameEn: 'Judgement', nameVi: 'Phán Quyết', arcana: 'major', suit: null, rank: 20,
    meaningUpright: 'Tiếng gọi thức tỉnh, sự tái sinh tâm linh, tha thứ và bước sang một cấp độ phát triển mới.',
    keywords: ['thức tỉnh', 'phán quyết', 'tái sinh', 'tha thứ'] },
  { id: 'major-21-world', number: 21, nameEn: 'The World', nameVi: 'Thế Giới', arcana: 'major', suit: null, rank: 21,
    meaningUpright: 'Sự hoàn tất trọn vẹn một hành trình lớn, sự thành tựu, thăng hoa và hòa nhập viên mãn.',
    keywords: ['trọn vẹn', 'thành tựu', 'hoàn thành', 'tự do'] }
];

// Wands (14)
const wandsData = [
  { sub: 'ace', num: 1, en: 'Ace of Wands', vi: 'Át Gậy', meaning: 'Ý tưởng mới xuất hiện, tia lửa nhiệt huyết và cảm hứng sáng tạo mạnh mẽ mở ra hướng đi đầy tiềm năng.', kw: ['khởi đầu', 'động lực', 'sáng tạo', 'nhiệt huyết'] },
  { sub: '02', num: 2, en: 'Two of Wands', vi: 'Hai Gậy', meaning: 'Lập kế hoạch dài hạn, mở rộng tầm nhìn và chuẩn bị tinh thần bước ra khỏi vùng an toàn.', kw: ['kế hoạch', 'tầm nhìn', 'quyết định', 'tiến bước'] },
  { sub: '03', num: 3, en: 'Three of Wands', vi: 'Ba Gậy', meaning: 'Những thành quả bước đầu đang tới, cơ hội mở rộng và sự tự tin nhìn về tương lai.', kw: ['mở rộng', 'triển vọng', 'thành quả', 'khám phá'] },
  { sub: '04', num: 4, en: 'Four of Wands', vi: 'Bốn Gậy', meaning: 'Niềm vui sum họp, sự ổn định trong tổ ấm, chúc mừng một cột mốc thành công đáng nhớ.', kw: ['kỷ niệm', 'hòa hợp', 'ổn định', 'hạnh phúc'] },
  { sub: '05', num: 5, en: 'Five of Wands', vi: 'Năm Gậy', meaning: 'Cạnh tranh, xung đột quan điểm hoặc những bất đồng nhỏ là cơ hội để tôi luyện bản lĩnh.', kw: ['cạnh tranh', 'thử thách', 'mâu thuẫn', 'rèn luyện'] },
  { sub: '06', num: 6, en: 'Six of Wands', vi: 'Sáu Gậy', meaning: 'Chiến thắng xứng đáng, được mọi người công nhận và tôn vinh sau những nỗ lực bền bỉ.', kw: ['chiến thắng', 'công nhận', 'tự hào', 'thành công'] },
  { sub: '07', num: 7, en: 'Seven of Wands', vi: 'Bảy Gậy', meaning: 'Kiên định bảo vệ lập trường của mình trước áp lực và thử thách từ môi trường xung quanh.', kw: ['kiên định', 'bảo vệ', 'bản lĩnh', 'vững vàng'] },
  { sub: '08', num: 8, en: 'Eight of Wands', vi: 'Tám Gậy', meaning: 'Tốc độ chuyển biến nhanh chóng, thông điệp quan trọng đang đến và các kế hoạch tiến triển thuận lợi.', kw: ['tốc độ', 'chuyển động', 'thông điệp', 'tiến triển'] },
  { sub: '09', num: 9, en: 'Nine of Wands', vi: 'Chín Gậy', meaning: 'Sức bền và lòng kiên cường ở chặng đường cuối, cảnh giác nhưng không bao giờ từ bỏ hy vọng.', kw: ['kiên trì', 'sức bền', 'cảnh giác', 'vượt khó'] },
  { sub: '10', num: 10, en: 'Ten of Wands', vi: 'Mười Gậy', meaning: 'Gánh nặng trách nhiệm quá lớn gây áp lực, hãy học cách buông bớt và chia sẻ cùng người khác.', kw: ['gánh nặng', 'trách nhiệm', 'áp lực', 'buông bớt'] },
  { sub: 'page', num: 11, en: 'Page of Wands', vi: 'Tiểu Đồng Gậy', meaning: 'Lòng nhiệt huyết trẻ trung, đam mê khám phá điều mới và những tin tức khởi sắc cho dự định.', kw: ['nhiệt huyết', 'khám phá', 'ý tưởng', 'tin vui'] },
  { sub: 'knight', num: 12, en: 'Knight of Wands', vi: 'Kỵ Sĩ Gậy', meaning: 'Hành động quyết đoán, dám nghĩ dám làm, tinh thần phiêu lưu và nguồn năng lượng dồi dào.', kw: ['năng động', 'quyết liệt', 'phiêu lưu', 'tự tin'] },
  { sub: 'queen', num: 13, en: 'Queen of Wands', vi: 'Nữ Hoàng Gậy', meaning: 'Sự tự tin, quyến rũ, ấm áp và khả năng truyền cảm hứng mạnh mẽ cho cộng đồng.', kw: ['tự tin', 'quyến rũ', 'độc lập', 'ấm áp'] },
  { sub: 'king', num: 14, en: 'King of Wands', vi: 'Vua Gậy', meaning: 'Tầm nhìn lãnh đạo xuất sắc, bản lĩnh vững vàng và khả năng hiện thực hóa những mục tiêu lớn.', kw: ['lãnh đạo', 'bản lĩnh', 'tầm nhìn', 'uy quyền'] }
];

wandsData.forEach(w => {
  deck.push({
    id: 'wands-' + w.sub, number: w.num, nameEn: w.en, nameVi: w.vi, arcana: 'minor', suit: 'wands', rank: w.num,
    meaningUpright: w.meaning, keywords: w.kw
  });
});

// Cups (14)
const cupsData = [
  { sub: 'ace', num: 1, en: 'Ace of Cups', vi: 'Át Cốc', meaning: 'Tình cảm dạt dào, sự khởi sắc của trái tim, lòng trắc ẩn và những khởi đầu đong đầy cảm xúc.', kw: ['yêu thương', 'cảm xúc', 'trực giác', 'khởi sắc'] },
  { sub: '02', num: 2, en: 'Two of Cups', vi: 'Hai Cốc', meaning: 'Sự kết nối chân thành, thấu hiểu lẫn nhau và sự hòa hợp sâu sắc trong mối quan hệ đôi bên.', kw: ['kết nối', 'hòa hợp', 'thấu hiểu', 'gắn kết'] },
  { sub: '03', num: 3, en: 'Three of Cups', vi: 'Ba Cốc', meaning: 'Tình bạn gắn bó, niềm vui chia sẻ cùng bạn bè, kỷ niệm và sự nâng đỡ lẫn nhau trong cuộc sống.', kw: ['tình bạn', 'chia sẻ', 'kỷ niệm', 'niềm vui'] },
  { sub: '04', num: 4, en: 'Four of Cups', vi: 'Bốn Cốc', meaning: 'Cảm giác thờ ơ, chán chường tạm thời khiến bạn dễ bỏ lỡ những cơ hội tốt đẹp đang ở ngay trước mắt.', kw: ['thờ ơ', 'trầm ngâm', 'chán nản', 'bỏ lỡ'] },
  { sub: '05', num: 5, en: 'Five of Cups', vi: 'Năm Cốc', meaning: 'Nỗi buồn về những mất mát đã qua, nhưng hãy nhìn lại hai chiếc cốc phía sau vẫn còn nguyên vẹn.', kw: ['tiếc nuối', 'mất mát', 'chữa lành', 'hy vọng'] },
  { sub: '06', num: 6, en: 'Six of Cups', vi: 'Sáu Cốc', meaning: 'Những ký ức ngọt ngào xưa cũ, lòng tốt ngây thơ trong sáng và sự gặp lại của những mối duyên lành.', kw: ['hoài niệm', 'ngây thơ', 'tốt lành', 'ấm áp'] },
  { sub: '07', num: 7, en: 'Seven of Cups', vi: 'Bảy Cốc', meaning: 'Nhiều lựa chọn và ảo mộng bày ra trước mắt, cần tỉnh táo nhìn nhận thực tế để chọn đúng hướng.', kw: ['ảo tưởng', 'lựa chọn', 'mơ mộng', 'tỉnh táo'] },
  { sub: '08', num: 8, en: 'Eight of Cups', vi: 'Tám Cốc', meaning: 'Chủ động rời bỏ những điều không còn mang lại giá trị tinh thần để tìm kiếm ý nghĩa sâu sắc hơn.', kw: ['buông bỏ', 'rời đi', 'tìm kiếm', 'trưởng thành'] },
  { sub: '09', num: 9, en: 'Nine of Cups', vi: 'Chín Cốc', meaning: 'Ước nguyện thành hiện thực, cảm giác thỏa mãn, bình yên và viên mãn trong thế giới nội tâm.', kw: ['mãn nguyện', 'ước nguyện', 'hài lòng', 'viên mãn'] },
  { sub: '10', num: 10, en: 'Ten of Cups', vi: 'Mười Cốc', meaning: 'Hạnh phúc gia đình tròn đầy, sự gắn kết yêu thương bền vững và bình yên bên những người thân yêu.', kw: ['hạnh phúc', 'gia đình', 'trọn vẹn', 'bình yên'] },
  { sub: 'page', num: 11, en: 'Page of Cups', vi: 'Tiểu Đồng Cốc', meaning: 'Tâm hồn nghệ sĩ nhạy cảm, trực giác tinh tế và những thông điệp tình cảm ngọt ngào đang mở ra.', kw: ['trực giác', 'nhạy cảm', 'nghệ thuật', 'tin nhắn'] },
  { sub: 'knight', num: 12, en: 'Knight of Cups', vi: 'Kỵ Sĩ Cốc', meaning: 'Sự lãng mạn, theo đuổi tiếng gọi trái tim, lòng trung thực và những lời mời gọi đầy thiện chí.', kw: ['lãng mạn', 'lý tưởng', 'chân thành', 'kết nối'] },
  { sub: 'queen', num: 13, en: 'Queen of Cups', vi: 'Nữ Hoàng Cốc', meaning: 'Lòng trắc ẩn sâu sắc, khả năng lắng nghe thấu cảm và trực giác nhạy bén dẫn lối tâm hồn.', kw: ['trắc ẩn', 'thấu cảm', 'trực giác', 'dịu dàng'] },
  { sub: 'king', num: 14, en: 'King of Cups', vi: 'Vua Cốc', meaning: 'Làm chủ cảm xúc tuyệt vời, sự điềm đạm, khoan dung và là chỗ dựa tinh thần đáng tin cậy.', kw: ['điềm tĩnh', 'khoan dung', 'làm chủ cảm xúc', 'chỗ dựa'] }
];

cupsData.forEach(c => {
  deck.push({
    id: 'cups-' + c.sub, number: c.num, nameEn: c.en, nameVi: c.vi, arcana: 'minor', suit: 'cups', rank: c.num,
    meaningUpright: c.meaning, keywords: c.kw
  });
});

// Swords (14)
const swordsData = [
  { sub: 'ace', num: 1, en: 'Ace of Swords', vi: 'Át Kiếm', meaning: 'Tư duy sáng suốt, sự thật được phơi bày rõ ràng và sự quyết đoán mở ra bước ngoặt đột phá.', kw: ['sáng suốt', 'sự thật', 'đột phá', 'quyết đoán'] },
  { sub: '02', num: 2, en: 'Two of Swords', vi: 'Hai Kiếm', meaning: 'Sự bế tắc do tránh né sự thật hoặc lưỡng lự, cần tháo băng bịt mắt và dũng cảm đưa ra lựa chọn.', kw: ['lưỡng lự', 'bế tắc', 'lựa chọn', 'cân nhắc'] },
  { sub: '03', num: 3, en: 'Three of Swords', vi: 'Ba Kiếm', meaning: 'Nỗi đau từ sự thật mất lòng hoặc tổn thương tình cảm, cần thời gian để trái tim được chữa lành.', kw: ['tổn thương', 'nỗi đau', 'buồn bã', 'chữa lành'] },
  { sub: '04', num: 4, en: 'Four of Swords', vi: 'Bốn Kiếm', meaning: 'Khoảng thời gian nghỉ ngơi tĩnh tâm, phục hồi năng lượng và tái tạo tinh thần sau giông bão.', kw: ['nghỉ ngơi', 'tĩnh tâm', 'phục hồi', 'bình lặng'] },
  { sub: '05', num: 5, en: 'Five of Swords', vi: 'Năm Kiếm', meaning: 'Xung đột thắng thua của cái tôi, bài học về sự nhượng bộ và nhận thức rằng không phải chiến thắng nào cũng đáng giá.', kw: ['xung đột', 'cái tôi', 'thất bại', 'bài học'] },
  { sub: '06', num: 6, en: 'Six of Swords', vi: 'Sáu Kiếm', meaning: 'Vượt qua giai đoạn khó khăn để hướng tới bến đỗ bình yên hơn, vết thương đang dần hồi phục.', kw: ['chuyển đổi', 'hồi phục', 'bình yên', 'vượt khó'] },
  { sub: '07', num: 7, en: 'Seven of Swords', vi: 'Bảy Kiếm', meaning: 'Chiến thuật khéo léo, cẩn trọng trong từng bước đi và đề phòng sự thiếu trung thực từ xung quanh.', kw: ['chiến lược', 'cẩn trọng', 'kín đáo', 'linh hoạt'] },
  { sub: '08', num: 8, en: 'Eight of Swords', vi: 'Tám Kiếm', meaning: 'Cảm giác bị giam cầm trong những định kiến và nỗi sợ của chính mình, chìa khóa giải thoát nằm trong tay bạn.', kw: ['tự giới hạn', 'bế tắc', 'sợ hãi', 'giải phóng'] },
  { sub: '09', num: 9, en: 'Nine of Swords', vi: 'Chín Kiếm', meaning: 'Nỗi lo âu thái quá, mất ngủ và sự căng thẳng do tâm trí tự phóng đại khó khăn.', kw: ['lo âu', 'căng thẳng', 'suy nghĩ thái quá', 'thức tỉnh'] },
  { sub: '10', num: 10, en: 'Ten of Swords', vi: 'Mười Kiếm', meaning: 'Khép lại hoàn toàn một giai đoạn khó khăn nhất, nỗi đau đã chạm đáy và ánh bình minh mới sắp ló rạng.', kw: ['kết thúc', 'chạm đáy', 'khởi đầu mới', 'buông bỏ'] },
  { sub: 'page', num: 11, en: 'Page of Swords', vi: 'Tiểu Đồng Kiếm', meaning: 'Tư duy sắc sảo, ham học hỏi khám phá chân lý, quan sát nhạy bén nhưng cần tránh phán xét vội vàng.', kw: ['học hỏi', 'quan sát', 'sắc bén', 'tò mò'] },
  { sub: 'knight', num: 12, en: 'Knight of Swords', vi: 'Kỵ Sĩ Kiếm', meaning: 'Tốc độ quyết đoán, lao về phía trước với mục tiêu rõ ràng và tinh thần bảo vệ sự thật không khoan nhượng.', kw: ['quyết liệt', 'thẳng thắn', 'tốc độ', 'dũng cảm'] },
  { sub: 'queen', num: 13, en: 'Queen of Swords', vi: 'Nữ Hoàng Kiếm', meaning: 'Lý trí công bằng, tư duy độc lập sắc sảo, đánh giá mọi việc khách quan và trung thực.', kw: ['độc lập', 'khách quan', 'minh bạch', 'sắc sảo'] },
  { sub: 'king', num: 14, en: 'King of Swords', vi: 'Vua Kiếm', meaning: 'Trí tuệ tối cao, kỷ luật thép, chuẩn mực đạo đức công lý và khả năng phán đoán chính xác tuyệt đối.', kw: ['trí tuệ', 'công lý', 'kỷ luật', 'quyền uy'] }
];

swordsData.forEach(s => {
  deck.push({
    id: 'swords-' + s.sub, number: s.num, nameEn: s.en, nameVi: s.vi, arcana: 'minor', suit: 'swords', rank: s.num,
    meaningUpright: s.meaning, keywords: s.kw
  });
});

// Pentacles (14)
const pentsData = [
  { sub: 'ace', num: 1, en: 'Ace of Pentacles', vi: 'Át Xu', meaning: 'Hạt mầm thịnh vượng, cơ hội tài chính và nền tảng vật chất mới vững chắc đang mở ra.', kw: ['thịnh vượng', 'cơ hội', 'nền tảng', 'tài lộc'] },
  { sub: '02', num: 2, en: 'Two of Pentacles', vi: 'Hai Xu', meaning: 'Khéo léo thích ứng và cân bằng linh hoạt giữa các ưu tiên tài chính, công việc và cuộc sống.', kw: ['cân bằng', 'linh hoạt', 'thích ứng', 'ưu tiên'] },
  { sub: '03', num: 3, en: 'Three of Pentacles', vi: 'Ba Xu', meaning: 'Sự hợp tác chuyên môn ăn ý, nâng cao tay nghề và được ghi nhận qua những công trình chất lượng.', kw: ['hợp tác', 'chuyên môn', 'kỹ năng', 'xây dựng'] },
  { sub: '04', num: 4, en: 'Four of Pentacles', vi: 'Bốn Xu', meaning: 'Sự bảo toàn tài chính an toàn, nhưng cần tránh giữ khư khư quá mức dẫn đến bế tắc năng lượng.', kw: ['bảo vệ', 'tích lũy', 'an toàn', 'kiểm soát'] },
  { sub: '05', num: 5, en: 'Five of Pentacles', vi: 'Năm Xu', meaning: 'Khó khăn tài chính hay cảm giác cô đơn tạm thời, hãy ngước nhìn ánh sáng nhà thờ để tìm kiếm sự giúp đỡ.', kw: ['khó khăn', 'cô độc', 'trợ giúp', 'kiên trì'] },
  { sub: '06', num: 6, en: 'Six of Pentacles', vi: 'Sáu Xu', meaning: 'Sự hào phóng, cho và nhận trong sự cân bằng công bằng, tương trợ lẫn nhau cùng phát triển.', kw: ['hào phóng', 'cho nhận', 'cân bằng', 'tương trợ'] },
  { sub: '07', num: 7, en: 'Seven of Pentacles', vi: 'Bảy Xu', meaning: 'Kiên nhẫn chờ đợi hạt mầm đơm hoa kết trái, đánh giá lại hiệu quả đầu tư và định hướng phát triển.', kw: ['kiên nhẫn', 'đánh giá', 'thu hoạch', 'tích lũy'] },
  { sub: '08', num: 8, en: 'Eight of Pentacles', vi: 'Tám Xu', meaning: 'Chăm chỉ, tỉ mỉ rèn luyện tay nghề và cống hiến hết mình cho chất lượng công việc.', kw: ['chăm chỉ', 'tỉ mỉ', 'rèn luyện', 'chuyên cần'] },
  { sub: '09', num: 9, en: 'Nine of Pentacles', vi: 'Chín Xu', meaning: 'Độc lập tài chính, tận hưởng thành quả xứng đáng sau quá trình nỗ lực, cuộc sống tao nhã đủ đầy.', kw: ['độc lập', 'sung túc', 'tự chủ', 'thành quả'] },
  { sub: '10', num: 10, en: 'Ten of Pentacles', vi: 'Mười Xu', meaning: 'Thịnh vượng bền vững lâu dài, di sản gia đình vững chãi và an toàn tài chính qua nhiều thế hệ.', kw: ['thịnh vượng', 'gia tộc', 'di sản', 'bền vững'] },
  { sub: 'page', num: 11, en: 'Page of Pentacles', vi: 'Tiểu Đồng Xu', meaning: 'Ý chí học hỏi thực tế, sự chăm chỉ cầu tiến và những tin tức khả quan về công việc, học hành.', kw: ['cầu tiến', 'học hỏi', 'thực tế', 'cơ hội'] },
  { sub: 'knight', num: 12, en: 'Knight of Pentacles', vi: 'Kỵ Sĩ Xu', meaning: 'Sự kiên nhẫn, đáng tin cậy, làm việc có phương pháp kỷ luật và theo đuổi mục tiêu đến cùng.', kw: ['đáng tin cậy', 'kỷ luật', 'kiên định', 'trách nhiệm'] },
  { sub: 'queen', num: 13, en: 'Queen of Pentacles', vi: 'Nữ Hoàng Xu', meaning: 'Sự tháo vát, chu đáo nuôi dưỡng tổ ấm, quản lý tài chính thiết thực và mang lại bình an ấm cúng.', kw: ['chu đáo', 'thực tế', 'tháo vát', 'ấm no'] },
  { sub: 'king', num: 14, en: 'King of Pentacles', vi: 'Vua Xu', meaning: 'Đỉnh cao của sự thành đạt vật chất, uy tín kinh doanh vững chắc, hào phóng và bản lĩnh làm chủ.', kw: ['thành đạt', 'uy tín', 'thịnh vượng', 'bản lĩnh'] }
];

pentsData.forEach(p => {
  deck.push({
    id: 'pentacles-' + p.sub, number: p.num, nameEn: p.en, nameVi: p.vi, arcana: 'minor', suit: 'pentacles', rank: p.num,
    meaningUpright: p.meaning, keywords: p.kw
  });
});

// Set image paths
deck.forEach(card => {
  card.image = 'assets/tarot/' + card.id + '.jpg';
  card.backImage = 'assets/tarot/card-back.png';
});

// Verification assertions
console.log('Total cards in deck:', deck.length);
if (deck.length !== 78) throw new Error('Deck count is not 78: ' + deck.length);

const majors = deck.filter(c => c.arcana === 'major');
if (majors.length !== 22) throw new Error('Major count is not 22: ' + majors.length);

const minors = deck.filter(c => c.arcana === 'minor');
if (minors.length !== 56) throw new Error('Minor count is not 56: ' + minors.length);

const suits = ['wands', 'cups', 'swords', 'pentacles'];
suits.forEach(s => {
  const count = deck.filter(c => c.suit === s).length;
  if (count !== 14) throw new Error(s + ' count is not 14: ' + count);
});

const ids = new Set();
deck.forEach(c => {
  if (ids.has(c.id)) throw new Error('Duplicate ID: ' + c.id);
  ids.add(c.id);
  if (!c.nameEn || !c.nameVi || !c.meaningUpright || !c.keywords || c.keywords.length < 3) {
    throw new Error('Card data incomplete: ' + c.id);
  }
});
console.log('All deck assertions passed successfully!');

const fileContent = '/**\n * Canonical 78-Card Rider-Waite-Smith Tarot Deck\n * Conforms to SPEC.md Section 3 & 4.1\n */\n\n' +
  'const TAROT_DECK = ' + JSON.stringify(deck, null, 2) + ';\n\n' +
  'if (typeof module !== "undefined" && module.exports) {\n' +
  '  module.exports = { TAROT_DECK };\n' +
  '} else if (typeof window !== "undefined") {\n' +
  '  window.TAROT_DECK = TAROT_DECK;\n' +
  '}\n';

fs.writeFileSync(path.join(__dirname, '..', 'js', 'tarot-data.js'), fileContent, 'utf8');
console.log('js/tarot-data.js generated successfully.');
