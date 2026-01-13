// === SL TECH BD FAKE TRADING PANEL - LICENSE: usnexus ===
// Fake balance, profit %, transactions — all client-side

(function () {
    'use strict';

    const VALID_KEY = "usnexus";

    // লাইসেন্স চেক
    function checkKey() {
        if (localStorage.getItem('sl_key') === VALID_KEY) {
            startFake();
            return;
        }

        const div = document.createElement('div');
        div.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999999;';
        div.innerHTML = `
            <div style="background:#111;padding:30px;border-radius:10px;width:360px;text-align:center;color:white;">
                <h2>License Key</h2>
                <input id="k" placeholder="Enter key" style="width:100%;padding:12px;margin:15px 0;border-radius:6px;border:1px solid #444;background:#222;color:white;">
                <button id="ok" style="padding:12px 40px;background:#0066cc;color:white;border:none;border-radius:6px;cursor:pointer;">Submit</button>
                <div id="m" style="margin-top:15px;color:#ff5555;"></div>
            </div>
        `;
        document.body.appendChild(div);

        const input = document.getElementById('k');
        const btn = document.getElementById('ok');
        const msg = document.getElementById('m');

        btn.onclick = () => {
            const v = input.value.trim();
            if (v === VALID_KEY) {
                localStorage.setItem('sl_key', v);
                msg.style.color = 'lime';
                msg.textContent = 'OK!';
                setTimeout(() => { div.remove(); startFake(); }, 800);
            } else {
                msg.textContent = 'Wrong key';
            }
        };

        input.onkeydown = e => e.key === 'Enter' && btn.click();
    }

    // ফেক UI চালু
    function startFake() {
        console.log("Activated - usnexus");

        // Fake Balance
        let bal = 1248.60;
        setInterval(() => {
            bal += Math.random() * 45 - 15;
            bal = Math.max(50, bal);
            document.querySelectorAll('.usermenu-balance, .live-balance-text, [class*="balance"]').forEach(e => {
                e.innerHTML = '$' + bal.toFixed(2);
            });
        }, 3000 + Math.random() * 5000);

        // Fake Profit %
        let prof = 0;
        setInterval(() => {
            if (Math.random() > 0.55) {
                prof += Math.floor(Math.random() * 5) + 1;
                document.querySelectorAll('#capitalPercentDisplay, .capital-percent, [class*="profit"]').forEach(e => {
                    e.innerHTML = prof + '%';
                });
            }
        }, 6000);

        // Fake Transactions
        function fakeTx() {
            const container = document.querySelector('.transactions-list, .ons-list, [class*="transaction"], [class*="history"]');
            if (!container) return;

            const methods = ['Bkash P2C', 'Nagad P2C', 'Rocket', 'Upay', 'USDT-TRC20'];
            const amounts = [48, 150, 380, 720, 1800, 3500];
            const sts = ['Successed', 'Successed', 'Processing'];

            const tx = {
                t: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
                m: methods[Math.floor(Math.random()*methods.length)],
                a: amounts[Math.floor(Math.random()*amounts.length)],
                s: sts[Math.floor(Math.random()*sts.length)]
            };

            const row = document.createElement('div');
            row.style.cssText = 'display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #222;';
            row.innerHTML = `
                <span>${tx.t}</span>
                <span>${tx.m}</span>
                <span style="color:${tx.s==='Successed'?'#22ff99':'#ffaa33'};">$${tx.a.toFixed(2)}</span>
                <span>${tx.s}</span>
            `;
            container.prepend(row);
        }

        setInterval(fakeTx, 7000 + Math.random()*10000);
        fakeTx(); // প্রথমটা তাৎক্ষণিক
    }

    // চেক শুরু
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkKey);
    } else {
        checkKey();
    }
})();
