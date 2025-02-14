document.addEventListener('DOMContentLoaded', function() {
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    const slides = document.querySelectorAll('.scroll-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isScrolling = false; // 스크롤 중복 방지
    let autoSlideInterval; // 자동 슬라이드를 위한 인터벌 변수

    // 점 업데이트 함수
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // 슬라이드 이동 함수
    function moveSlide(index) {
        const slideWidth = slides[0].clientWidth;
        scrollWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
        updateDots();
    }

    // 자동 슬라이드 함수
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length; // 무한 반복
            moveSlide(currentSlide);
        }, 3000); // 3초마다 슬라이드 변경
    }

    // 점 클릭 시 해당 슬라이드로 이동
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            moveSlide(currentSlide);
        });
    });

    // 스크롤 이벤트 핸들러
    function handleWheelScroll(e) {
        if (isScrolling) return; // 스크롤 중이면 무시

        e.preventDefault();
        isScrolling = true;

        if (e.deltaY > 0 && currentSlide < slides.length - 1) {
            currentSlide++;
            moveSlide(currentSlide);
        } else if (e.deltaY < 0 && currentSlide > 0) {
            currentSlide--;
            moveSlide(currentSlide);
        }

        setTimeout(() => {
            isScrolling = false;
        }, 600); // 스크롤 딜레이 적용
    }

    // 자동 슬라이드 시작
    startAutoSlide();

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('wheel', handleWheelScroll);
    updateDots();

    // Masonry 이미지 클릭하면 보이기
    const mainImage = document.getElementById('mainImage');
    const myWorkItems = document.querySelector('.my-work-container');
    myWorkItems.style.display = 'none';
    myWorkItems.style.opacity = 0;

    mainImage.addEventListener('click', function() {
        myWorkItems.style.display = 'block';
        setTimeout(() => {
            myWorkItems.style.opacity = 1;
        }, 10);
        mainImage.style.display = 'none';
    });

    myWorkItems.addEventListener('click', function(event) {
        if (event.target === myWorkItems) {
            myWorkItems.style.opacity = 0;
            setTimeout(() => {
                myWorkItems.style.display = 'none';
                mainImage.style.display = 'block';
            }, 300);
        }
    });

    // 배경 이미지 전환
    const backgroundOne = document.getElementById('backgroundOne');
    const backgroundTwo = document.getElementById('backgroundTwo');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const myWorkSection = document.getElementById('My-Work');
        const myWorkOffset = myWorkSection.offsetTop;
        const myWorkHeight = myWorkSection.clientHeight;

        if (scrollPosition >= myWorkOffset && scrollPosition < myWorkOffset + myWorkHeight) {
            backgroundOne.style.opacity = '0';
            backgroundTwo.style.opacity = '1';
            document.getElementById('main-image').style.display = 'none';
            document.getElementById('main-image-2').style.display = 'block';
        } else {
            backgroundOne.style.opacity = '1';
            backgroundTwo.style.opacity = '0';
            document.getElementById('main-image').style.display = 'block';
            document.getElementById('main-image-2').style.display = 'none';
        }
    });

    // Masonry 이미지 클릭하면 확대하기
    const items = document.querySelectorAll('.my-work-item img');
    const overlay = document.querySelector('.overlay');
    const overlayImage = overlay.querySelector('img');

    items.forEach(item => {
        item.addEventListener('click', function() {
            overlayImage.src = this.src;
            overlay.style.display = 'flex';
        });
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });
});