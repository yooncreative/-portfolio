document.addEventListener('DOMContentLoaded', function() {
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    const slides = document.querySelectorAll('.scroll-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(index) {
        const slideWidth = slides[0].clientWidth; // 각 슬라이드의 실제 너비 계산
        scrollWrapper.style.transform = `translateX(-${index * slideWidth}px)`; // 슬라이드 이동
        updateDots(); // 페이지네이션 점 업데이트
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            moveSlide(currentSlide); // 슬라이드 이동
        });
    });

    window.addEventListener('wheel', (e) => {
        e.preventDefault(); // 기본 스크롤 방지
        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
            currentSlide++;
        } else if (e.deltaY < 0 && currentSlide > 0) {
            currentSlide--;
        }
        moveSlide(currentSlide); // 슬라이드 이동
    });

    window.addEventListener('resize', () => {
        moveSlide(currentSlide);
    });

    updateDots(); 

    // Masonry 이미지 클릭하면 보이기
    const mainImage = document.getElementById('mainImage'); // 클릭할 메인 이미지
    const myWorkItems = document.querySelector('.my-work-container'); // My Work 섹션
    myWorkItems.style.display = 'none'; // 처음에는 숨김
    myWorkItems.style.opacity = 0; // 초기 불투명도

    mainImage.addEventListener('click', function() {
        myWorkItems.style.display = 'block'; // My Work 섹션 보이기
        setTimeout(() => {
            myWorkItems.style.opacity = 1; // 부드러운 전환을 위해 불투명도 조정
        }, 10); // 10ms 후에 실행
        mainImage.style.display = 'none'; // 메인 이미지 숨기기
    });

    // 빈 여백 클릭 시 My Work 숨기고 다시 메인 이미지 보이기
    myWorkItems.addEventListener('click', function(event) {
        if (event.target === myWorkItems) { // myWorkItems 자체 클릭 시
            myWorkItems.style.opacity = 0; // My Work 불투명도 낮추기
            setTimeout(() => {
                myWorkItems.style.display = 'none'; // My Work 섹션 숨기기
                mainImage.style.display = 'block'; // 메인 이미지 다시 보이기
            }, 300); // 애니메이션이 끝난 후 실행
        }
    });

    // 배경 이미지 전환 요소
    const backgroundOne = document.getElementById('backgroundOne'); // 첫 번째 배경
    const backgroundTwo = document.getElementById('backgroundTwo'); // 두 번째 배경

    // 스크롤에 따라 배경 이미지 전환
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY; // 현재 스크롤 위치
        const myWorkSection = document.getElementById('My-Work'); // My Work 섹션의 위치
        const myWorkOffset = myWorkSection.offsetTop; // My Work 섹션의 상단 위치
        const myWorkHeight = myWorkSection.clientHeight; // My Work 섹션의 높이

        // 스크롤을 내리면 두 번째 배경으로 전환
        if (scrollPosition >= myWorkOffset && scrollPosition < myWorkOffset + myWorkHeight) {
            backgroundOne.style.opacity = '0'; // 첫 번째 배경 숨김
            backgroundTwo.style.opacity = '1'; // 두 번째 배경 보이기
            document.getElementById('main-image').style.display = 'none'; // 첫 번째 버튼 숨김
            document.getElementById('main-image-2').style.display = 'block'; // 두 번째 버튼 보이기
        } else {
            backgroundOne.style.opacity = '1'; // 첫 번째 배경 보이기
            backgroundTwo.style.opacity = '0'; // 두 번째 배경 숨김
            document.getElementById('main-image').style.display = 'block'; // 첫 번째 버튼 보이기
            document.getElementById('main-image-2').style.display = 'none'; // 두 번째 버튼 숨김
        }
    });

    // Masonry 이미지 클릭하면 확대하기
    const items = document.querySelectorAll('.my-work-item img'); // Masonry 이미지
    const overlay = document.querySelector('.overlay'); // 오버레이
    const overlayImage = overlay.querySelector('img'); // 오버레이 이미지

    items.forEach(item => {
        item.addEventListener('click', function() {
            overlayImage.src = this.src; // 클릭한 이미지로 변경
            overlay.style.display = 'flex'; // 오버레이 보여주기
        });
    });

    // 오버레이 클릭 시 닫기
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none'; // 오버레이 닫기
    });
});
