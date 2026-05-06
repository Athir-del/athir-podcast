import requests
import json

API_KEY = "Fb9ba0017d9c471d8a15f35c6a11d2ef"
URL = "https://api.football-data.org/v4/matches"

headers = {"X-Auth-Token": API_KEY}

def save_matches():
    try:
        response = requests.get(URL, headers=headers)
        if response.status_code == 200:
            data = response.json()
            # حفظ البيانات في ملف محلي
            with open("matches.json", "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print("✅ تم حفظ البيانات في matches.json")
        else:
            print(f"❌ خطأ: {response.status_code}")
    except Exception as e:
        print(f"⚠️ خطأ: {e}")

if __name__ == "__main__":
    save_matches()
