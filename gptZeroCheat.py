import requests
import os
from openai import OpenAI
import pyautogui

def translate_text(text, source_lang, target_lang):
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_lang}&tl={target_lang}&dt=t&q={requests.utils.quote(text)}"
    response = requests.get(url)
    if response.status_code == 200:
        return ''.join([sentence[0] for sentence in response.json()[0]])
    else:
        return "Translation failed"

def humanize_text(text, mode="Normal"):
    print("cycling through languages")
    
    if mode == "Normal":
        text = translate_text(text, "en", "sa")
        text = translate_text(text, "sa", "th")
        text = translate_text(text, "th", "en")
    
    return text

def advanced_processing(text):
    return f"Advanced processed: {text}"

def script(text): 
    print("generating content")
    print()
    os.environ["OPENAI_API_KEY"] = "YOUR-OPEN-AI-KEY"
    client = OpenAI()
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "I need you to make this text with simple language a foreinger would easily understand while talking like a human, re-write this text, ONLY return the re-written text: " + text,
            }
        ],
        model="gpt-4o-mini",
    )
    return(chat_completion.choices[0].message.content)

def addWhiteSpace(text):
   print("replacing whitespace")
   text1 = text.replace(" ", "  ")
   return text1


def main():
    print("AI to Human Text Converter")
    text = input("Enter text: ")
    output = script(text)    
    result = humanize_text(output, "Normal")
    finalresult = addWhiteSpace(result)
    
    print("")
    print("")
    print(finalresult)

    # Type the text with minimal delay between keystrokes
    pyautogui.typewrite(finalresult, interval=0.01)

if __name__ == "__main__":
    main()
