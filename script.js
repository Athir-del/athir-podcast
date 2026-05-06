async function loadMatches() {
    console.log("جاري محاولة تحميل البيانات...");
    try {
        // أضفنا علامة استفهام عشوائية لمنع المتصفح من استخدام النسخة القديمة المخزنة
        const response = await fetch('./matches.json?t=' + str(new Date().getTime()));
        
        if (!response.ok) throw new Error("لم يتم العثور على ملف matches.json");
        
        const data = await response.json();
        const container = document.getElementById('matches-container');
        
        if(!container) return;
        
        if (!data.matches || data.matches.length === 0) {
            container.innerHTML = "📅 لا توجد مباريات جارية حالياً.";
            return;
        }

        container.innerHTML = ''; 

        data.matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'match-card';
            
            const homeScore = match.score.fullTime.home !== null ? match.score.fullTime.home : '-';
            const awayScore = match.score.fullTime.away !== null ? match.score.fullTime.away : '-';
            
            card.innerHTML = `
                <span class="league">${match.competition.name}</span>
                <div class="teams">
                    <span>${match.homeTeam.shortName || match.homeTeam.name}</span>
                    <span class="score">${homeScore} : ${awayScore}</span>
                    <span>${match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
                <div class="status">${match.status === 'IN_PLAY' ? '🔴 مباشر' : '🕒 ' + match.status}</div>
            `;
            container.appendChild(card);
        });
        console.log("✅ تم عرض المباريات بنجاح");
    } catch (e) {
        console.error("❌ حدث خطأ:", e);
        document.getElementById('matches-container').innerHTML = "⚠️ خطأ في تحميل البيانات. تأكد من رفع الملف.";
    }
}
loadMatches();
