# Hướng dẫn đưa app lên Zalo (Zalo Battle Arena)

Việc đưa một ứng dụng web (như chúng ta đang làm) vào nhóm Zalo để mọi người cùng chơi có 2 cách. Dưới đây là cách đơn giản và hiệu quả nhất cho nhu cầu của bạn.

## 🚀 Cách 1: Đưa ứng dụng lên Online (Khuyên dùng)
Vì Zalo bản chất cũng chỉ là mở các đường link web, nên chúng ta chỉ cần đưa web này lên mạng là gửi link vào nhóm được.

### Bước 1: Đăng ký tài khoản Vercel
1. Vào trang [vercel.com](https://vercel.com)
2. Chọn "Sign Up" và đăng nhập bằng tài khoản **GitHub** (nếu bạn chưa có GitHub, hãy tạo một cái, nó là nơi lưu code miễn phí).

### Bước 2: Đẩy code lên GitHub
(Nếu bạn chưa biết dùng Git, hãy làm theo mình)
1. Mở Terminal (trong VS Code, `Ctrl + J`).
2. Gõ lệnh:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Zalo Battle"
   ```
3. Lên trang [github.com](https://github.com), tạo một **New Repository** (đặt tên là `zalo-battle`).
4. Copy 3 dòng lệnh mà GitHub hướng dẫn sau khi tạo xong (đoạn bắt đầu bằng `git remote add...`) và dán vào Terminal của bạn.

### Bước 3: Deploy lên Vercel
1. Quay lại trang Vercel (Dashboard).
2. Chọn **"Add New..."** -> **"Project"**.
3. Kết nối với GitHub và chọn dự án `zalo-battle` bạn vừa tạo.
4. Bấm **"Deploy"**. Đợi khoảng 1-2 phút.
5. 🎉 Bùm! Bạn sẽ có một đường link dạng `https://zalo-battle.vercel.app`.

### Bước 4: Gửi vào nhóm Zalo
1. Copy đường link đó gửi vào nhóm Zalo.
2. Mọi người bấm vào sẽ mở ra ứng dụng.

---

## ⚡ Cách 2: Chia sẻ dữ liệu cho cả nhóm (Tính năng "Dữ liệu" mới)
Vì web chạy riêng trên máy mỗi người, nên danh sách thành viên sẽ không tự đồng bộ (để làm tự đồng bộ cần server riêng khá phức tạp).
-> **Giải pháp:** Mình vừa thêm tính năng **Xuất/Nhập Dữ Liệu**.

1. **Bạn (Admin)**: 
   - Vào Setting -> Tab **"Thành viên"**: Thêm đủ các thành viên, dán link avatar.
   - Vào Tab **"Cấu hình"**: Chỉnh sửa tên chỉ số, màu sắc.
   - Vào Tab **"Dữ liệu"**: Bấm **"Sao chép Data"**.
2. **Gửi vào nhóm Zalo**:
   - Dán đoạn mã vừa copy vào nhóm. Nhắn mọi người: "Copy đoạn này dán vào mục Dữ liệu nhé!".
3. **Thành viên khác**:
   - Mở app -> Vào Setting -> Tab **"Dữ liệu"**.
   - Dán đoạn mã vào ô trống -> Bấm **"Cập nhật Data"**.
   - ✅ Xong! Máy họ sẽ có y chang danh sách và cấu hình của bạn.

---

## 🖼️ Mẹo lấy Avatar Zalo
Để avatar đẹp, bạn làm như sau trên máy tính:
1. Mở Zalo PC hoặc Zalo Web.
2. Bấm vào ảnh đại diện của thành viên trong nhóm -> Chọn "Xem ảnh/hồ sơ".
3. **Chuột phải** vào ảnh đại diện -> Chọn **"Copy Image Address"** (Sao chép địa chỉ hình ảnh).
4. Dán link đó vào ô Avatar trong app.
