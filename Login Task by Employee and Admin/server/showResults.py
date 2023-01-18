from flask import Flask
from flask_restful import Resource, Api, reqparse, abort

app = Flask(__name__)

data = Api(app)

info ={
    1:{"Name":"Trideb","Email":"panigrahitrideb1@gmail.com", "First_name":"Trideb", "Last_name":"Panigrahi", "Password":"helloPY123", "Type":"Employee"}
}

details = reqparse.RequestParser()

details.add_argument("Name", type=str, help="Name is required", required =True)
details.add_argument("Email", type=str, help="Email is required", required =True)
details.add_argument("First_name", type=str, help="First_name is required", required =True)
details.add_argument("Last_name", type=str, help="Last_name is required", required =True)
details.add_argument("Password", type=str, help="Password is required", required =True)
details.add_argument("Type", type=str, help="Type is required", required =True)


class Info_list(Resource):
    def get(self):
        return info

class Information(Resource):
    def get(self, id):
        return info[id]

    def post(self, id):
        args = details.parse_args()
        if id in info:
            abort(409, "id is already taken")
        info[id] = {"Name": args["Name"], "Email": args["Email"], "First_name": args["First_name"], "Last_name": args["Last_name"], "Password": args["Password"], "Type":args["Type"]}
        return info[id]

        
data.add_resource(Info_list, '/info')
data.add_resource(Information, '/info/<int:id>')

if __name__ =="__main__":
    app.run(debug=True)