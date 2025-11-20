-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS qldt;

-- Chọn database để sử dụng
USE qldt;

CREATE TABLE ctdt (
   ma_ctdt varchar(50) NOT NULL,
   ten_ctdt varchar(255) DEFAULT NULL,
   trinh_do enum('Đại học','Thạc sĩ','Tiến sĩ') DEFAULT NULL,
   thoi_gian_dao_tao int DEFAULT NULL,
   id_khoa varchar(50) DEFAULT NULL,
   PRIMARY KEY (ma_ctdt),
   KEY fk_ctdt_khoa (id_khoa),
   CONSTRAINT fk_ctdt_khoa FOREIGN KEY (id_khoa) REFERENCES khoa (id_khoa)
 );
 
CREATE TABLE ctdt_kkt (
   id int NOT NULL AUTO_INCREMENT,
   ma_ctdt varchar(50) NOT NULL,
   ma_kkt varchar(50) NOT NULL,
   stt int DEFAULT '0',
   PRIMARY KEY (id),
   UNIQUE KEY unique_ctdt_kkt (ma_ctdt,ma_kkt),
   KEY ma_kkt (ma_kkt),
   CONSTRAINT ctdt_kkt_ibfk_1 FOREIGN KEY (ma_ctdt) REFERENCES ctdt (ma_ctdt) ON DELETE CASCADE,
   CONSTRAINT ctdt_kkt_ibfk_2 FOREIGN KEY (ma_kkt) REFERENCES khoi_kien_thuc (ma_kkt) ON DELETE CASCADE
 );
 
CREATE TABLE giangvien (
   id_giangvien int NOT NULL,
   ten_giangvien varchar(255) NOT NULL,
   chucvu enum('Trưởng khoa','Phó trưởng khoa','Giảng viên') DEFAULT NULL,
   email_giangvien varchar(255) DEFAULT NULL,
   id_khoa varchar(50) DEFAULT NULL,
   trang_thai_gv enum('Đang hoạt động','Nghỉ phép') DEFAULT 'Đang hoạt động',
   PRIMARY KEY (id_giangvien),
   KEY id_khoa (id_khoa),
   CONSTRAINT giangvien_ibfk_1 FOREIGN KEY (id_khoa) REFERENCES khoa (id_khoa) ON DELETE SET NULL
 );
 
 CREATE TABLE hocphan (
   ma_hocphan varchar(50) NOT NULL,
   ten_hocphan varchar(255) NOT NULL,
   so_tinchi int DEFAULT NULL,
   tin_chi_ly_thuyet int DEFAULT NULL,
   tin_chi_thuc_hanh int DEFAULT NULL,
   hp_tien_quyet varchar(50) DEFAULT NULL,
   hp_song_hanh varchar(50) DEFAULT NULL,
   hp_hoc_truoc varchar(50) DEFAULT NULL,
   PRIMARY KEY (ma_hocphan),
   CONSTRAINT hocphan_chk_1 CHECK ((so_tinchi > 0)),
   CONSTRAINT hocphan_chk_2 CHECK ((tin_chi_ly_thuyet >= 0)),
   CONSTRAINT hocphan_chk_3 CHECK ((tin_chi_thuc_hanh >= 0)),
   CONSTRAINT hocphan_chk_4 CHECK ((so_tinchi = (tin_chi_ly_thuyet + tin_chi_thuc_hanh)))
 );
 
CREATE TABLE hocphi_config (
   id_hocphi int NOT NULL AUTO_INCREMENT,
   ma_ctdt varchar(20) NOT NULL,
   nam_hoc year NOT NULL,
   gia_tin_chi decimal(10,2) NOT NULL,
   ghi_chu text,
   PRIMARY KEY (id_hocphi),
   UNIQUE KEY unique_ctdt_namhoc (ma_ctdt, nam_hoc),
   KEY ma_ctdt (ma_ctdt),
   CONSTRAINT hocphi_config_ibfk_1 FOREIGN KEY (ma_ctdt) REFERENCES ctdt (ma_ctdt) ON DELETE CASCADE
 );
 
