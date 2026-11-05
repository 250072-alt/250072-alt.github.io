function showPC(title, imageSrc, description) {
    const modal = document.getElementById('myModal');
    const pcTitle = document.getElementById('PcTitle');
    const pcImage = document.getElementById('PcImage');
    const pcDescription = document.getElementById('PcDescription');

    pcTitle.textContent = title;
    pcImage.src = imageSrc;
    pcDescription.textContent = description;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


window.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');

    if (event.target === modal) {
        closeModal();
    }
});

const whatsappButton = document.querySelector('.whatsapp-button');

function changeButtonSize() {
    whatsappButton.style.transition = 'all 1s ease-in-out';
    const currentSize = parseFloat(getComputedStyle(whatsappButton).width);
    const newSize = currentSize === 150 ? 100 : 150;
    whatsappButton.style.width = newSize + 'px';
    whatsappButton.style.height = newSize + 'px';
}

setInterval(changeButtonSize, 2000);


function searchPC() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase().trim();
    const setups = document.querySelectorAll('.setup');

    setups.forEach(function (setup) {
        const title = setup.querySelector('h2').textContent.toLowerCase();
        const description = setup.querySelector('p').textContent.toLowerCase();

        if (
            title.includes(filter) ||
            description.includes(filter)
        ) {
            setup.style.display = '';
        } else {
            setup.style.display = 'none';
        }
    });
}


document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchPC();
    }
});


const scrollToTopButton = document.getElementById('scrollToTopButton');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function paralaxScroll(){
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = -(scrolled * 0.2) + 'px'

}
window.addEventListener('scroll',paralaxScroll);

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (slider && prevBtn && nextBtn) {
    let counter = 0;

    nextBtn.addEventListener('click', () => {
        if (counter < 4) {
            counter++;
            slider.style.transform = `translateX(${-73.333 * counter}%)`;
        } else {
            counter = 0;
            slider.style.transform = `translateX(0)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
        } else {
            counter = 4;
        }
        slider.style.transform = `translateX(${-73.333 * counter}%)`;
    });
}

function toggleDarkMode() {
    const theme = document.querySelector('.theme');
    var body = document.body;
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        theme.style.backgroundImage = "url('sun.png')";
        theme.style.backgroundSize = "contain";
        theme.style.backgroundRepeat = "no-repeat";
        theme.style.backgroundPosition = "center";
        body.style.backgroundColor = "";
        body.style.color = "#cfd4ff";
        footer.style.color = "#cfd4ff";
        footer.style.background =  `linear-gradient(0deg, #000 0%, rgba(27,27,184,.6) 100%),
                linear-gradient(rgba(143,160,255,.22) 1px, transparent 1px) 0 0 / 32px 32px,
                linear-gradient(90deg, rgba(143,160,255,.22) 1px, transparent 1px) 0 0 / 32px 32px,
                #000 `;
        header.style.backgroundImage = "url('Header.png')";
    } else {
        theme.style.backgroundImage = "url('moon.png')";
        theme.style.backgroundSize = "contain";
        theme.style.backgroundRepeat = "no-repeat";
        theme.style.backgroundPosition = "center";
        body.style.color = "#02020a";
        footer.style.color = "#02020a";
        body.style.background = `
    linear-gradient(rgba(90, 102, 255, 0.08) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgba(90, 102, 255, 0.08) 1px, transparent 1px) 0 0 / 48px 48px,
    radial-gradient(ellipse 70% 45% at 80% 15%, rgba(90, 102, 255, 0.15), transparent 70%),
    radial-gradient(ellipse 60% 45% at 5% 70%, rgba(58, 70, 255, 0.12), transparent 70%),
    #ffffff
`;
        footer.style.background = `
    linear-gradient(rgba(90, 102, 255, 0.08) 1px, transparent 1px) 0 0 / 48px 48px,
    linear-gradient(90deg, rgba(90, 102, 255, 0.08) 1px, transparent 1px) 0 0 / 48px 48px,
    radial-gradient(ellipse 70% 45% at 80% 15%, rgba(90, 102, 255, 0.15), transparent 70%),
    radial-gradient(ellipse 60% 45% at 5% 70%, rgba(58, 70, 255, 0.12), transparent 70%),
    #bcbcbc
`;
        header.style.backgroundImage = "url('LightHome.png')";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // ---- Star rating ----
    document.querySelectorAll('.rating').forEach(rating => {
        const stars = [...rating.querySelectorAll('.star')];
        let current = 0;

        const paint = (n, cls) => stars.forEach((s, i) => s.classList.toggle(cls, i < n));

        stars.forEach(star => {
            const value = Number(star.dataset.value);

            star.addEventListener('mouseenter', () => paint(value, 'hover'));
            star.addEventListener('click', () => {
                current = (current === value) ? 0 : value;
                paint(current, 'selected');
            });
        });

        rating.addEventListener('mouseleave', () => paint(0, 'hover'));
    });

    // ---- Like / dislike ----
    document.querySelectorAll('.votes').forEach(votes => {
        const like = votes.querySelector('.like-button');
        const dislike = votes.querySelector('.dislike-button');
        const likeCount = votes.querySelector('.like-count');
        const dislikeCount = votes.querySelector('.dislike-count');

        function vote(btn, count, otherBtn, otherCount) {
            const on = btn.classList.toggle('active');
            count.textContent = Number(count.textContent) + (on ? 1 : -1);

            if (on && otherBtn.classList.contains('active')) {
                otherBtn.classList.remove('active');
                otherCount.textContent = Number(otherCount.textContent) - 1;
            }
        }

        like.addEventListener('click', () => vote(like, likeCount, dislike, dislikeCount));
        dislike.addEventListener('click', () => vote(dislike, dislikeCount, like, likeCount));
    });
});
        const music = document.getElementById('background-music');
        const musicBtn = document.getElementById('musicToggle');
        music.volume = 0.4;
        if (music && musicBtn) {
        function updateMusicBtn() {
            const playing = !music.paused;
            musicBtn.textContent = playing ? '❚❚' : '▶';
            musicBtn.classList.toggle('playing', playing);
            musicBtn.setAttribute('aria-pressed', playing);
            musicBtn.setAttribute('aria-label', playing ? 'Остановить музыку' : 'Включить музыку');
        }

        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play().catch(() => {});
            } else {
                music.pause();
            }
        });

        music.addEventListener('play', updateMusicBtn);
        music.addEventListener('pause', updateMusicBtn);
        updateMusicBtn();
    }
