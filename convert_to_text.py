import json

# Read JSON data from a file
with open("data.json", "r") as f:
    data = json.load(f)

# Filter entries where date__birth falls in July
july_entries = [entry for entry in data if entry["date__birth"].split("/")[0] == "7"]

# Sort entries by day in descending order
july_entries_sorted = sorted(
    july_entries, key=lambda x: int(x["date__birth"].split("/")[1]), reverse=False
)

# Write to text file
with open("july_birthdays.txt", "w") as file:
    for entry in july_entries_sorted:
        file.write(
            f"{entry['date__birth']} - {entry['name']} ({entry['phone_number']})\n"
        )

print("File written successfully.")