CREATE TABLE khoa (
   id_khoa varchar(50) NOT NULL,
   ten_khoa varchar(50) DEFAULT NULL,
   email_khoa varchar(50) DEFAULT NULL,
   dia_chi_khoa varchar(50) DEFAULT NULL,
   trang_thai_khoa enum('Đang hoạt động','Chưa hoạt động') DEFAULT 'Đang hoạt động',
   truong_khoa varchar(50) DEFAULT NULL,
   PRIMARY KEY (id_khoa)
 );
 
CREATE TABLE khoahoc (
   id_khoahoc varchar(50) NOT NULL,
   ten_khoahoc varchar(255) DEFAULT NULL,
   nam_bat_dau year DEFAULT NULL,
   nam_ket_thuc year DEFAULT NULL,
   ma_ctdt varchar(50) DEFAULT NULL,
   trang_thai_khoahoc enum('Chưa bắt đầu','Đang học','Đã kết thúc') DEFAULT NULL,
   PRIMARY KEY (id_khoahoc),
   KEY ma_ctdt (ma_ctdt),
   CONSTRAINT khoahoc_ibfk_1 FOREIGN KEY (ma_ctdt) REFERENCES ctdt (ma_ctdt)
 );
 
CREATE TABLE khoi_kien_thuc (
   ma_kkt varchar(50) NOT NULL,
   ten_kkt varchar(255) DEFAULT NULL,
   tin_chi_toi_thieu int DEFAULT NULL,
   tin_chi_toi_da int DEFAULT NULL,
   loai_kkt enum('Bắt buộc','Tự chọn') DEFAULT NULL,
   mo_ta_kkt text,
   PRIMARY KEY (ma_kkt)
 );
 
CREATE TABLE nganhhoc (
   id_nganhhoc varchar(50) NOT NULL,
   ten_nganhhoc varchar(255) DEFAULT NULL,
   id_khoa varchar(50) DEFAULT NULL,
   tong_tin_chi_nganh int DEFAULT NULL,
   mo_ta_nganhhoc text,
   PRIMARY KEY (id_nganhhoc),
   KEY id_khoa (id_khoa),
   CONSTRAINT nganhhoc_ibfk_1 FOREIGN KEY (id_khoa) REFERENCES khoa (id_khoa) ON DELETE SET NULL
 );
 
CREATE TABLE nhansu (
   id_nhanvien int NOT NULL AUTO_INCREMENT,
   ten_nhanvien varchar(255) NOT NULL,
   chucvu enum('Trưởng phòng','Phó phòng','Nhân viên') DEFAULT NULL,
   email_nhansu varchar(255) DEFAULT NULL,
   id_phongban int DEFAULT NULL,
   trang_thai_ns enum('Đang hoạt động','Nghỉ phép') DEFAULT 'Đang hoạt động',
   PRIMARY KEY (id_nhanvien),
   KEY id_phongban (id_phongban),
   CONSTRAINT nhansu_ibfk_1 FOREIGN KEY (id_phongban) REFERENCES phongban (id_phongban) ON DELETE SET NULL
 );
 
CREATE TABLE phongban (
   id_phongban int NOT NULL AUTO_INCREMENT,
   ten_phongban varchar(255) NOT NULL,
   dia_chi_phongban text,
   email_phongban varchar(255) DEFAULT NULL,
   truong_phong varchar(255) DEFAULT NULL,
   trang_thai_pb enum('Đang hoạt động','Chưa hoạt động') DEFAULT 'Đang hoạt động',
   PRIMARY KEY (id_phongban)
 );
 
CREATE TABLE IF NOT EXISTS ctdt_hocphan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ma_ctdt VARCHAR(50) NOT NULL,
  ma_hocphan VARCHAR(50) NOT NULL,
  ma_kkt VARCHAR(50) NOT NULL,
  stt INT DEFAULT 0,
  FOREIGN KEY (ma_ctdt) REFERENCES ctdt(ma_ctdt) ON DELETE CASCADE,
  FOREIGN KEY (ma_hocphan) REFERENCES hocphan(ma_hocphan) ON DELETE CASCADE,
  FOREIGN KEY (ma_kkt) REFERENCES khoi_kien_thuc(ma_kkt) ON DELETE CASCADE
);

-- Xóa bảng hocphi_config cũ để tạo lại với cấu trúc mới
DROP TABLE IF EXISTS hocphi_config;