const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Kết nối database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aptx4869@',
    database: 'qldt'
});

// Kiểm tra kết nối
db.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối database:', err.message);
        console.log('📋 Hướng dẫn khắc phục:');
        console.log('1. Kiểm tra MySQL có chạy không');
        console.log('2. Tạo database: CREATE DATABASE qldt;');
        console.log('3. Import file database.sql');
        console.log('4. Cập nhật thông tin kết nối trong app.js');
    } else {
        console.log('✅ Kết nối database thành công!');
    }
});

// ====================== ROUTES ======================

// Trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ycphanmem.html'));
});

// ====================== API PHÒNG BAN ======================

app.get('/api/phongban', (req, res) => {
    db.query('SELECT * FROM phongban ORDER BY id_phongban DESC', (err, results) => {
        if (err) {
            console.error('Lỗi lấy dữ liệu phòng ban:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }
        res.json(results);
    });
});

app.post('/api/phongban', (req, res) => {
    const { id_phongban, ten_phongban, dia_chi_phongban, email_phongban } = req.body;
    
    // Không yêu cầu truong_phong nữa
    if (!id_phongban || !ten_phongban || !dia_chi_phongban || !email_phongban) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    
    const checkSql = 'SELECT id_phongban FROM phongban WHERE id_phongban = ?';
    db.query(checkSql, [id_phongban], (err, results) => {
        if (err) {
            console.error('Lỗi kiểm tra ID phòng ban:', err);
            return res.status(500).json({ error: 'Lỗi kiểm tra ID phòng ban' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Mã phòng ban đã tồn tại, vui lòng chọn mã khác' });
        }
        
        // Thêm với truong_phong = NULL
        const sql = 'INSERT INTO phongban (id_phongban, ten_phongban, dia_chi_phongban, email_phongban, truong_phong) VALUES (?, ?, ?, ?, NULL)';
        db.query(sql, [id_phongban, ten_phongban, dia_chi_phongban, email_phongban], (err, result) => {
            if (err) {
                console.error('Lỗi thêm phòng ban:', err);
                return res.status(500).json({ error: 'Lỗi thêm phòng ban' });
            }
            res.json({ 
                success: true, 
                message: 'Thêm phòng ban thành công',
                id: id_phongban 
            });
        });
    });
});

app.put('/api/phongban/:id', (req, res) => {
    const { id } = req.params;
    const { ten_phongban, dia_chi_phongban, email_phongban, truong_phong, trang_thai_pb } = req.body;
    
    const sql = 'UPDATE phongban SET ten_phongban=?, dia_chi_phongban=?, email_phongban=?, truong_phong=?, trang_thai_pb=? WHERE id_phongban=?';
    db.query(sql, [ten_phongban, dia_chi_phongban, email_phongban, truong_phong, trang_thai_pb, id], (err) => {
        if (err) {
            console.error('Lỗi cập nhật phòng ban:', err);
            return res.status(500).json({ error: 'Lỗi cập nhật phòng ban' });
        }
        res.json({ success: true, message: 'Cập nhật phòng ban thành công' });
    });
});

app.delete('/api/phongban/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM phongban WHERE id_phongban=?', [id], (err) => {
        if (err) {
            console.error('Lỗi xóa phòng ban:', err);
            return res.status(500).json({ error: 'Lỗi xóa phòng ban' });
        }
        res.json({ success: true, message: 'Xóa phòng ban thành công' });
    });
});

// ====================== API NHÂN SỰ ======================

app.get('/api/nhansu', (req, res) => {
    const sql = `
        SELECT n.*, p.ten_phongban 
        FROM nhansu n 
        LEFT JOIN phongban p ON n.id_phongban = p.id_phongban 
        ORDER BY n.id_nhanvien DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi lấy dữ liệu nhân sự:', err);
            return res.status(500).json({ error: 'Lỗi server' });
        }
        res.json(results);
    });
});

app.post('/api/nhansu', (req, res) => {
    const { id_nhanvien, ten_nhanvien, chucvu, email_nhansu, id_phongban } = req.body;
    
    if (!id_nhanvien || !ten_nhanvien || !email_nhansu) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    
    const checkSql = 'SELECT id_nhanvien FROM nhansu WHERE id_nhanvien = ?';
    db.query(checkSql, [id_nhanvien], (err, results) => {
        if (err) {
            console.error('Lỗi kiểm tra ID nhân viên:', err);
            return res.status(500).json({ error: 'Lỗi kiểm tra ID nhân viên' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Mã nhân viên đã tồn tại, vui lòng chọn mã khác' });
        }
        
        // ✅ THÊM MỚI: Nếu là trưởng phòng, xóa trưởng phòng cũ trước
        if (chucvu === 'Trưởng phòng' && id_phongban) {
            const clearOldSql = 'UPDATE phongban SET truong_phong = NULL WHERE id_phongban = ?';
            db.query(clearOldSql, [id_phongban], (err) => {
                if (err) {
                    console.error('Lỗi xóa trưởng phòng cũ:', err);
                }
            });
        }
        
        const sql = 'INSERT INTO nhansu (id_nhanvien, ten_nhanvien, chucvu, email_nhansu, id_phongban) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [id_nhanvien, ten_nhanvien, chucvu, email_nhansu, id_phongban], (err, result) => {
            if (err) {
                console.error('Lỗi thêm nhân sự:', err);
                return res.status(500).json({ error: 'Lỗi thêm nhân sự' });
            }
            
            // ✅ THÊM MỚI: Tự động cập nhật trưởng phòng
            if (chucvu === 'Trưởng phòng' && id_phongban) {
                const updatePhongBanSql = 'UPDATE phongban SET truong_phong = ? WHERE id_phongban = ?';
                db.query(updatePhongBanSql, [ten_nhanvien, id_phongban], (err) => {
                    if (err) {
                        console.error('Lỗi cập nhật trưởng phòng:', err);
                    }
                });
            }
            
            res.json({ 
                success: true, 
                message: 'Thêm nhân sự thành công',
                id: id_nhanvien 
            });
        });
    });
});

app.put('/api/nhansu/:id', (req, res) => {
    const { id } = req.params;
    const { ten_nhanvien, chucvu, email_nhansu, id_phongban, trang_thai_ns } = req.body;
    
    // ✅ THÊM MỚI: Lấy thông tin cũ trước khi cập nhật
    const getOldInfoSql = 'SELECT chucvu, id_phongban FROM nhansu WHERE id_nhanvien=?';
    db.query(getOldInfoSql, [id], (err, oldInfo) => {
        if (err) {
            console.error('Lỗi lấy thông tin cũ:', err);
            return res.status(500).json({ error: 'Lỗi lấy thông tin nhân sự' });
        }
        
        if (oldInfo.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân sự' });
        }
        
        const oldChucVu = oldInfo[0].chucvu;
        const oldPhongBan = oldInfo[0].id_phongban;
        
        // ✅ THÊM MỚI: Nếu từng là trưởng phòng và đổi chức vụ, xóa khỏi phòng ban cũ
        if (oldChucVu === 'Trưởng phòng' && chucvu !== 'Trưởng phòng' && oldPhongBan) {
            const clearOldSql = 'UPDATE phongban SET truong_phong = NULL WHERE id_phongban = ?';
            db.query(clearOldSql, [oldPhongBan], (err) => {
                if (err) console.error('Lỗi xóa trưởng phòng cũ:', err);
            });
        }
        
        // ✅ THÊM MỚI: Nếu chức vụ mới là trưởng phòng, xóa trưởng phòng cũ của phòng ban mới
        if (chucvu === 'Trưởng phòng' && id_phongban) {
            const clearNewSql = 'UPDATE phongban SET truong_phong = NULL WHERE id_phongban = ?';
            db.query(clearNewSql, [id_phongban], (err) => {
                if (err) console.error('Lỗi xóa trưởng phòng cũ:', err);
            });
        }
        
        const sql = 'UPDATE nhansu SET ten_nhanvien=?, chucvu=?, email_nhansu=?, id_phongban=?, trang_thai_ns=? WHERE id_nhanvien=?';
        db.query(sql, [ten_nhanvien, chucvu, email_nhansu, id_phongban, trang_thai_ns, id], (err, result) => {
            if (err) {
                console.error('Lỗi cập nhật nhân sự:', err);
                return res.status(500).json({ error: 'Lỗi cập nhật nhân sự' });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Không tìm thấy nhân sự' });
            }
            
            // ✅ THÊM MỚI: Cập nhật trưởng phòng mới
            if (chucvu === 'Trưởng phòng' && id_phongban) {
                const updatePhongBanSql = 'UPDATE phongban SET truong_phong = ? WHERE id_phongban = ?';
                db.query(updatePhongBanSql, [ten_nhanvien, id_phongban], (err) => {
                    if (err) console.error('Lỗi cập nhật trưởng phòng:', err);
                });
            }
            
            res.json({ success: true, message: 'Cập nhật nhân sự thành công' });
        });
    });
});

app.delete('/api/nhansu/:id', (req, res) => {
    const { id } = req.params;
    
    // ✅ THÊM MỚI: Lấy thông tin trước khi xóa
    const getInfoSql = 'SELECT ten_nhanvien, chucvu, id_phongban FROM nhansu WHERE id_nhanvien=?';
    db.query(getInfoSql, [id], (err, info) => {
        if (err) {
            console.error('Lỗi lấy thông tin nhân sự:', err);
            return res.status(500).json({ error: 'Lỗi xóa nhân sự: ' + err.message });
        }
        
        if (info.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân sự với ID: ' + id });
        }
        
        const { ten_nhanvien, chucvu, id_phongban } = info[0];
        
        // ✅ THÊM MỚI: Nếu là trưởng phòng, xóa khỏi phòng ban
        if (chucvu === 'Trưởng phòng' && id_phongban) {
            const clearSql = 'UPDATE phongban SET truong_phong = NULL WHERE id_phongban = ? AND truong_phong = ?';
            db.query(clearSql, [id_phongban, ten_nhanvien], (err) => {
                if (err) console.error('Lỗi xóa trưởng phòng:', err);
            });
        }
        
        db.query('DELETE FROM nhansu WHERE id_nhanvien=?', [id], (err, result) => {
            if (err) {
                console.error('Lỗi xóa nhân sự:', err);
                return res.status(500).json({ error: 'Lỗi xóa nhân sự: ' + err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Không tìm thấy nhân sự với ID: ' + id });
            }
            
            res.json({ 
                success: true, 
                message: 'Xóa nhân sự thành công',
                affectedRows: result.affectedRows 
            });
        });
    });
});



/// ========== API GIẢNG VIÊN =========== //

app.get('/api/giangvien', (req, res) => {
    const sql = `
        SELECT g.*, k.ten_khoa 
        FROM giangvien g 
        LEFT JOIN khoa k ON g.id_khoa = k.id_khoa
        ORDER BY g.id_giangvien DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi lấy dữ liệu giảng viên:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        res.json(results);
    });
});

