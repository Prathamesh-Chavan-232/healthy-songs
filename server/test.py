
import numpy as np
import dill
import json
# from pyresparser import ResumeParser
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import mysql.connector
from cap3 import KNNRegressionModel


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


database=mysql.connector.connect(host='localhost',user='root',passwd='',database='musicDatabase')



app = Flask(__name__)

# with open('./knn_regressor_model.pkl', 'rb') as file:
#     model = dill.load(file)

cursor=database.cursor()
model = KNNRegressionModel("./Capstone(NEW).csv")
# model.preprocess_data()
model.train_model()
model.evaluate_model()

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/getScore', methods = ['POST'])
@cross_origin(origin='*')
def getScore():
    content=request.json
    age=float(content['age'])
    weight=float(content['weight'])
    songName=str(content['songName'])
    bpm=float(content['bpm'])
    gender=0
    if(content["gender"]=="male"):
        gender=1
    cursor.execute(f"select acousticness, danceability, energy, speechiness, valence from songFeature where songId=(select id from songs where sName = '{songName}');")

    result = cursor.fetchone()
    print(result)
    predicted_value = model.predict_new_data([gender, age, weight, bpm, result[0], result[1], result[2],result[3], result[4]])
    predicted_value1 =predicted_value
    predicted_value = ((predicted_value - 36) / (84 - 36)) * 100
    
    
    return jsonify({"percentage":predicted_value,"difference":predicted_value1,"features":{"acousticness":result[0],"danceability":result[1],"energy":result[2],"speechiness":result[3],"valence":result[4]}})

@app.route("/getSimilarSongs",methods=["POST"])
@cross_origin(origin='*')
def getSimilarSongs():
    content=request.json
    age=float(content['age'])
    weight=float(content['weight'])
    songName=str(content['songName'])
    bpm=float(content['bpm'])
    gender=0
    r=[]
    if(content["gender"]=="male"):
        gender=1
    cursor.execute(f"select acousticness, danceability, energy, speechiness, valence from songFeature where songId in (select songId from rock);")
    records = cursor.fetchall()
    for row in records:    
        predicted_value = model.predict_new_data([gender, age, weight, bpm, row[0], row[1], row[2],row[3], row[4]])
        predicted_value1 = predicted_value
        predicted_value = ((predicted_value - 36) / (84 - 36)) * 100
        
        r.append({"percentage":predicted_value,"difference":predicted_value1,"features":{row[0],row[1],row[2],row[3],row[4]}})
    r.sort(key=lambda x: x["percentage"], reverse=True)
    print(r)
    r=r[0:3]
    return json.dumps(r, cls=SetEncoder)




app.run(host='0.0.0.0', port=8080)

        
