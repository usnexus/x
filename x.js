// === SL TECH BD FAKE TRADING PANEL - SIMPLE LICENSE (ONLY "usnexus") ===
// Removed: Firebase, device limit, popup complexity, active count
// License: Hardcoded → "usnexus"

(function () {
    'use strict';

    const VALID_KEY = "usnexus";

    // সিম্পল লাইসেন্স চেক
    function verifyLicense() {
        const saved = localStorage.getItem('sl_tech_license');

        if (saved === VALID_KEY) {
            initFakeUI();
            return;
        }

        // লাইসেন্স পপআপ
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.9);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999999; font-family: Arial, sans-serif; color: white;
        `;

        overlay.innerHTML = `
            <div style="background: #0f0f0f; padding: 35px; border-radius: 12px; width: 380px; text-align: center; border: 1px solid #333;">
                <h2 style="margin: 0 0 20px; font-size: 24px;">License Required</h2>
                <p style="margin: 0 0 15px; color: #ccc;">Enter your license key:</p>
                <input type="text" id="keyInput" placeholder="Enter key" 
                       style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 6px; border: 1px solid #444; background: #1a1a1a; color: white; font-size: 16px;">
                <button id="submitKey" style="padding: 14px 40px; background: #0066cc; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
                    Verify
                </button>
                <div id="msg" style="margin-top: 18px; min-height: 24px; color: #ff5555; font-size: 15px;"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        const input = document.getElementById('keyInput');
        const btn = document.getElementById('submitKey');
        const msg = document.getElementById('msg');

        btn.onclick = () => {
            const val = input.value.trim();
            if (val === VALID_KEY) {
                localStorage.setItem('sl_tech_license', val);
                msg.style.color = '#55ff55';
                msg.textContent = 'Success! Loading...';
                setTimeout(() => {
                    overlay.remove();
                    initFakeUI();
                }, 1000);
            } else {
                msg.textContent = 'Invalid key';
            }
        };

        input.focus();
        input.onkeydown = e => { if (e.key === 'Enter') btn.click(); };
    }

    // ফেক UI + ব্যালেন্স + প্রফিট + ট্রানজেকশন + লিডারবোর্ড সব চালু
    function initFakeUI() {
        console.log("[SL TECH] Activated with license: usnexus");

        // Fake balance
        let balance = 1248.60;
        setInterval(() => {
            balance += (Math.random() * 45 - 15);
            balance = Math.max(0, balance);
            const els = document.querySelectorAll('.usermenu-balance, .live-balance-text, [class*="balance"]');
            els.forEach(el => {
                el.innerHTML = '$' + balance.toFixed(2);
            });
        }, 4000 + Math.random() * 4000);

        // Fake profit %
        let profit = 0;
        setInterval(() => {
            if (Math.random() > 0.6) {
                profit += Math.floor(Math.random() * 4) + 1;
                const pEls = document.querySelectorAll('#capitalPercentDisplay, .capital-percent, [class*="profit"]');
                pEls.forEach(el => el.innerHTML = profit + '%');
            }
        }, 7000);

        // Fake transactions
        function addFakeTx() {
            const list = document.querySelector('.transactions-list, .ons-list, [class*="transaction"], [class*="history"]');
            if (!list) return;

            const methods = ['Bkash P2C', 'Nagad P2C', 'Rocket', 'Upay', 'USDT (TRC20)'];
            const statusList = ['Successed', 'Processing', 'Successed'];
            const amounts = [45, 120, 320, 680, 1500, 3200];

            const tx = {
                time: new Date().toLocaleTimeString(),
                method: methods[Math.floor(Math.random() * methods.length)],
                amount: amounts[Math.floor(Math.random() * amounts.length)],
                status: statusList[Math.floor(Math.random() * statusList.length)]
            };

            const row = document.createElement('div');
            row.className = 'transaction-item';
            row.style.cssText = 'display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #222;';
            row.innerHTML = `
                <span>${tx.time}</span>
                <span>${tx.method}</span>
                <span style="color: ${tx.status === 'Successed' ? '#00ff88' : '#ffaa00'};">$${tx.amount.toFixed(2)}</span>
                <span>${tx.status}</span>
            `;

            list.prepend(row);
        }

        setInterval(addFakeTx, 9000 + Math.random() * 8000);
        addFakeTx(); // প্রথমবার তাৎক্ষণিক

        // আরো ফেক লজিক যোগ করতে পারো এখানে...
        // উদাহরণ: লিডারবোর্ড, স্লাইডার, অ্যানিমেশন ইত্যাদি
    }

    // চেক শুরু
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', verifyLicense);
    } else {
        verifyLicense();
    }

})();
