from random import choice as rc
from faker import Faker
from config import app
from models import db, User, Admin, Buyer, Property, Feature, Image, Infrastructure, PurchaseRequest
from werkzeug.security import generate_password_hash

with app.app_context():
    # Initialize Faker
    fake = Faker()

    # Delete all existing records in each table
    PurchaseRequest.query.delete()
    Infrastructure.query.delete()
    Image.query.delete()
    Feature.query.delete()
    Property.query.delete()
    Buyer.query.delete()
    Admin.query.delete()
    User.query.delete()
    db.session.commit()  # Commit deletions

    # Create User instances
    users = [
        User(first_name="Alice", last_name="Wahome", email="alicew42@gmail.com", password=generate_password_hash("12345"), contact=720114113, user_role="admin"),
        User(first_name="Bob", last_name="Onyango", email="bobonyango12@gmail.com", password=generate_password_hash("12345"), contact=798012234, user_role="buyer"),
        User(first_name="Mary", last_name="Mumbua", email="mumbuam13@gmail.com", password=generate_password_hash("12345"), contact=721134890, user_role="buyer"),
        User(first_name="Abel", last_name="Mutua", email="abelchizzy68@gmail.com", password=generate_password_hash("12345"), contact=734212334, user_role="buyer")
    ]

    db.session.add_all(users)
    db.session.commit()  # Ensure all users are committed before proceeding

    # Create Admin instance for the first user
    first_user = User.query.filter_by(email="alicew42@gmail.com").first()
    if first_user:
        admins = [
            Admin(email="alicew@gmail.com", password=generate_password_hash("12345"), user_id=first_user.id)
        ]
        db.session.add_all(admins)
        db.session.commit()

    # Now create Buyer instances, referencing user_ids that exist
    bob = User.query.filter_by(email="bobonyango12@gmail.com").first()
    mary = User.query.filter_by(email="mumbuam13@gmail.com").first()
    if bob and mary:
        buyers = [
            Buyer(email=bob.email, password=generate_password_hash("12345"), user_id=bob.id),
            Buyer(email=mary.email, password=generate_password_hash("12345"), user_id=mary.id)
        ]
        db.session.add_all(buyers)
        db.session.commit()

    # Create Property instances
    properties = [
        Property(title="Luxury Apartment", price=300000, description="A beautiful luxury apartment in the city center.", location="Westlands", property_type="Apartment"),
        Property(title="Cozy Cottage", price=150000, description="A cozy cottage in the countryside.", location="Kilimani", property_type="Cottage"),
        Property(title="Modern Villa", price=210000, description="A modern villa with stunning views.", location="Lavingtone", property_type="Villa"),
        Property(title="Charming Bungalow", price=250000, description="A charming bungalow perfect for families.", location="Kileleshwa", property_type="Bungalow"),
        Property(title="Stylish Penthouse", price=280000, description="A stylish penthouse in a prime location.", location="Upperhill", property_type="Penthouse")
    ]

    db.session.add_all(properties)
    db.session.commit()  # Ensure properties are committed before referencing them in features

    # Retrieve property instances by title to avoid hardcoded IDs
    luxury_apartment = Property.query.filter_by(title="Luxury Apartment").first()
    cozy_cottage = Property.query.filter_by(title="Cozy Cottage").first()
    modern_villa = Property.query.filter_by(title="Modern Villa").first()

    # Create Feature instances with fetched IDs
    features = [
        Feature(name="Gym", property_id=luxury_apartment.id),
        Feature(name="Balcony", property_id=luxury_apartment.id),
        Feature(name="Fireplace", property_id=cozy_cottage.id),
        Feature(name="Backyard", property_id=cozy_cottage.id),
        Feature(name="Smart Home Technology", property_id=modern_villa.id)
    ]

    db.session.add_all(features)
    db.session.commit()

    # Create Image instances
    images = [
        Image(name="https://images.pexels.com/photos/430216/pexels-photo-430216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=luxury_apartment.id),
        Image(name="https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=cozy_cottage.id),
        Image(name="https://images.pexels.com/photos/36355/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=modern_villa.id),
        Image(name="https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=properties[3].id),
        Image(name="https://images.pexels.com/photos/7078231/pexels-photo-7078231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", property_id=properties[4].id)
    ]

    db.session.add_all(images)
    db.session.commit()

    # Create Infrastructure instances
    infrastructures = [
        Infrastructure(name="Elevator", property_id=luxury_apartment.id),
        Infrastructure(name="Pool", property_id=luxury_apartment.id),
        Infrastructure(name="Garden", property_id=cozy_cottage.id),
        Infrastructure(name="Garage", property_id=cozy_cottage.id),
        Infrastructure(name="Private Garden", property_id=modern_villa.id)
    ]

    db.session.add_all(infrastructures)
    db.session.commit()
