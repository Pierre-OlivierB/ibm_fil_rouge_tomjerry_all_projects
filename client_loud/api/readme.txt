run api
uvicorn main:app --reload

http://127.0.0.1:8000/

End Point :
"/" : Bienvenue
"/products" : Get all products
"/commands" : Get all commands
"/addcommands/" : Post new command

Problems encounter :
@app.post line 29
=> pb with format send
https://stackoverflow.com/questions/64379089/how-to-read-body-as-any-valid-json


add cnx.commit() in line 34 to add data in bdd.
Without, it's just add data on temp save.
