import json
from collections import defaultdict
from datetime import datetime

from fpdf import FPDF


# Function to read the JSON file
def read_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return data


# Function to sort data by month
def sort_data_by_month(data):
    sorted_data = defaultdict(list)
    for entry in data:
        try:
            birth_date = entry["date__birth"]
            month = datetime.strptime(birth_date, "%m/%d").strftime("%B")
            sorted_data[month].append(entry)
        except KeyError as e:
            print(f"Missing key in entry: {e}. Entry: {entry}")
    return sorted_data


# Function to create a PDF from the sorted data
class PDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Student Data Sorted by Birth Month", 0, 1, "C")

    def chapter_title(self, month):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, month, 0, 1, "L")
        self.ln(10)

    def chapter_body(self, data):
        self.set_font("Arial", "", 12)
        for entry in data:
            self.multi_cell(
                0,
                10,
                f"Name: {entry['name']}\n"
                f"Faculty: {entry['faculty_']}\n"
                f"Department: {entry['department']}\n"
                f"Level: {entry['level']}\n"
                f"Email: {entry['email_address']}\n"
                f"Phone: {entry['phone_number']}\n"
                f"Date of Birth: {entry['date__birth']}\n"
                f"Gender: {entry['gender']}\n"
                f"Attends BSF Regularly: {entry['do_you_attend_bsf_unilag_fellowship_regularly??']}\n",
            )
            self.ln(10)


def create_pdf(sorted_data, output_file):
    pdf = PDF()
    pdf.add_page()

    # Define the month order
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    for month in months:
        if month in sorted_data:
            pdf.chapter_title(month)
            pdf.chapter_body(sorted_data[month])

    pdf.output(output_file)


# Main function to read, sort, and generate PDF
def main():
    input_file = "data.json"
    output_file = "sorted_data_by_month.pdf"

    data = read_json(input_file)
    sorted_data = sort_data_by_month(data)
    create_pdf(sorted_data, output_file)


if __name__ == "__main__":
    main()
