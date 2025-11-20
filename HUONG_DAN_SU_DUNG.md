# 📚 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN LÝ ĐÀO TẠO

## 🚀 CÀI ĐẶT VÀ CHẠY HỆ THỐNG

### 1. Cài đặt Node.js
- Tải và cài đặt Node.js từ: https://nodejs.org/
- Kiểm tra: `node --version`

### 2. Cài đặt MySQL
- Cài đặt MySQL Server
- Tạo user và database

### 3. Cài đặt dependencies
```bash
npm install express mysql2 cors
```

### 4. Tạo database
```bash
mysql -u root -p < database.sql
```

### 5. Chạy hệ thống
```bash
node app.js
```

### 6. Truy cập hệ thống
- Mở trình duyệt: http://localhost:3000

---

## 📋 CHỨC NĂNG CHÍNH

### 🏢 **QUẢN LÝ PHÒNG BAN**
- **Xem danh sách**: Tự động tải từ database
- **Thêm mới**: Click "Thêm phòng ban" → Điền thông tin → "Lưu"
- **Sửa**: Click "Sửa" → Chỉnh sửa → "Lưu"  
- **Xóa**: Click "Xóa" → Xác nhận

**Thông tin cần nhập:**
- Tên phòng ban (bắt buộc)
- Địa chỉ (bắt buộc)
- Email (bắt buộc)
- Trưởng phòng (tùy chọn)

### 👥 **QUẢN LÝ NHÂN SỰ**
- **Xem danh sách**: Tự động tải từ database
- **Thêm mới**: Click "Thêm nhân sự" → Điền thông tin → "Lưu"
- **Sửa**: Click "Sửa" → Chỉnh sửa → "Lưu"
- **Xóa**: Click "Xóa" → Xác nhận

**Thông tin cần nhập:**
- Tên nhân viên (bắt buộc)
- Khoa (bắt buộc)
- Chức vụ (bắt buộc)
- Email (bắt buộc)
- Phòng ban (chọn từ dropdown)

### 📖 **QUẢN LÝ HỌC PHẦN**

#### **Học phần CNTT**
- **Xem**: Chọn "Học phần CNTT" từ menu
- **Thêm**: Click "Thêm học phần" → Điền thông tin → "Lưu"
- **Sửa**: Click "Sửa" → Chỉnh sửa → "Lưu"
- **Xóa**: Click "Xóa" → Xác nhận

#### **Học phần Kỹ thuật**
- Tương tự như CNTT
- Chọn "Học phần Kỹ thuật" từ menu

#### **Học phần Kinh tế**
- Tương tự như CNTT
- Chọn "Học phần Kinh tế" từ menu

#### **Học phần NN-KHXH**
- Tương tự như CNTT
- Chọn "Học phần NN-KHXH" từ menu

#### **Học phần Y-Dược**
- Tương tự như CNTT
- Chọn "Học phần Y-Dược" từ menu

**Thông tin học phần:**
- Tên học phần (bắt buộc)
- Số tín chỉ (bắt buộc)
- Loại học phần: Bắt buộc/Tự chọn
- Điều kiện tiên quyết (tùy chọn)

---

## 🎯 **HƯỚNG DẪN SỬ DỤNG CHI TIẾT**

### **Thêm dữ liệu mới:**
1. Click nút "Thêm [loại]" tương ứng
2. Điền đầy đủ thông tin bắt buộc
3. Click "Lưu" để lưu vào database
4. Hệ thống sẽ tự động refresh dữ liệu

### **Chỉnh sửa dữ liệu:**
1. Click nút "Sửa" trên dòng cần sửa
2. Chỉnh sửa thông tin trong các ô input
3. Click "Lưu" để cập nhật database
4. Click "Hủy" để bỏ qua thay đổi

### **Xóa dữ liệu:**
1. Click nút "Xóa" trên dòng cần xóa
2. Xác nhận trong hộp thoại
3. Dữ liệu sẽ bị xóa khỏi database

### **Tìm kiếm:**
- Sử dụng thanh tìm kiếm ở đầu mỗi bảng
- Nhập từ khóa và nhấn Enter
- Hệ thống sẽ lọc dữ liệu theo từ khóa

---

## ⚠️ **LƯU Ý QUAN TRỌNG**

### **Dữ liệu bắt buộc:**
- **Phòng ban**: Tên, địa chỉ, email
- **Nhân sự**: Tên, khoa, chức vụ, email
- **Học phần**: Tên, số tín chỉ, loại học phần

### **Quan hệ dữ liệu:**
- Nhân sự phải thuộc về một phòng ban
- Khi xóa phòng ban, cần xóa nhân sự trước

### **Backup dữ liệu:**
- Thường xuyên backup database
- Export dữ liệu quan trọng

---

## 🔧 **XỬ LÝ LỖI THƯỜNG GẶP**

### **Lỗi kết nối database:**
- Kiểm tra MySQL đang chạy
- Kiểm tra thông tin kết nối trong `app.js`
- Kiểm tra database `qldt` đã tồn tại

### **Lỗi thêm dữ liệu:**
- Kiểm tra đã điền đầy đủ thông tin bắt buộc
- Kiểm tra định dạng email
- Kiểm tra số tín chỉ là số nguyên

### **Lỗi hiển thị:**
- Refresh trang web
- Kiểm tra console browser (F12)
- Kiểm tra server đang chạy

---

## 📞 **HỖ TRỢ**

Nếu gặp vấn đề, hãy:
1. Kiểm tra console browser (F12)
2. Kiểm tra terminal chạy server
3. Kiểm tra kết nối database
4. Restart server nếu cần

**Chúc bạn sử dụng hệ thống hiệu quả!** 🎉
