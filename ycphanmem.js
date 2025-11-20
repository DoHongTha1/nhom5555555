document.addEventListener('DOMContentLoaded', function () {
    console.log('Hệ thống quản lý đào tạo đã khởi tạo thành công!');
    showinfo('dashboard');

    // Tải dữ liệu từ database khi khởi động
    loadPhongBanData();
    loadNhanSuData();
    loadGiangVienData();
    loadHocPhanData();
    loadKhoaData();
    loadKKTData();
    loadNganhHocData();
    loadCTDTData();
    loadKhoaHocData();
    loadHocPhiData();

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.nav-link') && !event.target.closest('.drop-items')) {
            closeAllDropdowns();
        }
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.school-item')) {
            document.querySelectorAll('.school-card').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.school-dropdown').forEach(d => d.classList.remove('show'));
        }
    });

    // Gán sự kiện cho các nút
    const addPhongBanBtn = document.querySelector('.themphongban');
    if (addPhongBanBtn) addPhongBanBtn.addEventListener('click', showPhongBanModal);

    const searchPhongBanBtn = document.querySelector('#phongban .search-btn');
    if (searchPhongBanBtn) searchPhongBanBtn.addEventListener('click', searchPhongBan);

    const searchPhongBanInput = document.querySelector('#phongban .search-bar input');
    if (searchPhongBanInput) {
        searchPhongBanInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchPhongBan();
        });
    }

    const addNhanSuBtn = document.querySelector('.themnhansu');
    if (addNhanSuBtn) addNhanSuBtn.addEventListener('click', addNhanSu);

    const searchNhanSuBtn = document.querySelector('#qlnhansu .search-btn');
    if (searchNhanSuBtn) searchNhanSuBtn.addEventListener('click', searchNhanSu);

    const searchNhanSuInput = document.querySelector('#qlnhansu .search-bar input');
    if (searchNhanSuInput) {
        searchNhanSuInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchNhanSu();
        });
    }


    const addGiangVienBtn = document.querySelector('.themgiangvien');
    if (addGiangVienBtn) addGiangVienBtn.addEventListener('click', showGiangVienModal);

    const searchGiangVienBtn = document.querySelector('#qlgiangvien .search-btn');
    if (searchGiangVienBtn) searchGiangVienBtn.addEventListener('click', searchGiangVien);

    const searchGiangVienInput = document.querySelector('#qlgiangvien .search-bar input');
    if (searchGiangVienInput) {
        searchGiangVienInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchGiangVien();
        });
    }
    

    const addKKTBtn = document.querySelector('.themkkt');
    if (addKKTBtn) addKKTBtn.addEventListener('click', showKKTModal);

    const searchKKTBtn = document.querySelector('#qlkkt .search-btn');
    if (searchKKTBtn) searchKKTBtn.addEventListener('click', searchKKT);

    const searchKKTInput = document.querySelector('#qlkkt .search-bar input');
    if (searchKKTInput) {
        searchKKTInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchKKT();
        });
    }

    
    const addKhoaBtn = document.querySelector('.themKhoa');
    if (addKhoaBtn) addKhoaBtn.addEventListener('click', showKhoaModal);

    const searchKhoaBtn = document.querySelector('#khoa .search-btn');
    if (searchKhoaBtn) searchKhoaBtn.addEventListener('click', searchKhoa);

    const searchKhoaInput = document.querySelector('#khoa .search-bar input');
    if (searchKhoaInput) {
        searchKhoaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchKhoa();
        });
    }

    const addHocPhanBtn = document.querySelector('.themhocphan');
    if (addHocPhanBtn) addHocPhanBtn.addEventListener('click', showHocPhanModal);

    const searchHocPhanBtn = document.querySelector('#qlhocphan .search-btn');
    if (searchHocPhanBtn) searchHocPhanBtn.addEventListener('click', searchHocPhan);

    const searchHocPhanInput = document.querySelector('#qlhocphan .search-bar input');
    if (searchHocPhanInput) {
        searchHocPhanInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchHocPhan();
        });
    }

    const addNganhHocBtn = document.querySelector('.themnganhhoc');
    if (addNganhHocBtn) addNganhHocBtn.addEventListener('click', addNganhHoc);

    const searchNganhHocBtn = document.querySelector('#qlnganhhoc .search-btn');
    if (searchNganhHocBtn) searchNganhHocBtn.addEventListener('click', searchNganhHoc);

    const searchNganhHocInput = document.querySelector('#qlnganhhoc .search-bar input');
    if (searchNganhHocInput) {
    searchNganhHocInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchNganhHoc();
    });
    }
    
    const addCTDTBtn = document.querySelector('.themctdt');
    if (addCTDTBtn) addCTDTBtn.addEventListener('click', showCTDTModal);

    const searchCTDTBtn = document.querySelector('#qlctdt .search-btn');
    if (searchCTDTBtn) searchCTDTBtn.addEventListener('click', searchCTDT);

    const searchCTDTInput = document.querySelector('#qlctdt .search-bar input');
    if (searchCTDTInput) {
        searchCTDTInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchCTDT();
        });
    }


    const addKhoaHocBtn = document.querySelector('.themkhoahoc');
    if (addKhoaHocBtn) addKhoaHocBtn.addEventListener('click', showKhoaHocModal);

    const searchKhoaHocBtn = document.querySelector('#qlkhoahoc .search-btn');
    if (searchKhoaHocBtn) searchKhoaHocBtn.addEventListener('click', searchKhoaHoc);

    const searchKhoaHocInput = document.querySelector('#qlkhoahoc .search-bar input');
    if (searchKhoaHocInput) {
    searchKhoaHocInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchKhoaHoc();
    });
}
});


// ========== NAVIGATION FUNCTIONS ==========

function showinfo(sectionId) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => section.classList.remove('section-active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('section-active');
        console.log(`Đã chuyển đến section: ${sectionId}`);
    } else {
        console.warn(`Không tìm thấy section với ID: ${sectionId}`);
        createNewSection(sectionId);
    }

    updateNavActive(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDropDown(dropdownId) {
    let itemsId = '';
    switch (dropdownId) {
        case 'qltochuc-dropdown':
            itemsId = 'tochuc-items';
            break;
        case 'xaydungctdt-dropdown':
            itemsId = 'ctdt-items';
            break;
        case 'quanlynhansu-dropdown' :
            itemsId = 'nhansu-items';
            break
        default:
            console.warn(`Unknown dropdown ID: ${dropdownId}`);
            return;
    }

    const dropItems = document.getElementById(itemsId);
    const navLink = dropItems ? dropItems.previousElementSibling : null;

    if (dropItems && navLink) {
        if (dropItems.style.display === 'flex') {
            dropItems.style.display = 'none';
            navLink.classList.remove('active');
        } else {
            closeAllDropdowns();
            dropItems.style.display = 'flex';
            navLink.classList.add('active');
        }
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.drop-items').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

function updateNavActive(sectionId) {
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => link.classList.remove('active'));

    const targetNavLink = document.querySelector(`[onclick*="${sectionId}"]`);
    if (targetNavLink && targetNavLink.classList.contains('nav-link')) {
        targetNavLink.classList.add('active');
    }
}

function toggleSchoolDropdown(card, schoolId) {
    const dropdown = document.getElementById(schoolId + '-dropdown');
    const isActive = card.classList.contains('active');

    document.querySelectorAll('.school-card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.school-dropdown').forEach(d => d.classList.remove('show'));

    if (!isActive) {
        card.classList.add('active');
        dropdown.classList.add('show');
    }
}

function toggleSchoolDepartmentInfo(departmentItem, departmentId) {
    event.stopPropagation();
    const isActive = departmentItem.classList.contains('active');
    const parentDropdown = departmentItem.closest('.school-dropdown');
    
    parentDropdown.querySelectorAll('.department-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        departmentItem.classList.add('active');
    }
}

function createNewSection(sectionId) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const newSection = document.createElement('div');
        newSection.id = sectionId;
        newSection.className = 'section section-active';
        newSection.innerHTML = `
            <h2>${getSectionTitle(sectionId)}</h2>
            <p>Nội dung ${getSectionTitle(sectionId).toLowerCase()} sẽ được hiển thị ở đây...</p>
        `;
        mainContent.appendChild(newSection);
    }
}

function getSectionTitle(sectionId) {
    const titles = {
        'dashboard': 'Tổng quan',
        'sodo': 'Sơ đồ tổ chức',
        'phongban': 'Thông tin phòng ban',
        'qlnhansu': 'Quản lý nhân sự',
        'qlgiangvien' : 'Quản lý giảng viên',
        'qlctdt': 'Quản lý chương trình đào tạo',
        'qlkkt': 'Quản lý khối kiến thức',
        'qlnganhhoc': 'Quản lý ngành học',
        'qlkhoahoc': 'Quản lý khóa học',
        'qlhocphan': 'Quản lý học phần'
    };
    return titles[sectionId] || 'Không xác định';
}

// ========== PHÒNG BAN FUNCTIONS ==========

function editPhongBan(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maPhongBan: cells[0].textContent.trim(),
        tenPhongBan: cells[1].textContent.trim(),
        diaChi: cells[2].textContent.trim(),
        email: cells[3].textContent.trim(),
        truongPhong: cells[4].textContent.trim(),
        trangThai: cells[5].textContent.trim()
    };

    const modal = createModal('phongban-edit-modal', 'Chỉnh Sửa Thông Tin Phòng Ban', `
        <form id="phongBanEditForm">
            <div class="form-group">
                <label for="pbMaEdit">Mã Phòng Ban:</label>
                <input type="text" id="pbMaEdit" value="${originalData.maPhongBan}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
            </div>
            <div class="form-group">
                <label for="pbTenEdit">Tên Phòng Ban:</label>
                <input type="text" id="pbTenEdit" value="${originalData.tenPhongBan}" placeholder="Nhập tên phòng ban" required>
            </div>
            <div class="form-group">
                <label for="pbDiaChiEdit">Địa Chỉ:</label>
                <input type="text" id="pbDiaChiEdit" value="${originalData.diaChi}" placeholder="Nhập địa chỉ" required>
            </div>
            <div class="form-group">
                <label for="pbEmailEdit">Email Phòng:</label>
                <input type="email" id="pbEmailEdit" value="${originalData.email}" placeholder="Nhập email phòng ban" required>
            </div>
            
            <!-- ✅ THAY ĐỔI: Hiển thị trưởng phòng chỉ đọc -->
            <div class="form-group">
                <label>Trưởng Phòng Hiện Tại:</label>
                <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <strong style="color: #1f2937;">${originalData.truongPhong || '<em style="color: #9ca3af;">Chưa có</em>'}</strong>
                </div>
                <small style="color: #666; font-size: 0.85rem;">
                    Trưởng phòng được tự động cập nhật từ danh sách nhân sự
                </small>
            </div>
            
            <div class="form-group">
                <label for="pbTrangThaiEdit">Trạng Thái:</label>
                <select id="pbTrangThaiEdit">
                    <option value="Đang hoạt động" ${originalData.trangThai === 'Đang hoạt động' ? 'selected' : ''}>Đang hoạt động</option>
                    <option value="Chưa hoạt động" ${originalData.trangThai === 'Chưa hoạt động' ? 'selected' : ''}>Chưa hoạt động</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                <button type="button" class="btn-cancel" onclick="closeModal('phongban-edit-modal')">Hủy</button>
            </div>
        </form>
    `);

    const form = document.getElementById('phongBanEditForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newData = {
            ten_phongban: document.getElementById('pbTenEdit').value.trim(),
            dia_chi_phongban: document.getElementById('pbDiaChiEdit').value.trim(),
            email_phongban: document.getElementById('pbEmailEdit').value.trim(),
            truong_phong: originalData.truongPhong || null, // ✅ Giữ nguyên giá trị cũ
            trang_thai_pb: document.getElementById('pbTrangThaiEdit').value
        };

        if (!newData.ten_phongban || !newData.dia_chi_phongban || !newData.email_phongban) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/phongban/${originalData.maPhongBan}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (data.success) {
                await loadPhongBanData();
                closeModal('phongban-edit-modal');
                showNotification('Cập nhật phòng ban thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi cập nhật phòng ban!', 'error');
        }
    });
}

function cancelEditPhongBan(button, maPhongBan, tenPhongBan, diaChi, email, truongPhong, trangThai) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[0].textContent = maPhongBan;
    cells[1].textContent = tenPhongBan;
    cells[2].textContent = diaChi;
    cells[3].textContent = email;
    cells[4].textContent = truongPhong;
    cells[5].textContent = trangThai;

    cells[6].innerHTML = `
        <div class="action-buttons">
            <button class="btn-edit" onclick="editPhongBan(this)">Sửa</button>
            <button class="btn-delete" onclick="deletePhongBan(this)">Xóa</button>
        </div>
    `;
}

async function deletePhongBan(button) {
    if (confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
        const row = button.closest('tr');
        const phongBanId = row.cells[0].textContent;

        try {
            const response = await fetch(`/api/phongban/${phongBanId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification('Đã xóa phòng ban thành công!', 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa phòng ban!', 'error');
        }
    }
}

// Modal cho Phòng Ban
function showPhongBanModal() {
    const modal = createModal('phongban-modal', 'Thêm Phòng Ban Mới', `
        <form id="phongBanForm">
            <div class="form-group">
                <label for="pbMa">Mã Phòng Ban:</label>
                <input type="number" id="pbMa" placeholder="Nhập mã phòng ban" required>
            </div>
            <div class="form-group">
                <label for="pbTen">Tên Phòng Ban:</label>
                <input type="text" id="pbTen" placeholder="Nhập tên phòng ban" required>
            </div>
            <div class="form-group">
                <label for="pbDiaChi">Địa Chỉ:</label>
                <input type="text" id="pbDiaChi" placeholder="Nhập địa chỉ" required>
            </div>
            <div class="form-group">
                <label for="pbEmail">Email Phòng:</label>
                <input type="email" id="pbEmail" placeholder="Nhập email phòng ban" required>
            </div>
            
            <div class="form-group">
                <label for="pbTrangThai">Trạng Thái:</label>
                <select id="pbTrangThai">
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Chưa hoạt động">Chưa hoạt động</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu</button>
                <button type="button" class="btn-cancel" onclick="closeModal('phongban-modal')">Hủy</button>
            </div>
        </form>
    `);
    
    const form = document.getElementById('phongBanForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newData = {
            id_phongban: parseInt(document.getElementById('pbMa').value),
            ten_phongban: document.getElementById('pbTen').value,
            dia_chi_phongban: document.getElementById('pbDiaChi').value,
            email_phongban: document.getElementById('pbEmail').value
            // ✅ BỎ: truong_phong
        };
        
        try {
            const response = await fetch('/api/phongban', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadPhongBanData();
                closeModal('phongban-modal');
                showNotification('Thêm phòng ban thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm phòng ban!', 'error');
        }
    });
}



async function saveNewPhongBan(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        id_phongban: inputs[0].value ? parseInt(inputs[0].value) : null,
        ten_phongban: inputs[1].value,
        dia_chi_phongban: inputs[2].value,
        email_phongban: inputs[3].value,
        truong_phong: inputs[4].value,
        trang_thai_pb: inputs[5].value
    };

    if (!newData.ten_phongban || !newData.dia_chi_phongban || !newData.email_phongban) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    try {
        const response = await fetch('/api/phongban', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadPhongBanData();
            showNotification('Thêm phòng ban mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm phòng ban!', 'error');
    }
}

function cancelAddPhongBan(button) {
    button.closest('tr').remove();
}

function searchPhongBan() {
    const searchInput = document.querySelector('#phongban .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbphongban tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// ========== NHÂN SỰ FUNCTIONS ==========
async function loadPhongBanDropdown() {
    try {
        const response = await fetch('/api/phongban');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách phòng ban:', error);
        return [];
    }
}
function editNhanSu(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maNhanVien: cells[0].textContent.trim(),
        hoTen: cells[1].textContent.trim(),
        chucVu: cells[2].textContent.trim(),
        email: cells[3].textContent.trim(),
        idPhongban: cells[4].textContent.trim(),
        trangThai: cells[5].textContent.trim()
    };

    // Tải danh sách phòng ban để tạo dropdown
    loadPhongBanDropdown().then(phongBans => {
        let optionsHtml = '';
        phongBans.forEach(pb => {
            const selected = pb.ten_phongban === originalData.idPhongban ? 'selected' : '';
            optionsHtml += `<option value="${pb.id_phongban}" ${selected}>${pb.ten_phongban}</option>`;
        });

        const modal = createModal('nhansu-edit-modal', 'Chỉnh Sửa Thông Tin Nhân Sự', `
            <form id="nhanSuEditForm">
                <div class="form-group">
                    <label for="nsIdEdit">Mã Nhân Viên:</label>
                    <input type="text" id="nsIdEdit" value="${originalData.maNhanVien}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                    <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
                </div>
                <div class="form-group">
                    <label for="nsTenEdit">Họ Và Tên:</label>
                    <input type="text" id="nsTenEdit" value="${originalData.hoTen}" placeholder="Nhập họ và tên" required>
                </div>
                <div class="form-group">
                    <label for="nsChucVuEdit">Chức Vụ:</label>
                    <select id="nsChucVuEdit" required>
                        <option value="Trưởng phòng" ${originalData.chucVu === 'Trưởng phòng' ? 'selected' : ''}>Trưởng phòng</option>
                        <option value="Phó phòng" ${originalData.chucVu === 'Phó phòng' ? 'selected' : ''}>Phó phòng</option>
                        <option value="Nhân viên" ${originalData.chucVu === 'Nhân viên' ? 'selected' : ''}>Nhân viên</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nsEmailEdit">Email:</label>
                    <input type="email" id="nsEmailEdit" value="${originalData.email}" placeholder="Nhập email nhân viên" required>
                </div>
                <div class="form-group">
                    <label for="nsPhongbanEdit">Phòng Ban:</label>
                    <select id="nsPhongbanEdit" required>
                        <option value="">-- Chọn phòng ban --</option>
                        ${optionsHtml}
                    </select>
                </div>
                <div class="form-group">
                    <label for="nsTrangThaiEdit">Trạng Thái:</label>
                    <select id="nsTrangThaiEdit" required>
                        <option value="Đang hoạt động" ${originalData.trangThai === 'Đang hoạt động' ? 'selected' : ''}>Đang hoạt động</option>
                        <option value="Nghỉ phép" ${originalData.trangThai === 'Nghỉ phép' ? 'selected' : ''}>Nghỉ phép</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('nhansu-edit-modal')">Hủy</button>
                </div>
            </form>
        `);

        const form = document.getElementById('nhanSuEditForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newData = {
                ten_nhanvien: document.getElementById('nsTenEdit').value.trim(),
                chucvu: document.getElementById('nsChucVuEdit').value,
                email_nhansu: document.getElementById('nsEmailEdit').value.trim(),
                id_phongban: parseInt(document.getElementById('nsPhongbanEdit').value),
                trang_thai_ns: document.getElementById('nsTrangThaiEdit').value
            };

            if (!newData.ten_nhanvien || !newData.chucvu || !newData.email_nhansu) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }

            try {
                const response = await fetch(`/api/nhansu/${originalData.maNhanVien}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });

                const data = await response.json();

                if (data.success) {
                    await loadNhanSuData();
                    closeModal('nhansu-edit-modal');
                    showNotification('Cập nhật thông tin nhân sự thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi cập nhật nhân sự!', 'error');
            }
        });
    });
}