app.post('/api/giangvien', (req, res) => {
    const { id_giangvien, ten_giangvien, chucvu, email_giangvien, id_khoa } = req.body;
    
    if (!id_giangvien || !ten_giangvien || !email_giangvien || !id_khoa) {
        return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    
    const checkSql = 'SELECT id_giangvien FROM giangvien WHERE id_giangvien = ?';
    db.query(checkSql, [id_giangvien], (err, results) => {
        if (err) {
            console.error('Lỗi kiểm tra ID giảng viên:', err);
            return res.status(500).json({ success: false, error: 'Lỗi kiểm tra ID giảng viên' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ success: false, error: 'Mã giảng viên đã tồn tại, vui lòng chọn mã khác' });
        }
        
        // ✅ THÊM MỚI: Nếu là trưởng khoa, xóa trưởng khoa cũ trước
        if (chucvu === 'Trưởng khoa' && id_khoa) {
            const clearOldSql = 'UPDATE khoa SET truong_khoa = NULL WHERE id_khoa = ?';
            db.query(clearOldSql, [id_khoa], (err) => {
                if (err) {
                    console.error('Lỗi xóa trưởng khoa cũ:', err);
                }
            });
        }
        
        const sql = 'INSERT INTO giangvien (id_giangvien, ten_giangvien, chucvu, email_giangvien, id_khoa) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [id_giangvien, ten_giangvien, chucvu || 'Giảng viên', email_giangvien, id_khoa], (err, result) => {
            if (err) {
                console.error('Lỗi thêm giảng viên:', err);
                return res.status(500).json({ success: false, error: 'Lỗi thêm giảng viên: ' + err.message });
            }
            
            // ✅ THÊM MỚI: Tự động cập nhật trưởng khoa
            if (chucvu === 'Trưởng khoa' && id_khoa) {
                const updateKhoaSql = 'UPDATE khoa SET truong_khoa = ? WHERE id_khoa = ?';
                db.query(updateKhoaSql, [ten_giangvien, id_khoa], (err) => {
                    if (err) {
                        console.error('Lỗi cập nhật trưởng khoa:', err);
                    }
                });
            }
            
            res.json({ 
                success: true, 
                message: 'Thêm giảng viên thành công',
                id: id_giangvien 
            });
        });
    });
});

app.put('/api/giangvien/:id', (req, res) => {
    const { id } = req.params;
    const { ten_giangvien, chucvu, email_giangvien, id_khoa, trang_thai_gv } = req.body;
    
    // ✅ THÊM MỚI: Lấy thông tin cũ trước khi cập nhật
    const getOldInfoSql = 'SELECT chucvu, id_khoa FROM giangvien WHERE id_giangvien=?';
    db.query(getOldInfoSql, [id], (err, oldInfo) => {
        if (err) {
            console.error('Lỗi lấy thông tin cũ:', err);
            return res.status(500).json({ error: 'Lỗi lấy thông tin giảng viên' });
        }
        
        if (oldInfo.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy giảng viên' });
        }
        
        const oldChucVu = oldInfo[0].chucvu;
        const oldKhoa = oldInfo[0].id_khoa;
        
        // ✅ THÊM MỚI: Nếu từng là trưởng khoa và đổi chức vụ, xóa khỏi khoa cũ
        if (oldChucVu === 'Trưởng khoa' && chucvu !== 'Trưởng khoa' && oldKhoa) {
            const clearOldSql = 'UPDATE khoa SET truong_khoa = NULL WHERE id_khoa = ?';
            db.query(clearOldSql, [oldKhoa], (err) => {
                if (err) console.error('Lỗi xóa trưởng khoa cũ:', err);
            });
        }
        
        // ✅ THÊM MỚI: Nếu chức vụ mới là trưởng khoa, xóa trưởng khoa cũ của khoa mới
        if (chucvu === 'Trưởng khoa' && id_khoa) {
            const clearNewSql = 'UPDATE khoa SET truong_khoa = NULL WHERE id_khoa = ?';
            db.query(clearNewSql, [id_khoa], (err) => {
                if (err) console.error('Lỗi xóa trưởng khoa cũ:', err);
            });
        }
        
        const sql = 'UPDATE giangvien SET ten_giangvien=?, chucvu=?, email_giangvien=?, id_khoa=?, trang_thai_gv=? WHERE id_giangvien=?';
        db.query(sql, [ten_giangvien, chucvu, email_giangvien, id_khoa, trang_thai_gv, id], (err, result) => {
            if (err) {
                console.error('Lỗi cập nhật giảng viên:', err);
                return res.status(500).json({ success: false, error: 'Lỗi cập nhật giảng viên' });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, error: 'Không tìm thấy giảng viên' });
            }
            
            // ✅ THÊM MỚI: Cập nhật trưởng khoa mới
            if (chucvu === 'Trưởng khoa' && id_khoa) {
                const updateKhoaSql = 'UPDATE khoa SET truong_khoa = ? WHERE id_khoa = ?';
                db.query(updateKhoaSql, [ten_giangvien, id_khoa], (err) => {
                    if (err) console.error('Lỗi cập nhật trưởng khoa:', err);
                });
            }
            
            res.json({ success: true, message: 'Cập nhật giảng viên thành công' });
        });
    });
});

