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