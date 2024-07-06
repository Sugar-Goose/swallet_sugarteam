// TELEGRAM ----------------------
// let tg = window.Telegram.WebApp;

// tg.expand()

// let user_name = `${tg.initDataUnsafe.user.first_name}`;
// let user_lastname = `${tg.initDataUnsafe.user.last_name}`;

// FrontEnd

const startPage = document.querySelector("#startPage");
const createWalletPage = document.querySelector("#createWalletPage");
const sercretPhrasePage = document.querySelector("#sercretPhrasePage");
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
                                window.location.href = 'https://sugar-goose.github.io/swallet_sugarteam/main_page/';
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

// Функция для отправки запроса к API и получения данных
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

// Функция для форматирования цены
function formatPrice(price) {
    // Форматируем цену в формат "56 343,27"
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Функция для обновления цены на странице
function updatePrice(price, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = price;
    }
}

// BTC
let BTCprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000", 
    function(data) {
        BTCprice = data.Price;
        const formattedPrice = formatPrice(BTCprice);
        updatePrice(formattedPrice, "btcPrice");
    },
    function(error) {
        console.error(error);
    }
);

// USDT
let USDTprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7", 
    function(data) {
        USDTprice = data.Price;
        const formattedPrice = formatPrice(USDTprice);
        updatePrice(formattedPrice, "usdtPrice");
    },
    function(error) {
        console.error(error);
    }
);

// TRX
let TRXprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Tron/0x0000000000000000000000000000000000000000", 
    function(data) {
        TRXprice = data.Price;
        const formattedPrice = formatPrice(TRXprice);
        updatePrice(formattedPrice, "trxPrice");
    },
    function(error) {
        console.error(error);
    }
);

// BNB
let BNBprice;

fetchData("https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000", 
    function(data) {
        BNBprice = data.Price;
        const formattedPrice = formatPrice(BNBprice);
        updatePrice(formattedPrice, "bnbPrice");
    },
    function(error) {
        console.error(error);
    }
);

// BCH
let BCHprice;

fetchData("https://api.diadata.org/v1/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000", 
    function(data) {
        BCHprice = data.Price;
        const formattedPrice = formatPrice(BCHprice);
        updatePrice(formattedPrice, "bchPrice");
    },
    function(error) {
        console.error(error);
    }
);

// ETH
let ETHprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000", 
    function(data) {
        ETHprice = data.Price;
        const formattedPrice = formatPrice(ETHprice);
        updatePrice(formattedPrice, "ethPrice");
    },
    function(error) {
        console.error(error);
    }
);

// SOL
let SOLprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000", 
    function(data) {
        SOLprice = data.Price;
        const formattedPrice = formatPrice(SOLprice);
        updatePrice(formattedPrice, "solPrice");
    },
    function(error) {
        console.error(error);
    }
);

// ATOM
let ATOMprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000", 
    function(data) {
        ATOMprice = data.Price;
        const formattedPrice = formatPrice(ATOMprice);
        updatePrice(formattedPrice, "atomPrice");
    },
    function(error) {
        console.error(error);
    }
);

// BUSD
let BUSDprice;

fetchData("https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 
    function(data) {
        BUSDprice = data.Price;
        const formattedPrice = formatPrice(BUSDprice);
        updatePrice(formattedPrice, "busdPrice");
    },
    function(error) {
        console.error(error);
    }
);

// LTC
let LTCprice;

fetchData("https://api.diadata.org/v1/assetQuotation/Litecoin/0x0000000000000000000000000000000000000000", 
    function(data) {
        LTCprice = data.Price;
        const formattedPrice = formatPrice(LTCprice);
        updatePrice(formattedPrice, "ltcPrice");
    },
    function(error) {
        console.error(error);
    }
);



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
// Telegram

const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;


// Создание аккаунта и авторизация
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

    if (user) {
        fetch('http://localhost:5000/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user.id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                window.location.href = '/create_wallet/';
            }
        })
        .catch(error => console.error('Error:', error));
    }
}




// Отображение данных пользователя
if (mainPage) {
    fetch(`http://localhost:5000/api/user/${user.id}`)
    .then(response => response.json())
    .then(userData => {
        const btcbalance_block = document.querySelector("#balance-btc");
        const usdtbalance_block = document.querySelector("#balance-usdt");
        const trxbalance_block = document.querySelector("#balance-trx");
        const bnbbalance_block = document.querySelector("#balance-bnb");
        const bchbalance_block = document.querySelector("#balance-bch");
        const ethbalance_block = document.querySelector("#balance-eth");
        const solbalance_block = document.querySelector("#balance-sol");
        const atombalance_block = document.querySelector("#balance-atom");
        const busdbalance_block = document.querySelector("#balance-busd");
        const ltcbalance_block = document.querySelector("#balance-ltc");
        btcbalance_block.innerHTML = userData.btc_balance;
        usdtbalance_block.innerHTML = userData.usdt_balance;
        trxbalance_block.innerHTML = userData.trx_balance;
        bnbbalance_block.innerHTML = userData.bnb_balance;
        bchbalance_block.innerHTML = userData.bch_balance;
        ethbalance_block.innerHTML = userData.eth_balance;
        solbalance_block.innerHTML = userData.sol_balance;
        atombalance_block.innerHTML = userData.atom_balance;
        busdbalance_block.innerHTML = userData.busd_balance;
        ltcbalance_block.innerHTML = userData.ltc_balance;
    })
    .catch(error => console.error('Error:', error));
}

