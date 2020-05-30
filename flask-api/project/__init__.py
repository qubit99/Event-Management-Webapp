import os
from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity
from project.secure_check import authenticate, identity
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_migrate import Migrate
from flask_restful import reqparse, abort, Api, Resource

app = Flask(__name__)
app.config['SECRET_KEY'] = "mysecretkey"
CORS(app)
jwt = JWT(app, authenticate, identity)

########################
#### Database Setup ####
########################

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app, db)
api = Api(app)

######################################

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('mob_no', type=str)
parser.add_argument('email', type=str)
parser.add_argument('idcard', type=str)
parser.add_argument('regn_type', type=str)
parser.add_argument('num_guests', type=int)


#######################################

########################
###### Resources #######
########################
from project.models import Registrations
from project.sendemail import send_email


class Registration(Resource):

    def post(self):
        args = parser.parse_args()
        name = args['name']
        mob_no = args['mob_no']
        email = args['email']
        id_card = args['idcard']
        regn_type = args['regn_type']
        num_tickets = args['num_guests']
        

        regn = Registrations(name = name, mob_no = mob_no, email = email, 
                            regn_type = regn_type, num_tickets = num_tickets, id_card = id_card)
        db.session.add(regn)
        db.session.commit()
        send_email(emailid=regn.email, name=regn.name, regn_id=regn.id)
        return {"id":regn.id}, 201

class Detail(Resource):    

    @jwt_required()
    def get(self, id):
        reg = Registrations.query.filter_by(id = id).first()
        if reg:
            return reg.json()

        return {'error': f'{id} not found'}, 404
    
    @jwt_required()
    def delete(self, id):
        reg = Registrations.query.filter_by(id = id).first()
        if reg:
            db.session.delete(reg)
            db.session.commit()
            return {'success' : 'delete'}, 204
        
        return {'error': f'{id} not found'}, 404

class Stats(Resource):
    @jwt_required()
    def get(self):
        return db.session.query(Registrations.regn_type,func.count(Registrations.regn_type)
                      ).group_by(Registrations.regn_type).all()
        
        
        


class All(Resource):
    @jwt_required()
    def get(self, page=1):
        regns = Registrations.query.all()
        regns = regns[(page-1)*15:(page)*15]

        return [regn.sm_json() for regn in regns]




api.add_resource(Registration,'/')
api.add_resource(Stats,'/stats')
api.add_resource(Detail,'/details/<int:id>')
api.add_resource(All, '/all/<int:page>')
