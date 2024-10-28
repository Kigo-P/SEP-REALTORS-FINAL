from flask import request, session, make_response,jsonify
from flask_restful import Resource
from models import Property, User, Admin, Buyer, Image, Feature, Infrastructure, PurchaseRequest, ContactUs
from config import app, db, api
from flask_jwt_extended import create_access_token,JWTManager, create_refresh_token, jwt_required, get_jwt_identity, current_user, verify_jwt_in_request, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request,make_response,jsonify
from flask_restful import Resource
from functools import wraps

import os

# initializing JWTManager
jwt = JWTManager(app)

#  creating a custom hook that helps in knowing the roles of either the buyer or the administrator
# a method called allow that uses the user roles and give users certain rights to access certain endpoints
def allow(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):  
            jwt_claims=get_jwt()
            user_role=jwt_claims.get('role',None)
            
            # Check if the user_role is in the allowed roles
            if user_role in roles:
                return fn(*args, **kwargs)
            else:
                # creating and returning a response based on the response_body
                response_body = {"message": "Access is forbidden"}
                response = make_response(response_body, 403)
                return response

        return decorator

    return wrapper


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()




# creating a Home 
class Home(Resource):
    def get(self):
        #  creating and returning a response based on the response body
        response_body = {"Message": "Welcome to SEP Realtors"}
        response = make_response(response_body, 200)
        return response
    


# creating Property Resource
class Properties(Resource):
    #  a method to get all properties
    @jwt_required()
    @allow("admin", "buyer")
    def get(self):
        # Querying the database to get a list of all properties
        properties = Property.query.all()

        # Looping through properties and getting a property as a dictionary
        property_list = []
        for property1 in properties:
            property_dict = property1.to_dict(rules=("-buyers",))
            property_dict['images'] = [image.name for image in property1.images]
            property_dict['features'] = [feature.name for feature in property1.features]
            property_dict['infrastructures'] = [infrastructure.name for infrastructure in property1.infrastructures]
            property_list.append(property_dict)

        # Creating and making a response
        response = make_response(property_list, 200)
        return response
    
    
    #  a method to post a property
    @jwt_required()
    @allow("admin")
    def post(self):
        # getting the price of the property based on the request
        data = request.get_json()
        price = data.get("price")

        #  setting a conditional - if the price is greater than 1 then create a new property else give an error
        if price > 1:
            new_property = Property(
                title = data.get("title"),
                price = price,
                description = data.get("description"),
                location = data.get("location"),
                property_type = data.get("propertyType")
            )

            # Getting the features of the property and appending them to the new prperty
            features = data.get("features", [])
            #  looping through the features and appending it to the new_property
            for feature in features:
                feature_data = Feature(name = feature.get("name") )
                # appending the feature_data to the new property
                new_property.features.append(feature_data)
            
            # Getting the images of a property and appending them to the new property
            images = data.get("images", [])
            # looping through the images and appending them to the new property
            for image in images:
                image_data = Image(name = image.get("name"))
                # appending the image_data to the new property
                new_property.images.append(image_data)

            # Getting the infrastructures of the property and appendig them to the new property
            infrastructures = data.get("infrastructures", [])
            # looping through the infrastructures and appending them to the new property
            for infrastructure in infrastructures:
                infrastructure_data = Infrastructure(name = infrastructure.get("name"))
                # appending the infrastructure_data to the new property
                new_property.infrastructures.append(infrastructure_data)



            if new_property:
                #  adding and commiting the new property to the database
                db.session.add(new_property)
                db.session.commit()

                #  making the new property to a dictionary using to_dict() method
                new_property_dict = new_property.to_dict()

                #  creating and returning a response
                response = make_response(new_property_dict, 201)
                return response
        else:
            # Creating and returning a response for a property whose price is less than 1
            response_body = {"message": "Price must be greater than 1"}
            response = make_response(response_body, 404)
            return response
        pass
    pass