app.delete('/api/giangvien/:id', (req, res) => {
    const { id } = req.params;
    
    // ✅ THÊM MỚI: Lấy thông tin trước khi xóa
    const getInfoSql = 'SELECT ten_giangvien, chucvu, id_khoa FROM giangvien WHERE id_giangvien=?';
    db.query(getInfoSql, [id], (err, info) => {
        if (err) {
            console.error('Lỗi lấy thông tin giảng viên:', err);
            return res.status(500).json({ error: 'Lỗi xóa giảng viên: ' + err.message });
        }
        
        if (info.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy giảng viên với ID: ' + id });
        }
        
        const { ten_giangvien, chucvu, id_khoa } = info[0];
        
        // ✅ THÊM MỚI: Nếu là trưởng khoa, xóa khỏi khoa
        if (chucvu === 'Trưởng khoa' && id_khoa) {
            const clearSql = 'UPDATE khoa SET truong_khoa = NULL WHERE id_khoa = ? AND truong_khoa = ?';
            db.query(clearSql, [id_khoa, ten_giangvien], (err) => {
                if (err) console.error('Lỗi xóa trưởng khoa:', err);
            });
        }
        
        db.query('DELETE FROM giangvien WHERE id_giangvien=?', [id], (err, result) => {
            if (err) {
                console.error('Lỗi xóa giảng viên:', err);
                return res.status(500).json({ success: false, error: 'Lỗi xóa giảng viên: ' + err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, error: 'Không tìm thấy giảng viên với ID: ' + id });
            }
            
            res.json({ 
                success: true, 
                message: 'Xóa giảng viên thành công',
                affectedRows: result.affectedRows 
            });
        });
    });
});

// ====================== API KHOA ======================

app.get('/api/khoa', (req, res) => {
    console.log('📥 GET /api/khoa');
    db.query('SELECT * FROM khoa ORDER BY id_khoa DESC', (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu khoa:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} khoa`);
        res.json(results);
    });
});

app.post('/api/khoa', (req, res) => {
    console.log('📥 POST /api/khoa - Body:', req.body);
    const { id_khoa, ten_khoa, dia_chi_khoa, email_khoa, trang_thai_khoa } = req.body; // ✅ BỎ truong_khoa
    
    
    if (!id_khoa || !ten_khoa || !dia_chi_khoa || !email_khoa) {
        console.log('❌ Thiếu thông tin');
        return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    
    const checkSql = 'SELECT id_khoa FROM khoa WHERE id_khoa = ?';
    db.query(checkSql, [id_khoa], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra ID khoa:', err);
            return res.status(500).json({ success: false, error: 'Lỗi kiểm tra ID khoa' });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã khoa đã tồn tại');
            return res.status(400).json({ success: false, error: 'Mã khoa đã tồn tại, vui lòng chọn mã khác' });
        }
        
        
        const sql = 'INSERT INTO khoa (id_khoa, ten_khoa, dia_chi_khoa, email_khoa, truong_khoa, trang_thai_khoa) VALUES (?, ?, ?, ?, NULL, ?)';
        db.query(sql, [id_khoa, ten_khoa, dia_chi_khoa, email_khoa, trang_thai_khoa || 'Đang hoạt động'], (err, result) => {
            if (err) {
                console.error('❌ Lỗi thêm khoa:', err);
                return res.status(500).json({ success: false, error: 'Lỗi thêm khoa: ' + err.message });
            }
            console.log('✅ Thêm khoa thành công');
            res.json({ 
                success: true, 
                message: 'Thêm khoa thành công',
                id: id_khoa
            });
        });
    });
});

app.put('/api/khoa/:id', (req, res) => {
    const { id } = req.params;
    const { ten_khoa, dia_chi_khoa, email_khoa, truong_khoa, trang_thai_khoa } = req.body;
    
    const sql = 'UPDATE khoa SET ten_khoa=?, dia_chi_khoa=?, email_khoa=?, truong_khoa=?, trang_thai_khoa=? WHERE id_khoa=?';
    db.query(sql, [ten_khoa, dia_chi_khoa, email_khoa, truong_khoa, trang_thai_khoa, id], (err, result) => {
        if (err) {
            console.error('Lỗi cập nhật khoa:', err);
            return res.status(500).json({ success: false, error: 'Lỗi cập nhật khoa' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy khoa' });
        }
        
        res.json({ success: true, message: 'Cập nhật khoa thành công' });
    });
});

app.delete('/api/khoa/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM khoa WHERE id_khoa=?', [id], (err, result) => {
        if (err) {
            console.error('Lỗi xóa khoa:', err);
            return res.status(500).json({ success: false, error: 'Lỗi xóa khoa: ' + err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy khoa với ID: ' + id });
        }
        
        res.json({ 
            success: true, 
            message: 'Xóa khoa thành công',
            affectedRows: result.affectedRows 
        });
    });
});

// ====================== API HỌC PHẦN ======================





function processHocPhanValue(value) {
    if (!value || value.trim() === '' || 
        value.toLowerCase().trim() === 'không' || 
        value.toLowerCase().trim() === 'khong' ||
        value === 'null') {
        return null;
    }
    return value.trim();
}

// ✅ GET: Lấy danh sách học phần
app.get('/api/hocphan', (req, res) => {
    const sql = `
        SELECT 
            hp.*,
            hp_tq.ten_hocphan as ten_hp_tien_quyet,
            hp_sh.ten_hocphan as ten_hp_song_hanh,
            hp_ht.ten_hocphan as ten_hp_hoc_truoc
        FROM hocphan hp
        LEFT JOIN hocphan hp_tq ON hp.hp_tien_quyet = hp_tq.ma_hocphan
        LEFT JOIN hocphan hp_sh ON hp.hp_song_hanh = hp_sh.ma_hocphan
        LEFT JOIN hocphan hp_ht ON hp.hp_hoc_truoc = hp_ht.ma_hocphan
        ORDER BY hp.ma_hocphan DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu học phần:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} học phần`);
        res.json(results);
    });
});

// ✅ POST: Thêm học phần mới
app.post('/api/hocphan', (req, res) => {
    const { 
        ma_hocphan, 
        ten_hocphan, 
        so_tinchi,
        tin_chi_ly_thuyet, 
        tin_chi_thuc_hanh, 
        hp_tien_quyet, 
        hp_song_hanh, 
        hp_hoc_truoc
    } = req.body;
    
    console.log('📥 POST /api/hocphan - Dữ liệu nhận:', req.body);
    

    if (!ma_hocphan || !ten_hocphan) {
        console.log('❌ Thiếu mã hoặc tên học phần');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền mã và tên học phần' 
        });
    }
    

    const tienQuyet = processHocPhanValue(hp_tien_quyet);
    const songHanh = processHocPhanValue(hp_song_hanh);
    const hocTruoc = processHocPhanValue(hp_hoc_truoc);
    
    console.log('📤 Dữ liệu sau xử lý:', {
        ma_hocphan,
        ten_hocphan,
        so_tinchi: so_tinchi || 0,
        tin_chi_ly_thuyet: tin_chi_ly_thuyet || 0,
        tin_chi_thuc_hanh: tin_chi_thuc_hanh || 0,
        tienQuyet,
        songHanh,
        hocTruoc
    });
    
    const checkSql = 'SELECT ma_hocphan FROM hocphan WHERE ma_hocphan = ?';
    db.query(checkSql, [ma_hocphan], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra mã học phần:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi kiểm tra mã học phần' 
            });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã học phần đã tồn tại');
            return res.status(400).json({ 
                success: false, 
                error: 'Mã học phần đã tồn tại' 
            });
        }
        
        // ✅ INSERT với NULL thay vì chuỗi rỗng
        const sql = `INSERT INTO hocphan 
            (ma_hocphan, ten_hocphan, so_tinchi, tin_chi_ly_thuyet, tin_chi_thuc_hanh, hp_tien_quyet, hp_song_hanh, hp_hoc_truoc) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        db.query(sql, [
            ma_hocphan, 
            ten_hocphan, 
            parseInt(so_tinchi) || 0,
            parseInt(tin_chi_ly_thuyet) || 0, 
            parseInt(tin_chi_thuc_hanh) || 0, 
            tienQuyet,    // ✅ NULL hoặc mã học phần hợp lệ
            songHanh,     // ✅ NULL hoặc mã học phần hợp lệ
            hocTruoc      // ✅ NULL hoặc mã học phần hợp lệ
        ], (err, result) => {
            if (err) {
                console.error('❌ Lỗi thêm học phần:', err);
                return res.status(500).json({ 
                    success: false,
                    error: 'Lỗi thêm học phần: ' + err.message 
                });
            }
            console.log('✅ Thêm học phần thành công:', ma_hocphan);
            res.json({ 
                success: true, 
                message: 'Thêm học phần thành công',
                ma_hocphan: ma_hocphan
            });
        });
    });
});

