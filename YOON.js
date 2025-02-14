document.addEventListener('DOMContentLoaded', function() {
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    const slides = document.querySelectorAll('.scroll-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isScrolling = false; // 스크롤 중복 방지

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function moveSlide(index) {
        const slideWidth = slides[0].clientWidth;
        scrollWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
        updateDots();
    }

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
    } else if (e.deltaY > 0 && currentSlide === slides.length - 1) {
        // 마지막 슬라이드에 도달했을 때
        document.body.style.overflowY = "auto"; // 일반 스크롤 활성화
        window.removeEventListener('wheel', handleWheelScroll); // 슬라이더 스크롤 이벤트 제거
        return; // 더 이상 슬라이더 동작을 처리하지 않음
    }

    setTimeout(() => {
        isScrolling = false;
    }, 600); // 스크롤 딜레이 적용
}

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