# creating a PropertyById Resource
class PropertyById(Resource):
    #  a method to get one property
    @jwt_required()
    @allow("buyer", "admin")
    def get(self, id):
        # Querying and filtering the database using the id
        property1 = Property.query.filter_by(id=id).first()
        if property1:
            # Creating a property dict using the to_dict method
            property1_dict = property1.to_dict()
            
            # Adding images, features, and infrastructures to the property dict
            property1_dict['images'] = [image.name for image in property1.images]
            property1_dict['features'] = [feature.name for feature in property1.features]
            property1_dict['infrastructures'] = [infrastructure.name for infrastructure in property1.infrastructures]

            # Creating and making a response
            response = make_response(property1_dict, 200)
            return response
        else:
            # Creating and returning a response for a property not found
            response_body = {"error": "Property not found"}
            response = make_response(response_body, 404)
            return response

    # #  a method to update a property
    @jwt_required()
    @allow("admin")
    def patch(self, id):
        with db.session.no_autoflush:
            # querying and filtering the database using the id
            property1 = Property.query.filter_by(id = id).first()
            if property1:
                #  creating a for loop to set the attributes
                data = request.get_json()

                for attr in data:
                    #  creating an if else statement to add the new images, features and infrastructure to property1 and setting the state for each and everything
                    if attr == "images" and len(data[attr]) > 0 :
                        #  looping through the request of images given by the user and appending it to property1
                        for image_name in data[attr]:
                            new_image = Image(name = image_name)
                            property1.images.append(new_image)
                    elif attr == "features" and len(data[attr]) > 0:
                        #  looping through the request of features given by the user and appending it to property1
                        for feature_name in data[attr]:
                            new_feature = Feature(name = feature_name)
                            property1.features.append(new_feature)
                    elif attr == "infrastructures" and len(data[attr]) > 0:
                        #  looping through the request of infrastructures given by the user and appending it to property1
                        for infrastructure_name in data[attr]:
                            new_infrastructure = Infrastructure(name = infrastructure_name)
                            property1.infrastructures.append(new_infrastructure)
                    else:
                        setattr(property1, attr, data[attr])

                # commiting to the database
                db.session.commit()
                #  making the property1 to a dictionary using to_dict() method
                property1_dict = property1.to_dict()
                # creating and making a response
                response = make_response(property1_dict, 200)
                return response
            else:
                #  creating and returning a response based on the response body
                response_body = {"error": "Property  not found"}
                response = make_response(response_body, 404)
                return response

    #  a method to delete the property
    @jwt_required()
    @allow("admin")
    def delete(self, id):
        # querying and filtering the database using the id
        property1 = Property.query.filter_by(id = id).first()
        if property1:
            #  deleting the property1 and commiting the changes to the database
            db.session.delete(property1)
            db.session.commit()
            #  creating and returning a response based on the response body
            response_body = {"message":"Property deleted successfully"}
            response = make_response(response_body, 204)
            return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "Property not found"}
            response = make_response(response_body, 404)
            return response
    pass

