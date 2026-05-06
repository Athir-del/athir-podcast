async function loadMatches() {
    const container = document.getElementById('matches-container');
    try {
        console.log("محاولة جلب البيانات...");
        // استخدام Fetch مع إضافة توقيت لمنع التخزين المؤقت (Cache)
        const response = await fetch('./matches.json?v=' + Date.now());
        
        if (!response.ok) {
            throw new Error("لم يتم العثory على ملف matches.json - حالة الخطأ: " + response.status);
        }

        const data = await response.json();
        console.log("البيانات المستلمة:", data);

        if (!data.matches || data.matches.length === 0) {
            container.innerHTML = "📅 لا توجد مباريات مجدولة حالياً.";
            return;
        }

        container.innerHTML = ''; 

        data.matches.forEach(match => {
            const div = document.createElement('div');
            div.className = 'match-card';
            
            // معالجة حالة النتيجة عندما تكون null
            const homeScore = (match.score.fullTime.home !== null) ? match.score.fullTime.home : '-';
            const awayScore = (match.score.fullTime.away !== null) ? match.score.fullTime.away : '-';
            
            div.innerHTML = `
                <div style="font-size: 0.8em; color: #aaa; margin-bottom: 5px;">${match.competition.name}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="flex: 1;">${match.homeTeam.shortName || match.homeTeam.name}</span>
                    <span style="background: #00ff88; color: #000; padding: 2px 8px; border-radius: 4px; font-weight: bold; margin: 0 10px;">
                        ${homeScore} : ${awayScore}
                    </span>
                    <span style="flex: 1;">${match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
                <div style="font-size: 0.75em; margin-top: 10px; color: #00ff88;">
                    🕒 ${match.utcDate.split('T')[1].substring(0, 5)} | ${match.status}
                </div>
            `;
            container.appendChild(div);
        });
        console.log("✅ تم عرض المباريات!");

    } catch (error) {
        console.error("❌ خطأ مفصل:", error);
        container.innerHTML = "⚠️ فشل عرض النتائج. (تأكد من تحديث الصفحة أو مراجعة Console المتصفح)";
    }
}

// تشغيل الدالة فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadMatches);