async function saveNhanSu(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');
    const idNhanVien = inputs[0].value;

    const newData = {
        ten_nhanvien: inputs[1].value,
        chucvu: inputs[2].value,
        email_nhansu: inputs[3].value,
        id_phongban: inputs[4].value ? parseInt(inputs[4].value) : null,
        trang_thai_ns: inputs[5].value
    };

    if (!newData.ten_nhanvien || !newData.chucvu || !newData.email_nhansu) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    try {
        const response = await fetch(`/api/nhansu/${idNhanVien}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadNhanSuData();
            showNotification('Cập nhật thông tin nhân sự thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi cập nhật nhân sự!', 'error');
    }
}

function cancelEditNhanSu(button, maNhanVien, hoTen, chucVu, email, phongTrucThuoc, trangThai) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[0].textContent = maNhanVien;
    cells[1].textContent = hoTen;
    cells[2].textContent = chucVu;
    cells[3].textContent = email;
    cells[4].textContent = phongTrucThuoc;
    cells[5].textContent = trangThai;

    cells[6].innerHTML = `
        <div class="action-buttons">
            <button class="btn-edit" onclick="editNhanSu(this)">Sửa</button>
            <button class="btn-delete" onclick="deleteNhanSu(this)">Xóa</button>
        </div>
    `;
}

async function deleteNhanSu(button) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân sự này?')) {
        const row = button.closest('tr');
        const idNhanVien = row.cells[0].textContent.trim();
        const chucVu = row.cells[2].textContent.trim(); // ✅ THÊM: Lấy chức vụ

        try {
            const response = await fetch(`/api/nhansu/${idNhanVien}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    
                    // ✅ THÊM MỚI: Reload phòng ban nếu là trưởng phòng
                    if (chucVu === 'Trưởng phòng') {
                        loadPhongBanData();
                        showNotification('Đã xóa nhân sự và cập nhật trưởng phòng!', 'success');
                    } else {
                        showNotification('Đã xóa nhân sự thành công!', 'success');
                    }
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa nhân sự!', 'error');
        }
    }
}

function addNhanSu() {
    // Tải danh sách phòng ban trước
    loadPhongBanDropdown().then(phongBans => {
        // Tạo danh sách option cho dropdown
        let optionsHtml = '<option value="">-- Chọn phòng ban --</option>';
        phongBans.forEach(pb => {
            optionsHtml += `<option value="${pb.id_phongban}">${pb.ten_phongban}</option>`;
        });

        const modal = createModal('nhansu-modal', 'Thêm Nhân Sự Mới', `
            <form id="nhanSuForm">
                <div class="form-group">
                    <label for="nsId">Mã Nhân Viên:</label>
                    <input type="number" id="nsId" placeholder="Nhập mã nhân viên" required>
                </div>
                <div class="form-group">
                    <label for="nsTen">Họ Và Tên:</label>
                    <input type="text" id="nsTen" placeholder="Nhập họ và tên" required>
                </div>
                <div class="form-group">
                    <label for="nsChucVu">Chức Vụ:</label>
                    <select id="nsChucVu" required>
                        <option value="Trưởng phòng">Trưởng phòng</option>
                        <option value="Phó phòng">Phó phòng</option>
                        <option value="Nhân viên">Nhân viên</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nsEmail">Email:</label>
                    <input type="email" id="nsEmail" placeholder="Nhập email nhân viên" required>
                </div>
                <div class="form-group">
                    <label for="nsPhongban">Phòng Ban:</label>
                    <select id="nsPhongban" required>
                        ${optionsHtml}
                    </select>
                </div>
                <div class="form-group">
                    <label for="nsTrangThai">Trạng Thái:</label>
                    <select id="nsTrangThai" required>
                        <option value="Đang hoạt động">Đang hoạt động</option>
                        <option value="Nghỉ phép">Nghỉ phép</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('nhansu-modal')">Hủy</button>
                </div>
            </form>
        `);
        
        const form = document.getElementById('nhanSuForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newData = {
                id_nhanvien: parseInt(document.getElementById('nsId').value),
                ten_nhanvien: document.getElementById('nsTen').value.trim(),
                chucvu: document.getElementById('nsChucVu').value,
                email_nhansu: document.getElementById('nsEmail').value.trim(),
                id_phongban: parseInt(document.getElementById('nsPhongban').value),
                trang_thai_ns: document.getElementById('nsTrangThai').value
            };
            
            if (!newData.ten_nhanvien || !newData.chucvu || !newData.email_nhansu || !newData.id_phongban) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }
            
            try {
                const response = await fetch('/api/nhansu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadNhanSuData();
                    closeModal('nhansu-modal');
                    showNotification('Thêm nhân sự mới thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi thêm nhân sự!', 'error');
            }
        });
    });
}


async function saveNewNhanSu(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        id_nhanvien: inputs[0].value ? parseInt(inputs[0].value) : null,
        ten_nhanvien: inputs[1].value,
        chucvu: inputs[2].value,
        email_nhansu: inputs[3].value,
        id_phongban: inputs[4].value ? parseInt(inputs[4].value) : null,
        trang_thai_ns: inputs[5].value
    };

    if (!newData.ten_nhanvien || !newData.chucvu || !newData.email_nhansu) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    try {
        const response = await fetch('/api/nhansu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadNhanSuData();
            showNotification('Thêm nhân sự mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm nhân sự!', 'error');
    }
}

function cancelAddNhanSu(button) {
    button.closest('tr').remove();
}

