"""
ElevenLabs Instant Voice Cloning Script for Mr. Mena Gerges
Reads audio file from client downloads folder, uploads to ElevenLabs VoiceLab, and retrieves the unique Voice ID.
"""
import os, sys, json, requests

AUDIO_PATH = r"C:\Users\user\Downloads\New folder (76)\صوت المدرس .ogg"
VOICE_NAME = "Mr. Mena Gerges - Science Teacher"
VOICE_DESCRIPTION = "Natural Egyptian Arabic voice of Science teacher Mr. Mena Gerges"

def clone_mena_voice(api_key):
    if not api_key:
        print("[Error] ElevenLabs API Key is required!")
        return None

    if not os.path.exists(AUDIO_PATH):
        print(f"[Error] Audio file not found at: {AUDIO_PATH}")
        return None

    url = "https://api.elevenlabs.io/v1/voices/add"
    headers = {
        "xi-api-key": api_key.strip()
    }
    
    data = {
        "name": VOICE_NAME,
        "description": VOICE_DESCRIPTION,
        "labels": json.dumps({"language": "Arabic", "accent": "Egyptian", "gender": "male", "age": "young adult"})
    }
    
    with open(AUDIO_PATH, "rb") as f:
        files = {
            "files": ("mena_voice.ogg", f, "audio/ogg")
        }
        
        print(f"[*] Uploading voice sample for '{VOICE_NAME}' to ElevenLabs...")
        response = requests.post(url, headers=headers, data=data, files=files)
        
        if response.status_code == 200:
            res_json = response.json()
            voice_id = res_json.get("voice_id")
            print(f"[SUCCESS] Voice cloned successfully!")
            print(f"Voice ID: {voice_id}")
            return voice_id
        else:
            print(f"[Failed] Status {response.status_code}: {response.text}")
            return None

if __name__ == "__main__":
    key = sys.argv[1] if len(sys.argv) > 1 else ""
    if not key:
        key = os.environ.get("ELEVENLABS_API_KEY", "")
    if not key:
        print("Usage: python clone_voice_elevenlabs.py <ELEVENLABS_API_KEY>")
    else:
        clone_mena_voice(key)
