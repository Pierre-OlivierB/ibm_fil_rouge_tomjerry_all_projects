from typing import Any
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
import mysql.connector


cnx = mysql.connector.connect(user='root',password='',host='127.0.0.1', database='numeric_poducts')

app=FastAPI()

@app.get("/")
def root():
    return {"message":"Bienvenue"}

@app.get("/products/")
def get_all_products():
    link_to_bdd = cnx.cursor()
    link_to_bdd.execute("SELECT * FROM products_list")
    data = link_to_bdd.fetchall()
    return JSONResponse(content=data)

@app.get("/commands/")
def get_all_commads():
    link_to_bdd = cnx.cursor()
    link_to_bdd.execute("SELECT * FROM products")
    data = link_to_bdd.fetchall()
    return JSONResponse(content=data)

@app.post("/addcommand")
def add_command( payload: Any = Body(None)):    
    link_to_bdd = cnx.cursor()
    query = "INSERT INTO `products` (`date_cmd`, `time_cmd`, `name_product`, `quantity_product`, `price_cmd`) VALUES (%s, %s,%s, %s, %s)"
    link_to_bdd.execute(query, (payload['date'], payload['time'],payload['product'], payload['quantity'],payload['price']))
    cnx.commit()
    return {"received_request_body": payload}