# creating User Resource
class Users(Resource):
    #  a method to get all users
    def get(self):
        # querying the database to get a list of all the users
        users = User.query.all()
        # Looping through users and getting a user as a dictionary using to_dict() method
        user_dict = [user.to_dict(rules = ("-admin", "-buyer","-password",  )) for user in users]
        # creating and making a response
        response = make_response(user_dict, 200)
        return response
    
    # a method to post a user
    @jwt_required()
    @allow("buyer", "admin")
    def post(self):

        #  creating a new user
        data = request.get_json()
        user_role = data["user_role"]
        #  generating a password hash
        password = generate_password_hash(data["password"])
        if user_role  == "buyer" and password == password:
            new_user = User(
                first_name = data["first_name"],
                last_name = data["last_name"],
                email = data["email"],
                password = password,
                contact = data["contact"],
                user_role = user_role
            )

            #  adding and commiting the new user to the database
            db.session.add(new_user)
            db.session.commit()
            if new_user:
                new_buyer = Buyer(
                    email = new_user.email,
                    password = new_user.password,
                    user_id =new_user.id
                )
                #  adding and commiting the new buyer to the database
                db.session.add(new_buyer)
                db.session.commit()
                #  making the new user to a dictionary using to_dict() method
                new_user_dict = new_user.to_dict(rules = ("-buyer", ))

                #  creating and returning a response
                response = make_response(new_user_dict, 201)
                return response
        elif user_role == "admin" and password == password:
            new_user = User(
                first_name = data["first_name"],
                last_name = data["last_name"],
                email = data["email"],
                password = password,
                contact = data["contact"],
                user_role = user_role
            )

            #  adding and commiting the new user to the database
            db.session.add(new_user)
            db.session.commit()
            if new_user:
                new_admin = Admin(
                    email = new_user.email,
                    password = new_user.password,
                    user_id =new_user.id
                )
                #  adding and commiting the new admin to the database
                db.session.add(new_admin)
                db.session.commit()
                #  making the new user to a dictionary using to_dict() method
                new_user_dict = new_user.to_dict(rules = ("-admin", ))

                #  creating and returning a response
                response = make_response(new_user_dict, 201)
                return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "User role does not exist"}
            response = make_response(response_body, 404)
            return response


    pass

# creating a UserById Resource
class UserById(Resource):
    #  a method to get one user
    def get(self, id):
        # querying and filtering the database using the id
        user = User.query.filter_by(id = id).first()
        if user:
            #  creating a user dict using the to_dict method
            user_dict = user.to_dict(rules=("-admin", "-buyer","-password",  ))
            # creating and making a response
            response = make_response(user_dict, 200)
            return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "User  not found"}
            response = make_response(response_body, 404)
            return response
    
    #  a method to update a user
    def patch(self, id):
        # querying and filtering the database using the id
        user = User.query.filter_by(id = id).first()
        if user:
            #  creating a for loop to set the attributes
            data = request.get_json()
            for attr in data:
                setattr(user, attr, data[attr])

            # commiting to the database
            db.session.commit()
            #  making the user to a dictionary using to_dict() method
            user_dict = user.to_dict()
            # creating and making a response
            response = make_response(user_dict, 200)
            return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "User  not found"}
            response = make_response(response_body, 404)
            return response
    
    #  a method to delete the user
    @jwt_required()
    @allow("admin")
    def delete(self, id):
        # querying and filtering the database using the id
        user1 = User.query.filter_by(id = id).first()
        if user1:
            #  deleting the user1 and commiting the changes to the database
            db.session.delete(user1)
            db.session.commit()
            #  creating and returning a response based on the response body
            response_body = {"message":"user deleted successfully"}
            response = make_response(response_body, 204)
            return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "user not found"}
            response = make_response(response_body, 404)
            return response

    pass



# Create a PurchaseList Resource
class Purchases(Resource):
    @jwt_required()
    @allow("admin")
    #  a get method used to get all the properties that have been purchased
    def get(self):
        # Find the property by ID
        purchases = PurchaseRequest.query.all()
        # converting the purchases to a dictionary using to_dict() method
        purchases_dict = [purchase.to_dict(only=() ) for purchase in purchases]
        # creating and returning a response
        response = purchases_dict
        return make_response(response, 200)



# Create a PurchaseRequests resource
class PurchaseRequests(Resource):
    @jwt_required()
    @allow("buyer")
    def post(self, property_id):
        # 
        data = request.get_json()
        user = data.get("user_id")
        print("Received data:", data)
        # Find the property by ID
        user = User.query.filter_by(id = user).first()

        property1 = Property.query.filter_by(id=property_id).first()
        if not property1:
            return {"message": "Property not found"}, 404
        
        # Create a new purchase request
        if user:
            purchase_request = PurchaseRequest(
                buyer_id = user.buyer.id,
                property_id = property1.id,
                status = "pending"  
            )
            if purchase_request:
                # Add purchase request to the database
                # Here you need to define your model and how to save the request
                db.session.add(purchase_request)
                db.session.commit()
                return {"message": "Purchase request sent for approval"}, 201
            else:
                return {"message": "Error creating purchase request"}, 500


        
