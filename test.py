import requests
import os
from openai import OpenAI

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
        text = translate_text(text, "en", "my")
        text = translate_text(text, "my", "no")
        text = translate_text(text, "no", "en")
        text = translate_text(text, "en", "pt-BR")
        text = translate_text(text, "pt-BR", "en")
    
    return text

def advanced_processing(text):
    return f"Advanced processed: {text}"

def script(text): 
    print("generating content")
    print()
    os.environ["OPENAI_API_KEY"] = "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"
    client = OpenAI()
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Do whatever is asked after this, but I need you to make the text with simple language a foreinger would easily understand while talking like a human: " + text,
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
    text = input("Enter a question: ")
    output = script(text)    
    result = humanize_text(output, "Normal")
    finalresult = addWhiteSpace(result)
    
    print("")
    print("")
    print(finalresult)

if __name__ == "__main__":
    main()
