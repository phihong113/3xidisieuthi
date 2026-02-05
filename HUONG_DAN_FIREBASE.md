# Hướng dẫn tạo và kết nối Database (Firebase)

Để ứng dụng lưu dữ liệu online, bạn cần tạo một kho chứa miễn phí trên Google Firebase.

### Bước 1: Tạo dự án
1. Truy cập: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Đăng nhập bằng tài khoản Google (Gmail) của bạn.
3. Bấm **"Create a project"** (hoặc "Add project").
4. Đặt tên dự án (ví dụ: `zalo-comparison-db`).
5. Bấm **Continue**. Tắt "Google Analytics" cho đơn giản -> Bấm **Create project**.
6. Đợi một chút rồi bấm **Continue**.

### Bước 2: Tạo kho dữ liệu (Firestore)
1. Ở menu bên trái, chọn **Build** -> **Firestore Database**.
2. Bấm **Create database**.
3. Ở bảng hiện ra:
   - Location: Chọn `asia-southeast1` (Singapore) cho nhanh, hoặc để mặc định (US) đều được.
   - Bấm **Next**.
   - **QUAN TRỌNG:** Chọn chế độ **"Start in test mode"** (để ai cũng có thể đọc/ghi dữ liệu tạm thời trong 30 ngày đầu, sau này ta chỉnh lại sau).
   - Bấm **Create**.

### Bước 3: Lấy mã kết nối
1. Bấm vào biểu tượng **Bánh răng (Settings)** ở menu trái (gần chữ Project Overview) -> Chọn **Project settings**.
2. Kéo xuống dưới cùng, phần "Your apps".
3. Bấm vào biểu tượng **Web** (hình dấu `</>`).
4. Đặt tên App (ví dụ: `web-app`) -> Bấm **Register app**.
5. Bạn sẽ thấy một đoạn mã `const firebaseConfig = { ... }`.
6. **Copy toàn bộ đoạn mã trong dấu ngoặc nhọn `{ ... }` đó**.

### Bước 4: Dán vào code
1. Quay lại VS Code, mở file `src/firebase.js`.
2. Thay thế phần tôi ghi chú `// Thay thế toàn bộ đoạn này...` bằng đoạn mã bạn vừa copy.
3. Lưu file lại.

---
**Xong!** Giờ ứng dụng của bạn đã có "bộ não" trên mây.
