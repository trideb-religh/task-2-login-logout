# from flask import Flask, render_template, request, jsonify
# from flask_mysqldb import MySQL
# from wtforms import Form, StringField, validators, PasswordField

# app = Flask(__name__)

# class UserRegistrationForm(Form):
    
#     email = StringField('Email Address', [validators.input_required(), validators.Length(min=6, max=35)])
#     password = PasswordField('password', [validators.input_required(), validators.Length(min=6, max=15)])


# app.config['MYSQL_HOST'] ="localhost"
# app.config['MYSQL_USER'] ="root"
# app.config['MYSQL_PASSWORD'] ="root"
# app.config['MYSQL_DB'] ="user_data"

# mysql = MySQL(app)

# @app.route('/', methods=['GET', 'POST'])
# def index():

#     form =UserRegistrationForm(request.form)

#     if(request.method =='POST' and form.validate()):
#         res = request.get_json()
#         name = res[name]
#         email =res[email]
#         firstnm = res[firstnm]
#         lastnm = res[lastnm]
#         password = res[password]
#         type_a_e =res[type_a_e]
        

#         cur = mysql.connection.cursor()

#         cur.execute("INSERT INTO registration (USER_NAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, TYPE) VALUES (%s, %s, %s, %s, %s, %s)",(name, email, firstnm, lastnm, password, type_a_e))

#         mysql.connection.commit()

#         cur.close()

#         return hello()

#     # return render_template('index.html')
#     return f"done"

# @app.route('/hello')
# def hello():

#     cur = mysql.connection.cursor()

#     users = cur.execute("SELECT * FROM registration")

#     if users>0:
#         userDetails = cur.fetchall()

#     return jsonify(userDetails)

# if(__name__=="__main__"):
#     app.run(debug=True)