#  creating a PurchaseRequestById Resource
class PurchaseRequestsById(Resource):
    @jwt_required()
    @allow("buyer")
    #  a get method to get the requests by the id of the user 
    def get(self,id):
        #  Querying the buyer who has a user id which should be equated to our id since buyer has logged in with the user id
        buyer = Buyer.query.filter_by(user_id = id).first()
        # an in statement to check if a buyer has pressed on a property
        if buyer:
            purchases =PurchaseRequest.query.filter(PurchaseRequest.buyer_id == buyer.id).all()
            # converting a purchase to a dictionary
            purchase_dict = [purchase.to_dict() for purchase in purchases]
            # creating and returning a response
            response = make_response(purchase_dict,200)
            return response
        else:
            return {"message": "No purchases found"}, 400
    @jwt_required()
    @allow("admin")
    #  a patch method to edit the approval status
    def patch(self, id):
        # querying the purchase request by th id
        purchase =PurchaseRequest.query.filter_by(id=id).first()
        if purchase:
            #  creating and setting attributes for a purchase request
            data = request.get_json()
            for attr in data:
                setattr(purchase, attr, data[attr])
            
            # commiting to the database
            db.session.commit()
            #  making the purchase to a dictionary using to_dict() method
            purchase_dict = purchase.to_dict()
            # creating and making a response
            response = make_response(purchase_dict, 200)
            return response
        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "Purchase  not found"}
            response = make_response(response_body, 404)
            return response
    pass



#  Creating a BoughtProperties Resource
class BoughtProperties(Resource):
    @jwt_required()
    @allow("admin")
    #  a get method to get all the bought properties
    def get(self):
        # querying the PurchaseRequest model using the status
        bought_properties = PurchaseRequest.query.filter(PurchaseRequest.status == "approved").all()
        # creating a bought_properties dict using the to_dict method
        bought_properties_dict = [bought_property.to_dict() for bought_property in bought_properties]
        # creating and making a response
        response = make_response(bought_properties_dict, 200)
        return response

    pass

#  creating an Admins Resource that fetches all admins from the user table
class Admins(Resource):
    # creating a get method to get all admins from the user table
    @jwt_required()
    @allow("admin")
    def get(self):
        #  queying the table based on the user role of the admin
        users = User.query.filter_by(user_role = 'admin').all()
        # # Looping through users and getting a user as a dictionary using to_dict() method
        user_dict = [user.to_dict() for user in users]
        # creating and making a response
        response = make_response(user_dict, 200)
        return response
    pass


# creating a resource for queryying and patching the user by the email
class UserByEmail(Resource):
    def patch(self, email):
        #  querying the user by the email
        user = User.query.filter_by(email = email).first()
        #  getting the data based on the request
        data = request.get_json()

        if email == user.email:
            # getting the password and hashing it
            data["password"] = generate_password_hash(data["password"])

            #  creating and setting attributes using a for loop
            for attr in data:
                setattr(user, attr, data[attr])

            # commiting to the database
            db.session.commit()
            #  making the user to a dictionary using to_dict() method
            user_dict = user.to_dict()
            # creating and making a response
            response = make_response(user_dict, 200)
            return response
            

        else:
            #  creating and returning a response based on the response body
            response_body = {"error": "User  not found"}
            response = make_response(response_body, 404)
            return response

    pass

