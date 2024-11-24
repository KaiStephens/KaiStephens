import time
import numpy as np
import sounddevice as sd
from piper.voice import PiperVoice
import schedule

# --- PIPER Configuration ---

# Load the Piper voice model
model = "/path/to/model.onnx"  # Update with the actual path to your Piper model
voice = PiperVoice.load(model)

def play_piper_text(text):
    """
    Synthesizes the given text with Piper and plays it using sounddevice.
    """
    stream = sd.OutputStream(samplerate=voice.config.sample_rate, channels=1, dtype='int16')
    stream.start()
    
    for audio_bytes in voice.synthesize_stream_raw(text):
        int_data = np.frombuffer(audio_bytes, dtype=np.int16)
        stream.write(int_data)
    
    stream.stop()
    stream.close()

def say_good_morning():
    """Uses Piper TTS to say 'Good morning'."""
    text = "Good morning, sir. All systems are operational. Monitor and lights turning on."
    play_piper_text(text)

# --- Schedule Configuration ---

# Schedule the job for 6:30 AM
schedule.every().day.at("06:30").do(say_good_morning)

print("The script is running. It will say 'Good morning' at 6:30 AM.")

# Keep the script running to check the schedule
while True:
    schedule.run_pending()
    time.sleep(1)