// ✅ PUT: Cập nhật học phần
app.put('/api/hocphan/:ma', (req, res) => {
    const { ma } = req.params;
    const { 
        ten_hocphan, 
        so_tinchi,
        tin_chi_ly_thuyet, 
        tin_chi_thuc_hanh, 
        hp_tien_quyet, 
        hp_song_hanh, 
        hp_hoc_truoc
    } = req.body;
    
    console.log('📥 PUT /api/hocphan/' + ma + ' - Dữ liệu:', req.body);
    
    // ✅ Xử lý giá trị NULL
    const tienQuyet = processHocPhanValue(hp_tien_quyet);
    const songHanh = processHocPhanValue(hp_song_hanh);
    const hocTruoc = processHocPhanValue(hp_hoc_truoc);
    
    const sql = `UPDATE hocphan SET 
        ten_hocphan=?, 
        so_tinchi=?,
        tin_chi_ly_thuyet=?, 
        tin_chi_thuc_hanh=?, 
        hp_tien_quyet=?, 
        hp_song_hanh=?, 
        hp_hoc_truoc=?
        WHERE ma_hocphan=?`;
    
    db.query(sql, [
        ten_hocphan, 
        parseInt(so_tinchi) || 0,
        parseInt(tin_chi_ly_thuyet) || 0, 
        parseInt(tin_chi_thuc_hanh) || 0, 
        tienQuyet,    // ✅ NULL hoặc mã học phần hợp lệ
        songHanh,     // ✅ NULL hoặc mã học phần hợp lệ
        hocTruoc,     // ✅ NULL hoặc mã học phần hợp lệ
        ma
    ], (err, result) => {
        if (err) {
            console.error('❌ Lỗi cập nhật học phần:', err);
            return res.status(500).json({ 
                success: false,
                error: 'Lỗi cập nhật học phần: ' + err.message 
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('❌ Không tìm thấy học phần:', ma);
            return res.status(404).json({ 
                success: false, 
                error: 'Không tìm thấy học phần' 
            });
        }
        
        console.log('✅ Cập nhật học phần thành công:', ma);
        res.json({ 
            success: true, 
            message: 'Cập nhật học phần thành công' 
        });
    });
});

// ✅ DELETE: Xóa học phần
app.delete('/api/hocphan/:ma', (req, res) => {
    const { ma } = req.params;
    
    console.log('🗑️ DELETE /api/hocphan/' + ma);
    
    db.query('DELETE FROM hocphan WHERE ma_hocphan=?', [ma], (err, result) => {
        if (err) {
            console.error('❌ Lỗi xóa học phần:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi xóa học phần: ' + err.message 
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('❌ Không tìm thấy học phần:', ma);
            return res.status(404).json({ 
                success: false, 
                error: 'Không tìm thấy học phần' 
            });
        }
        
        console.log('✅ Xóa học phần thành công:', ma);
        res.json({ 
            success: true, 
            message: 'Xóa học phần thành công' 
        });
    });
});


// ====================== API KHỐI KIẾN THỨC ======================

app.get('/api/khoikienthuc', (req, res) => {
    console.log('📥 GET /api/khoikienthuc');
    db.query('SELECT * FROM khoi_kien_thuc ORDER BY ma_kkt DESC', (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu khối kiến thức:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} khối kiến thức`);
        res.json(results);
    });
});

app.post('/api/khoikienthuc', (req, res) => {
    console.log('📥 POST /api/khoikienthuc - Body:', req.body);
    const { ma_kkt, ten_kkt, tin_chi_toi_thieu, tin_chi_toi_da, loai_kkt, mo_ta_kkt } = req.body;
    
    if (!ma_kkt || !ten_kkt || !tin_chi_toi_thieu || !tin_chi_toi_da) {
        console.log('❌ Thiếu thông tin');
        return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }
    
    const checkSql = 'SELECT ma_kkt FROM khoi_kien_thuc WHERE ma_kkt = ?';
    db.query(checkSql, [ma_kkt], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra mã KKT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi kiểm tra mã KKT' });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã khối kiến thức đã tồn tại');
            return res.status(400).json({ success: false, error: 'Mã khối kiến thức đã tồn tại' });
        }
        
        const sql = 'INSERT INTO khoi_kien_thuc (ma_kkt, ten_kkt, tin_chi_toi_thieu, tin_chi_toi_da, loai_kkt, mo_ta_kkt) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [ma_kkt, ten_kkt, tin_chi_toi_thieu, tin_chi_toi_da, loai_kkt || 'Bắt buộc', mo_ta_kkt || ''], (err, result) => {
            if (err) {
                console.error('❌ Lỗi thêm KKT:', err);
                return res.status(500).json({ success: false, error: 'Lỗi thêm khối kiến thức: ' + err.message });
            }
            console.log('✅ Thêm khối kiến thức thành công');
            res.json({ 
                success: true, 
                message: 'Thêm khối kiến thức thành công',
                ma_kkt: ma_kkt
            });
        });
    });
});

app.put('/api/khoikienthuc/:ma', (req, res) => {
    const { ma } = req.params;
    const { ten_kkt, tin_chi_toi_thieu, tin_chi_toi_da, loai_kkt, mo_ta_kkt } = req.body;
    
    const sql = 'UPDATE khoi_kien_thuc SET ten_kkt=?, tin_chi_toi_thieu=?, tin_chi_toi_da=?, loai_kkt=?, mo_ta_kkt=? WHERE ma_kkt=?';
    db.query(sql, [ten_kkt, tin_chi_toi_thieu, tin_chi_toi_da, loai_kkt, mo_ta_kkt, ma], (err, result) => {
        if (err) {
            console.error('❌ Lỗi cập nhật KKT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi cập nhật KKT' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy khối kiến thức' });
        }
        
        res.json({ success: true, message: 'Cập nhật khối kiến thức thành công' });
    });
});

app.delete('/api/khoikienthuc/:ma', (req, res) => {
    const { ma } = req.params;
    
    db.query('DELETE FROM khoi_kien_thuc WHERE ma_kkt=?', [ma], (err, result) => {
        if (err) {
            console.error('❌ Lỗi xóa KKT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi xóa khối kiến thức: ' + err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy khối kiến thức' });
        }
        
        res.json({ 
            success: true, 
            message: 'Xóa khối kiến thức thành công'
        });
    });
});



// API NGÀNH HỌC
// ====================== API NGÀNH HỌC ======================

// ✅ GET: Lấy danh sách ngành học
app.get('/api/nganhhoc', (req, res) => {
    console.log('📥 GET /api/nganhhoc');
    const sql = `
        SELECT n.*, k.ten_khoa 
        FROM nganhhoc n 
        LEFT JOIN khoa k ON n.id_khoa = k.id_khoa 
        ORDER BY n.id_nganhhoc DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu ngành học:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} ngành học`);
        res.json(results);
    });
});

// ✅ POST: Thêm ngành học mới
// ✅ POST: Thêm ngành học mới
app.post('/api/nganhhoc', (req, res) => {
    console.log('📥 POST /api/nganhhoc - Body:', req.body);
    const { id_nganhhoc, ten_nganhhoc, id_khoa, tong_tin_chi_nganh, mo_ta_nganhhoc } = req.body;
    
    // Kiểm tra thông tin bắt buộc
    if (!id_nganhhoc || !ten_nganhhoc || !id_khoa) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền đầy đủ: mã ngành, tên ngành, và chọn khoa' 
        });
    }
    
    // Kiểm tra xem mã ngành đã tồn tại chưa
    const checkSql = 'SELECT id_nganhhoc FROM nganhhoc WHERE id_nganhhoc = ?';
    db.query(checkSql, [id_nganhhoc], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra mã ngành:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi kiểm tra mã ngành học' 
            });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã ngành học đã tồn tại');
            return res.status(400).json({ 
                success: false, 
                error: 'Mã ngành học đã tồn tại, vui lòng chọn mã khác' 
            });
        }
        
        // Kiểm tra khoa có tồn tại không
        const checkKhoaSql = 'SELECT id_khoa FROM khoa WHERE id_khoa = ?';
        db.query(checkKhoaSql, [id_khoa], (err, khoaResults) => {
            if (err) {
                console.error('❌ Lỗi kiểm tra khoa:', err);
                return res.status(500).json({ 
                    success: false, 
                    error: 'Lỗi kiểm tra khoa' 
                });
            }
            
            if (khoaResults.length === 0) {
                console.log('❌ Khoa không tồn tại');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Khoa được chọn không tồn tại' 
                });
            }
            
            // ✅ SỬA: Đúng 5 cột = 5 dấu ?
            const sql = `INSERT INTO nganhhoc 
                (id_nganhhoc, ten_nganhhoc, id_khoa, tong_tin_chi_nganh, mo_ta_nganhhoc) 
                VALUES (?, ?, ?, ?, ?)`;
            
            db.query(sql, [
                id_nganhhoc, 
                ten_nganhhoc, 
                id_khoa,
                tong_tin_chi_nganh || 0,
                mo_ta_nganhhoc || ''
            ], (err, result) => {
                if (err) {
                    console.error('❌ Lỗi thêm ngành học:', err);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Lỗi thêm ngành học: ' + err.message 
                    });
                }
                console.log('✅ Thêm ngành học thành công:', id_nganhhoc);
                res.json({ 
                    success: true, 
                    message: 'Thêm ngành học thành công',
                    id_nganhhoc: id_nganhhoc
                });
            });
        });
    });
});

// ✅ PUT: Cập nhật ngành học
app.put('/api/nganhhoc/:id', (req, res) => {
    const { id } = req.params;
    const { ten_nganhhoc, id_khoa, tong_tin_chi_nganh, mo_ta_nganhhoc } = req.body;
    
    console.log('📥 PUT /api/nganhhoc/' + id + ' - Dữ liệu:', req.body);
    
    // Kiểm tra thông tin bắt buộc
    if (!ten_nganhhoc || !id_khoa) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền đầy đủ tên ngành và chọn khoa' 
        });
    }
    
    // Kiểm tra khoa có tồn tại không
    const checkKhoaSql = 'SELECT id_khoa FROM khoa WHERE id_khoa = ?';
    db.query(checkKhoaSql, [id_khoa], (err, khoaResults) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra khoa:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi kiểm tra khoa' 
            });
        }
        
        if (khoaResults.length === 0) {
            console.log('❌ Khoa không tồn tại');
            return res.status(400).json({ 
                success: false, 
                error: 'Khoa được chọn không tồn tại' 
            });
        }
        
        // Cập nhật ngành học
        const sql = `UPDATE nganhhoc SET 
            ten_nganhhoc=?, 
            id_khoa=?,
            tong_tin_chi_nganh=?, 
            mo_ta_nganhhoc=?
            WHERE id_nganhhoc=?`;
        
        db.query(sql, [
            ten_nganhhoc, 
            id_khoa,
            tong_tin_chi_nganh || 0, 
            mo_ta_nganhhoc || '', 
            id
        ], (err, result) => {
            if (err) {
                console.error('❌ Lỗi cập nhật ngành học:', err);
                return res.status(500).json({ 
                    success: false,
                    error: 'Lỗi cập nhật ngành học: ' + err.message 
                });
            }
            
            if (result.affectedRows === 0) {
                console.log('❌ Không tìm thấy ngành học:', id);
                return res.status(404).json({ 
                    success: false, 
                    error: 'Không tìm thấy ngành học' 
                });
            }
            
            console.log('✅ Cập nhật ngành học thành công:', id);
            res.json({ 
                success: true, 
                message: 'Cập nhật ngành học thành công' 
            });
        });
    });
});

// ✅ DELETE: Xóa ngành học
app.delete('/api/nganhhoc/:id', (req, res) => {
    const { id } = req.params;
    
    console.log('🗑️ DELETE /api/nganhhoc/' + id);
    
    db.query('DELETE FROM nganhhoc WHERE id_nganhhoc=?', [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi xóa ngành học:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi xóa ngành học: ' + err.message 
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('❌ Không tìm thấy ngành học:', id);
            return res.status(404).json({ 
                success: false, 
                error: 'Không tìm thấy ngành học' 
            });
        }
        
        console.log('✅ Xóa ngành học thành công:', id);
        res.json({ 
            success: true, 
            message: 'Xóa ngành học thành công'
        });
    });
});

// API CTDT

// ====================== API CHƯƠNG TRÌNH ĐÀO TẠO ======================

// ✅ GET: Lấy danh sách CTĐT
app.get('/api/ctdt', (req, res) => {
    console.log('📥 GET /api/ctdt');
    const sql = `
        SELECT c.*, k.ten_khoa, COUNT(ck.ma_kkt) as so_kkt
        FROM ctdt c
        LEFT JOIN khoa k ON c.id_khoa = k.id_khoa
        LEFT JOIN ctdt_kkt ck ON c.ma_ctdt = ck.ma_ctdt
        GROUP BY c.ma_ctdt
        ORDER BY c.ma_ctdt DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} CTĐT`);
        res.json(results);
    });
});

// ✅ GET: Lấy chi tiết CTĐT
app.get('/api/ctdt/:ma', (req, res) => {
    const { ma } = req.params;
    console.log('📥 GET /api/ctdt/' + ma);
    
    // Lấy thông tin CTĐT
    const ctdtSql = 'SELECT * FROM ctdt WHERE ma_ctdt = ?';
    db.query(ctdtSql, [ma], (err, ctdtResults) => {
        if (err) {
            console.error('❌ Lỗi lấy thông tin CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        
        if (ctdtResults.length === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy CTĐT' });
        }
        
        // Lấy danh sách KKT của CTĐT
        const kktSql = `
            SELECT k.* 
            FROM khoi_kien_thuc k
            INNER JOIN ctdt_kkt ck ON k.ma_kkt = ck.ma_kkt
            WHERE ck.ma_ctdt = ?
            ORDER BY ck.stt
        `;
        db.query(kktSql, [ma], (err, kktResults) => {
            if (err) {
                console.error('❌ Lỗi lấy KKT của CTĐT:', err);
                return res.status(500).json({ success: false, error: 'Lỗi server' });
            }
            
            // ✅ THÊM MỚI: Lấy danh sách học phần cho từng KKT
            const promises = kktResults.map(kkt => {
                return new Promise((resolve, reject) => {
                    const hpSql = `
                        SELECT h.ma_hocphan, h.ten_hocphan, h.so_tinchi
                        FROM hocphan h
                        INNER JOIN ctdt_hocphan ch ON h.ma_hocphan = ch.ma_hocphan
                        WHERE ch.ma_ctdt = ? AND ch.ma_kkt = ?
                        ORDER BY ch.stt
                    `;
                    db.query(hpSql, [ma, kkt.ma_kkt], (err, hpResults) => {
                        if (err) {
                            reject(err);
                        } else {
                            kkt.hoc_phan = hpResults;
                            resolve();
                        }
                    });
                });
            });
            
            Promise.all(promises)
                .then(() => {
                    res.json({
                        success: true,
                        ctdt: ctdtResults[0],
                        khoi_kien_thuc: kktResults
                    });
                })
                .catch(err => {
                    console.error('❌ Lỗi lấy học phần:', err);
                    res.status(500).json({ success: false, error: 'Lỗi server' });
                });
        });
    });
});


// ✅ POST: Thêm CTĐT mới
app.post('/api/ctdt', (req, res) => {
    console.log('📥 POST /api/ctdt - Body:', req.body);
    const { ma_ctdt, ten_ctdt, id_khoa, trinh_do, thoi_gian_dao_tao, khoi_kien_thuc } = req.body;
    
    if (!ma_ctdt || !ten_ctdt || !id_khoa || !trinh_do || !thoi_gian_dao_tao) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm khoa)' 
        });
    }
    
    if (!khoi_kien_thuc || khoi_kien_thuc.length === 0) {
        console.log('❌ Chưa chọn khối kiến thức');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng thêm ít nhất một khối kiến thức' 
        });
    }
    
    const checkSql = 'SELECT ma_ctdt FROM ctdt WHERE ma_ctdt = ?';
    db.query(checkSql, [ma_ctdt], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra mã CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi kiểm tra mã CTĐT' });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã CTĐT đã tồn tại');
            return res.status(400).json({ success: false, error: 'Mã CTĐT đã tồn tại, vui lòng chọn mã khác' });
        }
        
        const insertCtdtSql = `INSERT INTO ctdt 
            (ma_ctdt, ten_ctdt, id_khoa, trinh_do, thoi_gian_dao_tao) 
            VALUES (?, ?, ?, ?, ?)`;
        
        db.query(insertCtdtSql, [ma_ctdt, ten_ctdt, id_khoa, trinh_do, thoi_gian_dao_tao], (err, result) => {
            if (err) {
                console.error('❌ Lỗi thêm CTĐT:', err);
                return res.status(500).json({ success: false, error: 'Lỗi thêm CTĐT: ' + err.message });
            }
            
            // Thêm KKT
            const insertKktValues = khoi_kien_thuc.map((kkt, index) => 
                [ma_ctdt, kkt.ma_kkt, index + 1]
            );
            const insertKktSql = 'INSERT INTO ctdt_kkt (ma_ctdt, ma_kkt, stt) VALUES ?';
            db.query(insertKktSql, [insertKktValues], (err) => {
                if (err) {
                    console.error('❌ Lỗi thêm KKT cho CTĐT:', err);
                    db.query('DELETE FROM ctdt WHERE ma_ctdt = ?', [ma_ctdt]);
                    return res.status(500).json({ success: false, error: 'Lỗi thêm khối kiến thức: ' + err.message });
                }
                
                // ✅ THÊM MỚI: Thêm học phần cho từng KKT
                const insertHocPhanValues = [];
                khoi_kien_thuc.forEach(kkt => {
                    if (kkt.hoc_phan && kkt.hoc_phan.length > 0) {
                        kkt.hoc_phan.forEach((hp, hpIndex) => {
                            insertHocPhanValues.push([ma_ctdt, hp.ma_hocphan, kkt.ma_kkt, hpIndex + 1]);
                        });
                    }
                });
                
                if (insertHocPhanValues.length > 0) {
                    const insertHocPhanSql = 'INSERT INTO ctdt_hocphan (ma_ctdt, ma_hocphan, ma_kkt, stt) VALUES ?';
                    db.query(insertHocPhanSql, [insertHocPhanValues], (err) => {
                        if (err) {
                            console.error('❌ Lỗi thêm học phần cho CTĐT:', err);
                            // Rollback
                            db.query('DELETE FROM ctdt_kkt WHERE ma_ctdt = ?', [ma_ctdt]);
                            db.query('DELETE FROM ctdt WHERE ma_ctdt = ?', [ma_ctdt]);
                            return res.status(500).json({ success: false, error: 'Lỗi thêm học phần: ' + err.message });
                        }
                        
                        console.log('✅ Thêm CTĐT thành công:', ma_ctdt);
                        res.json({ success: true, message: 'Thêm CTĐT thành công', ma_ctdt: ma_ctdt });
                    });
                } else {
                    console.log('✅ Thêm CTĐT thành công (không có học phần):', ma_ctdt);
                    res.json({ success: true, message: 'Thêm CTĐT thành công', ma_ctdt: ma_ctdt });
                }
            });
        });
    });
});

// ✅ PUT: Cập nhật CTĐT
app.put('/api/ctdt/:ma', (req, res) => {
    const { ma } = req.params;
    const { ten_ctdt, id_khoa, trinh_do, thoi_gian_dao_tao, khoi_kien_thuc } = req.body;
    
    console.log('📥 PUT /api/ctdt/' + ma + ' - Dữ liệu:', req.body);
    
    if (!ten_ctdt || !id_khoa || !trinh_do || !thoi_gian_dao_tao) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm khoa)' });
    }
    
    const updateSql = `UPDATE ctdt SET 
        ten_ctdt=?, 
        id_khoa=?,
        trinh_do=?, 
        thoi_gian_dao_tao=?
        WHERE ma_ctdt=?`;
    
    db.query(updateSql, [ten_ctdt, id_khoa, trinh_do, thoi_gian_dao_tao, ma], (err, result) => {
        if (err) {
            console.error('❌ Lỗi cập nhật CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi cập nhật CTĐT: ' + err.message });
        }
        
        if (result.affectedRows === 0) {
            console.log('❌ Không tìm thấy CTĐT:', ma);
            return res.status(404).json({ success: false, error: 'Không tìm thấy CTĐT' });
        }
        
        if (khoi_kien_thuc && khoi_kien_thuc.length > 0) {
            // Xóa KKT và học phần cũ
            db.query('DELETE FROM ctdt_hocphan WHERE ma_ctdt = ?', [ma], (err) => {
                if (err) {
                    console.error('❌ Lỗi xóa học phần cũ:', err);
                    return res.status(500).json({ success: false, error: 'Lỗi cập nhật' });
                }
                
                db.query('DELETE FROM ctdt_kkt WHERE ma_ctdt = ?', [ma], (err) => {
                    if (err) {
                        console.error('❌ Lỗi xóa KKT cũ:', err);
                        return res.status(500).json({ success: false, error: 'Lỗi cập nhật khối kiến thức' });
                    }
                    
                    // Thêm KKT mới
                    const insertKktValues = khoi_kien_thuc.map((kkt, index) => 
                        [ma, kkt.ma_kkt, index + 1]
                    );
                    
                    const insertKktSql = 'INSERT INTO ctdt_kkt (ma_ctdt, ma_kkt, stt) VALUES ?';
                    db.query(insertKktSql, [insertKktValues], (err) => {
                        if (err) {
                            console.error('❌ Lỗi thêm KKT mới:', err);
                            return res.status(500).json({ success: false, error: 'Lỗi cập nhật khối kiến thức: ' + err.message });
                        }
                        
                        // ✅ THÊM MỚI: Thêm học phần mới
                        const insertHocPhanValues = [];
                        khoi_kien_thuc.forEach(kkt => {
                            if (kkt.hoc_phan && kkt.hoc_phan.length > 0) {
                                kkt.hoc_phan.forEach((hp, hpIndex) => {
                                    insertHocPhanValues.push([ma, hp.ma_hocphan, kkt.ma_kkt, hpIndex + 1]);
                                });
                            }
                        });
                        
                        if (insertHocPhanValues.length > 0) {
                            const insertHocPhanSql = 'INSERT INTO ctdt_hocphan (ma_ctdt, ma_hocphan, ma_kkt, stt) VALUES ?';
                            db.query(insertHocPhanSql, [insertHocPhanValues], (err) => {
                                if (err) {
                                    console.error('❌ Lỗi thêm học phần mới:', err);
                                    return res.status(500).json({ success: false, error: 'Lỗi cập nhật học phần: ' + err.message });
                                }
                                
                                console.log('✅ Cập nhật CTĐT thành công:', ma);
                                res.json({ success: true, message: 'Cập nhật CTĐT thành công' });
                            });
                        } else {
                            console.log('✅ Cập nhật CTĐT thành công (không có học phần):', ma);
                            res.json({ success: true, message: 'Cập nhật CTĐT thành công' });
                        }
                    });
                });
            });
        } else {
            console.log('✅ Cập nhật CTĐT thành công:', ma);
            res.json({ success: true, message: 'Cập nhật CTĐT thành công' });
        }
    });
});

// ✅ DELETE: Xóa CTĐT
app.delete('/api/ctdt/:ma', (req, res) => {
    const { ma } = req.params;
    
    console.log('🗑️ DELETE /api/ctdt/' + ma);
    
    // Xóa học phần trước
    db.query('DELETE FROM ctdt_hocphan WHERE ma_ctdt=?', [ma], (err) => {
        if (err) {
            console.error('❌ Lỗi xóa học phần của CTĐT:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi xóa CTĐT: ' + err.message 
            });
        }
        
        // Xóa các KKT liên quan
        db.query('DELETE FROM ctdt_kkt WHERE ma_ctdt=?', [ma], (err) => {
            if (err) {
                console.error('❌ Lỗi xóa KKT của CTĐT:', err);
                return res.status(500).json({ 
                    success: false, 
                    error: 'Lỗi xóa CTĐT: ' + err.message 
                });
            }
            
            // Xóa CTĐT
            db.query('DELETE FROM ctdt WHERE ma_ctdt=?', [ma], (err, result) => {
                if (err) {
                    console.error('❌ Lỗi xóa CTĐT:', err);
                    return res.status(500).json({
                        success: false, 
                        error: 'Lỗi xóa CTĐT: ' + err.message 
                    });
                }
                
                if (result.affectedRows === 0) {
                    console.log('❌ Không tìm thấy CTĐT:', ma);
                    return res.status(404).json({ 
                        success: false, 
                        error: 'Không tìm thấy CTĐT' 
                    });
                }
                
                console.log('✅ Xóa CTĐT thành công:', ma);
                res.json({ 
                    success: true, 
                    message: 'Xóa CTĐT thành công'
                });
            });
        });
    });
});



// ====================== API KHÓA HỌC ======================

// GET: Lấy danh sách khóa học
app.get('/api/khoahoc', (req, res) => {
    console.log('📥 GET /api/khoahoc');
    const sql = `
        SELECT k.*, c.ten_ctdt 
        FROM khoahoc k 
        LEFT JOIN ctdt c ON k.ma_ctdt = c.ma_ctdt 
        ORDER BY k.nam_bat_dau DESC, k.id_khoahoc DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu khóa học:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        console.log(`✅ Trả về ${results.length} khóa học`);
        res.json(results);
    });
});

