import time
import pyttsx3
import schedule

def configure_tts_engine():
    """Configures the TTS engine to use a macOS voice."""
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    
    # Select a British voice like Daniel (or any preferred voice)
    for voice in voices:
        if "Daniel" in voice.name:  # Adjust to the voice you prefer
            engine.setProperty('voice', voice.id)
            break
    
    # Adjust speaking rate and volume
    engine.setProperty('rate', 175)  # Slower for a professional tone
    engine.setProperty('volume', 1)  # Adjust volume level
    return engine

def say_good_morning():
    """Uses TTS to say 'Good morning' with a Jarvis-like voice."""
    engine = configure_tts_engine()
    engine.say("Good morning, sir... All systems are operational.")
    engine.say("Monitor and Light turning on")
    engine.runAndWait()
say_good_morning()
# Schedule the job for 7:00 AM
schedule.every().day.at("06:30").do(say_good_morning)

print("The script is running. It will say 'Good morning' at 7:00 AM with a Jarvis-like voice.")

# Keep the script running to check the schedule
while True:
    schedule.run_pending()
    time.sleep(1)



import time
import pyttsx3
import schedule

# Create a single instance of the TTS engine globally
engine = pyttsx3.init(driverName='espeak')  # Use espeak driver for Raspberry Pi

def configure_tts_engine():
    """Configures the global TTS engine."""
    voices = engine.getProperty('voices')
    # Select a British voice (if available)
    for voice in voices:
        if "en-gb" in voice.id:  # Adjust to 'english' or other IDs if needed
            engine.setProperty('voice', voice.id)
            break
    engine.setProperty('rate', 175)
    engine.setProperty('volume', 1)

def say_good_morning():
    """Uses TTS to say 'Good morning'."""
    engine.say("Good morning, sir... All systems are operational.")
    engine.say("Monitor and Light turning on")
    engine.runAndWait()
say_good_morning()
# Configure the engine once
configure_tts_engine()

# Schedule the job for 6:30 AM
schedule.every().day.at("06:30").do(say_good_morning)

print("The script is running. It will say 'Good morning' at 6:30 AM.")

# Keep the script running to check the schedule
while True:
    schedule.run_pending()
    time.sleep(1)
