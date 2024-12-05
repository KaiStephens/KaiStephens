from birthdayList import *  
import birthdayList 
from datetime import datetime

current_date = datetime.now().strftime("%m/%d")
current_year = datetime.now().year

pre_list = dir(birthdayList)
post_list = [attr for attr in pre_list if not attr.startswith("_")]

current = datetime.strptime(current_date, "%m/%d").replace(year=current_year)
distance_list = []

for name in post_list:
    value = getattr(birthdayList, name)

    try:
        birthday = datetime.strptime(value, "%m/%d").replace(year=current_year)

        if birthday < current:
            birthday = birthday.replace(year=current_year + 1)

        delta = (birthday - current).days

        if value == current_date:
            print(f"It's {name}'s birthday today!")
        else:
            distance_list.append((name, delta))
    except ValueError:
        print(f"Invalid date format for {name}: {value}")

distance_list.sort(key=lambda x: x[1])

if distance_list:
    nearest_name, nearest_days = distance_list[0]
    print(f"{nearest_name}'s birthday is in {nearest_days} days.")
