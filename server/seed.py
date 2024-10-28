from random import choice as rc
from faker import Faker
from config import app
from models import db, User, Admin, Buyer, Property, Feature, Image, Infrastructure
from werkzeug.security import generate_password_hash

with app.app_context():

    # Initialize Faker
    fake = Faker()

    # Property types
    property_type_list = ['Apartment', 'Bedsitter', 'Block of flats', 'Bungalow', 'House', 'Mansion', 'Penthouse', 'Villa']

    users = [
        {'first_name': 'Alice', 'last_name': 'Wahome', 'email': 'alicew@gmail.com', 'password': '12345', 'contact': '720114113', 'user_role': 'admin'},
        {'first_name': 'Bob', 'last_name': 'Onyango', 'email': 'bobonyango@gmail.com', 'password': '12345', 'contact': '798012234', 'user_role': 'buyer'},
        {'first_name': 'Mary', 'last_name': 'Mumbua', 'email': 'mumbuam@gmail.com', 'password': '12345', 'contact': '721134890', 'user_role': 'buyer'},
        {'first_name': 'Abel', 'last_name': 'Mutua', 'email': 'abelchizzy@gmail.com', 'password': '12345', 'contact': '734212334', 'user_role': 'buyer'},
    ]

    created_users = []  # To keep track of created user IDs

    for user_data in users:
        existing_user = User.query.filter_by(email=user_data['email']).first()
        
        if existing_user:
            print(f"User with email {user_data['email']} already exists. Skipping.")
            continue  

        new_user = User(**user_data)
        db.session.add(new_user)
        created_users.append(new_user)  # Add the new user to the list

    try:
        db.session.commit()
        print("Users added successfully.")
    except Exception as e:
        print(f"Error adding users: {e}")
        db.session.rollback()

    # Create Admin instances
    if created_users:
        try:
            admins = [Admin(user_id=created_users[0].id)]  # Linking the first created user (Alice) to Admin role
            db.session.add_all(admins)
            db.session.commit()
        except Exception as e:
            print(f"Error adding admins: {e}")

    # Create Buyer instances
    buyers = []
    for created_user in created_users[1:]:  # Skip the first user since they are admin
        buyers.append(Buyer(user_id=created_user.id))
    
    try:
        db.session.add_all(buyers)
        db.session.commit()
    except Exception as e:
        print(f"Error adding buyers: {e}")

    # Create Property instances
    properties = [
        Property(title="Luxury Apartment", price=300000, description="A beautiful luxury apartment in the city center.", location="Westlands", property_type=rc(property_type_list)),
        Property(title="Cozy Cottage", price=150000, description="A cozy cottage in the countryside.", location="Kilimani", property_type=rc(property_type_list)),
        Property(title="Modern Villa", price=210000, description="A modern villa with stunning views.", location="Lavingtone", property_type=rc(property_type_list)),
        Property(title="Charming Bungalow", price=250000, description="A charming bungalow perfect for families.", location="Kileleshwa", property_type=rc(property_type_list)),
        Property(title="Stylish Penthouse", price=280000, description="A stylish penthouse in a prime location.", location="Upperhill", property_type=rc(property_type_list))
    ]

    try:
        db.session.add_all(properties)
        db.session.commit()
    except Exception as e:
        print(f"Error adding properties: {e}")

    # Fetch the newly created properties
    luxury_apartment = Property.query.filter_by(title="Luxury Apartment").first()
    cozy_cottage = Property.query.filter_by(title="Cozy Cottage").first()
    modern_villa = Property.query.filter_by(title="Modern Villa").first()
    charming_bungalow = Property.query.filter_by(title="Charming Bungalow").first()
    stylish_penthouse = Property.query.filter_by(title="Stylish Penthouse").first()

    # Create Feature instances
    features = [
        Feature(name="Gym", property_id=luxury_apartment.id),
        Feature(name="Balcony", property_id=luxury_apartment.id),
        Feature(name="Fireplace", property_id=cozy_cottage.id),
        Feature(name="Backyard", property_id=cozy_cottage.id),
        Feature(name="Smart Home Technology", property_id=modern_villa.id)
    ]

    try:
        db.session.add_all(features)
        db.session.commit()
    except Exception as e:
        print(f"Error adding features: {e}")

    # Create Image instances
    images = [
        Image(name="https://images.pexels.com/photos/430216/pexels-photo-430216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=luxury_apartment.id),
        Image(name="https://images.pexels.com/photos/17832880/pexels-photo-17832880/free-photo-of-a-bungalow-by-the-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=cozy_cottage.id),
        Image(name="https://images.pexels.com/photos/36355/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=modern_villa.id),
        Image(name="https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=charming_bungalow.id),
        Image(name="https://images.pexels.com/photos/7078231/pexels-photo-7078231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=stylish_penthouse.id)
    ]

    try:
        db.session.add_all(images)
        db.session.commit()
    except Exception as e:
        print(f"Error adding images: {e}")

    # Create Infrastructure instances
    infrastructures = [
        Infrastructure(name="Elevator", property_id=luxury_apartment.id),
        Infrastructure(name="Pool", property_id=luxury_apartment.id),
        Infrastructure(name="Garden", property_id=cozy_cottage.id),
        Infrastructure(name="Garage", property_id=cozy_cottage.id),
        Infrastructure(name="Private Garden", property_id=modern_villa.id)
    ]

    try:
        db.session.add_all(infrastructures)
        db.session.commit()
    except Exception as e:
        print(f"Error adding infrastructures: {e}")

    print("Database seeded successfully")
