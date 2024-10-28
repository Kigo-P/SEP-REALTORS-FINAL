from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash


from config import db


#  creating a model called User with a table name of users
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(), nullable = False)
    last_name = db.Column(db.String(), nullable = False)
    email = db.Column(db.String(), unique = True, nullable = False)
    password = db.Column(db.String(), nullable = False)
    contact = db.Column(db.Integer(), nullable=False)
    user_role = db.Column(db.String(), nullable = False)

    # a relationship that maps a related user to the admin. Adding uselist=False and cascade since it is the parent
    admin = db.relationship("Admin", uselist=False,  back_populates = "user", cascade="all, delete-orphan")
    # a relationship that maps a related user to the buyer. Adding uselist=False and cascade since it is the parent
    buyer = db.relationship("Buyer", uselist=False,  back_populates = "user", cascade="all, delete-orphan")

    # setting serialization rules
    serialize_rules = ("-admin.user", "-buyer.user", )

    # using genrate password hash to set the password
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # checking the password using check password hash
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    #  adding and commiting the password to the database
    def save(self):
        db.session.add(self)
        db.session.commit()

    # deleting the password from the database
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    #  creating a string version using repr
    def __repr__(self):
        return f"<User {self.id}: {self.first_name}, {self.last_name}, {self.email}, {self.user_role} has been created>"

#  creating a model called Admin with a table name of admins
class Admin(db.Model, SerializerMixin):
    __tablename__ = "admins"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(), unique = True, nullable = False)
    password = db.Column(db.String(), nullable = False)
    #  Foreign key from the user_id
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))

    #  a relationship that maps a related admin to the user
    user = db.relationship("User", back_populates="admin")

    # setting serialization rules
    serialize_rules = ("-user.admin",  )

    #  creating a string version using repr
    def __repr__(self):
        return f"<Admin {self.id}: {self.email}, {self.password}, {self.user_id} has been logged in>"

#  creating a model called Buyer with a table name of buyers
class Buyer(db.Model, SerializerMixin):
    __tablename__ = "buyers"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(), unique = True, nullable = False)
    password = db.Column(db.String(), nullable = False)
    #  Foreign key from the user_id
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))


    #  a relationship that maps a related buyer to the user
    user = db.relationship("User", back_populates="buyer")
    #  a relationship that maps a buyer to a purchase request
    purchase_requests = db.relationship("PurchaseRequest", back_populates="buyer", cascade="all, delete-orphan")
    #  a relationship mapping the buyer to the contact us
    contactus = db.relationship("ContactUs", back_populates="buyer", cascade="all, delete-orphan")

    # setting serialization rules
    serialize_rules = ("-user.buyer", "-purchase_requests.buyer","-contactus.buyer" )

    #  creating a string version using repr
    def __repr__(self):
        return f"<Buyer {self.id}: {self.email}, {self.password}, {self.user_id} has been logged in>"
    
#  creating a model called Property with a table name of properties
class Property(db.Model, SerializerMixin):
    __tablename__ = "properties"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(), nullable = False)
    price = db.Column(db.Integer(), nullable = False)
    description = db.Column(db.String(), nullable = False)
    location = db.Column(db.String(), nullable = False)
    property_type = db.Column(db.String(), nullable = False)
    # Relationship mapping the property to the features
    features = db.relationship("Feature", back_populates="property1", cascade="all, delete-orphan")
    # Relationship mapping the property to the images
    images = db.relationship("Image", back_populates="property1", cascade="all, delete-orphan")
    # Relationship mapping the property to the images
    infrastructures = db.relationship("Infrastructure", back_populates="property1", cascade="all, delete-orphan")


    # Relationship mapping the property to the purchase requests
    purchase_requests = db.relationship("PurchaseRequest", back_populates="property", cascade="all, delete-orphan")


    # setting serialization rules
    serialize_rules = ("-features.property1","-images.property1", "-infrastructures.property1","-purchase_requests.property",  )

    #  validating the price of the property to be a positive number
    @validates("price")
    def validates_price(self, key, price):
        if price < 1 :
            raise ValueError ("Price must be between greater than 1")
        return price


    #  creating a string version using repr
    def __repr__(self):
        return f"<Property {self.id}: {self.title}, {self.price} ,{self.location}, {self.property_type}  has been created>"
    

#  creating a Feature Model
class Feature(db.Model, SerializerMixin):
    __tablename__ = "features"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable = False)
    # Foreign Key from the property id
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"))

    #  a relationship that maps the features to the property
    property1 = db.relationship("Property", back_populates="features") 

    # setting serialization rules
    serialize_rules = ("-property1.features",  )

    #  creating a string version using repr
    def __repr__(self):
        return f"<Feature {self.id}: {self.name},has been added>"

    pass

#  creating an Image Model
class Image(db.Model, SerializerMixin):
    __tablename__ = "images"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable = False)
    # Foreign Key from the property id
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"))

    #  a relationship that maps the features to the property
    property1 = db.relationship("Property", back_populates="images") 

    # setting serialization rules
    serialize_rules = ("-property1.images",  )

    #  creating a string version using repr
    def __repr__(self):
        return f"<Image {self.id}: {self.name},has been added>"

    pass

#  creating an Infrastructure Model
class Infrastructure(db.Model, SerializerMixin):
    __tablename__ = "infrastructures"

    # creating columns
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable = False)
    # Foreign Key from the property id
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"))

    #  a relationship that maps the features to the property
    property1 = db.relationship("Property", back_populates="infrastructures") 

    # setting serialization rules
    serialize_rules = ("-property1.infrastructures",  )

    #  creating a string version using repr
    def __repr__(self):
        return f"<Infrastructure {self.id}: {self.name},has been added>"

    pass

    
# #  creating a model called TokenBlocklist that will be responsible when the user logs out
# class TokenBlocklist(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     jti = db.Column(db.String(36), nullable=False, index=True)
#     created_at = db.Column(db.DateTime, nullable=False)


class PurchaseRequest(db.Model, SerializerMixin):
    __tablename__ = "purchase_requests"

    # creating columns
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey("buyers.id"), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey("properties.id"), nullable=False)
    status = db.Column(db.String(), default='Pending')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationships
    buyer = db.relationship("Buyer", back_populates="purchase_requests")
    property = db.relationship("Property", back_populates="purchase_requests")

    # Setting serialization rules
    serialize_rules = ("-buyer.purchase_requests", "-property.purchase_requests")

    def __repr__(self):
        return f"<PurchaseRequest {self.id}: Buyer {self.buyer_id}, Property {self.property_id}, Status: {self.status}>"


# creating ContactUs Model
class ContactUs(db.Model, SerializerMixin):
    __tablename__ ="contactus"

    # creating columns
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    contact = db.Column(db.String(), nullable=False)
    about_us = db.Column(db.String(), nullable=False)
    looking_for = db.Column(db.String(), nullable=False)
    message = db.Column(db.String(), nullable=False)
    # Foreign key from the users id
    buyer_id = db.Column(db.Integer(), db.ForeignKey("buyers.id"))

    #  a relationship mapping the contact to the buyer
    buyer = db.relationship("Buyer", back_populates="contactus")

    # setting serialization rules
    serialize_rules = ("-buyer.contactus",  )

    




