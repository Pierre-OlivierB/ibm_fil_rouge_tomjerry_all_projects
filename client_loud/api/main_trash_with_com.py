from typing import Any
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
import mysql.connector
from pydantic import BaseModel


cnx = mysql.connector.connect(user='root',password='',host='127.0.0.1', database='numeric_poducts')

app=FastAPI()

class ProductBase(BaseModel):
    date: str
    time: str
    product: str
    quantity : int
    price : int

@app.get("/")
def root():
    return {"message":"Bienvenue"}

@app.get("/products/")
def get_all_products():
    link_to_bdd = cnx.cursor()
    link_to_bdd.execute("SELECT * FROM products_list")
    data = link_to_bdd.fetchall()
    # for row in link_to_bdd.fetchall():
    #     print(row)
    # cnx.close()
    return JSONResponse(content=data)

@app.get("/commands/")
def get_all_commads():
    link_to_bdd = cnx.cursor()
    link_to_bdd.execute("SELECT * FROM products")
    data = link_to_bdd.fetchall()
    # for row in link_to_bdd.fetchall():
    #     print(row)
    # cnx.close()
    return JSONResponse(content=data)

@app.post("/addcommand")
def add_command( payload: Any = Body(None)):    
    # TODO: Traitement de la donnée à envoyer
    # *--------------------------------------
    link_to_bdd = cnx.cursor()
    query = "INSERT INTO `products` (`date_cmd`, `time_cmd`, `name_product`, `quantity_product`, `price_cmd`) VALUES (%s, %s,%s, %s, %s)"
    # print(payload['date'])
    link_to_bdd.execute(query, (payload['date'], payload['time'],payload['product'], payload['quantity'],payload['price']))
    # cnx.commit()
    # link_to_bdd.close()
    return {"received_request_body": payload}
    # print(await request.json())
    # *--------------------------------------
    # link_to_bdd.execute("INSERT INTO `products` (`date_cmd`, `time_cmd`, `name_product`, `quantity_product`, `price_cmd`) VALUES ('3.1.24', '10.39.58', 'iPhone x', '2', '1740');")
    # cnx.close()
    # return{"received_request_body": await request.body()}



# !---------------------------------------------------

# *--------------------------------
# * Build
# if cnx and cnx.is_connected():

#     with cnx.cursor() as cursor:

#         result = cursor.execute("SELECT * FROM actor LIMIT 5")

#         rows = cursor.fetchall()

#         for rows in rows:

#             print(rows)

#     cnx.close()

# else:

#     print("Could not connect")
# *--------------------------------
# cnx = mysql.connector.connect(user='root', password='',host='127.0.0.1',database='numeric_products')
# config = {
#   'user': 'root',
#   'password': '',
#   'host': '127.0.0.1',
#   'database': 'numeric_products',
# }

# cnx = mysql.connector.connect(**config)
    # if cnx and cnx.is_connected():

    #     with cnx.cursor() as cursor:

    #         result = cursor.execute("SELECT * FROM products")

    #         rows = cursor.fetchall()

    #         for rows in rows:

    #             print(rows)

    #     cnx.close()

    # else:

    #     print("Could not connect")

# cnx.close()