(function () {
    const quizEl = document.getElementById('quiz');
    if (!quizEl) return;

    const questions = [
        { q: 'Что означает аббревиатура GPU?',
          a: ['Графический процессор', 'Центральный процессор', 'Оперативная память', 'Блок питания'], c: 0 },
        { q: 'Какой тип накопителя обычно самый быстрый?',
          a: ['SSD NVMe', 'HDD 7200 об/мин', 'DVD-привод', 'Флешка USB 2.0'], c: 0 },
        { q: 'Для чего нужна термопаста?',
          a: ['Для передачи тепла от процессора к кулеру', 'Для склейки деталей', 'Для защиты от пыли', 'Для разгона процессора'], c: 0 },
        { q: 'В какой слот на материнской плате обычно ставят видеокарту?',
          a: ['PCI Express x16', 'SATA', 'M.2 для Wi-Fi', 'DIMM'], c: 0 },
        { q: 'Какая память очищается при выключении компьютера?',
          a: ['Оперативная (RAM)', 'SSD', 'HDD', 'Флеш-накопитель'], c: 0 },
        { q: 'Что означает RGB в подсветке?',
          a: ['Красный, зелёный, синий', 'Быстрый графический буфер', 'Режим Gaming-Boost', 'Радиатор с гибким блоком'], c: 0 },
        { q: 'В каких единицах измеряют частоту процессора?',
          a: ['Герцы (ГГц)', 'Ватты', 'Вольты', 'Байты'], c: 0 },
        { q: 'Сколько бит в одном байте?',
          a: ['8', '4', '16', '10'], c: 0 }
    ];

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const optionBtns = [...optionsEl.querySelectorAll('.option')];
    const nextQ = document.getElementById('next-btn');
    const scoreEl = document.getElementById('score');

    let order, index, score, current, answered;

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function updateScore() {
        scoreEl.textContent = ` ${score} / ${questions.length}`;
    }

    function start() {
        order = shuffle(questions);
        index = 0;
        score = 0;
        updateScore();
        optionsEl.style.display = '';
        showQuestion();
    }

    function showQuestion() {
        const item = order[index];
        const correctText = item.a[item.c];
        current = { correctText, answers: shuffle(item.a) };
        answered = false;

        questionEl.dataset.progress = `Вопрос ${index + 1} / ${order.length}`;
        questionEl.textContent = item.q;

        optionBtns.forEach((btn, i) => {
            btn.textContent = current.answers[i];
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong');
        });

        nextQ.style.display = 'none';
    }

    function choose(btn) {
        if (answered) return;
        answered = true;

        const isRight = btn.textContent === current.correctText;
        if (isRight) {
            score++;
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
            optionBtns.find(b => b.textContent === current.correctText).classList.add('correct');
        }

        optionBtns.forEach(b => b.disabled = true);
        updateScore();

        nextQ.textContent = index === order.length - 1 ? 'Результат' : 'Дальше';
        nextQ.style.display = 'inline-block';
    }

    function finish() {
        const ratio = score / order.length;
        const msg = ratio >= 0.8 ? 'Ты настоящий эксперт по ПК!'
                  : ratio >= 0.5 ? 'Неплохо, но можно лучше!'
                  : 'Есть куда расти — попробуй ещё раз!';

        questionEl.dataset.progress = 'Квиз окончен';
        questionEl.textContent = msg;
        optionsEl.style.display = 'none';
        nextQ.textContent = 'Играть снова';
        nextQ.style.display = 'inline-block';
        nextQ.dataset.restart = '1';
    }

    optionBtns.forEach(btn => btn.addEventListener('click', () => choose(btn)));

    nextQ.addEventListener('click', () => {
        if (nextQ.dataset.restart) {
            delete nextQ.dataset.restart;
            start();
        } else if (index < order.length - 1) {
            index++;
            showQuestion();
        } else {
            finish();
        }
    });

    start();
})();
