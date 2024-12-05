name = input("Enter name: ")
date = input("Enter Date (mm/dd): ")

with open("birthdayList.py", "a") as f:
	f.write("\n" + name + " = " + '"' + date + '"')
