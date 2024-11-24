from gtts import gTTS
import os

def say_good_morning():
    """Generate and play natural speech using gTTS."""
    text = "Good morning, sir. All systems are operational. Monitor and light turning on."
    tts = gTTS(text, lang='en', slow=False)
    tts.save("good_morning.mp3")
    os.system("mpg321 good_morning.mp3")
