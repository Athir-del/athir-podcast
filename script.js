function loadMatches() {
    const container = document.getElementById('matches-container');
    
    // جلب ملف JSON من نفس المجلد
    fetch('./matches.json', { cache: "no-store" })
        .then(response => {
            if (!response.ok) throw new Error("الملف غير موجود");
            return response.json();
        })
        .then(data => {
            if (!data.matches || data.matches.length === 0) {
                container.innerHTML = "📅 لا توجد مباريات حالياً.";
                return;
            }
            container.innerHTML = ''; 
            data.matches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'match-card';
                div.innerHTML = `
                    <div>${match.competition.name}</div>
                    <div style="margin: 10px 0;">
                        <span>${match.homeTeam.name}</span>
                        <span class="score"> ${match.score.fullTime.home ?? 0} : ${match.score.fullTime.away ?? 0} </span>
                        <span>${match.awayTeam.name}</span>
                    </div>
                    <div style="font-size: 0.8em; color: #00ff88;">${match.status}</div>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "⚠️ فشل في عرض النتائج. تأكد من تشغيل ./up.sh";
        });
}

// تنفيذ الدالة عند تحميل الصفحة
window.onload = loadMatches;
