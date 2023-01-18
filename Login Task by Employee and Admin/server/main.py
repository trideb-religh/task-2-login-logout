from flask import Flask, render_template, request, jsonify
import pymysql 
pymysql.install_as_MySQLdb()
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] ="localhost"
app.config['MYSQL_USER'] ="root"
app.config['MYSQL_PASSWORD'] ="root"
app.config['MYSQL_DB'] ="user_data"

mysql = MySQL(app)

@app.route('/data', methods=['POST'])
def users():
    res = request.get_json()
    username = res["username"]
    email = res["email"]
    firstnm = res["firstnm"]
    lastnm = res["lastnm"]
    password = res["password"]
    type=res["type"]
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO registration (USER_NAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, TYPE) VALUES (%s, %s, %s, %s, %s, %s)",[username, email,firstnm,lastnm,password,type])
    mysql.connection.commit()
    cur.close()
    return f"done"

@app.route('/adminpage', methods=['POST'])
def userAdmin():
    res = request.get_json()
    addtitle = res["addtitle"]
    desc = res["desc"]
    task = res["task"]
    startDate = res["startDate"]
    endDate = res["endDate"]
    deadline = res["deadline"]
    selectTask = res["selectTask"]
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO tasktab (TITLE, DESCRIPTION, USER_ASSIGN, START_DATE, END_DATE, DEADLINE, STATUS) VALUES (%s, %s, %s, %s, %s, %s, %s)",[addtitle, desc, task, startDate, endDate, deadline, selectTask])
    mysql.connection.commit()
    cur.close()
    return f"done"

@app.route('/logindata', methods =['GET'])
def usersData():
    username = request.args.get('username')
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT USER_NAME, EMAIL, PASSWORD, TYPE FROM registration where USER_NAME like (%s)''', [username])
    userdb= cur.fetchall()
    mysql.connection.commit()
    cur.close()
    return jsonify(userdb) 

@app.route('/getuserdata', methods =['GET'])
def usersDataTask():
    # task = request.args.get('task')
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT USER_ASSIGN FROM tasktab ''')
    userdata= cur.fetchall()
    mysql.connection.commit()
    cur.close()
    return jsonify(userdata) 

@app.route('/getuse', methods =['GET'])
def usersTask():
    username = request.args.get('username')
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT ID, TITLE, DESCRIPTION, USER_ASSIGN, START_DATE, END_DATE, DEADLINE, STATUS FROM tasktab WHERE USER_ASSIGN LIKE (%s) ''', [username])
    userdata= cur.fetchall()
    mysql.connection.commit()
    cur.close()
    return jsonify(userdata) 

@app.route('/getuser', methods =['GET'])
def getUserdata():
    # task = request.args.get('task')
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT USER_NAME FROM registration where TYPE = "User" ''')
    userdata= cur.fetchall()
    mysql.connection.commit()
    cur.close()
    return jsonify(userdata) 

if(__name__ == "__main__"):
    app.run(debug=True)