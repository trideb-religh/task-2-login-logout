from flask import Flask, jsonify

app = Flask(__name__)

languages = [
    "python",
    "java",
    "php",
    "javascripts",
    "c",
    "c#",
    "c++"
]

@app.route('/')
def hello():

    return jsonify({
        "languages" : languages
    })

if(__name__=="__main__"):
    app.run(debug=True)