// POST: Thêm khóa học mới
app.post('/api/khoahoc', (req, res) => {
    console.log('📥 POST /api/khoahoc - Body:', req.body);
    const { id_khoahoc, ten_khoahoc, nam_bat_dau, nam_ket_thuc, ma_ctdt, trang_thai_khoahoc } = req.body;
    
    if (!id_khoahoc || !ten_khoahoc || !nam_bat_dau || !nam_ket_thuc || !ma_ctdt) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền đầy đủ thông tin bắt buộc' 
        });
    }
    
    // Kiểm tra mã khóa học đã tồn tại chưa
    const checkSql = 'SELECT id_khoahoc FROM khoahoc WHERE id_khoahoc = ?';
    db.query(checkSql, [id_khoahoc], (err, results) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra mã khóa học:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi kiểm tra mã khóa học' 
            });
        }
        
        if (results.length > 0) {
            console.log('❌ Mã khóa học đã tồn tại');
            return res.status(400).json({ 
                success: false, 
                error: 'Mã khóa học đã tồn tại, vui lòng chọn mã khác' 
            });
        }
        
        // Kiểm tra CTĐT có tồn tại không
        const checkCTDTSql = 'SELECT ma_ctdt FROM ctdt WHERE ma_ctdt = ?';
        db.query(checkCTDTSql, [ma_ctdt], (err, ctdtResults) => {
            if (err) {
                console.error('❌ Lỗi kiểm tra CTĐT:', err);
                return res.status(500).json({ 
                    success: false, 
                    error: 'Lỗi kiểm tra CTĐT' 
                });
            }
            
            if (ctdtResults.length === 0) {
                console.log('❌ CTĐT không tồn tại');
                return res.status(400).json({ 
                    success: false, 
                    error: 'Chương trình đào tạo không tồn tại' 
                });
            }
            
            // Thêm khóa học
            const sql = `INSERT INTO khoahoc 
                (id_khoahoc, ten_khoahoc, nam_bat_dau, nam_ket_thuc, ma_ctdt, trang_thai_khoahoc) 
                VALUES (?, ?, ?, ?, ?, ?)`;
            
            db.query(sql, [
                id_khoahoc, 
                ten_khoahoc, 
                nam_bat_dau, 
                nam_ket_thuc, 
                ma_ctdt, 
                trang_thai_khoahoc || 'Chưa bắt đầu'
            ], (err, result) => {
                if (err) {
                    console.error('❌ Lỗi thêm khóa học:', err);
                    return res.status(500).json({ 
                        success: false,
                        error: 'Lỗi thêm khóa học: ' + err.message 
                    });
                }
                console.log('✅ Thêm khóa học thành công:', id_khoahoc);
                res.json({ 
                    success: true, 
                    message: 'Thêm khóa học thành công',
                    id_khoahoc: id_khoahoc
                });
            });
        });
    });
});

