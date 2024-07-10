import json

# Step 1: Load the JSON data from the file
with open("data.json", "r") as file:
    data = json.load(file)

# Step 2: Iterate through each entry in the JSON data
for entry in data:
    # Step 3: Check if the `email_address` key is missing
    if "email_address" not in entry:
        # Step 4: Print or store the `timestamp` of that entry
        print(entry["timestamp"])
