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