// PUT: Cập nhật khóa học
app.put('/api/khoahoc/:id', (req, res) => {
    const { id } = req.params;
    const { ten_khoahoc, nam_bat_dau, nam_ket_thuc, ma_ctdt, trang_thai_khoahoc } = req.body;
    
    console.log('📥 PUT /api/khoahoc/' + id + ' - Dữ liệu:', req.body);
    
    if (!ten_khoahoc || !nam_bat_dau || !nam_ket_thuc || !ma_ctdt) {
        console.log('❌ Thiếu thông tin bắt buộc');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng điền đầy đủ thông tin bắt buộc' 
        });
    }
    
    // Kiểm tra CTĐT có tồn tại không
    const checkCTDTSql = 'SELECT ma_ctdt FROM ctdt WHERE ma_ctdt = ?';
    db.query(checkCTDTSql, [ma_ctdt], (err, ctdtResults) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra CTĐT:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi kiểm tra CTĐT' 
            });
        }
        
        if (ctdtResults.length === 0) {
            console.log('❌ CTĐT không tồn tại');
            return res.status(400).json({ 
                success: false, 
                error: 'Chương trình đào tạo không tồn tại' 
            });
        }
        
        // Cập nhật khóa học
        const sql = `UPDATE khoahoc SET 
            ten_khoahoc=?, 
            nam_bat_dau=?, 
            nam_ket_thuc=?, 
            ma_ctdt=?, 
            trang_thai_khoahoc=?
            WHERE id_khoahoc=?`;
        
        db.query(sql, [
            ten_khoahoc, 
            nam_bat_dau, 
            nam_ket_thuc, 
            ma_ctdt, 
            trang_thai_khoahoc,
            id
        ], (err, result) => {
            if (err) {
                console.error('❌ Lỗi cập nhật khóa học:', err);
                return res.status(500).json({ 
                    success: false,
                    error: 'Lỗi cập nhật khóa học: ' + err.message 
                });
            }
            
            if (result.affectedRows === 0) {
                console.log('❌ Không tìm thấy khóa học:', id);
                return res.status(404).json({ 
                    success: false, 
                    error: 'Không tìm thấy khóa học' 
                });
            }
            
            console.log('✅ Cập nhật khóa học thành công:', id);
            res.json({ 
                success: true, 
                message: 'Cập nhật khóa học thành công' 
            });
        });
    });
});

