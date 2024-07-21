// Объявление телеграма
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
const username = user.username;

// Отображение транзакций
async function fetchTransactions(username) {
    try {
        const response = await fetch(`http://localhost:5000/api/transactions?username=${username}`);
        const transactions = await response.json();
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

function displayTransactions(transactions) {
    const historyTab = document.querySelector('.history__tab');
    historyTab.innerHTML = '';

    transactions.forEach((transaction) => {
        const isIncoming = transaction.recipient === username;
        const transactionClass = isIncoming ? 'incoming' : 'outcoming';
        const sign = isIncoming ? '+' : '-';

        const transactionHTML = `
            <div class="transaction ${transactionClass}">
                <div class="transaction__left">
                    <h4>From: <span>${isIncoming ? transaction.sender : 'You'}</span></h4>
                    <h4><span>${transaction.time}</span> UTC+2</h4>
                    <h3 class="transaction__sum">${sign} <span>${transaction.amount}</span> <span>${transaction.currency}</span></h3>
                </div>
                <div class="transaction__right">
                    <h4>To: <span>${isIncoming ? 'You' : transaction.recipient}</span></h4>
                </div>
            </div>
            <hr>
        `;
        historyTab.innerHTML += transactionHTML;
    });
}

if (mainPage) {
    document.addEventListener('DOMContentLoaded', async () => {
        const transactions = await fetchTransactions(username);
        if (transactions && transactions.length > 0) {
            displayTransactions(transactions);
        } else {
            document.querySelector('.history__tab').innerHTML = '<h3>History is empty</h3>';
        }
    });
}
