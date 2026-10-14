# ✦ Meridian Tarot

> *"A little cosmic insight, a deeper understanding of you."*  
> Trải nghiệm Tarot 3D Không Gian (WebAR) kết hợp Trí Tuệ Nhân Tạo (AI Reading) và Nhận Diện Cử Chỉ Bàn Tay (MediaPipe Hands).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform: Web & Mobile](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-blue.svg)](https://github.com/Erik9910x/meridian-tarot)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Serverless%20Ready-black.svg)](https://vercel.com)

---

## ✦ Tổng Quan Dự Án

**Meridian Tarot** là ứng dụng bói bài Tarot trực tuyến mang phong cách khắc chạm cổ điển (vintage engraving). Dự án kết hợp công nghệ **WebGL 3D (Three.js)** và **MediaPipe Hands** giúp người dùng trực tiếp đưa tay trước camera để chọn 3 lá bài trong không gian vũ trụ, sau đó nhận lời luận giải sâu sắc, cá nhân hóa từ mô hình AI tiên tiến (Claude Haiku 5.5).

### 🌟 Điểm Nổi Bật

1. **Giao Diện Khắc Chạm Meridian Độc Bản**:
   - Thiết kế cổ điển, tĩnh lặng với bảng màu xám ngọc - xanh rêu cổ điển (`#ebeee7` / `#2b3a30`), video nền viaduct hòa trộn mềm mại.
   - Hệ thống font chữ song song (Dual-Font Architecture): Font nghệ thuật **Fraunces** cho các từ tiếng Anh và **Be Vietnam Pro / Lora** hỗ trợ 100% tiếng Việt chuẩn Unicode, không bao giờ lỗi dấu (`Bốn Cốc`, `Nữ Hoàng Kiếm`, `✦ Tổng Hòa Liên Kết Trải Bài`...).

2. **Bộ Bài Chuẩn Canonical 78 Lá**:
   - Đầy đủ 22 lá Ẩn Chính (Major Arcana) và 56 lá Ẩn Phụ (Minor Arcana: Wands, Cups, Swords, Pentacles).
   - Toàn bộ hình ảnh lá bài chất lượng cao được lưu trữ nội bộ tại `assets/tarot/`, đảm bảo tải nhanh và hoạt động offline ổn định.

3. **Vòng Xoay Bài 3D AR & Nhận Diện Bàn Tay**:
   - 78 lá bài được trải đều trong không gian 3D hình bán nguyệt rộng rãi, chuyển động dập dềnh tự nhiên theo sóng sin.
   - Hỗ trợ cả 2 chế độ:
     - **Cử chỉ tay (Hand Tracking)**: Đưa ngón trỏ hoặc chụm ngón tay trước webcam để chạm và mở bài.
     - **Chạm / Click chuột trực tiếp**: Raycasting tương tác mượt mà trên cả máy tính lẫn điện thoại cảm ứng.

4. **Trí Tuệ Nhân Tạo Luận Giải (AI Tarot Master)**:
   - Tích hợp mô hình AI qua Vercel Serverless Function (`api/reading.js`).
   - Phân tích bối cảnh câu hỏi cụ thể, luận giải 3 chiều không gian: **Quá Khứ** (Nền tảng & Căn nguyên), **Hiện Tại** (Bối cảnh & Trạng thái), **Tương Lai** (Xu hướng & Triển vọng), kèm theo **Tổng Hòa Liên Kết** và lời khuyên hành động thực tế.

5. **Nút "Support Me ✦" Tinh Tế**:
   - Tích hợp cửa sổ cảm ơn và mã QR ủng hộ tác giả ở góc phải trên màn hình kết quả giải bài.

---

## 🛠️ Kiến Trúc Công Nghệ

- **Frontend**:
  - HTML5 Semantic & Vanilla CSS (Custom Design System, CSS Variables).
  - Vanilla JavaScript ES6+ (Module-free, Native Browser Compatible).
  - [Three.js](https://threejs.org/) (r128) — Dựng không gian 3D, camera phối cảnh, ánh sáng và đổ bóng.
  - [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker) — Nhận diện 21 khớp bàn tay theo thời gian thực từ video webcam.
  - [Tween.js](https://github.com/tweenjs/tween.js) — Diễn hoạt hoạt ảnh lật bài, rút bài và chuyển cảnh mượt mà.
- **Backend & API**:
  - `api/reading.js` — Chuẩn Serverless Function tương thích 100% với Vercel.
  - `server.js` — Web server Node.js thuần (Zero-dependency) phục vụ môi trường phát triển cục bộ.
- **AI Backend**:
  - Chuẩn OpenAI-compatible chat completions API (mặc định hỗ trợ Claude Haiku 5.5 thông qua Vilao AI hoặc bất kỳ nhà cung cấp tương thích nào).

---

## 📂 Cấu Trúc Thư Mục

```text
meridian-tarot/
├── .env.example             # Mẫu biến môi trường (API Key, Base URL, Model)
├── .gitignore               # Loại bỏ .env và node_modules khỏi git
├── README.md                # Tài liệu giới thiệu & hướng dẫn dự án
├── SPEC.md                  # Bản đặc tả kỹ thuật chi tiết
├── Todaywork.md             # Nhật ký công việc & lịch sử phát triển
├── package.json             # Cấu hình dự án & scripts kiểm thử
├── server.js                # Local development server (port 3000 / 3001)
├── index.html               # Trang chính chứa cả 4 Phase giao diện
├── styles.css               # Hệ thống styling khắc chạm & typography chuẩn Unicode
├── support.jpg              # Ảnh QR ủng hộ tác giả
├── api/
│   └── reading.js           # Serverless API giải bài Tarot bằng AI
├── assets/
│   ├── fonts/               # Các font Unicode offline (Be Vietnam Pro, Lora, Fraunces)
│   └── tarot/               # Toàn bộ 78 lá bài Tarot canonical + card-back
├── js/
│   ├── app.js               # State machine điều phối 4 Phase trải bài
│   ├── tarot-data.js        # Dữ liệu 78 lá bài canonical (tên Anh/Việt, ý nghĩa)
│   ├── tarot-ar.js          # Khởi tạo Three.js AR, MediaPipe Hands & Raycaster
│   ├── reading-api.js       # Client gọi endpoint /api/reading
│   └── reading-view.js      # Render giao diện kết quả giải bài & modal Support Me
└── scripts/
    ├── build-deck.js        # Script kiểm tra / tải tự động hình ảnh bộ bài
    └── run-all-tests.js     # Bộ test tự động (deck validation, server, AI API)
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu Cầu Môi Trường
- [Node.js](https://nodejs.org/) phiên bản 16.x trở lên.
- Trình duyệt hiện đại hỗ trợ WebGL và WebRTC (Chrome, Edge, Safari, Firefox).
- Webcam máy tính hoặc camera điện thoại (để trải nghiệm tính năng cử chỉ tay).

### 2. Cài Đặt

```bash
# Clone repository
git clone https://github.com/Erik9910x/meridian-tarot.git

# Di chuyển vào thư mục dự án
cd meridian-tarot

# Cài đặt dependencies (phục vụ test)
npm install
```

### 3. Cấu Hình Biến Môi Trường

Tạo file `.env` từ file mẫu `.env.example`:

```bash
cp .env.example .env
```

Mở `.env` và điền cấu hình API của bạn:

```env
AI_API_KEY=your_actual_api_key_here
AI_BASE_URL=https://api.vilao.ai/v1
AI_MODEL=occ/claude-haiku-5-5
PORT=3000
```

> **Lưu ý bảo mật:** File `.env` đã được cấu hình trong `.gitignore` để đảm bảo API key của bạn không bao giờ bị lộ lên GitHub.

### 4. Khởi Động Máy Chủ Cục Bộ

```bash
# Khởi động máy chủ dev
npm run dev
# Hoặc: node server.js
```

Mở trình duyệt và truy cập: `http://localhost:3000` (hoặc `http://localhost:3001` nếu cổng 3000 đang bận).

### 5. Chạy Kiểm Thử Tự Động

Dự án đi kèm bộ script kiểm thử toàn diện:

```bash
node scripts/run-all-tests.js
```

---

## ☁️ Triển Khai Lên Vercel

Dự án được tối ưu hóa theo mô hình **Zero-Config Vercel**:

1. Đăng nhập vào [Vercel](https://vercel.com) và chọn **Add New Project**.
2. Liên kết với kho lưu trữ `Erik9910x/meridian-tarot`.
3. Trong phần **Environment Variables**, cấu hình các biến sau:
   - `AI_API_KEY`: Khóa API của bạn.
   - `AI_BASE_URL`: Địa chỉ API (ví dụ: `https://api.vilao.ai/v1`).
   - `AI_MODEL`: Tên mô hình (ví dụ: `occ/claude-haiku-5-5`).
4. Bấm **Deploy**. Vercel sẽ tự động phục vụ file tĩnh `index.html` và chuyển các yêu cầu `/api/reading` tới hàm không máy chủ trong thư mục `api/`.

---

## 📜 Giấy Phép & Đóng Góp

- Dự án được phát hành theo giấy phép **MIT License**.
- Đóng góp phát triển (Pull Requests & Issues) luôn được chào đón tại: [GitHub Repository](https://github.com/Erik9910x/meridian-tarot).

---

*Chúc bạn luôn an yên, sáng suốt và gặt hái thật nhiều phước lành trên hành trình phía trước! ✦*