// DELETE: Xóa khóa học
app.delete('/api/khoahoc/:id', (req, res) => {
    const { id } = req.params;
    
    console.log('🗑️ DELETE /api/khoahoc/' + id);
    
    db.query('DELETE FROM khoahoc WHERE id_khoahoc=?', [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi xóa khóa học:', err);
            return res.status(500).json({ 
                success: false, 
                error: 'Lỗi xóa khóa học: ' + err.message 
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('❌ Không tìm thấy khóa học:', id);
            return res.status(404).json({ 
                success: false, 
                error: 'Không tìm thấy khóa học' 
            });
        }
        
        console.log('✅ Xóa khóa học thành công:', id);
        res.json({ 
            success: true, 
            message: 'Xóa khóa học thành công'
        });
    });
});


// ====================== API HỌC PHÍ ======================

// GET: Lấy danh sách cấu hình học phí với tính toán tự động
app.get('/api/hocphi', (req, res) => {
    console.log('📥 GET /api/hocphi');
    const sql = `
        SELECT 
            h.*,
            c.ten_ctdt, 
            c.trinh_do, 
            c.thoi_gian_dao_tao
        FROM hocphi_config h
        INNER JOIN ctdt c ON h.ma_ctdt = c.ma_ctdt
        ORDER BY h.nam_hoc DESC, h.id_hocphi DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy dữ liệu học phí:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        
        // ✅ Tính toán tổng tín chỉ và học phí cho từng CTĐT
        const promises = results.map(row => {
            return new Promise((resolve) => {
                const kktSql = `
                    SELECT SUM(k.tin_chi_toi_thieu) as tong_tin_chi_toi_thieu,
                           SUM(k.tin_chi_toi_da) as tong_tin_chi_toi_da
                    FROM khoi_kien_thuc k
                    INNER JOIN ctdt_kkt ck ON k.ma_kkt = ck.ma_kkt
                    WHERE ck.ma_ctdt = ?
                `;
                db.query(kktSql, [row.ma_ctdt], (err, kktResults) => {
                    if (!err && kktResults.length > 0) {
                        row.tong_tin_chi_toi_thieu = kktResults[0].tong_tin_chi_toi_thieu || 0;
                        row.tong_tin_chi_toi_da = kktResults[0].tong_tin_chi_toi_da || 0;
                        row.hoc_phi_toi_thieu = row.tong_tin_chi_toi_thieu * (row.gia_tin_chi || 0);
                        row.hoc_phi_toi_da = row.tong_tin_chi_toi_da * (row.gia_tin_chi || 0);
                    } else {
                        row.tong_tin_chi_toi_thieu = 0;
                        row.tong_tin_chi_toi_da = 0;
                        row.hoc_phi_toi_thieu = 0;
                        row.hoc_phi_toi_da = 0;
                    }
                    resolve();
                });
            });
        });
        
        Promise.all(promises).then(() => {
            console.log(`✅ Trả về ${results.length} cấu hình học phí`);
            res.json(results);
        });
    });
});

// GET: Tính học phí cho CTĐT
app.get('/api/hocphi/tinh/:ma_ctdt', (req, res) => {
    const { ma_ctdt } = req.params;
    console.log('📥 GET /api/hocphi/tinh/' + ma_ctdt);
    
    // Lấy thông tin CTĐT
    const ctdtSql = `SELECT * FROM ctdt WHERE ma_ctdt = ?`;
    
    db.query(ctdtSql, [ma_ctdt], (err, ctdtResults) => {
        if (err) {
            console.error('❌ Lỗi lấy thông tin CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        
        if (ctdtResults.length === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy CTĐT' });
        }
        
        // Lấy danh sách KKT
        const kktSql = `
            SELECT k.ma_kkt, k.ten_kkt, k.tin_chi_toi_thieu, k.tin_chi_toi_da, k.loai_kkt
            FROM khoi_kien_thuc k
            INNER JOIN ctdt_kkt ck ON k.ma_kkt = ck.ma_kkt
            WHERE ck.ma_ctdt = ?
            ORDER BY ck.stt
        `;
        
        db.query(kktSql, [ma_ctdt], (err, kktResults) => {
            if (err) {
                console.error('❌ Lỗi lấy KKT:', err);
                return res.status(500).json({ success: false, error: 'Lỗi server' });
            }
            
            res.json({
                success: true,
                ctdt: ctdtResults[0],
                khoi_kien_thuc: kktResults
            });
        });
    });
});



// ✅ GET: Lấy danh sách CTĐT với tính toán tín chỉ (dùng cho form học phí)
app.get('/api/hocphi/ctdt-list', (req, res) => {
    console.log('📥 GET /api/hocphi/ctdt-list');
    const sql = 'SELECT * FROM ctdt ORDER BY ma_ctdt';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Lỗi lấy danh sách CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi server' });
        }
        
        // Tính tổng tín chỉ cho từng CTĐT
        const promises = results.map(ctdt => {
            return new Promise((resolve) => {
                const kktSql = `
                    SELECT SUM(k.tin_chi_toi_thieu) as tong_tin_chi_toi_thieu,
                           SUM(k.tin_chi_toi_da) as tong_tin_chi_toi_da
                    FROM khoi_kien_thuc k
                    INNER JOIN ctdt_kkt ck ON k.ma_kkt = ck.ma_kkt
                    WHERE ck.ma_ctdt = ?
                `;
                db.query(kktSql, [ctdt.ma_ctdt], (err, kktResults) => {
                    if (!err && kktResults.length > 0) {
                        ctdt.tong_tin_chi_toi_thieu = kktResults[0].tong_tin_chi_toi_thieu || 0;
                        ctdt.tong_tin_chi_toi_da = kktResults[0].tong_tin_chi_toi_da || 0;
                    } else {
                        ctdt.tong_tin_chi_toi_thieu = 0;
                        ctdt.tong_tin_chi_toi_da = 0;
                    }
                    resolve();
                });
            });
        });
        
        Promise.all(promises).then(() => {
            console.log(`✅ Trả về ${results.length} CTĐT với tính toán tín chỉ`);
            res.json(results);
        });
    });
});

// POST: Thêm/Cập nhật cấu hình học phí
app.post('/api/hocphi', (req, res) => {
    console.log('📥 POST /api/hocphi - Body:', req.body);
    const { ma_ctdt, nam_hoc, gia_tin_chi, ghi_chu } = req.body;
    
    if (!ma_ctdt || !nam_hoc || !gia_tin_chi || gia_tin_chi <= 0) {
        console.log('❌ Dữ liệu không hợp lệ');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng chọn CTĐT, năm học và nhập giá tín chỉ hợp lệ (> 0)' 
        });
    }
    
    // Kiểm tra CTĐT có tồn tại không
    const checkCTDTSql = 'SELECT ma_ctdt FROM ctdt WHERE ma_ctdt = ?';
    db.query(checkCTDTSql, [ma_ctdt], (err, ctdtResults) => {
        if (err) {
            console.error('❌ Lỗi kiểm tra CTĐT:', err);
            return res.status(500).json({ success: false, error: 'Lỗi kiểm tra CTĐT' });
        }
        
        if (ctdtResults.length === 0) {
            return res.status(404).json({ success: false, error: 'CTĐT không tồn tại' });
        }
        
        // Kiểm tra đã có cấu hình cho năm học này chưa
        const checkSql = 'SELECT id_hocphi FROM hocphi_config WHERE ma_ctdt = ? AND nam_hoc = ?';
        db.query(checkSql, [ma_ctdt, nam_hoc], (err, results) => {
            if (err) {
                console.error('❌ Lỗi kiểm tra cấu hình:', err);
                return res.status(500).json({ success: false, error: 'Lỗi kiểm tra cấu hình' });
            }
            
            if (results.length > 0) {
                // Cập nhật
                const updateSql = 'UPDATE hocphi_config SET gia_tin_chi = ?, ghi_chu = ? WHERE ma_ctdt = ? AND nam_hoc = ?';
                db.query(updateSql, [gia_tin_chi, ghi_chu || null, ma_ctdt, nam_hoc], (err) => {
                    if (err) {
                        console.error('❌ Lỗi cập nhật học phí:', err);
                        return res.status(500).json({ success: false, error: 'Lỗi cập nhật học phí' });
                    }
                    console.log('✅ Cập nhật học phí thành công');
                    res.json({ success: true, message: 'Cập nhật học phí thành công' });
                });
            } else {
                // Thêm mới
                const insertSql = 'INSERT INTO hocphi_config (ma_ctdt, nam_hoc, gia_tin_chi, ghi_chu) VALUES (?, ?, ?, ?)';
                db.query(insertSql, [ma_ctdt, nam_hoc, gia_tin_chi, ghi_chu || null], (err) => {
                    if (err) {
                        console.error('❌ Lỗi thêm học phí:', err);
                        return res.status(500).json({ success: false, error: 'Lỗi thêm học phí' });
                    }
                    console.log('✅ Thêm học phí thành công');
                    res.json({ success: true, message: 'Thêm học phí thành công' });
                });
            }
        });
    });
});

// PUT: Cập nhật học phí
app.put('/api/hocphi/:id', (req, res) => {
    const { id } = req.params;
    const { nam_hoc, gia_tin_chi, ghi_chu } = req.body;
    
    console.log('📥 PUT /api/hocphi/' + id + ' - Dữ liệu:', req.body);
    
    if (!nam_hoc || !gia_tin_chi || gia_tin_chi <= 0) {
        console.log('❌ Dữ liệu không hợp lệ');
        return res.status(400).json({ 
            success: false, 
            error: 'Vui lòng nhập năm học và giá tín chỉ hợp lệ (> 0)' 
        });
    }
    
    const sql = 'UPDATE hocphi_config SET nam_hoc = ?, gia_tin_chi = ?, ghi_chu = ? WHERE id_hocphi = ?';
    db.query(sql, [nam_hoc, gia_tin_chi, ghi_chu || null, id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi cập nhật học phí:', err);
            return res.status(500).json({ success: false, error: 'Lỗi cập nhật học phí' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy cấu hình học phí' });
        }
        
        console.log('✅ Cập nhật học phí thành công');
        res.json({ success: true, message: 'Cập nhật học phí thành công' });
    });
});

// DELETE: Xóa cấu hình học phí
app.delete('/api/hocphi/:id', (req, res) => {
    const { id } = req.params;
    console.log('🗑️ DELETE /api/hocphi/' + id);
    
    db.query('DELETE FROM hocphi_config WHERE id_hocphi = ?', [id], (err, result) => {
        if (err) {
            console.error('❌ Lỗi xóa học phí:', err);
            return res.status(500).json({ success: false, error: 'Lỗi xóa học phí' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy cấu hình học phí' });
        }
        
        console.log('✅ Xóa học phí thành công');
        res.json({ success: true, message: 'Xóa học phí thành công' });
    });
});

// ====================== KHỞI ĐỘNG SERVER ======================

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`📱 Mở trình duyệt và truy cập: http://localhost:${PORT}`);
    console.log('='.repeat(50));
});