import requests

url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=d57912ef6c4d5e39679d924ba2253cb8&units=metric'.format("Newmarket")

res = requests.get(url)
data = res.json()

description = data['weather'][0]['description']
temp = data['main']['temp']

print(f"The temperature is {temp}, there are currently {description}")


import time
import numpy as np
import sounddevice as sd
from piper.voice import PiperVoice
import schedule
import threading
import time

# --- PIPER Configuration ---

# Load the Piper voice model
model = "/path/to/model.onnx"  # Update with the actual path to your Piper model
voice = PiperVoice.load(model)

# --- Inaudible Sound Configuration ---
def generate_inaudible_sound():
    """
    Generates and plays a continuous inaudible sound to keep speakers active.
    Uses a 20Hz sine wave at very low volume.
    """
    sample_rate = 44100
    frequency = 20  # 20 Hz - below human hearing range
    amplitude = 0.01  # Very low volume
    
    # Generate a continuous sine wave
    t = np.linspace(0, 1, sample_rate, False)
    sine_wave = amplitude * np.sin(2 * np.pi * frequency * t)
    
    # Convert to float32 and make it stereo
    audio_data = np.float32(sine_wave)
    stereo_data = np.column_stack((audio_data, audio_data))
    
    # Start continuous playback
    with sd.OutputStream(samplerate=sample_rate, channels=2, dtype=np.float32) as stream:
        while True:
            stream.write(stereo_data)

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
    text = "Good morning, sir. All systems are operational. Monitor and lights turning on. "
    text1 = f"The temperature is {temp}, there are currently {description}"
    play_piper_text(text)
    time.sleep(2)
    play_piper_text(text1)

# --- Schedule Configuration ---

# Schedule the job for 6:30 AM
schedule.every().day.at("06:30").do(say_good_morning)

# Start the inaudible sound in a separate thread
inaudible_thread = threading.Thread(target=generate_inaudible_sound, daemon=True)
inaudible_thread.start()

print("The script is running. It will say 'Good morning' at 6:30 AM.")
print("Inaudible sound is playing to keep speakers active.")

# Keep the script running to check the schedule
try:
    while True:
        schedule.run_pending()
        time.sleep(1)
except KeyboardInterrupt:
    print("\nStopping the script...")
