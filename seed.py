import os
import random

import django
from django.contrib.auth.models import User
from faker import Faker

from app.models import RefillRequest, Medication

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project_name.settings")
django.setup()


# Initialize Faker instance
fake = Faker()

# Clear previous data
def clear_data():
    RefillRequest.objects.all().delete()
    Medication.objects.all().delete()
    User.objects.filter(is_staff=False, is_superuser=False).delete()

# Populate users
def create_users(num_users=10):
    users = []
    for _ in range(num_users):
        username = fake.user_name()
        email = fake.email()
        password = 'password123'
        user = User.objects.create_user(username=username, email=email, password=password)
        users.append(user)
    return users

# Populate medications
def create_medications(num_medications=10):
    medications = []
    for _ in range(num_medications):
        name = fake.word().capitalize()
        description = fake.text(max_nb_chars=100)
        medication = Medication.objects.create(name=name, description=description)
        medications.append(medication)
    return medications

# Populate refill requests
def create_refill_requests(users, medications, num_requests=30):
    for _ in range(num_requests):
        user = random.choice(users)
        medication = random.choice(medications)
        RefillRequest.objects.create(user=user, medication=medication)

# Main function to run the script
def run():
    print("Clearing existing data...")
    clear_data()
    print("Creating users...")
    users = create_users()
    print("Creating medications...")
    medications = create_medications()
    print("Creating refill requests...")
    create_refill_requests(users, medications)
    print("Database successfully populated!")

# Execute the script
if __name__ == "__main__":
    run()