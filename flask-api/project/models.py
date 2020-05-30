from project import db
import datetime

class Registrations(db.Model):
    
    __tablename__ = "registrations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64),)
    mob_no = db.Column(db.String(15))
    email = db.Column(db.String(64), unique = True)
    regn_type = db.Column(db.String(32))
    num_tickets = db.Column(db.Integer)
    id_card = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name, mob_no, email, regn_type, num_tickets, id_card):
        
        self.name = name
        self.mob_no = mob_no
        self.email = email
        self.regn_type = regn_type
        self.num_tickets = num_tickets
        self.id_card = id_card
    
    def __repr__(self):
        return f"{self.name}, you are registered for the event. Registration id is {self.id}"
    
    def json(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'mob_no':self.mob_no,
            'email' : self.email,
            'regn_type' : self.regn_type,
            'num_guests' : self.num_tickets,
            'id_card' : self.id_card,
            'date' : str(self.date).split()[0]
        }
    def sm_json(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'date': str(self.date).split()[0]
        }
    

    




