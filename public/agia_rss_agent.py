import feedparser
import os
import subprocess
import time
from deep_translator import GoogleTranslator

RSS_FEEDS = [
    "https://feeds.bbci.co.uk/sport/football/rss.xml",
    "https://www.skysports.com/rss/12040"
]

def get_top_news():
    print("⚽ جاري جلب أخبار الكرة...")
    for url in RSS_FEEDS:
        feed = feedparser.parse(url)
        if feed.entries:
            entry = feed.entries[0]
            title = entry.title
            summary = entry.get("summary", "")[:200]
            return title + ". " + summary
    return None

def translate_to_arabic(text):
    print("🌍 جاري الترجمة...")
    try:
        return GoogleTranslator(source='auto', target='ar').translate(text)
    except Exception as e:
        print(f"فشل الترجمة: {e}")
        return text

def produce_video(arabic_text):
    base = os.path.expanduser("~")
    voice_path = os.path.join(base, "voice.mp3")
    if os.path.exists(voice_path):
        os.remove(voice_path)
    print("جاري توليد الصوت...")
    subprocess.run([
        "edge-tts", "--voice", "ar-SA-HamedNeural",
        "--text", arabic_text,
        "--write-media", voice_path
    ])
    time.sleep(1)
    if not os.path.exists(voice_path) or os.path.getsize(voice_path) == 0:
        print("فشل الصوت")
        return False
    print("جاري الرندرة...")
    subprocess.run(["python3", os.path.join(base, "render_athir_perfect.py")])
    return True

def push_to_vercel():
    base = os.path.expanduser("~")
    os.system(f"cp {base}/agia_final_video.mp4 {base}/athir-podcast/public/")
    os.system("cd ~/athir-podcast && git add . && git commit -m 'خبر جديد' && git push origin main")
    print("تم الرفع!")

def run():
    print("وكيل AGia للكرة")
    text = get_top_news()
    if not text:
        print("لا اخبار")
        return
    print(f"البوست: {text[:80]}")
    arabic = translate_to_arabic(text)
    print(f"العربي: {arabic[:80]}")
    if produce_video(arabic):
        push_to_vercel()
        print("الفيديو جاهز!")

if __name__ == "__main__":
    run()
