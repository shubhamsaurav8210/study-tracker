document.addEventListener('DOMContentLoaded', (event) => {
    const slots = ['slot1', 'slot2', 'slot3', 'slot4'];
    const slotLabels = {
        slot1: '7:00 AM - 10:00 AM',
        slot2: '11:00 AM - 2:00 PM',
        slot3: '4:30 PM - 7:30 PM',
        slot4: '8:30 PM - 10:00 PM'
    };

    // Load saved checkbox states
    slots.forEach(slot => {
        const checked = localStorage.getItem(slot) === 'true';
        document.getElementById(slot).checked = checked;
    });

    // Save checkbox states and send email notification
    window.updateSlot = (slot) => {
        const checked = document.getElementById(slot).checked;
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        localStorage.setItem(slot, checked);

        // Save check-in date
        let history = JSON.parse(localStorage.getItem('history') || '{}');
        if (!history[slot]) {
            history[slot] = [];
        }
        if (checked) {
            history[slot].push(dateStr);
        }
        localStorage.setItem('history', JSON.stringify(history));

        // Send email notification
        sendEmailNotification(slotLabels[slot], dateStr);
    };

    // View monthly history
    document.getElementById('viewHistory').addEventListener('click', () => {
        const history = JSON.parse(localStorage.getItem('history') || '{}');
        let historyHtml = '<h2>Monthly History</h2>';
        slots.forEach(slot => {
            historyHtml += `<h3>${slotLabels[slot]}</h3><ul>`;
            if (history[slot]) {
                history[slot].forEach(date => {
                    historyHtml += `<li>${date}</li>`;
                });
            }
            historyHtml += '</ul>';
        });
        document.getElementById('history').innerHTML = historyHtml;
        document.getElementById('history').style.display = 'block';
    });

    function sendEmailNotification(slotLabel, date) {
        const email = 'your-email@example.com'; // Replace with your email address
        const subject = 'Study Session Completed';
        const body = `The study session for ${slotLabel} on ${date} was completed.`;
        window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
});
