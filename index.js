// TELEGRAM ----------------------
let tg = window.Telegram.WebApp;

tg.expand()

let user_name = `${tg.initDataUnsafe.user.first_name}`;
let user_lastname = `${tg.initDataUnsafe.user.last_name}`;

// FrontEnd

const startPage = document.querySelector("#startPage");
const pinPage = document.querySelector("#pin");
const mainPage = document.querySelector("#main");
const swapPage = document.querySelector("#swap");
const privateKeyPage = document.querySelector("#privateKey");
const secretPhraseShowPage = document.querySelector("#secretPhraseShow");
const settingsPage = document.querySelector("#settings")

if (startPage) {
    document.getElementById('agreeCheckbox').addEventListener('change', function() {
        const isChecked = this.checked;
        const createWalletBtn = document.getElementById('createWalletBtn');
        const importWalletBtn = document.getElementById('importWalletBtn');
    
        if (isChecked) {
            createWalletBtn.classList.remove('disabled');
            importWalletBtn.classList.remove('disabled');
        } else {
            createWalletBtn.classList.add('disabled');
            importWalletBtn.classList.add('disabled');
        }
    });

    const overlay = document.querySelector('.disclaimer__overlay');
    const content1 = document.querySelector('.logo');
    const content2 = document.querySelector('.header');
    const content3 = document.querySelector('.checkbox');
    const content4 = document.querySelector('.buttons');

    document.getElementById('openDisclaimerBtn').addEventListener('click', () => {
        overlay.classList.add("active")
        content1.classList.add("hidden")
        content2.classList.add("hidden")
        content3.classList.add("hidden")
        content4.classList.add("hidden")
    });

    document.getElementById('closeDisclaimerBtn').addEventListener('click', () => {
        overlay.classList.remove("active")
        content1.classList.remove("hidden")
        content2.classList.remove("hidden")
        content3.classList.remove("hidden")
        content4.classList.remove("hidden")
    });

}

if (pinPage) {
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.kb_button:not(.none):not(.backspace)');
        const dots = document.querySelectorAll('.dot');
        const backspaceButton = document.querySelector('.kb_button.backspace');
        const header = document.getElementById('header');
        let activeIndex = 0;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (activeIndex < dots.length) {
                    dots[activeIndex].classList.add('active');
                    activeIndex++;
                    if (activeIndex === dots.length) {
                        header.textContent = 'Repeat the code';
                        setTimeout(() => {
                            dots.forEach(dot => dot.classList.remove('active'));
                            activeIndex = 0;
                        }, 1000);
                    }
                }
            });
        });

        backspaceButton.addEventListener('click', () => {
            if (activeIndex > 0) {
                activeIndex--;
                dots[activeIndex].classList.remove('active');
            }
        });
    });
}

if (mainPage) {
    
    document.addEventListener('DOMContentLoaded', function() {
        const assetsBtn = document.getElementById('assetsBtn');
        const historyBtn = document.getElementById('historyBtn');
        const slider = document.getElementById('slider');
        const historyTab = document.querySelector('.history__tab');
        const assetsTab = document.querySelector(".assets");
    
        assetsBtn.addEventListener('click', () => {
            slider.style.transform = 'translateX(0)';
            assetsBtn.classList.add('active');
            assetsTab.classList.add('active');
            historyBtn.classList.remove('active');
            historyTab.classList.remove('active')
        });
    
        historyBtn.addEventListener('click', () => {
            slider.style.transform = 'translateX(100%)';
            assetsBtn.classList.remove('active');
            assetsTab.classList.remove('active');
            historyBtn.classList.add('active');
            historyTab.classList.add('active')
        });

        
        let usernameHeader = document.getElementById('username');
        let userLastNameHeader = document.getElementById('lastname');

        usernameHeader.innerHTML = user_id;
        userLastNameHeader.innerHTML = user_lastname;
    });
}

if (privateKeyPage) {
    document.getElementById('privateKeyCopy').addEventListener('click', function() {
        let privateKeyText = document.querySelector('.private_key_block p').innerHTML;
        privateKeyText = privateKeyText.replace(/<br>/g, '');

        const tempElement = document.createElement('textarea');
        tempElement.value = privateKeyText;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);

        document.getElementById("privateKeyCopy").innerHTML = "Copied!"
        document.getElementById("privateKeyCopy").style.color = "#51df7b"
    });
}

if (secretPhraseShowPage) {
    document.getElementById('privateKeyCopy').addEventListener('click', function() {
        const wordElements = document.querySelectorAll('.word span');
        const words = Array.from(wordElements).map(el => el.textContent).join(' ');
        const tempElement = document.createElement('textarea');
        tempElement.value = words;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
    
        document.getElementById("privateKeyCopy").innerHTML = "Copied!"
        document.getElementById("privateKeyCopy").style.color = "#51df7b"
    }); 
}

if (settingsPage) {
    const overlay = document.querySelector('.disclaimer__overlay');
    const content1 = document.querySelector('.assets');
    const content2 = document.querySelector('.bottom__menu');

    document.getElementById('openDisclaimerBtn').addEventListener('click', () => {
        overlay.classList.add("active")
        content1.classList.add("hidden")
        content2.classList.add("hidden")
    });

    document.getElementById('closeDisclaimerBtn').addEventListener('click', () => {
        overlay.classList.remove("active")
        content1.classList.remove("hidden")
        content2.classList.remove("hidden")
    });
}
