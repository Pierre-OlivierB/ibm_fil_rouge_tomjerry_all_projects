import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem
from PyQt5.QtCore import QDate, Qt,QTime
import requests
import os
import json


token =''
account=''

class View1(QtWidgets.QMainWindow):
  
    def __init__(self):
        super().__init__()
        # * target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'coToApiPhp.ui'), self)
        # * creat and connect two btn
        self.createAccountBtn.clicked.connect(self.openVue2)
        self.connexionBtn.clicked.connect(self.launch)

    # * open views
    def openVue2(self):
        self.hide()
        Vue2 = View2(self)
        Vue2.show()

    def openVue3(self):
        self.hide()
        Vue3 = View3(self)
        Vue3.show()
    
    # * front after connexion test
    def launch(self):
        test = self.addToArray()
        if test ==True :
            self.openVue3()
        if test ==False :
            self.errorZone.setText('Mail ou mdp mauvais')
        else :
            self.errorZone.setText(str(test))

    # * test connexion
    def exist(self, data):
        # print("data",data)
        if data['Status'] == "Ok":
            # *
            global token
            token=data['token']
            return True
        if data['erreur'] == True :
            return False
        else:
            return data['message']

    # * send info 
    def addToArray(self):
        email =self.textMail.toPlainText()
        password = self.textPass.toPlainText()
        save = {"email":str(email),"pass":str(password)}
        req = self.add_to_bdd(save)
        return self.exist(req)

    #  * connexion to api
    def add_to_bdd(self,new_data):
        link = "http://localhost:3001/login"
        # print(new_data)
        r=requests.post(link,json=new_data)
        # print(r.text)
        r =r.json()   
        return r

    # *creation view
class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'createCoToApiPhp.ui'), self)
        self.signupBtn.clicked.connect(self.addToArray)

    # *test infos equality

    def addToArray(self):
        firstName =self.textFirstName.toPlainText()
        lastName =self.textLastName.toPlainText()
        email =self.textMail.toPlainText()
        password = self.textPass.toPlainText()
        passConfirm=self.textPassConfirm.toPlainText()
        if password==passConfirm:
            save = {"First_name":str(firstName),"Last_name":str(lastName),"email":str(email),"pass":str(password)}
            self.createUser(save)
            return self.openVue()
        if password !=passConfirm:
            self.errorZone.setText('Les passwords ne correspondent pas')

    # *create send
    def createUser(self,new_data):
        link = "http://localhost:3001/createaccount"
        r=requests.post(link,json=new_data)
        r =r.json()   
        return r   
    
    def openVue(self):
        self.parent().show()
        self.close()

    # *info view
class View3(QtWidgets.QMainWindow):

    # *front with array
    def __init__(self,parent=None):
        super().__init__(parent)
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'viewUserPost.ui'), self)
        # *fill the array with data from api
        self.qtableFromArray(self.getProducts()["data"],self.tableData)
        # TODO :
        self.updateAccountBtn.clicked.connect(self.openVue4)
        # updateAccountTxt

    def openVue4(self):
        global account
        account = {"email":self.updateAccountTxt.text()}
        # print("account",account)
        test = self.userExist(account)
        print(test)
        if(len(test)!=0):
            account = test
            self.hide()
            Vue4 = View4(self)
            Vue4.show()
        else:
            self.errorZone.setText('L\'utilisateur n\'existe pas')

    def userExist(self,new_data):
        link = "http://localhost:3001/selectone"
        r=requests.post(link,json=new_data)
        # print(r.json())
        # r =r.json()   
        return r.json()   
    
    # *fill the array
    def qtableFromArray(self, querry, qtable):
        nbRow = len(querry)
        nbCol = len(querry[0])
        # print("row : ",nbRow,"; col : ",nbCol)
        qtable.setRowCount(nbRow)
        qtable.setColumnCount(nbCol)
        # print("quer ",querry)
        for i in range(nbRow):
            for j in range(nbCol):
                # * fill case by case
                qtable.setItem(i,j,QTableWidgetItem(str(list(querry[i].values())[j])))
    
    # *get all users
    def getProducts(self):
        array=[]
        response = requests.get("http://localhost:3001/select")
        results = response.json()
        # *get data on format [[1,"xxx",...],...]
        # print(results)
        for row in results :
            product = dict(name = row['First_name'],mail=row['email'])
            array.append(product)
        product_list = {"data":array}
        return product_list        

class View4(QtWidgets.QMainWindow):

    # *front with array
    def __init__(self,parent=None):
        super().__init__(parent)
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'updateEmployee.ui'), self)
        self.validateUpdateAccountBtn.clicked.connect(self.openVue3)
        global account
        print(account)

    def openVue3(self):
        self.hide()
        Vue3 = View3(self)
        Vue3.show() 
    
        
    
    
    # !trash ?
    # def show_user(self):
    #     link = "http://localhost:3001/select"
    #     r = requests.get(link)
    #     r=r.json()
    #     return r
# !------------------------------------------------------------------
# *------------------------------------------------------------------
# TODO : Need to add View 4 link to http://localhost/api_auth/newPost 

# *launch the first view 
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())