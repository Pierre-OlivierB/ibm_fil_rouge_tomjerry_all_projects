import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem
from PyQt5.QtCore import QDate, Qt,QTime
import requests
import os
import json


id =''
mail=''
content=''

class View1(QtWidgets.QMainWindow):
  
    def __init__(self):
        super().__init__()
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'coToApiPhp.ui'), self)
        self.createAccountBtn.clicked.connect(self.openVue2)
        self.connexionBtn.clicked.connect(self.launch)

    def openVue2(self):
        self.hide()
        Vue2 = View2(self)
        Vue2.show()

    def openVue3(self):
        self.hide()
        Vue3 = View3(self)
        Vue3.show()
    
    def launch(self):
        test = self.addToArray()
        if test ==True :
            # self.errorZone.setText('Vous êtes co')
            self.openVue3()
        if test ==False :
            self.errorZone.setText('Mail ou mdp mauvais')
        else :
            self.errorZone.setText(str(test))
        # return test

    def exist(self, data):
        if data['message'] == "Connexion OK !":
            # !-------------------------------------------
            # TODO: -------
            # print(data)
            global id,mail
            id=data['id']
            mail=data['email']
            # self.content=data['']
            # !------------------------------------------
            return True
        if data['erreur'] == True :
            return False
        else:
            return data['message']

    def addToArray(self):
        email =self.textMail.toPlainText()
        password = self.textPass.toPlainText()
        save = {"email":str(email),"password":str(password)}
        req = self.add_to_bdd(save)
        return self.exist(req)


    def add_to_bdd(self,new_data):
        link = "http://localhost/api_auth/userLogin.php"
        r=requests.post(link,data=new_data)
        r =r.json()   
        return r

class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'createCoToApiPhp.ui'), self)
        self.signupBtn.clicked.connect(self.addToArray)
   
    def addToArray(self):
        email =self.textMail.toPlainText()
        password = self.textPass.toPlainText()
        passConfirm=self.textPassConfirm.toPlainText()
        if password==passConfirm:
            save = {"email":str(email),"password":str(password)}
            self.createUser(save)
            return self.openVue()
            # return print(req)
        if password !=passConfirm:
            self.errorZone.setText('Les passwords ne correspondent pas')
            # return print("Les passwords ne correspondent pas")

    def createUser(self,new_data):
        link = "http://localhost/api_auth/userRegister.php"
        r=requests.post(link,data=new_data)
        r =r.json()   
        return r   
    
    def openVue(self):
        self.parent().show()
        self.close()

class View3(QtWidgets.QMainWindow):
  
    def __init__(self,parent=None):
        super().__init__(parent)
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'viewUserPost.ui'), self)
        self.addContentToView()
        # print('test',id,mail)
    
    def addContentToView(self):
        response=self.show_post(id)

        self.labelId.setText(id)
        self.labelUser.setText(mail)
        # self.labelTitle.setText(str(response['table']['titrePost']))
        # self.labelContent.setText(str(response['table']['textePost']))
        # self.labelYear.setText(str(response['table']['annee']))
        self.labelTitle.setText(str(response['table'][0]['titrePost']))
        self.labelContent.setText(str(response['table'][0]['textePost']))
        self.labelYear.setText(str(response['table'][0]['annee']))

        # id_user={'idUser':str(id)}
        # print('testid',id_user)
        

    def show_post(self, id_user):
        link = "http://localhost/api_auth/userPosts.php?idUser="+id_user
        r = requests.get(link)
        # print(r.json())
        r=r.json()
        return r
# !------------------------------------------------------------------
# *------------------------------------------------------------------
# TODO : Need to add View 4 link to http://localhost/api_auth/newPost 

# *launch the first view 
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())