/* ==========================================================================
   CARTOON & NEO-BRUTALISM LOGIC ENGINE
   Project: Creative Cartoon Portfolio
   Author: Minh Panda
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DYNAMIC AVATAR GENERATION
    // ----------------------------------------------------------------------
    const avatarSeeds = [
        'Felix', 'Aneka', 'Jack', 'Oliver', 'Sophia', 'Daisy', 
        'Coco', 'Cookie', 'Milo', 'Luna', 'Panda', 'Leo', 
        'Ginger', 'Shadow', 'Simba', 'Gizmo', 'Cleo', 'Teddy'
    ];

    const avatarImg = document.getElementById('avatar');
    const randomizeBtn = document.getElementById('randomize-avatar');

    if (randomizeBtn && avatarImg) {
        randomizeBtn.addEventListener('click', () => {
            const randomSeed = avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)];
            
            // Pop out animation
            avatarImg.style.transform = 'scale(0.3) rotate(-30deg)';
            avatarImg.style.transition = 'transform 0.15s ease-in';
            
            setTimeout(() => {
                avatarImg.src = `https://api.dicebear.com/7.x/micah/svg?seed=${randomSeed}`;
                avatarImg.style.transform = 'scale(1) rotate(0deg)';
                avatarImg.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, 150);
        });
    }

    // ----------------------------------------------------------------------
    // 2. THEME CONTROLLER (LIGHT/DARK MODE PERSISTENCE)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const initializeTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.innerText = '☀️';
            if (themeText) themeText.innerText = 'Chế độ sáng';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.innerText = '🌙';
            if (themeText) themeText.innerText = 'Chế độ tối';
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.innerText = '🌙';
                if (themeText) themeText.innerText = 'Chế độ tối';
                showNotification('Bật Chế độ Sáng rực rỡ! ☀️');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.innerText = '☀️';
                if (themeText) themeText.innerText = 'Chế độ sáng';
                showNotification('Bật Chế độ Tối huyền bí! 🌙');
            }
        });
    }

    initializeTheme();

    // ----------------------------------------------------------------------
    // 3. INTERACTIVE CLICK PARTICLE ANIMATIONS
    // ----------------------------------------------------------------------
    const clickSymbols = ['⭐', '✨', '💖', '🎈', '🍭', '🎨', '🚀', '🍉', '👾', '🔥'];
    
    document.addEventListener('click', (e) => {
        // Prevent particle triggers inside close buttons or active text fields for UI cleanliness
        if (e.target.closest('.modal-close') || e.target.closest('input') || e.target.closest('textarea')) {
            return;
        }
        
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.innerText = clickSymbols[Math.floor(Math.random() * clickSymbols.length)];
        particle.style.left = `${e.clientX - 15}px`;
        particle.style.top = `${e.clientY - 15}px`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 60;
        particle.style.setProperty('--drift', `${drift}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    });

    // Create particle drifting stylesheet dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) scale(0.5) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-90px) translateX(var(--drift, 20px)) scale(1.4) rotate(270deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ----------------------------------------------------------------------
    // 4. PROJECT MODAL CONTROLLER
    // ----------------------------------------------------------------------
    const projectData = {
        'cat-coder': {
            title: 'Trợ Lý Nuôi Boss (CatCare) 🐱',
            accentColor: 'var(--pink)',
            desc: 'Ứng dụng Android viết bằng Kotlin & Jetpack Compose giúp nhắc nhở lịch chăm sóc và giải mã tiếng kêu của mèo cưng.',
            longDesc: 'Ứng dụng di động tối ưu dành riêng cho các "con sen"! Được xây dựng hoàn toàn bằng Kotlin và Jetpack Compose theo kiến trúc Clean Architecture mã nguồn mở. Ứng dụng tích hợp mô hình AI dịch tiếng "meo meo" cực dí dỏm, quản lý chi tiết lịch tiêm phòng, theo dõi chế độ dinh dưỡng hàng ngày, gửi thông báo nhắc nhở giờ cho ăn thông qua WorkManager, và gợi ý thực đơn pate tốt nhất cho sức khỏe boss mèo.',
            tags: ['Kotlin', 'Jetpack Compose', 'OpenAI API', 'Clean Architecture'],
            link: 'https://github.com/tranvietanh55/web-test'
        },
        'street-food': {
            title: 'Bản Đồ Ăn Vặt (YumMap) 🍟',
            accentColor: 'var(--green)',
            desc: 'Ứng dụng tìm kiếm các thiên đường ẩm thực đường phố tại Hà Nội bằng Google Maps SDK, tích hợp lọc quán theo vị trí.',
            longDesc: 'Bản đồ ăn vặt tương tác giúp giải cứu những tâm hồn đói bụng! Dự án tích hợp Google Maps SDK để hiển thị hàng trăm địa điểm ăn ngon-bổ-rẻ tại Hà Nội. Người dùng có thể tìm kiếm quán ăn xung quanh, xem đánh giá chi tiết, lọc địa điểm theo giá cả và khoảng cách. Ngoài ra ứng dụng còn có vòng xoay may mắn "Hôm nay ăn gì" để lựa chọn món ăn ngẫu nhiên.',
            tags: ['Android SDK', 'Google Maps API', 'Retrofit', 'MVVM'],
            link: 'https://github.com/tranvietanh55/web-test'
        },
        'cute-plant': {
            title: 'Nhật Ký Cây Xanh (SproutLog) 🌱',
            accentColor: 'var(--purple)',
            desc: 'Ứng dụng quản lý lịch tưới cây cảnh, tự động chạy tác vụ gửi thông báo nhắc nhở thông qua WorkManager nền.',
            longDesc: 'Giải pháp tuyệt vời để chăm sóc cây cảnh trong nhà! Ứng dụng giúp bạn tạo hồ sơ riêng cho từng loài thực vật, theo dõi tần suất tưới nước và bón phân, tính toán lượng nước dựa vào độ ẩm và nhiệt độ không khí thực tế. Cơ sở dữ liệu được quản lý bằng Room Database và chạy ngầm gửi thông báo nhắc nhở bằng WorkManager chính xác từng phút.',
            tags: ['Room Database', 'WorkManager', 'Kotlin Flow', 'Material Design 3'],
            link: 'https://github.com/tranvietanh55/web-test'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalLongDesc = document.getElementById('modal-project-long-desc');
    const modalTags = document.getElementById('modal-project-tags');
    const modalAction = document.getElementById('modal-action-btn');

    document.querySelectorAll('[data-project]').forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.getAttribute('data-project');
            const data = projectData[projectKey];
            const card = button.closest('.project-card');
            
            if (data && card && modal) {
                // Clone SVG illustration inside the wrapper
                const originSvg = card.querySelector('.project-svg');
                if (modalImgContainer) {
                    modalImgContainer.innerHTML = '';
                    if (originSvg) {
                        const clonedSvg = originSvg.cloneNode(true);
                        modalImgContainer.appendChild(clonedSvg);
                    }
                    modalImgContainer.style.backgroundColor = data.accentColor;
                }
                
                if (modalTitle) modalTitle.innerText = data.title;
                if (modalDesc) modalDesc.innerText = data.desc;
                if (modalLongDesc) modalLongDesc.innerText = data.longDesc;
                
                // Render Tags
                if (modalTags) {
                    modalTags.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'project-tag';
                        span.innerText = tag;
                        modalTags.appendChild(span);
                    });
                }

                if (modalAction) {
                    modalAction.onclick = () => {
                        window.open(data.link, '_blank');
                    };
                }

                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 5. CONTACT FORM & LOCALSTORAGE DATABASE
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput || !emailInput || !messageInput) return;

            const newMessage = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                date: new Date().toLocaleString('vi-VN')
            };
            
            // Push messages to LocalStorage
            let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            messages.unshift(newMessage);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));
            
            showNotification(`Viuuu! Tin nhắn của đại hiệp ${escapeHTML(nameInput.value)} đã được gửi! 🚀`);
            
            contactForm.reset();
            
            // Sync Admin view if currently active
            const adminModal = document.getElementById('admin-modal');
            if (adminModal && adminModal.classList.contains('active')) {
                renderMessages();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. SCROLL REVEAL EFFECT
    // ----------------------------------------------------------------------
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check
});

// --------------------------------------------------------------------------
// 7. GLOBAL ADMINISTRATIVE FUNCTIONS (EXPOSED TO WINDOW)
// --------------------------------------------------------------------------
// Custom Alert Notifications
const alertBox = document.getElementById('custom-alert');
const alertMsg = document.getElementById('alert-message');
let alertTimeout;

window.showNotification = (message) => {
    if (!alertBox || !alertMsg) return;
    clearTimeout(alertTimeout);
    alertMsg.innerText = message;
    alertBox.classList.add('active');
    
    alertTimeout = setTimeout(() => {
        alertBox.classList.remove('active');
    }, 3000);
};

// Toggle admin modal
window.toggleAdminPanel = () => {
    const adminModal = document.getElementById('admin-modal');
    if (adminModal) {
        adminModal.classList.toggle('active');
        if (adminModal.classList.contains('active')) {
            renderMessages();
        }
    }
};

// Render local messages list
window.renderMessages = () => {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px; border: 3px dashed var(--border-color); border-radius: 12px; background-color: var(--bg-color);">
                <p style="font-size: 1.1rem; font-weight: 700;">Hộp thư trống trơn! 📭</p>
                <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">Hãy thử gửi một tin nhắn ở form liên hệ phía trên nhé.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map((msg, index) => `
        <div class="message-card" style="background-color: ${index % 2 === 0 ? 'var(--yellow)' : 'var(--blue)'}; color: #000000;">
            <div class="message-header">
                <span>👤 ${escapeHTML(msg.name)} (${escapeHTML(msg.email)})</span>
                <span>📅 ${msg.date}</span>
            </div>
            <div class="message-body">${escapeHTML(msg.message)}</div>
            <button class="message-delete-btn" onclick="deleteMessage(${index})">Xóa ❌</button>
        </div>
    `).join('');
};

// Delete single message item
window.deleteMessage = (index) => {
    let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    messages.splice(index, 1);
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    renderMessages();
    showNotification('Đã xóa tin nhắn! 🗑️');
};

// Delete all database records
window.clearMessages = () => {
    if (confirm('Đại hiệp có chắc chắn muốn dọn dẹp toàn bộ hòm thư không?')) {
        localStorage.removeItem('portfolio_messages');
        renderMessages();
        showNotification('Đã làm sạch hộp thư! 🧼');
    }
};

// Escape HTML entities (XSS Defense)
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
