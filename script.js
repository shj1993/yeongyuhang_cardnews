document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const nextButtons = document.querySelectorAll('.next-btn[data-next]');
    const qrCodeImg = document.getElementById('qrCode');
    const qrModalOverlay = document.getElementById('qr-modal-overlay');
    const qrModalImg = document.getElementById('qr-modal-img');
    const travelLoungeText = document.getElementById('travelLoungeText');
    // ⭐⭐⭐ [핵심 수정] card5 팝업을 위한 새로운 변수 선언! ⭐⭐⭐
    const popup5Overlay = document.getElementById('popup5-overlay'); // 팝업 전체 레이어
    const closePopupButton = document.getElementById('closePopup'); // 팝업 닫기 버튼 (id는 유지)
    // card5Popup 변수는 이제 더 이상 사용하지 않으므로 제거하거나 주석 처리하세요.
    // const card5Popup = document.getElementById('card5'); 
    const goToFirstBtn = document.getElementById('goToFirstBtn');

    let currentCardIndex = 0;
    let autoAdvanceTimeout;

    function showCard(index) {
        // ⭐⭐⭐ [핵심 수정] 팝업이 열려있다면 showCard 실행 전에 닫음 ⭐⭐⭐
        if (popup5Overlay && popup5Overlay.classList.contains('active')) {
            popup5Overlay.classList.remove('active');
        }
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        currentCardIndex = index;

        if (index === 0) {
            startAutoAdvance();
        } else {
            clearTimeout(autoAdvanceTimeout);
        }
    }

    function startAutoAdvance() {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = setTimeout(() => {
            showCard(1); // 2번 카드는 index 1
        }, 5000); // 5초 = 5000ms
    }

    showCard(0);

    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            clearTimeout(autoAdvanceTimeout);
            const nextCardId = e.target.dataset.next;
            const nextCard = document.getElementById(nextCardId);
            if (nextCard) {
                showCard(Array.from(cards).indexOf(nextCard));
            }
        });
    });

    if (qrCodeImg) {
        qrCodeImg.addEventListener('click', () => {
            clearTimeout(autoAdvanceTimeout);
            // ⭐⭐⭐ [핵심 수정] QR 팝업이 뜨기 전에 혹시 모를 5번 팝업도 닫음 ⭐⭐⭐
            if (popup5Overlay && popup5Overlay.classList.contains('active')) {
                popup5Overlay.classList.remove('active');
            }
            qrModalImg.src = qrCodeImg.src;
            qrModalOverlay.classList.add('active');
        });
    }

    if (qrModalOverlay) {
        qrModalOverlay.addEventListener('click', () => {
            qrModalOverlay.classList.remove('active');
            if (currentCardIndex === 0) {
                startAutoAdvance();
            }
        });
    }

    // ⭐⭐⭐ [핵심 수정] '트래블라운지는?' 텍스트 클릭 시 새로운 5번 팝업 띄우기 ⭐⭐⭐
    if (travelLoungeText && popup5Overlay) { // 변수명 card5Popup -> popup5Overlay 로 변경
        travelLoungeText.addEventListener('click', () => {
            clearTimeout(autoAdvanceTimeout); // 팝업 열리면 타이머 취소

            // ⭐⭐ 현재 보이는 모든 카드를 숨김! ⭐⭐
            cards.forEach(card => card.classList.remove('active'));

            popup5Overlay.classList.add('active'); // ⭐⭐ 새로운 팝업 활성화! ⭐⭐
        });
    }


    // ⭐⭐⭐ [핵심 수정] 새로운 팝업 닫기 버튼 로직 ⭐⭐⭐
    if (closePopupButton && popup5Overlay) {
        closePopupButton.addEventListener('click', () => {
            popup5Overlay.classList.remove('active'); // 팝업 숨김

            // ⭐⭐ 팝업 닫을 때, 이전에 보였던 카드를 다시 활성화! ⭐⭐
            showCard(currentCardIndex); 
        });
    }

    if (goToFirstBtn) {
        goToFirstBtn.addEventListener('click', () => {
            clearTimeout(autoAdvanceTimeout);
            showCard(0);
        });
    }
});