function searchNhanSu() {
    const searchInput = document.querySelector('#qlnhansu .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbnhansu tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}


// ========== GIẢNG VIÊN FUNCTIONS ========

async function loadKhoaDropdown() {
    try {
        const response = await fetch('/api/khoa');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách khoa:', error);
        return [];
    }
}


function editGiangVien(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maGiangVien: cells[0].textContent.trim(),
        hoTen: cells[1].textContent.trim(),
        chucVu: cells[2].textContent.trim(),
        email: cells[3].textContent.trim(),
        idKhoa: cells[4].textContent.trim(),
        trangThai: cells[5].textContent.trim()
    };

    // Tải danh sách khoa để tạo dropdown
    loadKhoaDropdown().then(khoas => {
        let optionsHtml = '';
        khoas.forEach(khoa => {
            const selected = khoa.ten_khoa === originalData.idKhoa ? 'selected' : '';
            optionsHtml += `<option value="${khoa.id_khoa}" ${selected}>${khoa.ten_khoa}</option>`;
        });

        const modal = createModal('giangvien-edit-modal', 'Chỉnh Sửa Thông Tin Giảng Viên', `
            <form id="giangVienEditForm">
                <div class="form-group">
                    <label for="gvIdEdit">Mã Giảng Viên:</label>
                    <input type="text" id="gvIdEdit" value="${originalData.maGiangVien}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                    <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
                </div>
                <div class="form-group">
                    <label for="gvTenEdit">Họ Và Tên:</label>
                    <input type="text" id="gvTenEdit" value="${originalData.hoTen}" placeholder="Nhập họ và tên" required>
                </div>
                <div class="form-group">
                    <label for="gvChucVuEdit">Chức Vụ:</label>
                    <select id="gvChucVuEdit" required>
                        <option value="Trưởng khoa" ${originalData.chucVu === 'Trưởng khoa' ? 'selected' : ''}>Trưởng khoa</option>
                        <option value="Phó trưởng khoa" ${originalData.chucVu === 'Phó trưởng khoa' ? 'selected' : ''}>Phó trưởng khoa</option>
                        <option value="Giảng viên" ${originalData.chucVu === 'Giảng viên' ? 'selected' : ''}>Giảng viên</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="gvEmailEdit">Email:</label>
                    <input type="email" id="gvEmailEdit" value="${originalData.email}" placeholder="Nhập email giảng viên" required>
                </div>
                <div class="form-group">
                    <label for="gvKhoaEdit">Khoa:</label>
                    <select id="gvKhoaEdit" required>
                        <option value="">-- Chọn khoa --</option>
                        ${optionsHtml}
                    </select>
                </div>
                <div class="form-group">
                    <label for="gvTrangThaiEdit">Trạng Thái:</label>
                    <select id="gvTrangThaiEdit" required>
                        <option value="Đang hoạt động" ${originalData.trangThai === 'Đang hoạt động' ? 'selected' : ''}>Đang hoạt động</option>
                        <option value="Nghỉ phép" ${originalData.trangThai === 'Nghỉ phép' ? 'selected' : ''}>Nghỉ phép</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('giangvien-edit-modal')">Hủy</button>
                </div>
            </form>
        `);

        const form = document.getElementById('giangVienEditForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newData = {
                ten_giangvien: document.getElementById('gvTenEdit').value.trim(),
                chucvu: document.getElementById('gvChucVuEdit').value,
                email_giangvien: document.getElementById('gvEmailEdit').value.trim(),
                id_khoa: document.getElementById('gvKhoaEdit').value,
                trang_thai_gv: document.getElementById('gvTrangThaiEdit').value
            };

            if (!newData.ten_giangvien || !newData.chucvu || !newData.email_giangvien) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }

            try {
                const response = await fetch(`/api/giangvien/${originalData.maGiangVien}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });

                const data = await response.json();

                if (data.success) {
                    await loadGiangVienData();
                    await loadKhoaData(); // ✅ THÊM MỚI: Reload khoa để cập nhật trưởng khoa
                    closeModal('giangvien-edit-modal');
                    showNotification('Cập nhật thông tin giảng viên thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi cập nhật giảng viên!', 'error');
            }
        });
    });
}

async function saveGiangVien(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');
    const idGiangVien = inputs[0].value;

    const newData = {
        ten_giangvien: inputs[1].value,
        chucvu: inputs[2].value,
        email_giangvien: inputs[3].value,
        id_khoa: inputs[4].value,
        trang_thai_gv: inputs[5].value
    };

    if (!newData.ten_giangvien || !newData.chucvu || !newData.email_giangvien) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    try {
        const response = await fetch(`/api/giangvien/${idGiangVien}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadGiangVienData();
            showNotification('Cập nhật thông tin giảng viên thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi cập nhật giảng viên!', 'error');
    }
}

function cancelEditGiangVien(button, maGiangVien, hoTen, chucVu, email, khoaTrucThuoc, trangThai) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[0].textContent = maGiangVien;
    cells[1].textContent = hoTen;
    cells[2].textContent = chucVu;
    cells[3].textContent = email;
    cells[4].textContent = khoaTrucThuoc;
    cells[5].textContent = trangThai;

    cells[6].innerHTML = `
        <div class="action-buttons">
            <button class="btn-edit" onclick="editGiangVien(this)">Sửa</button>
            <button class="btn-delete" onclick="deleteGiangVien(this)">Xóa</button>
        </div>
    `;
}

async function deleteGiangVien(button) {
    if (confirm('Bạn có chắc chắn muốn xóa giảng viên này?')) {
        const row = button.closest('tr');
        const idGiangVien = row.cells[0].textContent.trim();
        const chucVu = row.cells[2].textContent.trim(); // ✅ THÊM: Lấy chức vụ

        try {
            const response = await fetch(`/api/giangvien/${idGiangVien}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    
                    // ✅ THÊM MỚI: Reload khoa nếu là trưởng khoa
                    if (chucVu === 'Trưởng khoa') {
                        loadKhoaData();
                        showNotification('Đã xóa giảng viên và cập nhật trưởng khoa!', 'success');
                    } else {
                        showNotification('Đã xóa giảng viên thành công!', 'success');
                    }
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa giảng viên!', 'error');
        }
    }
}

function showGiangVienModal() {
    loadKhoaDropdown().then(khoas => {
        let optionsHtml = '<option value="">-- Chọn khoa --</option>';
        khoas.forEach(khoa => {
            optionsHtml += `<option value="${khoa.id_khoa}">${khoa.ten_khoa}</option>`;
        });

        const modal = createModal('giangvien-modal', 'Thêm Giảng Viên Mới', `
            <form id="giangVienForm">
                <div class="form-group">
                    <label for="gvId">Mã Giảng Viên:</label>
                    <input type="number" id="gvId" placeholder="Nhập mã giảng viên" required>
                </div>
                <div class="form-group">
                    <label for="gvTen">Họ Và Tên:</label>
                    <input type="text" id="gvTen" placeholder="Nhập họ và tên" required>
                </div>
                <div class="form-group">
                    <label for="gvChucVu">Chức Vụ:</label>
                    <select id="gvChucVu" required>
                        <option value="Trưởng khoa">Trưởng khoa</option>
                        <option value="Phó trưởng khoa">Phó trưởng khoa</option>
                        <option value="Giảng viên">Giảng viên</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="gvEmail">Email:</label>
                    <input type="email" id="gvEmail" placeholder="Nhập email giảng viên" required>
                </div>
                <div class="form-group">
                    <label for="gvKhoa">Khoa:</label>
                    <select id="gvKhoa" required>
                        ${optionsHtml}
                    </select>
                </div>
                <div class="form-group">
                    <label for="gvTrangThai">Trạng Thái:</label>
                    <select id="gvTrangThai" required>
                        <option value="Đang hoạt động">Đang hoạt động</option>
                        <option value="Nghỉ phép">Nghỉ phép</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('giangvien-modal')">Hủy</button>
                </div>
            </form>
        `);
        
        const form = document.getElementById('giangVienForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newData = {
                id_giangvien: parseInt(document.getElementById('gvId').value),
                ten_giangvien: document.getElementById('gvTen').value.trim(),
                chucvu: document.getElementById('gvChucVu').value,
                email_giangvien: document.getElementById('gvEmail').value.trim(),
                id_khoa: document.getElementById('gvKhoa').value,
                trang_thai_gv: document.getElementById('gvTrangThai').value
            };
            
            if (!newData.ten_giangvien || !newData.chucvu || !newData.email_giangvien || !newData.id_khoa) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }
            
            try {
                const response = await fetch('/api/giangvien', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadGiangVienData();
                    await loadKhoaData(); // ✅ THÊM MỚI: Reload khoa để cập nhật trưởng khoa
                    closeModal('giangvien-modal');
                    showNotification('Thêm giảng viên mới thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi thêm giảng viên!', 'error');
            }
        });
    });
}


async function saveNewGiangVien(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        id_giangvien: inputs[0].value ? parseInt(inputs[0].value) : null,
        ten_giangvien: inputs[1].value,
        chucvu: inputs[2].value,
        email_giangvien: inputs[3].value,
        id_khoa: inputs[4].value,
        trang_thai_gv: inputs[5].value
    };

    if (!newData.ten_giangvien || !newData.chucvu || !newData.email_giangvien) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    try {
        const response = await fetch('/api/giangvien', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadGiangVienData();
            showNotification('Thêm giảng viên mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm giảng viên!', 'error');
    }
}

function cancelAddGiangVien(button) {
    button.closest('tr').remove();
}

function searchGiangVien() {
    const searchInput = document.querySelector('#qlgiangvien .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbgiangvien tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Hàm tải dữ liệu giảng viên 
async function loadGiangVienData() {
    try {
        const response = await fetch('/api/giangvien');
        const data = await response.json();
        
        const tableBody = document.querySelector('.tbgiangvien tbody');
        tableBody.innerHTML = '';

        data.forEach(gv => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gv.id_giangvien}</td>
                <td>${gv.ten_giangvien}</td>
                <td>${gv.chucvu}</td>
                <td>${gv.email_giangvien}</td>
                <td>${gv.ten_khoa || ''}</td>
                <td>${gv.trang_thai_gv}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="editGiangVien(this)">Sửa</button>
                        <button class="btn-delete" onclick="deleteGiangVien(this)">Xóa</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Lỗi tải dữ liệu giảng viên:', error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu giảng viên!', 'error');
    }
}
// ========== HỌC PHẦN FUNCTIONS ==========


function editHocPhan(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maHocPhan: cells[0].textContent,
        tenHocPhan: cells[1].textContent,
        soTinChi: cells[2].textContent,
        soTinChiLyThuyet: cells[3].textContent,
        soTinChiThucHanh: cells[4].textContent,
        hpTienQuyet: cells[5].textContent,
        hpSongHanh: cells[6].textContent,
        hpHocTruoc: cells[7].textContent
    };

    cells[0].innerHTML = `<input type="text" value="${originalData.maHocPhan}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">`;
    cells[1].innerHTML = `<input type="text" value="${originalData.tenHocPhan}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">`;
    cells[2].innerHTML = `<input type="number" value="${originalData.soTinChi}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="1" max="20">`;
    cells[3].innerHTML = `<input type="number" value="${originalData.soTinChiLyThuyet}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="0" max="20">`;
    cells[4].innerHTML = `<input type="number" value="${originalData.soTinChiThucHanh}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="0" max="20">`;
    cells[5].innerHTML = `<input type="text" value="${originalData.hpTienQuyet}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">`;
    cells[6].innerHTML = `<input type="text" value="${originalData.hpSongHanh}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">`;
    cells[7].innerHTML = `<input type="text" value="${originalData.hpHocTruoc}" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">`;

    cells[8].innerHTML = `
        <div class="action-buttons">
            <button class="btn-save" onclick="saveHocPhan(this)">Lưu</button>
            <button class="btn-cancel" onclick="cancelEditHocPhan(this, '${originalData.maHocPhan}', '${originalData.tenHocPhan}', '${originalData.soTinChi}', '${originalData.soTinChiLyThuyet}', '${originalData.soTinChiThucHanh}', '${originalData.hpTienQuyet}', '${originalData.hpSongHanh}', '${originalData.hpHocTruoc}')">Hủy</button>
        </div>
    `;

    cells[0].querySelector('input').focus();
}

async function saveHocPhan(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');
    const maHocPhan = inputs[0].value;

    const newData = {
        ma_hocphan: inputs[0].value,
        ten_hocphan: inputs[1].value,
        so_tinchi: parseInt(inputs[2].value) || 0,
        tin_chi_ly_thuyet: parseInt(inputs[3].value) || 0,
        tin_chi_thuc_hanh: parseInt(inputs[4].value) || 0,
        hp_tien_quyet: inputs[5].value || '',
        hp_song_hanh: inputs[6].value || '',
        hp_hoc_truoc: inputs[7].value || ''
    };

    if (!maHocPhan || !newData.ten_hocphan || newData.so_tinchi <= 0) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    try {
        const listResponse = await fetch('/api/hocphan');
        const allHocPhan = await listResponse.json();
        const hocPhan = allHocPhan.find(hp => hp.ma_hocphan === maHocPhan);

        if (!hocPhan) {
            alert('Không tìm thấy học phần!');
            return;
        }

        const response = await fetch(`/api/hocphan/${hocPhan.ma_hocphan}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadHocPhanData();
            showNotification('Cập nhật học phần thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi cập nhật học phần!', 'error');
    }
}

function cancelEditHocPhan(button, maHocPhan, tenHocPhan, soTinChi, soTinChiLyThuyet, soTinChiThucHanh, hpTienQuyet, hpSongHanh, hpHocTruoc) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[0].textContent = maHocPhan;
    cells[1].textContent = tenHocPhan;
    cells[2].textContent = soTinChi;
    cells[3].textContent = soTinChiLyThuyet;
    cells[4].textContent = soTinChiThucHanh;
    cells[5].textContent = hpTienQuyet;
    cells[6].textContent = hpSongHanh;
    cells[7].textContent = hpHocTruoc;

    cells[8].innerHTML = `
        <div class="action-buttons">
            <button class="btn-edit" onclick="editHocPhan(this)">Sửa</button>
            <button class="btn-delete" onclick="deleteHocPhan(this)">Xóa</button>
        </div>
    `;
}

async function deleteHocPhan(button) {
    if (confirm('Bạn có chắc chắn muốn xóa học phần này?')) {
        const row = button.closest('tr');
        const maHocPhan = row.cells[0].textContent.trim();
        const tenHocPhan = row.cells[1].textContent.trim();

        try {
            const listResponse = await fetch('/api/hocphan');
            const allHocPhan = await listResponse.json();
            const hocPhan = allHocPhan.find(hp => hp.ma_hocphan === maHocPhan);

            if (!hocPhan) {
                alert('Không tìm thấy học phần trong database!');
                return;
            }

            const response = await fetch(`/api/hocphan/${hocPhan.ma_hocphan}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification(`Đã xóa học phần: ${tenHocPhan}`, 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa học phần!', 'error');
        }
    }
}

// ========== HỌC PHẦN MODAL ==========


async function loadHocPhanForDropdown() {
    try {
        const response = await fetch('/api/hocphan');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách học phần:', error);
        return [];
    }
}
async function showHocPhanModal() {
    // Lấy danh sách học phần để tạo dropdown
    const hocPhanList = await loadHocPhanForDropdown();
    
    let hocPhanOptions = '<option value="">-- Không có --</option>';
    hocPhanList.forEach(hp => {
        hocPhanOptions += `<option value="${hp.ma_hocphan}">${hp.ma_hocphan} - ${hp.ten_hocphan}</option>`;
    });
    const modal = createModal('hocphan-modal', 'Thêm Học Phần Mới', `
        <form id="hocPhanForm">
            <div class="form-group">
                <label for="hpMa">Mã Học Phần:</label>
                <input type="text" id="hpMa" placeholder="Nhập mã học phần" required>
            </div>
            <div class="form-group">
                <label for="hpTen">Tên Học Phần:</label>
                <input type="text" id="hpTen" placeholder="Nhập tên học phần" required>
            </div>
            <div class="form-group">
                <label for="hpSoTinChi">Số Tín Chỉ:</label>
                <input type="number" id="hpSoTinChi" placeholder="Nhập số tín chỉ" required min="1" max="20">
            </div>
            <div class="form-group">
                <label for="hpTinChiLyThuyet">Số Tín Chỉ Lý Thuyết:</label>
                <input type="number" id="hpTinChiLyThuyet" placeholder="Nhập số tín chỉ lý thuyết" min="0" max="20">
            </div>
            <div class="form-group">
                <label for="hpTinChiThucHanh">Số Tín Chỉ Thực Hành:</label>
                <input type="number" id="hpTinChiThucHanh" placeholder="Nhập số tín chỉ thực hành" min="0" max="20">
            </div>
            <div class="form-group">
                <label for="hpTienQuyet">HP Tiên Quyết:</label>
                <select id="hpTienQuyet">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="hpSongHanh">HP Song Hành:</label>
                <select id="hpSongHanh">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="hpHocTruoc">HP Học Trước:</label>
                <select id="hpHocTruoc">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu</button>
                <button type="button" class="btn-cancel" onclick="closeModal('hocphan-modal')">Hủy</button>
            </div>
        </form>
    `);
    const form = document.getElementById('hocPhanForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newData = {
            ma_hocphan: document.getElementById('hpMa').value.trim(),
            ten_hocphan: document.getElementById('hpTen').value.trim(),
            so_tinchi: parseInt(document.getElementById('hpSoTinChi').value),
            tin_chi_ly_thuyet: parseInt(document.getElementById('hpTinChiLyThuyet').value) || 0,
            tin_chi_thuc_hanh: parseInt(document.getElementById('hpTinChiThucHanh').value) || 0,
            hp_tien_quyet: document.getElementById('hpTienQuyet').value.trim() || '',
            hp_song_hanh: document.getElementById('hpSongHanh').value.trim() || '',
            hp_hoc_truoc: document.getElementById('hpHocTruoc').value.trim() || ''
        };
        
        // Kiểm tra dữ liệu
        if (!newData.ma_hocphan || !newData.ten_hocphan || newData.so_tinchi <= 0) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/hocphan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadHocPhanData();
                closeModal('hocphan-modal');
                showNotification('Thêm học phần thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm học phần!', 'error');
        }
    });
}

async function saveNewHocPhan(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        ma_hocphan: inputs[0].value.trim(),
        ten_hocphan: inputs[1].value.trim(),
        so_tinchi: parseInt(inputs[2].value) || 0,
        tin_chi_ly_thuyet: parseInt(inputs[3].value) || 0,
        tin_chi_thuc_hanh: parseInt(inputs[4].value) || 0,
        hp_tien_quyet: inputs[5].value.trim() || '',
        hp_song_hanh: inputs[6].value.trim() || '',
        hp_hoc_truoc: inputs[7].value.trim() || ''
    };

    if (!newData.ma_hocphan || !newData.ten_hocphan || newData.so_tinchi <= 0) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc:\n- Mã học phần\n- Tên học phần\n- Số tín chỉ (> 0)');
        return;
    }

    console.log('📤 Đang gửi dữ liệu học phần:', newData);

    try {
        const response = await fetch('/api/hocphan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();
        console.log('📥 Response:', data);

        if (data.success) {
            await loadHocPhanData();
            showNotification('Thêm học phần mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm học phần!', 'error');
    }
}

function cancelAddHocPhan(button) {
    button.closest('tr').remove();
}

function searchHocPhan() {
    const searchInput = document.querySelector('#qlhocphan .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbhocphan tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

async function loadHocPhanData() {
    try {
        const response = await fetch('/api/hocphan');
        const data = await response.json();

        const tbody = document.querySelector('.tbhocphan tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(hocphan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${hocphan.ma_hocphan || ''}</td>
                    <td>${hocphan.ten_hocphan || ''}</td>
                    <td>${hocphan.so_tinchi || ''}</td>
                    <td>${hocphan.tin_chi_ly_thuyet || ''}</td>
                    <td>${hocphan.tin_chi_thuc_hanh || ''}</td>
                    <td>${hocphan.ten_hp_tien_quyet || 'Không'}</td>
                    <td>${hocphan.ten_hp_song_hanh || 'Không'}</td>
                    <td>${hocphan.ten_hp_hoc_truoc || 'Không'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editHocPhan(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteHocPhan(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu học phần:', error);
    }
}


// ========== KHỐI KIẾN THỨC MODAL ==========

function showKKTModal() {
    const modal = createModal('kkt-modal', 'Thêm Khối Kiến Thức Mới', `
        <form id="kktForm">
            <div class="form-group">
                <label for="kktMa">Mã Khối Kiến Thức:</label>
                <input type="text" id="kktMa" placeholder="Nhập mã KKT" required>
            </div>
            <div class="form-group">
                <label for="kktTen">Tên Khối Kiến Thức:</label>
                <input type="text" id="kktTen" placeholder="Nhập tên KKT" required>
            </div>
            <div class="form-group">
                <label for="kktTinChi">Tín Chỉ Tối Thiểu:</label>
                <input type="number" id="kktTinChi" placeholder="Nhập tín chỉ tối thiểu" required min="0">
            </div>
            <div class="form-group">
                <label for="kktTinChiMax">Tín Chỉ Tối Đa:</label>
                <input type="number" id="kktTinChiMax" placeholder="Nhập tín chỉ tối đa" required min="0">
            </div>
            <div class="form-group">
                <label for="kktLoai">Loại:</label>
                <select id="kktLoai">
                    <option value="Bắt buộc">Bắt buộc</option>
                    <option value="Tự chọn">Tự chọn</option>
                </select>
            </div>
            <div class="form-group">
                <label for="kktMoTa">Mô Tả:</label>
                <textarea id="kktMoTa" placeholder="Nhập mô tả" rows="3"></textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu</button>
                <button type="button" class="btn-cancel" onclick="closeModal('kkt-modal')">Hủy</button>
            </div>
        </form>
    `);
    
    const form = document.getElementById('kktForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newData = {
            ma_kkt: document.getElementById('kktMa').value,
            ten_kkt: document.getElementById('kktTen').value,
            tin_chi_toi_thieu: parseInt(document.getElementById('kktTinChi').value),
            tin_chi_toi_da: parseInt(document.getElementById('kktTinChiMax').value),
            loai_kkt: document.getElementById('kktLoai').value,
            mo_ta_kkt: document.getElementById('kktMoTa').value
        };
        
        try {
            const response = await fetch('/api/khoikienthuc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadKKTData();
                closeModal('kkt-modal');
                showNotification('Thêm khối kiến thức thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm khối kiến thức!', 'error');
        }
    });
}

async function loadKKTData() {
    try {
        const response = await fetch('/api/khoikienthuc');
        const data = await response.json();

        const tbody = document.querySelector('.tbkkt tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(kkt => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${kkt.ma_kkt}</td>
                    <td>${kkt.ten_kkt}</td>
                    <td>${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da}</td>
                    <td>${kkt.loai_kkt || 'Bắt buộc'}</td>
                    <td>${kkt.mo_ta_kkt || ''}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editKKT(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteKKT(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu KKT:', error);
    }
}

function editKKT(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maKKT: cells[0].textContent.trim(),
        tenKKT: cells[1].textContent.trim(),
        tinChi: cells[2].textContent.trim(),
        loai: cells[3].textContent.trim(),
        moTa: cells[4].textContent.trim()
    };

    // Parse tín chỉ tối thiểu và tối đa từ chuỗi "tối thiểu - tối đa"
    const tinChiParts = originalData.tinChi.split('-').map(x => x.trim());
    const tinChiTT = tinChiParts[0] || '0';
    const tinChiTD = tinChiParts[1] || '10';

    const modal = createModal('kkt-edit-modal', 'Chỉnh Sửa Thông Tin Khối Kiến Thức', `
        <form id="kktEditForm">
            <div class="form-group">
                <label for="kktMaEdit">Mã Khối Kiến Thức:</label>
                <input type="text" id="kktMaEdit" value="${originalData.maKKT}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
            </div>
            <div class="form-group">
                <label for="kktTenEdit">Tên khối kiến thức:</label>
                <input type="text" id="kktTenEdit" value="${originalData.tenKKT}" placeholder="Nhập tên KKT" required>
            </div>
            <div class="form-group">
                <label for="kktTinChiTTEdit">Tín Chỉ Tối Thiểu:</label>
                <input type="number" id="kktTinChiTTEdit" value="${tinChiTT}" placeholder="Nhập tín chỉ tối thiểu" required min="0">
            </div>
            <div class="form-group">
                <label for="kktTinChiTDEdit">Tín Chỉ Tối Đa:</label>
                <input type="number" id="kktTinChiTDEdit" value="${tinChiTD}" placeholder="Nhập tín chỉ tối đa" required min="0">
            </div>
            <div class="form-group">
                <label for="kktLoaiEdit">Loại:</label>
                <select id="kktLoaiEdit">
                    <option value="Bắt buộc" ${originalData.loai === 'Bắt buộc' ? 'selected' : ''}>Bắt buộc</option>
                    <option value="Tự chọn" ${originalData.loai === 'Tự chọn' ? 'selected' : ''}>Tự chọn</option>
                </select>
            </div>
            <div class="form-group">
                <label for="kktMoTaEdit">Mô Tả:</label>
                <textarea id="kktMoTaEdit" placeholder="Nhập mô tả" rows="3">${originalData.moTa}</textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                <button type="button" class="btn-cancel" onclick="closeModal('kkt-edit-modal')">Hủy</button>
            </div>
        </form>
    `);

    const form = document.getElementById('kktEditForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newData = {
            ten_kkt: document.getElementById('kktTenEdit').value.trim(),
            tin_chi_toi_thieu: parseInt(document.getElementById('kktTinChiTTEdit').value),
            tin_chi_toi_da: parseInt(document.getElementById('kktTinChiTDEdit').value),
            loai_kkt: document.getElementById('kktLoaiEdit').value,
            mo_ta_kkt: document.getElementById('kktMoTaEdit').value.trim()
        };

        if (!newData.ten_kkt || newData.tin_chi_toi_thieu < 0 || newData.tin_chi_toi_da < 0) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }

        if (newData.tin_chi_toi_da < newData.tin_chi_toi_thieu) {
            showNotification('Tín chỉ tối đa phải lớn hơn hoặc bằng tín chỉ tối thiểu!', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/khoikienthuc/${originalData.maKKT}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (data.success) {
                await loadKKTData();
                closeModal('kkt-edit-modal');
                showNotification('Cập nhật khối kiến thức thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi cập nhật khối kiến thức!', 'error');
        }
    });
}
async function deleteKKT(button) {
    if (confirm('Bạn có chắc chắn muốn xóa khối kiến thức này?')) {
        const row = button.closest('tr');
        const maKKT = row.cells[0].textContent.trim();

        try {
            const response = await fetch(`/api/khoikienthuc/${maKKT}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification('Đã xóa khối kiến thức thành công!', 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa khối kiến thức!', 'error');
        }
    }
}
function searchKKT() {
    const searchInput = document.querySelector('#qlkkt .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbkkt tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}
// ========== API DATA LOADING FUNCTIONS ==========

async function loadPhongBanData() {
    try {
        const response = await fetch('/api/phongban');
        const data = await response.json();

        const tbody = document.querySelector('.tbphongban tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(phongban => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${phongban.id_phongban}</td>
                    <td>${phongban.ten_phongban}</td>
                    <td>${phongban.dia_chi_phongban || ''}</td>
                    <td>${phongban.email_phongban || ''}</td>
                    <td>${phongban.truong_phong || ''}</td>
                    <td>${phongban.trang_thai_pb || 'Đang hoạt động'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editPhongBan(this)">Sửa</button>
                            <button class="btn-delete" onclick="deletePhongBan(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu phòng ban:', error);
    }
}

async function loadNhanSuData() {
    try {
        const response = await fetch('/api/nhansu');
        const data = await response.json();

        const tbody = document.querySelector('.tbnhansu tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(nhansu => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nhansu.id_nhanvien}</td>
                    <td>${nhansu.ten_nhanvien}</td>
                    <td>${nhansu.chucvu || ''}</td>
                    <td>${nhansu.email_nhansu || ''}</td>
                    <td>${nhansu.ten_phongban || ''}</td>
                    <td>${nhansu.trang_thai_ns || 'Đang hoạt động'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editNhanSu(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteNhanSu(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu nhân sự:', error);
    }
}
async function loadHocPhanData() {
    try {
        const response = await fetch('/api/hocphan');
        const data = await response.json();

        const tbody = document.querySelector('.tbhocphan tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(hocphan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${hocphan.ma_hocphan || ''}</td>
                    <td>${hocphan.ten_hocphan || ''}</td>
                    <td>${hocphan.so_tinchi || ''}</td>
                    <td>${hocphan.tin_chi_ly_thuyet || ''}</td>
                    <td>${hocphan.tin_chi_thuc_hanh || ''}</td>
                    <td>${hocphan.hp_tien_quyet || 'Không'}</td>
                    <td>${hocphan.hp_song_hanh || 'Không'}</td>
                    <td>${hocphan.hp_hoc_truoc || 'Không'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editHocPhan(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteHocPhan(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu học phần:', error);
    }
}

// ========== KHOA FUNCTIONS ==========

function editKhoa(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maKhoa: cells[0].textContent.trim(),
        tenKhoa: cells[1].textContent.trim(),
        diaChi: cells[2].textContent.trim(),
        email: cells[3].textContent.trim(),
        truongKhoa: cells[4].textContent.trim(),
        trangThai: cells[5].textContent.trim()
    };

    const modal = createModal('khoa-edit-modal', 'Chỉnh Sửa Thông Tin Khoa', `
        <form id="khoaEditForm">
            <div class="form-group">
                <label for="khMaEdit">Mã Khoa:</label>
                <input type="text" id="khMaEdit" value="${originalData.maKhoa}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
            </div>
            <div class="form-group">
                <label for="khTenEdit">Tên Khoa:</label>
                <input type="text" id="khTenEdit" value="${originalData.tenKhoa}" placeholder="Nhập tên khoa" required>
            </div>
            <div class="form-group">
                <label for="khDiaChiEdit">Địa Chỉ:</label>
                <input type="text" id="khDiaChiEdit" value="${originalData.diaChi}" placeholder="Nhập địa chỉ" required>
            </div>
            <div class="form-group">
                <label for="khEmailEdit">Email Khoa:</label>
                <input type="email" id="khEmailEdit" value="${originalData.email}" placeholder="Nhập email khoa" required>
            </div>
            
            <!-- ✅ THAY ĐỔI: Hiển thị trưởng khoa chỉ đọc -->
            <div class="form-group">
                <label>Trưởng Khoa Hiện Tại:</label>
                <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <strong style="color: #1f2937;">${originalData.truongKhoa || '<em style="color: #9ca3af;">Chưa có</em>'}</strong>
                </div>
                <small style="color: #666; font-size: 0.85rem;">
                    Trưởng khoa được tự động cập nhật từ danh sách giảng viên
                </small>
            </div>
            
            <div class="form-group">
                <label for="khTrangThaiEdit">Trạng Thái:</label>
                <select id="khTrangThaiEdit">
                    <option value="Đang hoạt động" ${originalData.trangThai === 'Đang hoạt động' ? 'selected' : ''}>Đang hoạt động</option>
                    <option value="Chưa hoạt động" ${originalData.trangThai === 'Chưa hoạt động' ? 'selected' : ''}>Chưa hoạt động</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                <button type="button" class="btn-cancel" onclick="closeModal('khoa-edit-modal')">Hủy</button>
            </div>
        </form>
    `);

    const form = document.getElementById('khoaEditForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newData = {
            ten_khoa: document.getElementById('khTenEdit').value.trim(),
            dia_chi_khoa: document.getElementById('khDiaChiEdit').value.trim(),
            email_khoa: document.getElementById('khEmailEdit').value.trim(),
            truong_khoa: originalData.truongKhoa || null, // ✅ Giữ nguyên giá trị cũ
            trang_thai_khoa: document.getElementById('khTrangThaiEdit').value
        };

        if (!newData.ten_khoa || !newData.dia_chi_khoa || !newData.email_khoa) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/khoa/${originalData.maKhoa}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (data.success) {
                await loadKhoaData();
                closeModal('khoa-edit-modal');
                showNotification('Cập nhật khoa thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi cập nhật khoa!', 'error');
        }
    });
}
function cancelEditKhoa(button, maKhoa, tenKhoa, diaChi, email, truongKhoa, trangThai) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells[0].textContent = maKhoa;
    cells[1].textContent = tenKhoa;
    cells[2].textContent = diaChi;
    cells[3].textContent = email;
    cells[4].textContent = truongKhoa;
    cells[5].textContent = trangThai;

    cells[6].innerHTML = `
        <div class="action-buttons">
            <button class="btn-edit" onclick="editKhoa(this)">Sửa</button>
            <button class="btn-delete" onclick="deleteKhoa(this)">Xóa</button>
        </div>
    `;
}

async function deleteKhoa(button) {
    if (confirm('Bạn có chắc chắn muốn xóa khoa này?')) {
        const row = button.closest('tr');
        const khoaId = row.cells[0].textContent;

        try {
            const response = await fetch(`/api/khoa/${khoaId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification('Đã xóa khoa thành công!', 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa khoa!', 'error');
        }
    }
}


function showKhoaModal() {
    const modal = createModal('khoa-modal', 'Thêm Khoa Mới', `
        <form id="khoaForm">
            <div class="form-group">
                <label for="khMa">Mã Khoa:</label>
                <input type="number" id="khMa" placeholder="Nhập mã khoa" required>
            </div>
            <div class="form-group">
                <label for="khTen">Tên Khoa:</label>
                <input type="text" id="khTen" placeholder="Nhập tên khoa" required>
            </div>
            <div class="form-group">
                <label for="khDiaChi">Địa Chỉ:</label>
                <input type="text" id="khDiaChi" placeholder="Nhập địa chỉ" required>
            </div>
            <div class="form-group">
                <label for="khEmail">Email Khoa:</label>
                <input type="email" id="khEmail" placeholder="Nhập email khoa" required>
            </div>
            <div class="form-group">
                <label>Trưởng Khoa:</label>
                <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <em style="color: #9ca3af;">Chưa có (sẽ tự động cập nhật từ danh sách giảng viên)</em>
                </div>
                <small style="color: #666; font-size: 0.85rem;">
                    Trưởng khoa được tự động cập nhật khi thêm/sửa giảng viên có chức vụ "Trưởng khoa"
                </small>
            </div>
            <div class="form-group">
                <label for="khTrangThai">Trạng Thái:</label>
                <select id="khTrangThai">
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Chưa hoạt động">Chưa hoạt động</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu</button>
                <button type="button" class="btn-cancel" onclick="closeModal('khoa-modal')">Hủy</button>
            </div>
        </form>
    `);
    
    const form = document.getElementById('khoaForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newData = {
            id_khoa: parseInt(document.getElementById('khMa').value),
            ten_khoa: document.getElementById('khTen').value,
            dia_chi_khoa: document.getElementById('khDiaChi').value,
            email_khoa: document.getElementById('khEmail').value,
            truong_khoa: null, // ✅ THÊM MỚI: Không cho nhập trưởng khoa
            trang_thai_khoa: document.getElementById('khTrangThai').value
        };
        
        try {
            const response = await fetch('/api/khoa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadKhoaData();
                closeModal('khoa-modal');
                showNotification('Thêm khoa thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm khoa!', 'error');
        }
    });
}


async function saveNewKhoa(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        id_khoa: inputs[0].value ? parseInt(inputs[0].value) : null,
        ten_khoa: inputs[1].value,
        dia_chi_khoa: inputs[2].value,
        email_khoa: inputs[3].value,
        truong_khoa: inputs[4].value
    };

    if (!newData.ten_khoa || !newData.dia_chi_khoa || !newData.email_khoa) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    try {
        const response = await fetch('/api/khoa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();

        if (data.success) {
            await loadKhoaData();
            showNotification('Thêm phòng ban mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm khoa!', 'error');
    }
}

function cancelAddKhoa(button) {
    button.closest('tr').remove();
}

function searchKhoa() {
    const searchInput = document.querySelector('#khoa .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbkhoa tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

async function loadKhoaData() {
    try {
        const response = await fetch('/api/khoa');
        const data = await response.json();

        const tbody = document.querySelector('.tbkhoa tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(khoa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${khoa.id_khoa}</td>
                    <td>${khoa.ten_khoa}</td>
                    <td>${khoa.dia_chi_khoa || ''}</td>
                    <td>${khoa.email_khoa || ''}</td>
                    <td>${khoa.truong_khoa || ''}</td>
                    <td>${khoa.trang_thai_khoa || 'Đang hoạt động'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editKhoa(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteKhoa(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu khoa:', error);
    }
}

// ========== HỌC PHẦN FUNCTIONS ==========

async function editHocPhan(button) {
    const hocPhanList = await loadHocPhanForDropdown();
    
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const maHocPhan = cells[0].textContent.trim();
    
    // Lấy thông tin chi tiết học phần từ API
    const response = await fetch(`/api/hocphan`);
    const allHocPhan = await response.json();
    const currentHocPhan = allHocPhan.find(hp => hp.ma_hocphan === maHocPhan);
    
    if (!currentHocPhan) {
        showNotification('Không tìm thấy thông tin học phần!', 'error');
        return;
    }

    const originalData = {
        maHocPhan: currentHocPhan.ma_hocphan,
        tenHocPhan: currentHocPhan.ten_hocphan,
        soTinChi: currentHocPhan.so_tinchi,
        soTinChiLyThuyet: currentHocPhan.tin_chi_ly_thuyet,
        soTinChiThucHanh: currentHocPhan.tin_chi_thuc_hanh,
        hpTienQuyet: currentHocPhan.hp_tien_quyet || '',
        hpSongHanh: currentHocPhan.hp_song_hanh || '',
        hpHocTruoc: currentHocPhan.hp_hoc_truoc || ''
    };
    
    let hocPhanOptions = '<option value="">-- Không có --</option>';
    hocPhanList.forEach(hp => {
        hocPhanOptions += `<option value="${hp.ma_hocphan}">${hp.ten_hocphan}</option>`;
    });
    
    const modal = createModal('hocphan-edit-modal', 'Chỉnh sửa thông tin học phần', `
        <form id="hocPhanEditForm">
            <div class="form-group">
                <label for="hpMaEdit">Mã Học Phần:</label>
                <input type="text" id="hpMaEdit" value="${originalData.maHocPhan}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
            </div>
            <div class="form-group">
                <label for="hpTenEdit">Tên Học Phần:</label>
                <input type="text" id="hpTenEdit" value="${originalData.tenHocPhan}" placeholder="Nhập tên học phần" required>
            </div>
            <div class="form-group">
                <label for="hpSoTinChiEdit">Số Tín Chỉ:</label>
                <input type="number" id="hpSoTinChiEdit" value="${originalData.soTinChi}" placeholder="Nhập số tín chỉ" required min="1" max="20">
            </div>
            <div class="form-group">
                <label for="hpTinChiLyThuyetEdit">Số Tín Chỉ Lý Thuyết:</label>
                <input type="number" id="hpTinChiLyThuyetEdit" value="${originalData.soTinChiLyThuyet}" placeholder="Nhập số tín chỉ lý thuyết" min="0" max="20">
            </div>
            <div class="form-group">
                <label for="hpTinChiThucHanhEdit">Số Tín Chỉ Thực Hành:</label>
                <input type="number" id="hpTinChiThucHanhEdit" value="${originalData.soTinChiThucHanh}" placeholder="Nhập số tín chỉ thực hành" min="0" max="20">
            </div>
            <div class="form-group">
                <label for="hpTienQuyetEdit">HP Tiên Quyết:</label>
                <select id="hpTienQuyetEdit">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="hpSongHanhEdit">HP Song hành:</label>
                <select id="hpSongHanhEdit">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="hpHocTruocEdit">HP Học trước:</label>
                <select id="hpHocTruocEdit">
                    ${hocPhanOptions}
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                <button type="button" class="btn-cancel" onclick="closeModal('hocphan-edit-modal')">Hủy</button>
            </div>
        </form>
    `);

    // Set giá trị đã chọn cho các dropdown
    setTimeout(() => {
        if (originalData.hpTienQuyet) {
            document.getElementById('hpTienQuyetEdit').value = originalData.hpTienQuyet;
        }
        if (originalData.hpSongHanh) {
            document.getElementById('hpSongHanhEdit').value = originalData.hpSongHanh;
        }
        if (originalData.hpHocTruoc) {
            document.getElementById('hpHocTruocEdit').value = originalData.hpHocTruoc;
        }
    }, 100);

    const form = document.getElementById('hocPhanEditForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newData = {
            ten_hocphan: document.getElementById('hpTenEdit').value.trim(),
            so_tinchi: parseInt(document.getElementById('hpSoTinChiEdit').value),
            tin_chi_ly_thuyet: parseInt(document.getElementById('hpTinChiLyThuyetEdit').value) || 0,
            tin_chi_thuc_hanh: parseInt(document.getElementById('hpTinChiThucHanhEdit').value) || 0,
            hp_tien_quyet: document.getElementById('hpTienQuyetEdit').value.trim() || '',
            hp_song_hanh: document.getElementById('hpSongHanhEdit').value.trim() || '',
            hp_hoc_truoc: document.getElementById('hpHocTruocEdit').value.trim() || ''
        };

        if (!newData.ten_hocphan || newData.so_tinchi <= 0) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/hocphan/${originalData.maHocPhan}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (data.success) {
                await loadHocPhanData();
                closeModal('hocphan-edit-modal');
                showNotification('Cập nhật học phần thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi cập nhật học phần!', 'error');
        }
    });
}

async function deleteHocPhan(button) {
    if (confirm('Bạn có chắc chắn muốn xóa học phần này?')) {
        const row = button.closest('tr');
        const maHocPhan = row.cells[0].textContent.trim();
        const tenHocPhan = row.cells[1].textContent.trim();

        try {
            const listResponse = await fetch('/api/hocphan');
            const allHocPhan = await listResponse.json();
            const hocPhan = allHocPhan.find(hp => hp.ma_hocphan === maHocPhan);

            if (!hocPhan) {
                alert('Không tìm thấy học phần trong database!');
                return;
            }

            const response = await fetch(`/api/hocphan/${hocPhan.ma_hocphan}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification(`Đã xóa học phần: ${tenHocPhan}`, 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa học phần!', 'error');
        }
    }
}

function addHocPhan() {
    const table = document.querySelector('.tbhocphan tbody');
    if (!table) {
        alert('Không tìm thấy bảng học phần!');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="Mã học phần" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" required></td>
        <td><input type="text" placeholder="Tên học phần" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" required></td>
        <td><input type="number" placeholder="Số tín chỉ" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="1" max="20" required></td>
        <td><input type="number" placeholder="Số t/c lý thuyết" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="0" max="20"></td>
        <td><input type="number" placeholder="Số t/c thực hành" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;" min="0" max="20"></td>
        <td><input type="text" placeholder="HP tiên quyết" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;"></td>
        <td><input type="text" placeholder="HP song hành" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;"></td>
        <td><input type="text" placeholder="HP học trước" class="edit-input" style="width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px;"></td>
        <td>
            <div class="action-buttons">
                <button class="btn-save" onclick="saveNewHocPhan(this)">Lưu</button>
                <button class="btn-cancel" onclick="cancelAddHocPhan(this)">Hủy</button>
            </div>
        </td>
    `;

    table.appendChild(newRow);
    newRow.querySelector('input').focus();
    newRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function saveNewHocPhan(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('.edit-input');

    const newData = {
        ma_hocphan: inputs[0].value.trim(),
        ten_hocphan: inputs[1].value.trim(),
        so_tinchi: parseInt(inputs[2].value) || 0,
        tin_chi_ly_thuyet: parseInt(inputs[3].value) || 0,
        tin_chi_thuc_hanh: parseInt(inputs[4].value) || 0,
        hp_tien_quyet: inputs[5].value.trim() || '',
        hp_song_hanh: inputs[6].value.trim() || '',
        hp_hoc_truoc: inputs[7].value.trim() || ''
    };

    if (!newData.ma_hocphan || !newData.ten_hocphan || newData.so_tinchi <= 0) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc:\n- Mã học phần\n- Tên học phần\n- Khoa\n- Số tín chỉ (> 0)');
        return;
    }

    console.log('📤 Đang gửi dữ liệu học phần:', newData);

    try {
        const response = await fetch('/api/hocphan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });

        const data = await response.json();
        console.log('📥 Response:', data);

        if (data.success) {
            await loadHocPhanData();
            showNotification('Thêm học phần mới thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi thêm học phần!', 'error');
    }
}

function cancelAddHocPhan(button) {
    button.closest('tr').remove();
}

function searchHocPhan() {
    const searchInput = document.querySelector('#qlhocphan .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbhocphan tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

async function loadHocPhanData() {
    try {
        const response = await fetch('/api/hocphan');
        const data = await response.json();
        
        console.log('📦 Dữ liệu học phần nhận được:', data); // Debug để kiểm tra

        const tbody = document.querySelector('.tbhocphan tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(hocphan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${hocphan.ma_hocphan || ''}</td>
                    <td>${hocphan.ten_hocphan || ''}</td>
                    <td>${hocphan.so_tinchi || ''}</td>
                    <td>${hocphan.tin_chi_ly_thuyet || '0'}</td>
                    <td>${hocphan.tin_chi_thuc_hanh || '0'}</td>
                    <td>${hocphan.ten_hp_tien_quyet || 'Không'}</td>
                    <td>${hocphan.ten_hp_song_hanh || 'Không'}</td>
                    <td>${hocphan.ten_hp_hoc_truoc || 'Không'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editHocPhan(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteHocPhan(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu học phần:', error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu học phần!', 'error');
    }
}


// ========== API NGÀNH HỌC ==========


async function loadKhoaForDropdown() {
    try {
        const response = await fetch('/api/khoa');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách khoa:', error);
        return [];
    }
}

// Modal thêm ngành học mới
function addNganhHoc() {
    loadKhoaForDropdown().then(khoas => {
        let khoaOptions = '<option value="">-- Chọn khoa --</option>';
        khoas.forEach(khoa => {
            khoaOptions += `<option value="${khoa.id_khoa}">${khoa.ten_khoa}</option>`;
        });

        const modal = createModal('nganhhoc-modal', 'Thêm Ngành Học Mới', `
            <form id="nganhHocForm">
                <div class="form-group">
                    <label for="nhMa">Mã Ngành Học:</label>
                    <input type="text" id="nhMa" placeholder="Nhập mã ngành học" required>
                </div>
                <div class="form-group">
                    <label for="nhTen">Tên Ngành Học:</label>
                    <input type="text" id="nhTen" placeholder="Nhập tên ngành học" required>
                </div>
                <div class="form-group">
                    <label for="nhKhoa">Khoa:</label>
                    <select id="nhKhoa" required>
                        ${khoaOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="nhTongTinChi">Tổng Tín Chỉ Ngành:</label>
                    <input type="number" id="nhTongTinChi" placeholder="Nhập tổng tín chỉ ngành" min="0" required>
                </div>
                <div class="form-group">
                    <label for="nhMoTa">Mô Tả:</label>
                    <textarea id="nhMoTa" placeholder="Nhập mô tả ngành học" rows="3"></textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('nganhhoc-modal')">Hủy</button>
                </div>
            </form>
        `);
        
        const form = document.getElementById('nganhHocForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newData = {
                id_nganhhoc: document.getElementById('nhMa').value.trim(),
                ten_nganhhoc: document.getElementById('nhTen').value.trim(),
                id_khoa: document.getElementById('nhKhoa').value,
                tong_tin_chi_nganh: parseInt(document.getElementById('nhTongTinChi').value),
                mo_ta_nganhhoc: document.getElementById('nhMoTa').value.trim()
            };
            
            if (!newData.id_nganhhoc || !newData.ten_nganhhoc || !newData.id_khoa) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }
            
            try {
                const response = await fetch('/api/nganhhoc', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadNganhHocData();
                    closeModal('nganhhoc-modal');
                    showNotification('Thêm ngành học mới thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi thêm ngành học!', 'error');
            }
        });
    });
}

// Sửa ngành học
function editNganhHoc(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const originalData = {
        maNganhHoc: cells[0].textContent.trim(),
        tenNganhHoc: cells[1].textContent.trim(),
        tenKhoa: cells[2].textContent.trim(),
        tongTinChi: cells[3].textContent.trim(),
        moTa: cells[4].textContent.trim()
    };

    loadKhoaForDropdown().then(khoas => {
        let khoaOptions = '';
        khoas.forEach(khoa => {
            const selected = khoa.ten_khoa === originalData.tenKhoa ? 'selected' : '';
            khoaOptions += `<option value="${khoa.id_khoa}" ${selected}>${khoa.ten_khoa}</option>`;
        });

        const modal = createModal('nganhhoc-edit-modal', 'Chỉnh Sửa Thông Tin Ngành Học', `
            <form id="nganhHocEditForm">
                <div class="form-group">
                    <label for="nhMaEdit">Mã Ngành Học:</label>
                    <input type="text" id="nhMaEdit" value="${originalData.maNganhHoc}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                    <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
                </div>
                <div class="form-group">
                    <label for="nhTenEdit">Tên Ngành Học:</label>
                    <input type="text" id="nhTenEdit" value="${originalData.tenNganhHoc}" placeholder="Nhập tên ngành học" required>
                </div>
                <div class="form-group">
                    <label for="nhKhoaEdit">Khoa:</label>
                    <select id="nhKhoaEdit" required>
                        <option value="">-- Chọn khoa --</option>
                        ${khoaOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="nhTongTinChiEdit">Tổng Tín Chỉ Ngành:</label>
                    <input type="number" id="nhTongTinChiEdit" value="${originalData.tongTinChi}" placeholder="Nhập tổng tín chỉ ngành" min="0" required>
                </div>
                <div class="form-group">
                    <label for="nhMoTaEdit">Mô Tả:</label>
                    <textarea id="nhMoTaEdit" placeholder="Nhập mô tả ngành học" rows="3">${originalData.moTa}</textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('nganhhoc-edit-modal')">Hủy</button>
                </div>
            </form>
        `);

        const form = document.getElementById('nganhHocEditForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newData = {
                ten_nganhhoc: document.getElementById('nhTenEdit').value.trim(),
                id_khoa: document.getElementById('nhKhoaEdit').value,
                tong_tin_chi_nganh: parseInt(document.getElementById('nhTongTinChiEdit').value),
                mo_ta_nganhhoc: document.getElementById('nhMoTaEdit').value.trim()
            };

            if (!newData.ten_nganhhoc || !newData.id_khoa) {
                showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
                return;
            }

            try {
                const response = await fetch(`/api/nganhhoc/${originalData.maNganhHoc}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });

                const data = await response.json();

                if (data.success) {
                    await loadNganhHocData();
                    closeModal('nganhhoc-edit-modal');
                    showNotification('Cập nhật ngành học thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi cập nhật ngành học!', 'error');
            }
        });
    });
}

// Xóa ngành học
async function deleteNganhHoc(button) {
    if (confirm('Bạn có chắc chắn muốn xóa ngành học này?')) {
        const row = button.closest('tr');
        const maNganhHoc = row.cells[0].textContent.trim();

        try {
            const response = await fetch(`/api/nganhhoc/${maNganhHoc}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';

                setTimeout(() => {
                    row.remove();
                    showNotification('Đã xóa ngành học thành công!', 'success');
                }, 300);
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi xóa ngành học!', 'error');
        }
    }
}

// Tìm kiếm ngành học
function searchNganhHoc() {
    const searchInput = document.querySelector('#qlnganhhoc .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbnganhhoc tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Tải dữ liệu ngành học
async function loadNganhHocData() {
    try {
        const response = await fetch('/api/nganhhoc');
        const data = await response.json();

        const tbody = document.querySelector('.tbnganhhoc tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(nganhhoc => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nganhhoc.id_nganhhoc}</td>
                    <td>${nganhhoc.ten_nganhhoc}</td>
                    <td>${nganhhoc.ten_khoa || ''}</td>
                    <td>${nganhhoc.tong_tin_chi_nganh || ''}</td>
                    <td>${nganhhoc.mo_ta_nganhhoc || ''}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editNganhHoc(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteNganhHoc(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu ngành học:', error);
    }
}

// CTDT

// ====================== API CHƯƠNG TRÌNH ĐÀO TẠO ======================


async function loadKhoaForCTDTDropdown() {
    try {
        const response = await fetch('/api/khoa');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách khoa:', error);
        return [];
    }
}

// Biến lưu danh sách KKT đã chọn
let selectedKKTList = [];

async function showCTDTModal() {
    const kktList = await loadKKTForDropdown();
    const khoaList = await loadKhoaForCTDTDropdown();
    const hocPhanList = await loadHocPhanForDropdown();
    
    let kktOptions = '<option value="">-- Chọn khối kiến thức --</option>';
    kktList.forEach(kkt => {
        kktOptions += `<option value="${kkt.ma_kkt}" data-ten="${kkt.ten_kkt}" data-tinchi="${kkt.tin_chi_toi_thieu}-${kkt.tin_chi_toi_da}" data-loai="${kkt.loai_kkt}">${kkt.ma_kkt} - ${kkt.ten_kkt}</option>`;
    });

    let khoaOptions = '<option value="">-- Chọn khoa --</option>';
    khoaList.forEach(khoa => {
        khoaOptions += `<option value="${khoa.id_khoa}">${khoa.ten_khoa}</option>`;
    });

    const modal = createModal('ctdt-modal', 'Thêm Chương Trình Đào Tạo Mới', `
        <form id="ctdtForm">
            <div class="form-group">
                <label for="ctdtMa">Mã CTĐT:</label>
                <input type="text" id="ctdtMa" placeholder="Nhập mã CTĐT" required>
            </div>
            <div class="form-group">
                <label for="ctdtTen">Tên CTĐT:</label>
                <input type="text" id="ctdtTen" placeholder="Nhập tên CTĐT" required>
            </div>
            <div class="form-group">
                <label for="ctdtKhoa">Khoa: <span style="color: red;">*</span></label>
                <select id="ctdtKhoa" required>
                    ${khoaOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="ctdtTrinhDo">Trình Độ:</label>
                <select id="ctdtTrinhDo" required>
                    <option value="">-- Chọn trình độ --</option>
                    <option value="Đại học">Đại học</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Tiến sĩ">Tiến sĩ</option>
                </select>
            </div>
            <div class="form-group">
                <label for="ctdtThoiGian">Thời Gian Đào Tạo (năm):</label>
                <input type="number" id="ctdtThoiGian" placeholder="Nhập số năm" min="1" max="10" required>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
            
            <div class="form-group">
                <label style="font-weight: 600; font-size: 1.1rem; color: #1f2937;">Thêm Khối Kiến Thức:</label>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <select id="ctdtKKTSelect" style="flex: 1;">
                        ${kktOptions}
                    </select>
                    <button type="button" class="btn-submit" onclick="addKKTToCTDT()" style="width: auto; padding: 0 20px;">
                        + Thêm KKT
                    </button>
                </div>
            </div>
            
            <div class="form-group">
                <label>Danh Sách Khối Kiến Thức & Học Phần:</label>
                <div id="ctdtKKTContainer" style="max-height: 500px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 10px;">
                    <div style="padding: 20px; text-align: center; color: #9ca3af;">
                        Chưa có khối kiến thức nào được chọn
                    </div>
                </div>
            </div>
            
            <div class="form-buttons" style="margin-top: 20px;">
                <button type="submit" class="btn-submit">Lưu CTĐT</button>
                <button type="button" class="btn-cancel" onclick="closeModal('ctdt-modal')">Hủy</button>
            </div>
        </form>
    `);
    
    selectedKKTList = [];
    
    const form = document.getElementById('ctdtForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (selectedKKTList.length === 0) {
            showNotification('Vui lòng thêm ít nhất một khối kiến thức!', 'error');
            return;
        }
        
        const newData = {
            ma_ctdt: document.getElementById('ctdtMa').value.trim(),
            ten_ctdt: document.getElementById('ctdtTen').value.trim(),
            id_khoa: document.getElementById('ctdtKhoa').value,
            trinh_do: document.getElementById('ctdtTrinhDo').value,
            thoi_gian_dao_tao: parseInt(document.getElementById('ctdtThoiGian').value),
            khoi_kien_thuc: selectedKKTList
        };
        
        if (!newData.id_khoa) {
            showNotification('Vui lòng chọn khoa!', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/ctdt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadCTDTData();
                closeModal('ctdt-modal');
                showNotification('Thêm chương trình đào tạo thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm CTĐT!', 'error');
        }
    });
}

// Thêm KKT vào danh sách đã chọn
function addKKTToCTDT(event) {
    // ✅ THÊM: Ngăn form submit
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    let select = document.getElementById('ctdtKKTSelect') || 
                 document.getElementById('ctdtKKTSelectEdit') || 
                 document.getElementById('ctdtKKTSelectCopy');
    
    if (!select) {
        showNotification('Không tìm thấy danh sách khối kiến thức!', 'error');
        return false;
    }
    
    const selectedOption = select.options[select.selectedIndex];
    
    if (!selectedOption.value) {
        showNotification('Vui lòng chọn khối kiến thức!', 'error');
        return false;
    }
    
    const maKKT = selectedOption.value;
    
    if (selectedKKTList.find(k => k.ma_kkt === maKKT)) {
        showNotification('Khối kiến thức này đã được thêm!', 'error');
        return false;
    }
    
    const kktData = {
        ma_kkt: maKKT,
        ten_kkt: selectedOption.dataset.ten,
        tin_chi: selectedOption.dataset.tinchi,
        loai_kkt: selectedOption.dataset.loai,
        hoc_phan: [] // ✅ Khởi tạo mảng học phần rỗng
    };
    
    selectedKKTList.push(kktData);
    
    // Cập nhật giao diện
    if (document.getElementById('ctdtKKTContainer')) {
        updateKKTContainerView();
    }
    if (document.getElementById('ctdtKKTContainerEdit')) {
        updateKKTContainerViewEdit();
    }
    if (document.getElementById('ctdtKKTContainerCopy')) {
        updateKKTContainerViewCopy();
    }
    
    select.selectedIndex = 0;
    return false; // ✅ THÊM: Ngăn form submit
}

async function updateKKTContainerView() {
    const container = document.getElementById('ctdtKKTContainer');
    if (!container) return;
    
    if (selectedKKTList.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #9ca3af;">
                Chưa có khối kiến thức nào được chọn
            </div>
        `;
        return;
    }
    
    const hocPhanList = await loadHocPhanForDropdown();
    let hocPhanOptions = '<option value="">-- Chọn học phần --</option>';
    hocPhanList.forEach(hp => {
        hocPhanOptions += `<option value="${hp.ma_hocphan}" data-ten="${hp.ten_hocphan}" data-tinchi="${hp.so_tinchi}">${hp.ma_hocphan} - ${hp.ten_hocphan} (${hp.so_tinchi} TC)</option>`;
    });
    
    container.innerHTML = selectedKKTList.map((kkt, kktIndex) => `
        <div style="border-bottom: 2px solid #e5e7eb; padding: 15px; background: ${kktIndex % 2 === 0 ? '#ffffff' : '#f9fafb'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <strong style="font-size: 1.1rem; color: #1f2937;">${kkt.ma_kkt} - ${kkt.ten_kkt}</strong>
                    <span style="margin-left: 10px; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                        ${kkt.loai_kkt}
                    </span>
                    <span style="margin-left: 10px; color: #6b7280; font-size: 0.9rem;">Tín chỉ: ${kkt.tin_chi}</span>
                </div>
                <button class="btn-delete" onclick="removeKKTFromList(${kktIndex})" style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa KKT
                </button>
            </div>
            
            <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 6px;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <select id="selectHP_${kktIndex}" style="flex: 1; padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px;">
                        ${hocPhanOptions}
                    </select>
                    <button type="button" class="btn-submit" onclick="addHocPhanToKKT(${kktIndex}, event); return false;" style="padding: 8px 16px; font-size: 0.875rem;">
                        + Thêm HP
                    </button>
                </div>
                
                <div id="hocPhanList_${kktIndex}" style="max-height: 200px; overflow-y: auto;">
                    ${kkt.hoc_phan.length === 0 ? `
                        <div style="padding: 10px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
                            Chưa có học phần nào
                        </div>
                    ` : `
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                            <thead style="background: #f3f4f6;">
                                <tr>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">STT</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Mã HP</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Tên Học Phần</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb;">Tín Chỉ</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb; width: 80px;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${kkt.hoc_phan.map((hp, hpIndex) => `
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px;">${hpIndex + 1}</td>
                                        <td style="padding: 8px;">${hp.ma_hocphan}</td>
                                        <td style="padding: 8px;">${hp.ten_hocphan}</td>
                                        <td style="padding: 8px; text-align: center;">${hp.so_tinchi}</td>
                                        <td style="padding: 8px; text-align: center;">
                                            <button type="button" class="btn-delete" onclick="removeHocPhanFromKKT(${kktIndex}, ${hpIndex}, event); return false;" style="padding: 4px 8px; font-size: 0.8rem;">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}
async function updateKKTContainerViewEdit() {
    const container = document.getElementById('ctdtKKTContainerEdit');
    if (!container) return;
    
    if (selectedKKTList.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #9ca3af;">
                Chưa có khối kiến thức nào được chọn
            </div>
        `;
        return;
    }
    
    const hocPhanList = await loadHocPhanForDropdown();
    let hocPhanOptions = '<option value="">-- Chọn học phần --</option>';
    hocPhanList.forEach(hp => {
        hocPhanOptions += `<option value="${hp.ma_hocphan}" data-ten="${hp.ten_hocphan}" data-tinchi="${hp.so_tinchi}">${hp.ma_hocphan} - ${hp.ten_hocphan} (${hp.so_tinchi} TC)</option>`;
    });
    
    container.innerHTML = selectedKKTList.map((kkt, kktIndex) => `
        <div style="border-bottom: 2px solid #e5e7eb; padding: 15px; background: ${kktIndex % 2 === 0 ? '#ffffff' : '#f9fafb'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <strong style="font-size: 1.1rem; color: #1f2937;">${kkt.ma_kkt} - ${kkt.ten_kkt}</strong>
                    <span style="margin-left: 10px; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                        ${kkt.loai_kkt}
                    </span>
                    <span style="margin-left: 10px; color: #6b7280; font-size: 0.9rem;">Tín chỉ: ${kkt.tin_chi}</span>
                </div>
                <button class="btn-delete" onclick="removeKKTFromList(${kktIndex})" style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa KKT
                </button>
            </div>
            
            <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 6px;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <select id="selectHP_${kktIndex}" style="flex: 1; padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px;">
                        ${hocPhanOptions}
                    </select>
                    <button type="button" class="btn-submit" onclick="addHocPhanToKKT(${kktIndex}, event); return false;" style="padding: 8px 16px; font-size: 0.875rem;">
                        + Thêm HP
                    </button>
                </div>
                
                <div id="hocPhanList_${kktIndex}" style="max-height: 200px; overflow-y: auto;">
                    ${kkt.hoc_phan.length === 0 ? `
                        <div style="padding: 10px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
                            Chưa có học phần nào
                        </div>
                    ` : `
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                            <thead style="background: #f3f4f6;">
                                <tr>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">STT</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Mã HP</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Tên Học Phần</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb;">Tín Chỉ</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb; width: 80px;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${kkt.hoc_phan.map((hp, hpIndex) => `
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px;">${hpIndex + 1}</td>
                                        <td style="padding: 8px;">${hp.ma_hocphan}</td>
                                        <td style="padding: 8px;">${hp.ten_hocphan}</td>
                                        <td style="padding: 8px; text-align: center;">${hp.so_tinchi}</td>
                                        <td style="padding: 8px; text-align: center;">
                                            <button type="button" class="btn-delete" onclick="removeHocPhanFromKKT(${kktIndex}, ${hpIndex}, event); return false;" style="padding: 4px 8px; font-size: 0.8rem;">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

async function updateKKTContainerViewCopy() {
    const container = document.getElementById('ctdtKKTContainerCopy');
    if (!container) return;
    
    if (selectedKKTList.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #9ca3af;">
                Chưa có khối kiến thức nào được chọn
            </div>
        `;
        return;
    }
    
    const hocPhanList = await loadHocPhanForDropdown();
    let hocPhanOptions = '<option value="">-- Chọn học phần --</option>';
    hocPhanList.forEach(hp => {
        hocPhanOptions += `<option value="${hp.ma_hocphan}" data-ten="${hp.ten_hocphan}" data-tinchi="${hp.so_tinchi}">${hp.ma_hocphan} - ${hp.ten_hocphan} (${hp.so_tinchi} TC)</option>`;
    });
    
    container.innerHTML = selectedKKTList.map((kkt, kktIndex) => `
        <div style="border-bottom: 2px solid #e5e7eb; padding: 15px; background: ${kktIndex % 2 === 0 ? '#ffffff' : '#f9fafb'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <strong style="font-size: 1.1rem; color: #1f2937;">${kkt.ma_kkt} - ${kkt.ten_kkt}</strong>
                    <span style="margin-left: 10px; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem; background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                        ${kkt.loai_kkt}
                    </span>
                    <span style="margin-left: 10px; color: #6b7280; font-size: 0.9rem;">Tín chỉ: ${kkt.tin_chi}</span>
                </div>
                <button class="btn-delete" onclick="removeKKTFromList(${kktIndex})" style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa KKT
                </button>
            </div>
            
            <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 6px;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <select id="selectHP_${kktIndex}" style="flex: 1; padding: 8px; border: 1px solid #e5e7eb; border-radius: 6px;">
                        ${hocPhanOptions}
                    </select>
                    <button type="button" class="btn-submit" onclick="addHocPhanToKKT(${kktIndex}, event); return false;" style="padding: 8px 16px; font-size: 0.875rem;">
                        + Thêm HP
                    </button>
                </div>
                
                <div id="hocPhanList_${kktIndex}" style="max-height: 200px; overflow-y: auto;">
                    ${kkt.hoc_phan && kkt.hoc_phan.length > 0 ? `
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                            <thead style="background: #f3f4f6;">
                                <tr>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">STT</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Mã HP</th>
                                    <th style="padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb;">Tên Học Phần</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb;">Tín Chỉ</th>
                                    <th style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb; width: 80px;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${kkt.hoc_phan.map((hp, hpIndex) => `
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px;">${hpIndex + 1}</td>
                                        <td style="padding: 8px;">${hp.ma_hocphan}</td>
                                        <td style="padding: 8px;">${hp.ten_hocphan}</td>
                                        <td style="padding: 8px; text-align: center;">${hp.so_tinchi}</td>
                                        <td style="padding: 8px; text-align: center;">
                                            <button type="button" class="btn-delete" onclick="removeHocPhanFromKKT(${kktIndex}, ${hpIndex}, event); return false;" style="padding: 4px 8px; font-size: 0.8rem;">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : `
                        <div style="padding: 10px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
                            Chưa có học phần nào
                        </div>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}
function addHocPhanToKKT(kktIndex, event) {
    // ✅ THÊM: Ngăn form submit và đóng popup
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const select = document.getElementById(`selectHP_${kktIndex}`);
    if (!select) return;
    
    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption.value) {
        showNotification('Vui lòng chọn học phần!', 'error');
        return false; // ✅ THÊM: Ngăn submit
    }
    
    const maHP = selectedOption.value;
    
    // Kiểm tra đã tồn tại trong KKT này chưa
    if (selectedKKTList[kktIndex].hoc_phan.find(hp => hp.ma_hocphan === maHP)) {
        showNotification('Học phần này đã được thêm vào khối kiến thức!', 'error');
        return false; // ✅ THÊM: Ngăn submit
    }
    
    const hpData = {
        ma_hocphan: maHP,
        ten_hocphan: selectedOption.dataset.ten,
        so_tinchi: selectedOption.dataset.tinchi
    };
    
    selectedKKTList[kktIndex].hoc_phan.push(hpData);
    
    // Cập nhật giao diện tương ứng
    if (document.getElementById('ctdtKKTContainer')) {
        updateKKTContainerView();
    }
    if (document.getElementById('ctdtKKTContainerEdit')) {
        updateKKTContainerViewEdit();
    }
    if (document.getElementById('ctdtKKTContainerCopy')) {
        updateKKTContainerViewCopy();
    }
    
    return false; // ✅ THÊM: Ngăn form submit
}

function removeHocPhanFromKKT(kktIndex, hpIndex, event) {
    // ✅ THÊM: Ngăn form submit
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    selectedKKTList[kktIndex].hoc_phan.splice(hpIndex, 1);
    
    // Cập nhật giao diện tương ứng
    if (document.getElementById('ctdtKKTContainer')) {
        updateKKTContainerView();
    }
    if (document.getElementById('ctdtKKTContainerEdit')) {
        updateKKTContainerViewEdit();
    }
    if (document.getElementById('ctdtKKTContainerCopy')) {
        updateKKTContainerViewCopy();
    }
    
    return false; // ✅ THÊM: Ngăn form submit
}
function removeKKTFromList(index) {
    selectedKKTList.splice(index, 1);
    
    // Cập nhật giao diện tương ứng
    if (document.getElementById('ctdtKKTContainer')) {
        updateKKTContainerView();
    }
    if (document.getElementById('ctdtKKTContainerEdit')) {
        updateKKTContainerViewEdit();
    }
    if (document.getElementById('ctdtKKTContainerCopy')) {
        updateKKTContainerViewCopy();
    }
}

function removeKKTFromList(index) {
    selectedKKTList.splice(index, 1);
    updateKKTContainerView();
}
// Cập nhật bảng KKT đã chọn
function updateKKTTable() {
    const tbody = document.getElementById('ctdtKKTTableBody');
    
    if (selectedKKTList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 20px; text-align: center; color: #9ca3af;">
                    Chưa có khối kiến thức nào được chọn
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = selectedKKTList.map((kkt, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">${kkt.ma_kkt}</td>
            <td style="padding: 12px;">${kkt.ten_kkt}</td>
            <td style="padding: 12px; text-align: center;">${kkt.tin_chi}</td>
            <td style="padding: 12px; text-align: center;">
                <span style="padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; 
                    background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; 
                    color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                    ${kkt.loai_kkt}
                </span>
            </td>
            <td style="padding: 12px; text-align: center;">
                <button class="btn-delete" onclick="removeKKTFromList(${index})" 
                    style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa
                </button>
            </td>
        </tr>
    `).join('');
}

// Xóa KKT khỏi danh sách
function removeKKTFromList(index) {
    selectedKKTList.splice(index, 1);
    updateKKTTable();
}

// Lấy danh sách KKT cho dropdown
async function loadKKTForDropdown() {
    try {
        const response = await fetch('/api/khoikienthuc');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách KKT:', error);
        return [];
    }
}


async function loadCTDTData() {
    try {
        const response = await fetch('/api/ctdt');
        const data = await response.json();

        const section = document.querySelector('#qlctdt');
        if (!section) return;

        // Tìm hoặc tạo container cho bảng
        let tableContainer = section.querySelector('.ctdt-table-container');
        if (!tableContainer) {
            tableContainer = document.createElement('div');
            tableContainer.className = 'ctdt-table-container';
            section.appendChild(tableContainer);
        }

        if (data.length === 0) {
            tableContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280;">
                    <p style="font-size: 1.1rem; margin-bottom: 10px;">Chưa có chương trình đào tạo nào</p>
                    <p style="font-size: 0.9rem;">Nhấn "Thêm chương trình đào tạo mới" để bắt đầu</p>
                </div>
            `;
            return;
        }

        tableContainer.innerHTML = `
            <table class="tbctdt">
                <thead>
                    <tr>
                        <th>Mã CTĐT</th>
                        <th>Tên CTĐT</th>
                        <th>Khoa</th>
                        <th>Trình độ</th>
                        <th>Thời gian (năm)</th>
                        <th>Số KKT</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(ctdt => `
                        <tr>
                            <td>${ctdt.ma_ctdt}</td>
                            <td>${ctdt.ten_ctdt}</td>
                            <td>${ctdt.ten_khoa || '<em style="color: #9ca3af;">Chưa có</em>'}</td>
                            <td>${ctdt.trinh_do}</td>
                            <td style="text-align: center;">${ctdt.thoi_gian_dao_tao}</td>
                            <td style="text-align: center;">${ctdt.so_kkt || 0}</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-edit" onclick="viewCTDTDetail('${ctdt.ma_ctdt}')">Xem</button>
                                    <button class="btn-delete" onclick="editCTDT('${ctdt.ma_ctdt}')">Sửa</button>
                                    <button class="btn-delete" onclick="deleteCTDT('${ctdt.ma_ctdt}')">Xóa</button>
                                    <button class="btn-delete" onclick="copyCTDT('${ctdt.ma_ctdt}')">Sao chép</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Lỗi tải dữ liệu CTĐT:', error);
    }
}

// Xem chi tiết CTĐT
async function viewCTDTDetail(maCTDT) {
    try {
        const response = await fetch(`/api/ctdt/${maCTDT}`);
        const data = await response.json();

        if (!data.success) {
            showNotification('Không tìm thấy thông tin CTĐT!', 'error');
            return;
        }

        const ctdt = data.ctdt;
        const kktList = data.khoi_kien_thuc || [];

        const modal = createModal('ctdt-detail-modal', 'Chi tiết Chương trình đào tạo', `
            <div style="padding: 10px;">
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="margin-bottom: 15px; color: #1f2937;">Thông Tin Cơ Bản</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div>
                            <strong style="color: #6b7280;">Mã CTĐT:</strong>
                            <p style="margin: 5px 0; font-size: 1.05rem;">${ctdt.ma_ctdt}</p>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Tên CTĐT:</strong>
                            <p style="margin: 5px 0; font-size: 1.05rem;">${ctdt.ten_ctdt}</p>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Trình Độ:</strong>
                            <p style="margin: 5px 0; font-size: 1.05rem;">${ctdt.trinh_do}</p>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Thời Gian Đào Tạo:</strong>
                            <p style="margin: 5px 0; font-size: 1.05rem;">${ctdt.thoi_gian_dao_tao} năm</p>
                        </div>
                    </div>
                </div>

                <h3 style="margin-bottom: 15px; color: #1f2937;">Danh sách khối kiến thức & học phần</h3>
                <div style="max-height: 500px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
                    ${kktList.map((kkt, index) => `
                        <div style="border-bottom: 2px solid #e5e7eb; padding: 15px; background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                            <div style="margin-bottom: 10px;">
                                <strong style="font-size: 1.1rem; color: #1f2937;">${index + 1}. ${kkt.ten_kkt}</strong>
                                <span style="margin-left: 10px; padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                                    ${kkt.loai_kkt}
                                </span>
                                <span style="margin-left: 10px; color: #6b7280;">Tín chỉ: ${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da}</span>
                            </div>
                            
                            ${kkt.hoc_phan && kkt.hoc_phan.length > 0 ? `
                                <div style="margin-left: 20px; padding: 10px; background: white; border-radius: 6px;">
                                    <strong style="color: #6b7280; font-size: 0.95rem;">Học phần:</strong>
                                    <table style="width: 100%; margin-top: 10px; border-collapse: collapse; font-size: 0.9rem;">
                                        <thead style="background: #f3f4f6;">
                                            <tr>
                                                <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb;">STT</th>
                                                <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb;">Mã HP</th>
                                                <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb;">Tên Học Phần</th>
                                                <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">Tín Chỉ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${kkt.hoc_phan.map((hp, hpIndex) => `
                                                <tr>
                                                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${hpIndex + 1}</td>
                                                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${hp.ma_hocphan}</td>
                                                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${hp.ten_hocphan}</td>
                                                    <td style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">${hp.so_tinchi}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : `
                                <div style="margin-left: 20px; padding: 10px; color: #9ca3af; font-style: italic; font-size: 0.9rem;">
                                    Chưa có học phần nào
                                </div>
                            `}
                        </div>
                    `).join('')}
                </div>

                <div style="margin-top: 20px; text-align: right;">
                    <button type="button" class="btn-cancel" onclick="closeModal('ctdt-detail-modal')">Đóng</button>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin CTĐT!', 'error');
    }
}
// Xóa CTĐT
async function deleteCTDT(maCTDT) {
    if (!confirm('Bạn có chắc chắn muốn xóa chương trình đào tạo này?')) return;

    try {
        const response = await fetch(`/api/ctdt/${maCTDT}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            await loadCTDTData();
            showNotification('Xóa chương trình đào tạo thành công!', 'success');
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi xóa CTĐT!', 'error');
    }
}

// Tìm kiếm CTĐT
function searchCTDT() {
    const searchInput = document.querySelector('#qlctdt .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbctdt tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}


async function editCTDT(maCTDT) {
    try {
        // Lấy thông tin CTĐT hiện tại
        const response = await fetch(`/api/ctdt/${maCTDT}`);
        const data = await response.json();

        if (!data.success) {
            showNotification('Không tìm thấy thông tin CTĐT!', 'error');
            return;
        }

        const ctdt = data.ctdt;
        const currentKKT = data.khoi_kien_thuc || [];

        // Lấy danh sách tất cả KKT, Khoa và Học phần
        const kktList = await loadKKTForDropdown();
        const khoaList = await loadKhoaForCTDTDropdown();
        const hocPhanList = await loadHocPhanForDropdown();
        
        let kktOptions = '<option value="">-- Chọn khối kiến thức --</option>';
        kktList.forEach(kkt => {
            kktOptions += `<option value="${kkt.ma_kkt}" data-ten="${kkt.ten_kkt}" data-tinchi="${kkt.tin_chi_toi_thieu}-${kkt.tin_chi_toi_da}" data-loai="${kkt.loai_kkt}">${kkt.ma_kkt} - ${kkt.ten_kkt}</option>`;
        });

        let khoaOptions = '<option value="">-- Chọn khoa --</option>';
        khoaList.forEach(khoa => {
            const selected = khoa.id_khoa == ctdt.id_khoa ? 'selected' : '';
            khoaOptions += `<option value="${khoa.id_khoa}" ${selected}>${khoa.ten_khoa}</option>`;
        });

        // Khởi tạo danh sách KKT đã chọn với dữ liệu hiện tại (bao gồm học phần)
        selectedKKTList = currentKKT.map(kkt => ({
            ma_kkt: kkt.ma_kkt,
            ten_kkt: kkt.ten_kkt,
            tin_chi: `${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da}`,
            loai_kkt: kkt.loai_kkt,
            hoc_phan: kkt.hoc_phan || []
        }));

        const modal = createModal('ctdt-edit-modal', 'Chỉnh sửa Chương trình đào tạo', `
            <form id="ctdtEditForm">
                <div class="form-group">
                    <label for="ctdtMaEdit">Mã CTĐT:</label>
                    <input type="text" id="ctdtMaEdit" value="${ctdt.ma_ctdt}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                    <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
                </div>
                <div class="form-group">
                    <label for="ctdtTenEdit">Tên CTĐT:</label>
                    <input type="text" id="ctdtTenEdit" value="${ctdt.ten_ctdt}" placeholder="Nhập tên CTĐT" required>
                </div>
                <div class="form-group">
                    <label for="ctdtKhoaEdit">Khoa: <span style="color: red;">*</span></label>
                    <select id="ctdtKhoaEdit" required>
                        ${khoaOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="ctdtTrinhDoEdit">Trình Độ:</label>
                    <select id="ctdtTrinhDoEdit" required>
                        <option value="">-- Chọn trình độ --</option>
                        <option value="Đại học" ${ctdt.trinh_do === 'Đại học' ? 'selected' : ''}>Đại học</option>
                        <option value="Thạc sĩ" ${ctdt.trinh_do === 'Thạc sĩ' ? 'selected' : ''}>Thạc sĩ</option>
                        <option value="Tiến sĩ" ${ctdt.trinh_do === 'Tiến sĩ' ? 'selected' : ''}>Tiến sĩ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ctdtThoiGianEdit">Thời gian đào tạo (năm):</label>
                    <input type="number" id="ctdtThoiGianEdit" value="${ctdt.thoi_gian_dao_tao}" placeholder="Nhập số năm" min="1" max="10" required>
                </div>
                
                <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
                
                <div class="form-group">
                    <label style="font-weight: 600; font-size: 1.1rem; color: #1f2937;">Thêm khối kiến thức:</label>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <select id="ctdtKKTSelectEdit" style="flex: 1;">
                            ${kktOptions}
                        </select>
                        <button type="button" class="btn-submit" onclick="addKKTToCTDT()" style="width: auto; padding: 0 20px;">
                            + Thêm KKT
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Danh Sách Khối Kiến Thức & Học Phần:</label>
                    <div id="ctdtKKTContainerEdit" style="max-height: 500px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 10px;">
                        <!-- Sẽ được cập nhật bằng JavaScript -->
                    </div>
                </div>
                
                <div class="form-buttons" style="margin-top: 20px;">
                    <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('ctdt-edit-modal')">Hủy</button>
                </div>
            </form>
        `);
        
        // Cập nhật giao diện KKT và học phần
        await updateKKTContainerViewEdit();
        
        const form = document.getElementById('ctdtEditForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (selectedKKTList.length === 0) {
                showNotification('Vui lòng thêm ít nhất một khối kiến thức!', 'error');
                return;
            }
            
            const updatedData = {
                ten_ctdt: document.getElementById('ctdtTenEdit').value.trim(),
                id_khoa: document.getElementById('ctdtKhoaEdit').value,
                trinh_do: document.getElementById('ctdtTrinhDoEdit').value,
                thoi_gian_dao_tao: parseInt(document.getElementById('ctdtThoiGianEdit').value),
                khoi_kien_thuc: selectedKKTList
            };
            
            if (!updatedData.id_khoa) {
                showNotification('Vui lòng chọn khoa!', 'error');
                return;
            }
            
            try {
                const response = await fetch(`/api/ctdt/${maCTDT}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadCTDTData();
                    closeModal('ctdt-edit-modal');
                    showNotification('Cập nhật CTĐT thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi cập nhật CTĐT!', 'error');
            }
        });
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin CTĐT!', 'error');
    }
}


function updateKKTTableEdit() {
    const tbody = document.getElementById('ctdtKKTTableBodyEdit');
    
    if (!tbody) return;
    
    if (selectedKKTList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 20px; text-align: center; color: #9ca3af;">
                    Chưa có khối kiến thức nào được chọn
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = selectedKKTList.map((kkt, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">${kkt.ma_kkt}</td>
            <td style="padding: 12px;">${kkt.ten_kkt}</td>
            <td style="padding: 12px; text-align: center;">${kkt.tin_chi}</td>
            <td style="padding: 12px; text-align: center;">
                <span style="padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; 
                    background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; 
                    color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                    ${kkt.loai_kkt}
                </span>
            </td>
            <td style="padding: 12px; text-align: center;">
                <button class="btn-delete" onclick="removeKKTFromList(${index})" 
                    style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa
                </button>
            </td>
        </tr>
    `).join('');
}

async function copyCTDT(maCTDT) {
    try {
        // Lấy thông tin CTĐT cần sao chép
        const response = await fetch(`/api/ctdt/${maCTDT}`);
        const data = await response.json();

        if (!data.success) {
            showNotification('Không tìm thấy thông tin CTĐT!', 'error');
            return;
        }

        const ctdt = data.ctdt;
        const currentKKT = data.khoi_kien_thuc || [];

        // Lấy danh sách tất cả KKT và Khoa
        const kktList = await loadKKTForDropdown();
        const khoaList = await loadKhoaForCTDTDropdown();
        
        let kktOptions = '<option value="">-- Chọn khối kiến thức --</option>';
        kktList.forEach(kkt => {
            kktOptions += `<option value="${kkt.ma_kkt}" data-ten="${kkt.ten_kkt}" data-tinchi="${kkt.tin_chi_toi_thieu}-${kkt.tin_chi_toi_da}" data-loai="${kkt.loai_kkt}">${kkt.ma_kkt} - ${kkt.ten_kkt}</option>`;
        });

        let khoaOptions = '<option value="">-- Chọn khoa --</option>';
        khoaList.forEach(khoa => {
            khoaOptions += `<option value="${khoa.id_khoa}">${khoa.ten_khoa}</option>`;
        });

        // Khởi tạo danh sách KKT từ CTĐT gốc
        selectedKKTList = currentKKT.map(kkt => ({
            ma_kkt: kkt.ma_kkt,
            ten_kkt: kkt.ten_kkt,
            tin_chi: `${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da}`,
            loai_kkt: kkt.loai_kkt
        }));

        const modal = createModal('ctdt-copy-modal', 'Sao chép Chương trình đào tạo', `
            <form id="ctdtCopyForm">
                <div style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0; color: #92400e; font-size: 0.95rem;">
                        <strong>⚠️ Lưu ý:</strong> Bạn đang sao chép từ CTĐT "<strong>${ctdt.ten_ctdt}</strong>". Vui lòng nhập mã mới cho CTĐT.
                    </p>
                </div>
                
                <div class="form-group">
                    <label for="ctdtMaCopy">Mã CTĐT Mới: <span style="color: red;">*</span></label>
                    <input type="text" id="ctdtMaCopy" placeholder="Nhập mã CTĐT mới (VD: CTDT-${Date.now().toString().slice(-4)})" required>
                </div>
                <div class="form-group">
                    <label for="ctdtTenCopy">Tên CTĐT:</label>
                    <input type="text" id="ctdtTenCopy" value="${ctdt.ten_ctdt} (Copy)" placeholder="Nhập tên CTĐT" required>
                </div>
                <div class="form-group">
                    <label for="ctdtKhoaCopy">Khoa: <span style="color: red;">*</span></label>
                    <select id="ctdtKhoaCopy" required>
                        ${khoaOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="ctdtTrinhDoCopy">Trình Độ:</label>
                    <select id="ctdtTrinhDoCopy" required>
                        <option value="">-- Chọn trình độ --</option>
                        <option value="Đại học" ${ctdt.trinh_do === 'Đại học' ? 'selected' : ''}>Đại học</option>
                        <option value="Thạc sĩ" ${ctdt.trinh_do === 'Thạc sĩ' ? 'selected' : ''}>Thạc sĩ</option>
                        <option value="Tiến sĩ" ${ctdt.trinh_do === 'Tiến sĩ' ? 'selected' : ''}>Tiến sĩ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ctdtThoiGianCopy">Thời gian đào tạo (năm):</label>
                    <input type="number" id="ctdtThoiGianCopy" value="${ctdt.thoi_gian_dao_tao}" placeholder="Nhập số năm" min="1" max="10" required>
                </div>
                
                <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
                
                <div class="form-group">
                    <label style="font-weight: 600; font-size: 1.1rem; color: #1f2937;">Quản lý khối kiến thức:</label>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <select id="ctdtKKTSelectCopy" style="flex: 1;">
                            ${kktOptions}
                        </select>
                        <button type="button" class="btn-submit" onclick="addKKTToCTDT()" style="width: auto; padding: 0 20px;">
                            + Thêm
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Danh Sách Khối Kiến Thức (Đã Sao Chép):</label>
                    <div style="max-height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 10px;">
                        <table id="ctdtKKTTableCopy" style="width: 100%; border-collapse: collapse;">
                            <thead style="background: #f9fafb; position: sticky; top: 0;">
                                <tr>
                                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Mã KKT</th>
                                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Tên KKT</th>
                                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Tín Chỉ</th>
                                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Loại</th>
                                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb; width: 80px;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody id="ctdtKKTTableBodyCopy">
                                <!-- Sẽ được cập nhật bằng JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="form-buttons" style="margin-top: 20px;">
                    <button type="submit" class="btn-submit">Tạo CTDT</button>
                    <button type="button" class="btn-cancel" onclick="closeModal('ctdt-copy-modal')">Hủy</button>
                </div>
            </form>
        `);
        
        // Cập nhật bảng KKT
        updateKKTTableCopy();
        
        const form = document.getElementById('ctdtCopyForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newMaCTDT = document.getElementById('ctdtMaCopy').value.trim();
            const idKhoa = document.getElementById('ctdtKhoaCopy').value;
            
            if (!newMaCTDT) {
                showNotification('Vui lòng nhập mã CTĐT mới!', 'error');
                return;
            }

            if (!idKhoa) {
                showNotification('Vui lòng chọn khoa!', 'error');
                return;
            }
            
            if (selectedKKTList.length === 0) {
                showNotification('Vui lòng thêm ít nhất một khối kiến thức!', 'error');
                return;
            }
            
            const newData = {
                ma_ctdt: newMaCTDT,
                ten_ctdt: document.getElementById('ctdtTenCopy').value.trim(),
                id_khoa: idKhoa,
                trinh_do: document.getElementById('ctdtTrinhDoCopy').value,
                thoi_gian_dao_tao: parseInt(document.getElementById('ctdtThoiGianCopy').value),
                khoi_kien_thuc: selectedKKTList
            };
            
            try {
                const response = await fetch('/api/ctdt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadCTDTData();
                    closeModal('ctdt-copy-modal');
                    showNotification('Sao chép CTĐT thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi sao chép CTĐT!', 'error');
            }
        });
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin CTĐT!', 'error');
    }
}

// Cập nhật bảng KKT trong modal Copy
function updateKKTTableCopy() {
    const tbody = document.getElementById('ctdtKKTTableBodyCopy');
    
    if (!tbody) return;
    
    if (selectedKKTList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 20px; text-align: center; color: #9ca3af;">
                    Chưa có khối kiến thức nào được chọn
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = selectedKKTList.map((kkt, index) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">${kkt.ma_kkt}</td>
            <td style="padding: 12px;">${kkt.ten_kkt}</td>
            <td style="padding: 12px; text-align: center;">${kkt.tin_chi}</td>
            <td style="padding: 12px; text-align: center;">
                <span style="padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; 
                    background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; 
                    color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                    ${kkt.loai_kkt}
                </span>
            </td>
            <td style="padding: 12px; text-align: center;">
                <button class="btn-delete" onclick="removeKKTFromList(${index})" 
                    style="padding: 6px 12px; font-size: 0.875rem;">
                    Xóa
                </button>
            </td>
        </tr>
    `).join('');
}


// ====================== API KHÓA HỌC ======================

// Tải dữ liệu khóa học
async function loadKhoaHocData() {
    try {
        const response = await fetch('/api/khoahoc');
        const data = await response.json();

        const tbody = document.querySelector('.tbkhoahoc tbody');
        if (tbody) {
            tbody.innerHTML = '';
            data.forEach(khoahoc => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${khoahoc.id_khoahoc}</td>
                    <td>${khoahoc.ten_khoahoc}</td>
                    <td>${khoahoc.nam_bat_dau} - ${khoahoc.nam_ket_thuc}</td>
                    <td>${khoahoc.ten_ctdt || ''}</td>
                    <td>
                        <span style="padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; 
                            background: ${
                                khoahoc.trang_thai_khoahoc === 'Đang học' ? '#dbeafe' : 
                                khoahoc.trang_thai_khoahoc === 'Đã kết thúc' ? '#fee2e2' : '#fef3c7'
                            }; 
                            color: ${
                                khoahoc.trang_thai_khoahoc === 'Đang học' ? '#1e40af' : 
                                khoahoc.trang_thai_khoahoc === 'Đã kết thúc' ? '#991b1b' : '#92400e'
                            };">
                            ${khoahoc.trang_thai_khoahoc}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="editKhoaHoc(this)">Sửa</button>
                            <button class="btn-delete" onclick="deleteKhoaHoc(this)">Xóa</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu khóa học:', error);
    }
}

// Tải danh sách CTĐT cho dropdown
async function loadCTDTForDropdown() {
    try {
        const response = await fetch('/api/ctdt');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi tải danh sách CTĐT:', error);
        return [];
    }
}

// Modal thêm khóa học mới
async function showKhoaHocModal() {
    const ctdtList = await loadCTDTForDropdown();
    
    let ctdtOptions = '<option value="">-- Chọn chương trình đào tạo --</option>';
    ctdtList.forEach(ctdt => {
        ctdtOptions += `<option value="${ctdt.ma_ctdt}">${ctdt.ma_ctdt} - ${ctdt.ten_ctdt}</option>`;
    });

    const currentYear = new Date().getFullYear();

    const modal = createModal('khoahoc-modal', 'Thêm Khóa Học Mới', `
        <form id="khoaHocForm">
            <div class="form-group">
                <label for="khMa">Mã Khóa Học:</label>
                <input type="text" id="khMa" placeholder="VD: K2024" required>
            </div>
            <div class="form-group">
                <label for="khTen">Tên Khóa Học:</label>
                <input type="text" id="khTen" placeholder="VD: Khóa 2024" required>
            </div>
            <div class="form-group">
                <label for="khNamBD">Năm Bắt Đầu:</label>
                <input type="number" id="khNamBD" placeholder="VD: 2024" min="2000" max="2100" value="${currentYear}" required>
            </div>
            <div class="form-group">
                <label for="khNamKT">Năm Kết Thúc:</label>
                <input type="number" id="khNamKT" placeholder="VD: 2028" min="2000" max="2100" value="${currentYear + 4}" required>
            </div>
            <div class="form-group">
                <label for="khCTDT">Chương Trình Đào Tạo:</label>
                <select id="khCTDT" required>
                    ${ctdtOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="khTrangThai">Trạng Thái:</label>
                <select id="khTrangThai" required>
                    <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                    <option value="Đang học" selected>Đang học</option>
                    <option value="Đã kết thúc">Đã kết thúc</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu</button>
                <button type="button" class="btn-cancel" onclick="closeModal('khoahoc-modal')">Hủy</button>
            </div>
        </form>
    `);
    
    const form = document.getElementById('khoaHocForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const namBD = parseInt(document.getElementById('khNamBD').value);
        const namKT = parseInt(document.getElementById('khNamKT').value);
        
        if (namKT <= namBD) {
            showNotification('Năm kết thúc phải lớn hơn năm bắt đầu!', 'error');
            return;
        }
        
        const newData = {
            id_khoahoc: document.getElementById('khMa').value.trim(),
            ten_khoahoc: document.getElementById('khTen').value.trim(),
            nam_bat_dau: namBD,
            nam_ket_thuc: namKT,
            ma_ctdt: document.getElementById('khCTDT').value,
            trang_thai_khoahoc: document.getElementById('khTrangThai').value
        };
        
        if (!newData.id_khoahoc || !newData.ten_khoahoc || !newData.ma_ctdt) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/khoahoc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
            
            const data = await response.json();
            if (data.success) {
                await loadKhoaHocData();
                closeModal('khoahoc-modal');
                showNotification('Thêm khóa học thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi thêm khóa học!', 'error');
        }
    });
}

// Sửa khóa học
async function editKhoaHoc(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    const yearRange = cells[2].textContent.trim().split(' - ');
    const originalData = {
        maKhoaHoc: cells[0].textContent.trim(),
        tenKhoaHoc: cells[1].textContent.trim(),
        namBatDau: yearRange[0],
        namKetThuc: yearRange[1],
        tenCTDT: cells[3].textContent.trim(),
        trangThai: cells[4].textContent.trim()
    };

    const ctdtList = await loadCTDTForDropdown();
    
    let ctdtOptions = '';
    ctdtList.forEach(ctdt => {
        const selected = ctdt.ten_ctdt === originalData.tenCTDT ? 'selected' : '';
        ctdtOptions += `<option value="${ctdt.ma_ctdt}" ${selected}>${ctdt.ma_ctdt} - ${ctdt.ten_ctdt}</option>`;
    });

    const modal = createModal('khoahoc-edit-modal', 'Chỉnh Sửa Thông Tin Khóa Học', `
        <form id="khoaHocEditForm">
            <div class="form-group">
                <label for="khMaEdit">Mã Khóa Học:</label>
                <input type="text" id="khMaEdit" value="${originalData.maKhoaHoc}" disabled style="background-color: #f0f0f0; cursor: not-allowed;">
                <small style="color: #666; font-size: 0.85rem;">Không thể thay đổi mã</small>
            </div>
            <div class="form-group">
                <label for="khTenEdit">Tên Khóa Học:</label>
                <input type="text" id="khTenEdit" value="${originalData.tenKhoaHoc}" placeholder="Nhập tên khóa học" required>
            </div>
            <div class="form-group">
                <label for="khNamBDEdit">Năm Bắt Đầu:</label>
                <input type="number" id="khNamBDEdit" value="${originalData.namBatDau}" min="2000" max="2100" required>
            </div>
            <div class="form-group">
                <label for="khNamKTEdit">Năm Kết Thúc:</label>
                <input type="number" id="khNamKTEdit" value="${originalData.namKetThuc}" min="2000" max="2100" required>
            </div>
            <div class="form-group">
                <label for="khCTDTEdit">Chương Trình Đào Tạo:</label>
                <select id="khCTDTEdit" required>
                    <option value="">-- Chọn CTĐT --</option>
                    ${ctdtOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="khTrangThaiEdit">Trạng Thái:</label>
                <select id="khTrangThaiEdit" required>
                    <option value="Chưa bắt đầu" ${originalData.trangThai === 'Chưa bắt đầu' ? 'selected' : ''}>Chưa bắt đầu</option>
                    <option value="Đang học" ${originalData.trangThai === 'Đang học' ? 'selected' : ''}>Đang học</option>
                    <option value="Đã kết thúc" ${originalData.trangThai === 'Đã kết thúc' ? 'selected' : ''}>Đã kết thúc</option>
                </select>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-submit">Lưu Thay Đổi</button>
                <button type="button" class="btn-cancel" onclick="closeModal('khoahoc-edit-modal')">Hủy</button>
            </div>
        </form>
    `);

    const form = document.getElementById('khoaHocEditForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const namBD = parseInt(document.getElementById('khNamBDEdit').value);
        const namKT = parseInt(document.getElementById('khNamKTEdit').value);
        
        if (namKT <= namBD) {
            showNotification('Năm kết thúc phải lớn hơn năm bắt đầu!', 'error');
            return;
        }
        
        const newData = {
            ten_khoahoc: document.getElementById('khTenEdit').value.trim(),
            nam_bat_dau: namBD,
            nam_ket_thuc: namKT,
            ma_ctdt: document.getElementById('khCTDTEdit').value,
            trang_thai_khoahoc: document.getElementById('khTrangThaiEdit').value
        };

        if (!newData.ten_khoahoc || !newData.ma_ctdt) {
            showNotification('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/khoahoc/${originalData.maKhoaHoc}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            const data = await response.json();

            if (data.success) {
                await loadKhoaHocData();
                closeModal('khoahoc-edit-modal');
                showNotification('Cập nhật khóa học thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi cập nhật khóa học!', 'error');
        }
    });
}

// Xóa khóa học
async function deleteKhoaHoc(button) {
    if (!confirm('Bạn có chắc chắn muốn xóa khóa học này?')) return;

    const row = button.closest('tr');
    const maKhoaHoc = row.cells[0].textContent.trim();

    try {
        const response = await fetch(`/api/khoahoc/${maKhoaHoc}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';

            setTimeout(() => {
                row.remove();
                showNotification('Đã xóa khóa học thành công!', 'success');
            }, 300);
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi xóa khóa học!', 'error');
    }
}

// Tìm kiếm khóa học
function searchKhoaHoc() {
    const searchInput = document.querySelector('#qlkhoahoc .search-bar input');
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.tbkhoahoc tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}



// ====================== CHỨC NĂNG HỌC PHÍ ======================

// Tải dữ liệu học phí khi khởi động
async function loadHocPhiData() {
    try {
        const response = await fetch('/api/hocphi');
        const data = await response.json();
        
        const section = document.querySelector('#hocphi');
        if (!section) return;
        
        // Lọc chỉ lấy năm mới nhất của mỗi CTĐT
        const latestByCtdt = {};
        data.forEach(hp => {
            if (!latestByCtdt[hp.ma_ctdt] || hp.nam_hoc > latestByCtdt[hp.ma_ctdt].nam_hoc) {
                latestByCtdt[hp.ma_ctdt] = hp;
            }
        });
        const displayData = Object.values(latestByCtdt);
        
        // Kiểm tra xem đã có giao diện chưa
        let tbody = document.querySelector('#hocPhiTableBody');
        
        // Nếu chưa có giao diện, tạo mới
        if (!tbody) {
            section.innerHTML = `
                <div style="padding: 30px; background: #f8fafc; min-height: 100vh;">
                    <!-- Header Section -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); padding: 30px; border-radius: 16px; box-shadow: 0 8px 24px rgba(30, 64, 175, 0.3); margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h2 style="margin: 0 0 8px 0; color: white; font-size: 2rem; font-weight: 700;">Quản Lý Học Phí</h2>
                                <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 1rem;">Quản lý và tính toán học phí cho các chương trình đào tạo</p>
                            </div>
                            <button class="themhocphi" onclick="showHocPhiModal()" style="padding: 14px 28px; background: white; color: #1e40af; border: none; border-radius: 12px; cursor: pointer; font-weight: 700; font-size: 1.05rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.15)'">
                                Tính học phí mới
                            </button>
                        </div>
                    </div>
                    
                    <!-- Table Section -->
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e5e7eb;">
                            <h3 style="margin: 0; color: #111827; font-size: 1.4rem; font-weight: 700;">Danh Sách Học Phí</h3>
                            <span style="background: #dbeafe; color: #1e40af; padding: 8px 18px; border-radius: 20px; font-size: 1rem; font-weight: 700;">
                                ${displayData.length} CTĐT
                            </span>
                        </div>
                        <div style="overflow-x: auto;">
                            <table class="tbhocphi" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="padding: 16px; text-align: left; color: #111827; font-weight: 700; font-size: 1rem; border-top-left-radius: 12px;">Mã CTĐT</th>
                                        <th style="padding: 16px; text-align: left; color: #111827; font-weight: 700; font-size: 1rem;">Tên CTĐT</th>
                                        <th style="padding: 16px; text-align: center; color: #111827; font-weight: 700; font-size: 1rem;">Trình Độ</th>
                                        <th style="padding: 16px; text-align: center; color: #111827; font-weight: 700; font-size: 1rem;">Năm Học</th>
                                        <th style="padding: 16px; text-align: left; color: #111827; font-weight: 700; font-size: 1rem;">Ghi Chú</th>
                                        <th style="padding: 16px; text-align: center; color: #111827; font-weight: 700; font-size: 1rem; border-top-right-radius: 12px;">Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody id="hocPhiTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            tbody = document.querySelector('#hocPhiTableBody');
        }
        
        // Cập nhật dữ liệu trong tbody
        if (displayData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="padding: 60px; text-align: center;">
                        <div style="color: #94a3b8;">
                            <div style="font-size: 4rem; margin-bottom: 15px;">📚</div>
                            <p style="font-size: 1.2rem; margin-bottom: 8px; color: #64748b; font-weight: 600;">Chưa có cấu hình học phí nào</p>
                            <p style="font-size: 0.95rem; color: #94a3b8;">Nhấn nút "Tính học phí mới" để bắt đầu tạo học phí cho CTĐT</p>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = displayData.map((hp, index) => `
                <tr style="border-bottom: 1px solid #e5e7eb; transition: all 0.3s; background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};" data-id="${hp.id_hocphi}" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='${index % 2 === 0 ? '#ffffff' : '#f9fafb'}'">
                    <td style="padding: 16px;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 1rem;">
                            ${hp.ma_ctdt}
                        </span>
                    </td>
                    <td style="padding: 16px;">
                        <span style="color: #111827; font-weight: 600; font-size: 1rem;">${hp.ten_ctdt}</span>
                    </td>
                    <td style="padding: 16px; text-align: center;">
                        <span style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.95rem;">
                            ${hp.trinh_do}
                        </span>
                    </td>
                    <td style="padding: 16px; text-align: center;">
                        <span style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 1.1rem; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);">
                            ${hp.nam_hoc}
                        </span>
                    </td>
                    <td style="padding: 16px; max-width: 200px;">
                        <span style="color: #6b7280; font-size: 0.95rem; font-style: italic;">
                            ${hp.ghi_chu ? hp.ghi_chu : '<em style="color: #9ca3af;">Không có ghi chú</em>'}
                        </span>
                    </td>
                    <td style="padding: 16px; text-align: center;">
                        <div class="action-buttons" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="viewHocPhiDetail('${hp.ma_ctdt}')" style="padding: 10px 18px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(59, 130, 246, 0.3)'">
                                Chi tiết
                            </button>
                            <button onclick="editHocPhi(${hp.id_hocphi}, '${hp.ma_ctdt}', ${hp.nam_hoc}, ${hp.gia_tin_chi}, \`${(hp.ghi_chu || '').replace(/`/g, '')}\`)" style="padding: 10px 18px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(16, 185, 129, 0.3)'">
                                Sửa
                            </button>
                            <button onclick="deleteHocPhi(${hp.id_hocphi})" style="padding: 10px 18px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem; transition: all 0.3s; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(239, 68, 68, 0.3)'">
                                Xóa
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu học phí:', error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu học phí!', 'error');
    }
}

// Modal tính học phí mới
async function showHocPhiModal() {
    const ctdtList = await loadCTDTForDropdown();
    
    let ctdtOptions = '<option value="">-- Chọn chương trình đào tạo --</option>';
    ctdtList.forEach(ctdt => {
        ctdtOptions += `<option value="${ctdt.ma_ctdt}">${ctdt.ma_ctdt} - ${ctdt.ten_ctdt}</option>`;
    });
    
    // Tạo danh sách năm học (từ 2020 đến 2025)
    let namHocOptions = '<option value="">-- Chọn năm học --</option>';
    for (let year = 2020; year <= 2025; year++) {
        namHocOptions += `<option value="${year}">${year}</option>`;
    }
    
    const modal = createModal('hocphi-modal', 'Tính Học Phí Chương Trình Đào Tạo', `
        <form id="hocPhiForm" style="max-width: 700px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 25px; text-align: center;">
                <h3 style="margin: 0; font-size: 1.1rem; opacity: 0.95;">Tạo cấu hình học phí mới cho CTĐT</h3>
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #0c4a6e; font-weight: 700; font-size: 1rem;">
                    Chọn Chương trình đào tạo: <span style="color: red;">*</span>
                </label>
                <select id="hpCTDT" required onchange="previewHocPhi()" style="width: 100%; padding: 14px 16px; border: 2px solid #e0f2fe; border-radius: 10px; font-size: 1rem; background: white; transition: all 0.3s; cursor: pointer;" onfocus="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 0 0 3px rgba(14, 165, 233, 0.1)'" onblur="this.style.borderColor='#e0f2fe'; this.style.boxShadow='none'">
                    ${ctdtOptions}
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #0c4a6e; font-weight: 700; font-size: 1rem;">
                    Năm học: <span style="color: red;">*</span>
                </label>
                <select id="hpNamHoc" required onchange="previewHocPhi()" style="width: 100%; padding: 14px 16px; border: 2px solid #e0f2fe; border-radius: 10px; font-size: 1rem; background: white; transition: all 0.3s; cursor: pointer;" onfocus="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 0 0 3px rgba(14, 165, 233, 0.1)'" onblur="this.style.borderColor='#e0f2fe'; this.style.boxShadow='none'">
                    ${namHocOptions}
                </select>
                <small style="color: #64748b; font-size: 0.85rem; display: block; margin-top: 6px;">
                    Chọn năm học áp dụng học phí này
                </small>
            </div>
            
            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #0c4a6e; font-weight: 700; font-size: 1rem;">
                    Giá mỗi tín chỉ (VNĐ): <span style="color: red;">*</span>
                </label>
                <input type="number" id="hpGiaTinChi" placeholder="VD: 1400000" min="0" step="1000" required oninput="previewHocPhi()" style="width: 100%; padding: 14px 16px; border: 2px solid #e0f2fe; border-radius: 10px; font-size: 1rem; transition: all 0.3s;" onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 0 3px rgba(16, 185, 129, 0.1)'" onblur="this.style.borderColor='#e0f2fe'; this.style.boxShadow='none'">
                <small style="color: #64748b; font-size: 0.85rem; display: block; margin-top: 6px;">
                    Nhập giá tiền cho 1 tín chỉ
                </small>
            </div>
            
            <div class="form-group" style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 8px; color: #0c4a6e; font-weight: 700; font-size: 1rem;">
                    Ghi chú:
                </label>
                <textarea id="hpGhiChu" placeholder="Nhập ghi chú (không bắt buộc)" rows="3" style="width: 100%; padding: 14px 16px; border: 2px solid #e0f2fe; border-radius: 10px; font-size: 0.95rem; resize: vertical; font-family: inherit; transition: all 0.3s;" onfocus="this.style.borderColor='#0ea5e9'; this.style.boxShadow='0 0 0 3px rgba(14, 165, 233, 0.1)'" onblur="this.style.borderColor='#e0f2fe'; this.style.boxShadow='none'"></textarea>
            </div>
            
            <div id="hocPhiPreview" style="display: none; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #bae6fd; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);">
                <h3 style="margin-bottom: 20px; color: #0c4a6e; font-size: 1.2rem; font-weight: 700; text-align: center;">Xem trước học phí</h3>
                <div id="previewContent"></div>
            </div>
            
            <div class="form-buttons" style="display: flex; gap: 12px; margin-top: 25px;">
                <button type="submit" class="btn-submit" style="flex: 1; padding: 16px 24px; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(14, 165, 233, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(14, 165, 233, 0.4)'">
                    Lưu học phí
                </button>
                <button type="button" class="btn-cancel" onclick="closeModal('hocphi-modal')" style="flex: 1; padding: 16px 24px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; border: none; border-radius: 12px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(107, 114, 128, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(107, 114, 128, 0.4)'">
                    Hủy
                </button>
            </div>
        </form>
    `);
    
    const form = document.getElementById('hocPhiForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const ma_ctdt = document.getElementById('hpCTDT').value;
        const nam_hoc = document.getElementById('hpNamHoc').value;
        const gia_tin_chi = parseFloat(document.getElementById('hpGiaTinChi').value);
        const ghi_chu = document.getElementById('hpGhiChu').value.trim();
        
        if (!ma_ctdt || !nam_hoc || !gia_tin_chi || gia_tin_chi <= 0) {
            showNotification('Vui lòng chọn CTĐT, năm học và nhập giá tín chỉ hợp lệ!', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/hocphi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ma_ctdt, nam_hoc, gia_tin_chi, ghi_chu })
            });
            
            const data = await response.json();
            if (data.success) {
                await loadHocPhiData();
                closeModal('hocphi-modal');
                showNotification('Lưu cấu hình học phí thành công!', 'success');
            } else {
                showNotification(data.error || 'Có lỗi xảy ra!', 'error');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            showNotification('Có lỗi xảy ra khi lưu học phí!', 'error');
        }
    });
}

// Xem trước học phí khi nhập
async function previewHocPhi() {
    const ma_ctdt = document.getElementById('hpCTDT').value;
    const gia_tin_chi = parseFloat(document.getElementById('hpGiaTinChi').value) || 0;
    
    const preview = document.getElementById('hocPhiPreview');
    const content = document.getElementById('previewContent');
    
    if (!ma_ctdt || gia_tin_chi <= 0) {
        preview.style.display = 'none';
        return;
    }
    
    try {
        const response = await fetch(`/api/hocphi/tinh/${ma_ctdt}`);
        const data = await response.json();
        
        if (!data.success) {
            preview.style.display = 'none';
            return;
        }
        
        // Tính tổng tín chỉ từ danh sách KKT
        let tongTinChiMin = 0;
        let tongTinChiMax = 0;
        data.khoi_kien_thuc.forEach(kkt => {
            tongTinChiMin += parseInt(kkt.tin_chi_toi_thieu) || 0;
            tongTinChiMax += parseInt(kkt.tin_chi_toi_da) || 0;
        });
        
        const hocPhiMin = tongTinChiMin * gia_tin_chi;
        const hocPhiMax = tongTinChiMax * gia_tin_chi;
        
        content.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 8px; font-weight: 600;">Tín chỉ tối thiểu</p>
                    <p style="font-size: 2rem; font-weight: 800; color: #0ea5e9; margin: 0;">${tongTinChiMin}</p>
                    <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 4px;">TC</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 8px; font-weight: 600;">Tín chỉ tối đa</p>
                    <p style="font-size: 2rem; font-weight: 800; color: #0ea5e9; margin: 0;">${tongTinChiMax}</p>
                    <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 4px;">TC</p>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 25px; border-radius: 12px; color: white; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);">
                <p style="font-size: 0.95rem; opacity: 0.95; margin-bottom: 8px; font-weight: 600;">Học phí tối thiểu</p>
                <p style="font-size: 2.2rem; font-weight: 800; margin: 10px 0;">${hocPhiMin.toLocaleString('vi-VN')} VNĐ</p>
                <div style="background: rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 8px; margin-top: 12px;">
                    <p style="font-size: 0.9rem; opacity: 0.95; margin: 0;">
                        ${tongTinChiMin} TC × ${gia_tin_chi.toLocaleString('vi-VN')} VNĐ
                    </p>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 25px; border-radius: 12px; color: white; margin-top: 15px; box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);">
                <p style="font-size: 0.95rem; opacity: 0.95; margin-bottom: 8px; font-weight: 600;">Học phí tối đa</p>
                <p style="font-size: 2.2rem; font-weight: 800; margin: 10px 0;">${hocPhiMax.toLocaleString('vi-VN')} VNĐ</p>
                <div style="background: rgba(255, 255, 255, 0.2); padding: 10px; border-radius: 8px; margin-top: 12px;">
                    <p style="font-size: 0.9rem; opacity: 0.95; margin: 0;">
                        ${tongTinChiMax} TC × ${gia_tin_chi.toLocaleString('vi-VN')} VNĐ
                    </p>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);">
                <p style="color: #92400e; font-size: 0.95rem; margin: 0; font-weight: 600;">
                    <strong>Lưu ý:</strong> Học phí thực tế có thể cao hơn nếu sinh viên đăng ký thêm học phần tự chọn.
                </p>
            </div>
            
            <details style="margin-top: 20px; background: white; padding: 18px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 2px solid #e0f2fe;">
                <summary style="cursor: pointer; font-weight: 700; color: #0c4a6e; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                    Chi tiết khối kiến thức (${data.khoi_kien_thuc.length} khối)
                </summary>
                <div style="overflow-x: auto; margin-top: 15px;">
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);">
                                <th style="padding: 12px; text-align: left; color: white; font-weight: 600; border-top-left-radius: 8px;">Tên Khối Kiến Thức</th>
                                <th style="padding: 12px; text-align: center; color: white; font-weight: 600;">Tín Chỉ</th>
                                <th style="padding: 12px; text-align: center; color: white; font-weight: 600; border-top-right-radius: 8px;">Loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.khoi_kien_thuc.map((kkt, index) => `
                                <tr style="border-bottom: 1px solid #e0f2fe; background: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                                    <td style="padding: 12px; color: #334155; font-weight: 500;">${kkt.ten_kkt}</td>
                                    <td style="padding: 12px; text-align: center; color: #0ea5e9; font-weight: 700;">${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da} TC</td>
                                    <td style="padding: 12px; text-align: center;">
                                        <span style="padding: 6px 14px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; background: ${kkt.loai_kkt === 'Bắt buộc' ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#0c4a6e' : '#92400e'}; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            ${kkt.loai_kkt}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </details>
        `;
        
        preview.style.display = 'block';
    } catch (error) {
        console.error('Lỗi xem trước:', error);
        preview.style.display = 'none';
    }
}

// Xem chi tiết học phí
async function viewHocPhiDetail(ma_ctdt) {
    try {
        // Lấy thông tin CTĐT
        const ctdtResponse = await fetch(`/api/hocphi/tinh/${ma_ctdt}`);
        const ctdtData = await ctdtResponse.json();
        
        if (!ctdtData.success) {
            showNotification('Không tìm thấy thông tin!', 'error');
            return;
        }
        
        // Lấy tất cả các năm học phí của CTĐT này
        const hocphiResponse = await fetch('/api/hocphi');
        const hocphiData = await hocphiResponse.json();
        const yearRecords = hocphiData.filter(hp => hp.ma_ctdt === ma_ctdt).sort((a, b) => b.nam_hoc - a.nam_hoc);
        
        const modal = createModal('hocphi-detail-modal', 'Chi Tiết Học Phí', `
            <div style="padding: 10px;">
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 25px; border-radius: 12px; color: white; margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.3rem;">${ctdtData.ctdt.ten_ctdt}</h3>
                    <p style="margin: 0; opacity: 0.9;">Mã: ${ctdtData.ctdt.ma_ctdt} | Trình độ: ${ctdtData.ctdt.trinh_do}</p>
                </div>
                
                <h3 style="margin: 20px 0 15px 0; color: #1f2937;">Chi tiết Khối kiến thức</h3>
                <div style="max-height: 400px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f9fafb; position: sticky; top: 0;">
                            <tr>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Mã KKT</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Tên Khối Kiến Thức</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Tín Chỉ</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Loại</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ctdtData.khoi_kien_thuc.map(kkt => {
                                return `
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 12px;">${kkt.ma_kkt}</td>
                                        <td style="padding: 12px;">${kkt.ten_kkt}</td>
                                        <td style="padding: 12px; text-align: center;">${kkt.tin_chi_toi_thieu} - ${kkt.tin_chi_toi_da}</td>
                                        <td style="padding: 12px; text-align: center;">
                                            <span style="padding: 4px 12px; border-radius: 12px; font-size: 0.875rem; background: ${kkt.loai_kkt === 'Bắt buộc' ? '#dbeafe' : '#fef3c7'}; color: ${kkt.loai_kkt === 'Bắt buộc' ? '#1e40af' : '#92400e'};">
                                                ${kkt.loai_kkt}
                                            </span>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div style="margin: 20px 0; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="color: #92400e; font-size: 0.9rem; margin: 0;">
                        <strong>📌 Lưu ý:</strong> Học phí được tính dựa trên số tín chỉ của từng khối kiến thức. Học phí thực tế có thể cao hơn nếu sinh viên đăng ký thêm học phần tự chọn.
                    </p>
                </div>
                
                <h3 style="margin: 20px 0 15px 0; color: #1f2937;">Học phí 5 năm gần nhất</h3>
                ${yearRecords.length > 0 ? `
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f9fafb; position: sticky; top: 0;">
                            <tr>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Năm học</th>
                                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Giá tín chỉ</th>
                                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Tổng TC</th>
                                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Học phí tối thiểu</th>
                                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Học phí tối đa</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${yearRecords.map((record, index) => {
                                const isLatest = index === 0;
                                return `
                                    <tr style="border-bottom: 1px solid #e5e7eb; ${isLatest ? 'background: #f0fdf4;' : ''}">
                                        <td style="padding: 12px; text-align: center;">
                                            <strong style="color: ${isLatest ? '#059669' : '#1f2937'};">${record.nam_hoc}</strong>
                                            ${isLatest ? '<span style="margin-left: 5px; padding: 2px 8px; background: #10b981; color: white; border-radius: 8px; font-size: 0.75rem;">Mới nhất</span>' : ''}
                                        </td>
                                        <td style="padding: 12px; text-align: right; font-weight: 600;">${record.gia_tin_chi.toLocaleString('vi-VN')} VNĐ</td>
                                        <td style="padding: 12px; text-align: center;">${record.tong_tin_chi_toi_thieu} - ${record.tong_tin_chi_toi_da}</td>
                                        <td style="padding: 12px; text-align: right; font-weight: 600; color: #059669;">${record.hoc_phi_toi_thieu.toLocaleString('vi-VN')} VNĐ</td>
                                        <td style="padding: 12px; text-align: right; font-weight: 600; color: #3b82f6;">${record.hoc_phi_toi_da.toLocaleString('vi-VN')} VNĐ</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                ` : '<p style="text-align: center; color: #6b7280; padding: 20px;">Chưa có dữ liệu học phí cho CTĐT này</p>'}
                
                <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="color: #92400e; font-size: 0.9rem; margin: 0;">
                        <strong>📌 Lưu ý:</strong> Học phí được tính dựa trên số tín chỉ của từng khối kiến thức. 
                        Học phí thực tế có thể cao hơn nếu sinh viên đăng ký thêm học phần tự chọn.
                    </p>
                </div>
                
                <div style="margin-top: 20px; text-align: right;">
                    <button type="button" class="btn-cancel" onclick="closeModal('hocphi-detail-modal')">Đóng</button>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin!', 'error');
    }
}

// Sửa học phí
async function editHocPhi(id_hocphi, ma_ctdt, nam_hoc_hien_tai, gia_tin_chi_hien_tai, ghi_chu_hien_tai) {
    // Lấy danh sách các năm đã tồn tại cho CTĐT này
    try {
        const response = await fetch('/api/hocphi');
        const hocphiData = await response.json();
        const existingYears = hocphiData
            .filter(hp => hp.ma_ctdt === ma_ctdt)
            .map(hp => hp.nam_hoc)
            .sort((a, b) => b - a); // Sắp xếp giảm dần
        
        // Tạo danh sách năm học từ các năm đã tồn tại
        let namHocOptions = '';
        existingYears.forEach(year => {
            const selected = year == nam_hoc_hien_tai ? 'selected' : '';
            namHocOptions += `<option value="${year}" ${selected}>${year}</option>`;
        });
        
        const modal = createModal('hocphi-edit-modal', 'Cập nhật học phí', `
            <form id="hocPhiEditForm" style="max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 25px; text-align: center;">
                    <h3 style="margin: 0 0 8px 0; font-size: 1.2rem;">${ma_ctdt}</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Chỉnh sửa thông tin học phí</p>
                </div>

                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600; font-size: 0.95rem;">
                        Năm học: <span style="color: red;">*</span>
                    </label>
                    <select id="hpNamHocEdit" required style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem; background: white; transition: all 0.3s; cursor: pointer;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                        ${namHocOptions}
                    </select>
                    <small style="color: #6b7280; font-size: 0.85rem; display: block; margin-top: 6px;">
                        Chỉ hiển thị các năm đã tạo học phí
                    </small>
                </div>
                
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600; font-size: 0.95rem;">
                        Giá mỗi tín chỉ (VNĐ): <span style="color: red;">*</span>
                    </label>
                    <input type="number" id="hpGiaTinChiEdit" value="${gia_tin_chi_hien_tai}" placeholder="VD: 1400000" min="0" step="1000" required style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem; transition: all 0.3s;" onfocus="this.style.borderColor='#10b981'; this.style.boxShadow='0 0 0 3px rgba(16, 185, 129, 0.1)'" onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">
                    <div style="margin-top: 8px; padding: 10px; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 8px; border-left: 4px solid #10b981;">
                        <small style="color: #065f46; font-size: 0.85rem; font-weight: 600;">
                            Giá hiện tại: ${parseFloat(gia_tin_chi_hien_tai).toLocaleString('vi-VN')} VNĐ
                        </small>
                    </div>
                </div>
                
                <div class="form-group" style="margin-bottom: 25px;">
                    <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 600; font-size: 0.95rem;">
                        Ghi chú:
                    </label>
                    <textarea id="hpGhiChuEdit" placeholder="Nhập ghi chú (không bắt buộc)" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 0.95rem; resize: vertical; font-family: inherit; transition: all 0.3s;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)'" onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">${ghi_chu_hien_tai || ''}</textarea>
                </div>
                
                <div class="form-buttons" style="display: flex; gap: 12px; margin-top: 25px;">
                    <button type="submit" class="btn-submit" style="flex: 1; padding: 14px 24px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(16, 185, 129, 0.3)'">
                        Cập nhật
                    </button>
                    <button type="button" class="btn-cancel" onclick="closeModal('hocphi-edit-modal')" style="flex: 1; padding: 14px 24px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 6px rgba(107, 114, 128, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(107, 114, 128, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(107, 114, 128, 0.3)'">
                        Hủy
                    </button>
                </div>
            </form>
        `);
        
        const form = document.getElementById('hocPhiEditForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nam_hoc = document.getElementById('hpNamHocEdit').value;
            const gia_tin_chi = parseFloat(document.getElementById('hpGiaTinChiEdit').value);
            const ghi_chu = document.getElementById('hpGhiChuEdit').value.trim();
            
            if (!nam_hoc || !gia_tin_chi || gia_tin_chi <= 0) {
                showNotification('Vui lòng chọn năm học và nhập giá tín chỉ hợp lệ!', 'error');
                return;
            }
            
            try {
                const response = await fetch(`/api/hocphi/${id_hocphi}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nam_hoc, gia_tin_chi, ghi_chu })
                });
                
                const data = await response.json();
                if (data.success) {
                    await loadHocPhiData();
                    closeModal('hocphi-edit-modal');
                    showNotification('Cập nhật học phí thành công!', 'success');
                } else {
                    showNotification(data.error || 'Có lỗi xảy ra!', 'error');
                }
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Có lỗi xảy ra khi cập nhật!', 'error');
            }
        });
    } catch (error) {
        console.error('Lỗi tải danh sách năm:', error);
        showNotification('Có lỗi xảy ra khi tải thông tin!', 'error');
    }
}// Xóa cấu hình học phí
async function deleteHocPhi(id_hocphi) {
    if (!confirm('Bạn có chắc chắn muốn xóa cấu hình học phí này?')) return;
    
    try {
        const response = await fetch(`/api/hocphi/${id_hocphi}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
            showNotification('Xóa cấu hình học phí thành công!', 'success');
            // Xóa dòng khỏi bảng ngay lập tức
            const row = document.querySelector(`tr[data-id="${id_hocphi}"]`);
            if (row) {
                row.remove();
            }
            // Đếm lại số dòng còn lại trong tbody
            const tbody = document.querySelector('#hocPhiTableBody');
            const remainingRows = tbody ? tbody.querySelectorAll('tr').length : 0;
            
            // Cập nhật badge số lượng CTĐT
            const allSpans = document.querySelectorAll('span[style*="background: #dbeafe"]');
            for (let span of allSpans) {
                if (span.textContent.includes('CTĐT')) {
                    span.textContent = `${remainingRows} CTĐT`;
                    break;
                }
            }
        } else {
            showNotification(data.error || 'Có lỗi xảy ra!', 'error');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification('Có lỗi xảy ra khi xóa!', 'error');
    }
}



// ========== UTILITY FUNCTIONS ==========

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #047857 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS cho animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



function createModal(modalId, title, content) {
    // Xóa modal cũ nếu tồn tại
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <span class="close" onclick="closeModal('${modalId}')">&times;</span>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Đóng modal khi click bên ngoài
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
    
    return modal;
}

// Hàm đóng Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}