from flask import Flask
from flask_restful import Resource, Api, reqparse, abort

app = Flask(__name__)

api =Api(app)

todos ={
    1:{"task":"program to write hello world", "summary":"write the code using python"},
    2:{"task":"program to add two number", "summary": "write the code using java"},
    3:{"task":"program to write product of two number","summary":"write the code using c"}
}

task_post_args = reqparse.RequestParser()

task_post_args.add_argument("task", type=str, help="Task is required", required =True)
task_post_args.add_argument("summary", type=str, help="Summary is required", required =True)

class ToDo_list(Resource):
    def get(self):
        return todos

class ToDo(Resource):
    def get(self, todo_id):
        return todos[todo_id]

    def post(self, todo_id):
        args = task_post_args.parse_args()
        if todo_id in todos:
            abort(409, "Task is already taken")
        todos[todo_id]={"task":args["task"], "summary": args["summary"]}
        return todos[todo_id]

api.add_resource(ToDo_list, '/todos')
api.add_resource(ToDo, '/todos/<int:todo_id>')

if(__name__ == "__main__"):
    app.run(debug=True)