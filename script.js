// 데스크탑의 script.js 파일 (희주의 index.html에 맞춰 5가지 고정 버튼 기능 구현)

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const cards = Array.from(document.querySelectorAll('.card')); // HTML에 정의된 카드들을 가져옴
    let currentCardIndex = cards.findIndex(card => card.classList.contains('active'));
    if (currentCardIndex === -1) currentCardIndex = 0; // active 클래스 없으면 첫 번째 카드 활성화

    // 5가지 고정 버튼들
    const homeBtns = document.querySelectorAll('.home-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const infoBtns = document.querySelectorAll('.info-btn');
    const traveloungeBtns = document.querySelectorAll('.travelounge-btn');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const qrCodeBtns = document.querySelectorAll('.qr-code-btn');


    // 오버레이 요소들
    const qrCodeImage = document.getElementById('qrCodeImage'); // 4번 카드에 있는 실제 QR 이미지

    // 팝업 요소들 (card5 및 QR 모달)
    const popup5Overlay = document.getElementById('popup5-overlay');
    const closePopupBtn = document.getElementById('closePopup');
    const qrModalOverlay = document.getElementById('qr-modal-overlay');
    const qrModalImg = document.getElementById('qr-modal-img');


    // ⭐ 1. 카드 전환 함수 ⭐
    const showCard = (index) => {
        if (index < 0 || index >= cards.length) return; // 유효하지 않은 인덱스 방지

        cards[currentCardIndex].classList.remove('active'); // 이전 카드 비활성화
        cards[index].classList.add('active'); // 새 카드 활성화
        currentCardIndex = index;

        updateFixedButtons(); // 5가지 고정 버튼 상태 업데이트 (활성화/비활성화/숨김 등)
    };

    // ⭐ 2. 5가지 고정 버튼 상태 업데이트 ⭐
    const updateFixedButtons = () => {
        // 모든 버튼을 기본적으로 표시/활성화
        homeBtns.forEach(btn => { btn.classList.remove('hidden'); btn.disabled = false; });
        infoBtns.forEach(btn => { btn.classList.remove('hidden'); btn.disabled = false; });

        // 트래블라운지, 신청하기, QR 버튼은 기본 숨김/비활성화
        traveloungeBtns.forEach(btn => { btn.classList.add('hidden'); btn.disabled = true; });
        applyBtns.forEach(btn => { btn.classList.add('hidden'); btn.disabled = true; });
        qrCodeBtns.forEach(btn => { btn.classList.add('hidden'); btn.disabled = true; });


        prevBtns.forEach(btn => {
            if (currentCardIndex === 0) { // 첫 번째 카드에서는 이전 버튼 비활성화
                btn.classList.add('disabled');
                btn.disabled = true;
            } else {
                btn.classList.remove('disabled');
                btn.disabled = false;
            }
        });

        nextBtns.forEach(btn => {
            if (currentCardIndex === cards.length - 1) { // 마지막 카드 (card4)일 경우
                btn.classList.add('disabled');
                btn.disabled = true;
            } else {
                btn.classList.remove('disabled');
                btn.disabled = false;
            }
        });
        
        // --- 특정 카드에서만 특정 버튼 표시/활성화 ---
        if (currentCardIndex === 0) { // card1 (인덱스 0)일 때 트래블라운지 버튼 표시
            traveloungeBtns.forEach(btn => {
                btn.classList.remove('hidden');
                btn.disabled = false;
            });
        }

        if (currentCardIndex === 3) { // card4 (인덱스 3)일 때 QR 확대하기, 신청하기 버튼 표시
            qrCodeBtns.forEach(btn => {
                btn.classList.remove('hidden');
                btn.disabled = false;
            });
            applyBtns.forEach(btn => {
                btn.classList.remove('hidden');
                btn.disabled = false;
            });
        }
    };


    // ⭐ 3. 이벤트 리스너 등록 ⭐
    // -- 5가지 고정 버튼 --
    homeBtns.forEach(btn => {
        btn.addEventListener('click', () => showCard(0)); // 항상 첫 번째 카드 (card1)로 이동
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentCardIndex > 0 && !btn.disabled) { // disabled 아닐 때만 작동
                showCard(currentCardIndex - 1);
            }
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentCardIndex < cards.length - 1 && !btn.disabled) { // disabled 아닐 때만 작동
                showCard(currentCardIndex + 1);
            }
        });
    });

    infoBtns.forEach(btn => { // 물음표 버튼 클릭 시 card5 팝업 띄우기
        btn.addEventListener('click', () => {
            popup5Overlay.style.display = 'flex';
        });
    });

    traveloungeBtns.forEach(btn => { // 트래블라운지 버튼 클릭 시 card5 팝업 띄우기
        btn.addEventListener('click', () => {
            popup5Overlay.style.display = 'flex';
        });
    });

    qrCodeBtns.forEach(btn => { // QR 확대하기 버튼 클릭 시 QR 모달 띄우기
        btn.addEventListener('click', () => {
            // 4번 카드에 있는 qrCodeImage의 src를 가져와서 모달에 표시
            qrModalImg.src = qrCodeImage.src; 
            qrModalOverlay.style.display = 'flex';
        });
    });
    // applyBtns (신청 버튼)는 a 태그로 HTML에 링크 연결되어 있으므로 별도 JS 이벤트 불필요.

    // QR 모달 닫기
    if (qrModalOverlay) {
        qrModalOverlay.addEventListener('click', (e) => { // 오버레이 클릭 시 닫기
            if (e.target === qrModalOverlay) {
                qrModalOverlay.style.display = 'none';
            }
        });
    }

    // card5 팝업 닫기 버튼
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            popup5Overlay.style.display = 'none';
        });
    }

    // 초기 로드 시 한 번 업데이트
    showCard(currentCardIndex);
});