# creating a ContactUss resource
class ContactUss(Resource):
    @jwt_required()
    @allow("admin")
    # a get method to get all info from the contact us 
    def get(self):
        # querying the contactuss model and geting all info
        contacts = ContactUs.query.all()

        # creating a contact us dict using to_dict method
        contact_dict = [contact.to_dict() for contact in contacts]
        # creatig and returning a response
        response = make_response(contact_dict, 200)
        return response
    
    @jwt_required()
    @allow("buyer")
    #  a post method to post info on the contact us page
    def post(self):
        #  creating a new contact 
        data = request.get_json()

        new_contact = ContactUs(
            date = data["date"],
            name = data["name"],
            email = data["email"],
            contact = data["contact"],
            about_us = data["about_us"],
            looking_for = data["looking_for"],
            message = data["message"]
        )

        #  adding and commiting the new contact to the database
        db.session.add(new_contact)
        db.session.commit()
        #  making the new contact to a dictionary using to_dict() method
        new_contact_dict = new_contact.to_dict(rules = ("-buyer", ))

        #  creating and returning a response
        response = make_response(new_contact_dict, 201)
        return response
    pass
api.add_resource(ContactUss, "/contact-uss", endpoint='/contact_uss')


#  creating a Login Resource
class Login(Resource):
    #  a post method that even checks whether the user exists
    def post(self):
        # checking the user email
        data = request.get_json()
        email = data["email"]
        # querying the users email while logging in
        user = User.query.filter_by(email=email).first()
        #  if the user does not exist then return a message
        if not user:
            #  creating and returning a response based on the response body
            response_body = {"message": f"User with email {email} does not exist"}
            response = make_response(response_body, 404)
            return response
        
        #  checking whether the passwords are similar, if not then throw an error
        if not check_password_hash(user.password, data["password"]):
            #  creating and returning a response based on the response body
            response_body = {"message": "The password entered is incorrect"}
            response = make_response(response_body, 403)
            return response
        
        #  creating an access token and a refresh token
        access_token = create_access_token(identity=user.id,additional_claims={"role":user.user_role})
        refresh_token = create_refresh_token(identity=user.id)
        user1 = user.to_dict()
        return {
            "message": "Logged in",
            "user_data": user1,
            "access_token": access_token, 
            "refresh_token": refresh_token,
            "role":user.user_role
            }
    
    #  a method to refresh the token
    @jwt_required(refresh = True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        response = jsonify(access_token=access_token)
        return response

#  creating a sign up resource
class Signup(Resource):
    def post(self):
        #  getting data that the user has requested
        data = request.get_json()
        password = data["password"]

        #  creating a new user
        new_user = User(
            first_name = data["first_name"],
            last_name = data["last_name"],
            email = data["email"],
            password = password,
            contact = data["contact"],
            user_role = data["user_role"]
            )
        new_user.set_password(password=password)
        new_user.save()
        #  making the new user to a dictionary using to_dict() method
        new_user_dict = new_user.to_dict(rules = ("-buyer","-admin" ))

        #  creating and returning a response
        response = make_response(new_user_dict, 201)
        return response

    
    pass





#  adding resources and routes to the specific Resources
api.add_resource(Home, "/", endpoint="home")
api.add_resource(Properties, "/properties" , endpoint="properties")
api.add_resource(PropertyById, "/properties/<int:id>", endpoint="/property_by_id")
api.add_resource(Users, "/users", endpoint="users")
api.add_resource(UserById, "/users/<int:id>", endpoint="/user_by_id")
api.add_resource(Purchases, '/purchases', endpoint='purchases')
api.add_resource(PurchaseRequests, "/properties/<int:property_id>/purchase", endpoint="purchase_request")
api.add_resource(PurchaseRequestsById, '/purchase-requests/<int:id>', endpoint='purchase_requests_by_id')
api.add_resource(BoughtProperties, '/bought-properties', endpoint = "bought_properties")
api.add_resource(Admins, '/admins', endpoint = "admins")
api.add_resource(UserByEmail, '/user-by-email/<string:email>', endpoint="/user_by_email")
api.add_resource(Login, "/login", endpoint = "/login")
api.add_resource(Signup, "/signup", endpoint = "/signup")



if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)