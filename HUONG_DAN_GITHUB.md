# Hướng Dẫn Đẩy Code Lên GitHub

Đây là hướng dẫn chi tiết để bạn đưa source code ứng dụng **"3 xị đi SIÊU THỊ"** lên GitHub.

## Bước 0: Cài đặt Git (Nếu chưa có)

Máy tính của bạn hiện tại có thể chưa cài Git (mình vừa thử chạy lệnh nhưng không tìm thấy `git`).
1.  Tải Git tại: [git-scm.com/download/win](https://git-scm.com/download/win)
2.  Cài đặt (Cứ bấm Next liên tục là được).
3.  Sau khi cài xong, hãy **khởi động lại** Terminal hoặc VS Code để máy nhận diện Git.

## Bước 1: Chuẩn bị trên máy tính của bạn

1.  **Mở Terminal** tại thư mục dự án:
    `c:\Users\Dell\.gemini\antigravity-hoang.0935080804\group-comparison-app`

2.  **Khởi tạo Git** (nếu chưa làm):
    ```bash
    git init
    ```

3.  **Kiểm tra .gitignore**:
    Đảm bảo file `.gitignore` đã có dòng `node_modules` và `dist` để tránh đẩy các file rác lên. (Mình đã kiểm tra và thấy file này đã tồn tại trong dự án của bạn rồi ✅).

4.  **Thêm file vào Git**:
    ```bash
    git add .
    ```

5.  **Lưu (Commit) các thay đổi**:
    ```bash
    git commit -m "Khoi tao du an 3 Xi Di Sieu Thi"
    ```

## Bước 2: Tạo kho chứa (Repository) trên GitHub

1.  Đăng nhập vào [GitHub.com](https://github.com/).
2.  Bấm vào dấu **+** ở góc trên bên phải -> chọn **New repository**.
3.  Đặt tên cho Repository (ví dụ: `3-xi-di-sieu-thi`).
4.  Chọn **Public** (công khai) hoặc **Private** (riêng tư).
5.  **QUAN TRỌNG:** Không tích vào các ô "Add a README file", "Add .gitignore"... (vì chúng ta đã có code ở máy rồi).
6.  Bấm **Create repository**.

## Bước 3: Liên kết và Đẩy code lên

Sau khi tạo xong, GitHub sẽ hiện ra một trang hướng dẫn. Bạn hãy tìm phần **"…or push an existing repository from the command line"** và copy 3 dòng lệnh tương tự như sau (nhớ thay đường dẫn bằng link của bạn):

```bash
git branch -M main
git remote add origin https://github.com/TÊN_USER_CỦA_BẠN/TÊN_REPO.git
git push -u origin main
```

**Giải thích:**
- `git branch -M main`: Đổi tên nhánh chính thành `main`.
- `git remote add origin ...`: Liên kết code ở máy với kho chứa trên mạng.
- `git push ...`: Lệnh đẩy code lên.

---

## 🔥 Cách cập nhật code sau này (Khi có sửa đổi)

Mỗi khi bạn sửa code và muốn cập nhật lên GitHub, chỉ cần chạy 3 lệnh sau:

1.  `git add .` (Chọn tất cả file đã sửa)
2.  `git commit -m "Ghi chú về những gì đã sửa"` (Lưu lại mốc lịch sử)
3.  `git push` (Đẩy lên mạng)
