# Nhật Ký Công Việc — Meridian Tarot (Full 78-Card AR Reading)
> **Ngày cập nhật:** 15/10/2026  
> **Dự án:** Meridian Tarot  
> **Repository:** https://github.com/Erik9910x/meridian-tarot  
> **Trạng thái:** ✅ Đã hoàn thiện toàn bộ tính năng, khắc phục triệt để 100% lỗi font tiếng Việt bằng bộ font đầy đủ Unicode (Be Vietnam Pro + Lora), bổ sung README.md chuyên nghiệp và chuẩn bị đẩy lên GitHub.

---

## 🎨 Kiến Trúc Đa Font Hoàn Hảo (Dual-Font Full Unicode System)

### 1. Phân định rõ ràng: Tiếng Anh giữ "Font lạ" — Tiếng Việt dùng font chuẩn 100% Unicode

* **Chữ Tiếng Anh (Giữ font lạ nghệ thuật cổ điển):**
  - Sử dụng **`Fraunces`** (kèm file woff2 cục bộ `assets/fonts/fraunces-lat-600.woff2`).
  - Áp dụng cho:
    - Wordmark: `meridian tarot`
    - Tên tiếng Anh của 78 lá bài (`Four of Cups`, `Queen of Swords`, `The Fool`...)
    - Nút `Support Me ✦`
    - Chữ bản quyền `© 2026 Meridian Tarot Works Ltd.`
* **Chữ Tiếng Việt (Font trang trọng, 100% chuẩn Unicode không bao giờ lỗi dấu):**
  - **Tên lá bài tiếng Việt (`<h3 class="card-name-vi">`):**
    - Sử dụng **`Be Vietnam Pro`** (SemiBold/Bold) kết hợp **`Lora Full`**.
    - Loại bỏ hoàn toàn cơ chế cắt lát `unicode-range` gây lệch baseline hay nhảy font.
    - Hiển thị trọn vẹn và sắc sảo các lá bài phức tạp nhất: `Bốn Cốc`, `Nữ Hoàng Kiếm`, `Kẻ Khờ`, `Ác Quỷ`, `Mặt Trời`, `Thế Giới`, `Người Treo Thuận Chiều`...
  - **Tiêu đề & Trích dẫn tiếng Việt:**
    - `Đang gửi năng lượng 3 lá bài tới trí tuệ nhân tạo...`
    - `Thông điệp dành cho câu hỏi của bạn`
    - `✦ Tổng Hòa Liên Kết Trải Bài`
    - `Cảm Ơn Sự Đồng Hành Của Bạn`
    - Lời chúc tri ân: `Chúc bạn luôn an yên, sáng suốt và gặt hái thật nhiều phước lành trên hành trình phía trước! ✦`
    - Sử dụng **`Be Vietnam Pro`** — font chữ được thiết kế riêng cho tiếng Việt, cân bằng hoàn hảo giữa tính hiện đại, trang nghiêm và dấu thanh chuẩn mực.
  - **Nút bấm & Nhãn chức năng:**
    - Nút `Bắt Đầu Trải Bài ✦`, `Xem Tarot Ngay ✦`, `0/3`: Dùng **`Inter`** sắc nét, dứt khoát.

---

### 2. Tải & Lưu Trữ Cục Bộ Trọn Bộ Font TTF/WOFF2 Đầy Đủ Glyphs (`assets/fonts/`)
Toàn bộ font chữ đã được tải trực tiếp các tệp hoàn chỉnh (Full Standalone TTF/WOFF2), không qua phân tách slice:
- `assets/fonts/be-vietnam-pro-regular.ttf` (Be Vietnam Pro Regular 400 — 132KB)
- `assets/fonts/be-vietnam-pro-medium.ttf` (Be Vietnam Pro Medium 500 — 135KB)
- `assets/fonts/be-vietnam-pro-semibold.ttf` (Be Vietnam Pro SemiBold 600 — 136KB)
- `assets/fonts/be-vietnam-pro-bold.ttf` (Be Vietnam Pro Bold 700 — 140KB)
- `assets/fonts/lora-regular.ttf` (Lora Regular 400 Full — 132KB)
- `assets/fonts/lora-semibold.ttf` (Lora SemiBold 600 Full — 132KB)
- `assets/fonts/merriweather-regular.ttf` (Merriweather Regular 400 Full — 585KB)
- `assets/fonts/merriweather-bold.ttf` (Merriweather Bold 700 Full — 586KB)
- `assets/fonts/fraunces-lat-600.woff2` (Fraunces Display 600 cho tiếng Anh)

Đồng thời cập nhật `server.js` hỗ trợ MIME types `font/ttf` và `font/otf` chuẩn W3C.

---

### 3. Tài Liệu Hóa Dự Án & Chuẩn Bị Push Lên GitHub
- Tạo `README.md` chuyên nghiệp giới thiệu tổng quan, kiến trúc kỹ thuật, hướng dẫn cài đặt và cấu hình Vercel Serverless.
- Cấu hình remote origin: `https://github.com/Erik9910x/meridian-tarot.git`.
- Bảo vệ an toàn tuyệt đối khóa bí mật API (`.env` nằm trong `.gitignore`, chỉ commit `.env.example`).
