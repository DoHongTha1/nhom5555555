const mysql = require('mysql2');

// Thông tin kết nối MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tienquynh!1312'  // Thay đổi mật khẩu của bạn
});

console.log('🔗 Đang kết nối MySQL...');

connection.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối MySQL:', err.message);
        console.log('\n📋 Hướng dẫn khắc phục:');
        console.log('1. Kiểm tra MySQL có chạy không');
        console.log('2. Kiểm tra mật khẩu root');
        console.log('3. Cập nhật mật khẩu trong file này');
        process.exit(1);
    }
    
    console.log('✅ Kết nối MySQL thành công!');
    
    // Tạo database
    connection.query('CREATE DATABASE IF NOT EXISTS qldt', (err) => {
        if (err) {
            console.error('❌ Lỗi tạo database:', err.message);
            process.exit(1);
        }
        
        console.log('✅ Database qldt đã được tạo!');
        
        // Sử dụng database
        connection.query('USE qldt', (err) => {
            if (err) {
                console.error('❌ Lỗi sử dụng database:', err.message);
                process.exit(1);
            }
            
            console.log('✅ Đang sử dụng database qldt');
            
            // Đọc và chạy file database.sql
            const fs = require('fs');
            const sqlContent = fs.readFileSync('database.sql', 'utf8');
            
            // Chia thành các câu lệnh SQL
            const statements = sqlContent.split(';').filter(stmt => stmt.trim());
            
            console.log('📝 Đang tạo bảng và dữ liệu...');
            
            let completed = 0;
            statements.forEach((statement, index) => {
                if (statement.trim()) {
                    connection.query(statement, (err) => {
                        if (err) {
                            console.error(`❌ Lỗi câu lệnh ${index + 1}:`, err.message);
                        } else {
                            completed++;
                            console.log(`✅ Câu lệnh ${index + 1} hoàn thành`);
                        }
                        
                        if (completed === statements.length) {
                            console.log('\n🎉 HOÀN THÀNH! Database đã sẵn sàng!');
                            console.log('🚀 Bây giờ bạn có thể chạy: node app.js');
                            connection.end();
                        }
                    });
                }
            });
        });
    });
});
