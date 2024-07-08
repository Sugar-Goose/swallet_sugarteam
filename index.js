// FrontEnd
const startPage = document.querySelector("#startPage");
const createWalletPage = document.querySelector("#createWalletPage");
const sercretPhrasePage = document.querySelector("#sercretPhrasePage");
const pinPage = document.querySelector("#pin");
const mainPage = document.querySelector("#main");
const swapPage = document.querySelector("#swap");
const privateKeyPage = document.querySelector("#privateKey");
const secretPhraseShowPage = document.querySelector("#secretPhraseShow");
const settingsPage = document.querySelector("#settings");

// Common Function
function fetchData(apiUrl, successCallback, errorCallback) {
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback);
}

function formatPrice(price) {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function updatePrice(price, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = price;
    }
}

// Fetch and Update Prices
const prices = {
    BTC: "https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000",
    USDT: "https://api.diadata.org/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7",
    TRX: "https://api.diadata.org/v1/assetQuotation/Tron/0x0000000000000000000000000000000000000000",
    BNB: "https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000",
    BCH: "https://api.diadata.org/v1/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000",
    ETH: "https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000",
    SOL: "https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000",
    ATOM: "https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000",
    BUSD: "https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    LTC: "https://api.diadata.org/v1/assetQuotation/Litecoin/0x0000000000000000000000000000000000000000"
};

Object.keys(prices).forEach(key => {
    fetchData(prices[key],
        function(data) {
            const formattedPrice = formatPrice(data.Price);
            updatePrice(formattedPrice, key.toLowerCase() + "Price");
        },
        function(error) {
            console.error(error);
        }
    );
});

if (startPage) {
    // Handle checkbox and buttons enabling/disabling
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
        overlay.classList.add("active");
        content1.classList.add("hidden");
        content2.classList.add("hidden");
        content3.classList.add("hidden");
        content4.classList.add("hidden");
    });

    document.getElementById('closeDisclaimerBtn').addEventListener('click', () => {
        overlay.classList.remove("active");
        content1.classList.remove("hidden");
        content2.classList.remove("hidden");
        content3.classList.remove("hidden");
        content4.classList.remove("hidden");
    });
}

// Telegram
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

// User Login and Logout
function updateStep(step) {
    fetch('http://localhost:5000/api/updateStep', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id, step })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

if (startPage) {
    fetch(`http://localhost:5000/api/user/${user.id}`)
    .then(response => response.json())
    .then(userData => {
        if (userData.register_step == 1) {
            window.location.href = 'https://sugar-goose.github.io/swallet_sugarteam/main_page/';
        }
    })
    .catch(error => console.error('Error:', error));
}

if (settingsPage) {
    document.querySelector("#logout-button").addEventListener("click", () => {
        updateStep(0);
        window.location.href = 'https://sugar-goose.github.io/swallet_sugarteam/';
    });
}

// Create PIN Code and Save to Database
if (pinPage) {
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.kb_button:not(.none):not(.backspace)');
        const dots = document.querySelectorAll('.dot');
        const backspaceButton = document.querySelector('.kb_button.backspace');
        const header = document.getElementById('header');
        let activeIndex = 0;
        let firstPin = '';
        let secondPin = '';
        let isFirstPinEntered = false;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (activeIndex < dots.length) {
                    dots[activeIndex].classList.add('active');
                    if (!isFirstPinEntered) {
                        firstPin += button.textContent;
                    } else {
                        secondPin += button.textContent;
                    }
                    activeIndex++;
                    if (activeIndex === dots.length) {
                        if (!isFirstPinEntered) {
                            header.textContent = 'Repeat the code';
                            setTimeout(() => {
                                dots.forEach(dot => dot.classList.remove('active'));
                                activeIndex = 0;
                                isFirstPinEntered = true;
                            }, 200);
                        } else {
                            if (firstPin === secondPin) {
                                fetch('http://localhost:5000/api/updatePin', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ user_id: user.id, pin: firstPin })
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    updateStep(1);
                                    window.location.href = 'https://sugar-goose.github.io/swallet_sugarteam/main_page/';
                                })
                                .catch(error => console.error('Error:', error));
                            } else {
                                header.textContent = 'Codes do not match';
                                setTimeout(() => {
                                    dots.forEach(dot => dot.classList.remove('active'));
                                    activeIndex = 0;
                                    firstPin = '';
                                    secondPin = '';
                                    isFirstPinEntered = false;
                                }, 200);
                            }
                        }
                    }
                }
            });
        });

        backspaceButton.addEventListener('click', () => {
            if (activeIndex > 0) {
                activeIndex--;
                dots[activeIndex].classList.remove('active');
                if (!isFirstPinEntered) {
                    firstPin = firstPin.slice(0, -1);
                } else {
                    secondPin = secondPin.slice(0, -1);
                }
            }
        });
    });
}

// Create Wallet in Database
if (startPage) {
    document.querySelector("#createWalletBtn").addEventListener("click", () => {
        const user_id = user.id;
        const username = user.username;
        fetch('http://localhost:5000/api/createWallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, username })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
}

// Display User Data
if (mainPage) {
    fetch(`http://localhost:5000/api/user/${user.id}`)
    .then(response => response.json())
    .then(userData => {
        const balances = {
            btc: parseFloat(userData.btc_balance.$numberDecimal),
            usdt: parseFloat(userData.usdt_balance.$numberDecimal),
            trx: parseFloat(userData.trx_balance.$numberDecimal),
            bnb: parseFloat(userData.bnb_balance.$numberDecimal),
            bch: parseFloat(userData.bch_balance.$numberDecimal),
            eth: parseFloat(userData.eth_balance.$numberDecimal),
            sol: parseFloat(userData.sol_balance.$numberDecimal),
            atom: parseFloat(userData.atom_balance.$numberDecimal),
            busd: parseFloat(userData.busd_balance.$numberDecimal),
            ltc: parseFloat(userData.ltc_balance.$numberDecimal)
        };

        Object.keys(balances).forEach(key => {
            const element = document.getElementById('balance-' + key);
            if (element) {
                element.innerHTML = balances[key];
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

// Отображение секретной фразы при регистрации
if (sercretPhrasePage) {
    fetch(`http://localhost:5000/api/user/${user.id}`)
    .then(response => response.json())
    .then(userData => {
        const words = userData.phrase.split(" ");
        for (let i = 0; i < words.length; i++) {
            document.querySelector(`#word${i + 1}`).innerHTML = words[i];
        }
    })
    .catch(error => console.error('Error:', error));
}
