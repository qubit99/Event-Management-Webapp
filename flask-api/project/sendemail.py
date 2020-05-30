from mailjet_rest import Client
import os
api_key = 'secret'
api_secret = 'secret'
mailjet = Client(auth=(api_key, api_secret), version='v3.1')

def receiver(emailid, name, regn_id):
    return {
        'Messages': [
            {
                "From": {
                    "Email": "architranjan9@gmail.com",
                    "Name": "Archit"
                },
                "To": [
                    {
                        "Email": emailid,
                        "Name": name
                    }
                ],
                "Subject": "Greetings from StackHack.",
                "TextPart": "Hi {name}, \n Your registration was successful. Your registration id is {regn_id}".format(name = name, regn_id = regn_id),
                "CustomID": "AppGettingStartedTest"
            }
        ]
    }

def send_email(emailid, name, regn_id):
    data = receiver(emailid, name, regn_id)
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result.json())

