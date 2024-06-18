import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem
from PyQt5.QtCore import QDate, Qt,QTime
import requests
import os
import json


token =''
account=''
roleAccount=''
userToUpdate=''
specialities=[]
alreadyPress=0

class View1(QtWidgets.QMainWindow):
  
    def __init__(self):
        super().__init__()
        # * target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'coToApiPhp.ui'), self)
        # * creat and connect two btn
        # self.createAccountBtn.clicked.connect(self.openVue2)
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

    def launchView(self):
        global account
        # print("roleAccount : ",roleAccount)
        if roleAccount == 'admin':
            self.openVue2()
        if roleAccount =='rh':
            self.openVue3()
        if roleAccount != 'admin' or roleAccount!= 'rh':
            # print("ici")
            self.errorZone.setText("vous n'avez pas les droits")
    
    # * front after connexion test
    def launch(self):
        test = self.addToArray()
        if test ==True :
            # print(token)
            # self.openVue3()
            self.launchView()
        if test ==False :
            self.errorZone.setText('Mail ou mdp mauvais')
        # else :
        #     self.errorZone.setText(str(test))

    # * test connexion
    def exist(self, data):
        # print("data",data)
        if 'Error' in data or data['Status'] == "erreur mot de pass" :
            print("erreur")
            return self.errorZone.setText("mauvais mot de pass et/ou mail")
        if data['Status'] == "Ok":
            # *
            global token, account,roleAccount
            token=data['token']
            account=self.textMail.toPlainText()
            # print(data)
            if account !="testnew@mail.fr" :
                roleAccount= data['role']
            else :
                roleAccount= "admin"
            # print(data)
            return True
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
        print(r.text)
        r =r.json()   
        return r

    # *creation view
class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'createCoToApiPhp.ui'), self)
        self.signupBtn.clicked.connect(self.addToArray)
        
        # TODO : à décommente :
        self.addRolesList()
        self.comboBoxRoles.clear()
        # print('result',self.addRolesList())
        self.comboBoxRoles.addItems(self.addRolesList())


     # TODO : à faire une boucle pour faire la liste :
    # * Basique = admin id :1, rh id:2, agriculteur id:3
    def addRolesList(self):
        link = "http://localhost:3001/roles"
        r = requests.get(link)
        # print(r.json())
        r = [r.json()]
        temp=[]
        for element in r[0]:
            # print(element['role'])
            temp.append(element['role'])
        # print("temp",temp)
        return temp
    
    # *test infos equality

    def addToArray(self):
        firstName =self.textFirstName.toPlainText()
        lastName =self.textLastName.toPlainText()
        nss=self.textNss.toPlainText()
        role=self.comboBoxRoles.currentText()
        email =self.textMail.toPlainText()
        password = self.textPass.toPlainText()
        passConfirm=self.textPassConfirm.toPlainText()
        match role:
            case 'rh':
                Id_Role=2
            case 'agriculteur':
                Id_Role=3
        if password==passConfirm:
            save = {"First_name":str(firstName),"Last_name":str(lastName),"N_SS":str(nss),"Id_Role":str(Id_Role),"email":str(email),"pass":str(password)}
            self.createUser(save)
            return self.openVue()
        if password !=passConfirm:
            self.errorZone.setText('Les passwords ne correspondent pas')

    # *create send
    def createUser(self,new_data):
        print(new_data)
        link = "http://localhost:3001/createaccount"
        r=requests.post(link,json=new_data)
        r =r.json()
        print(r)   
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
        global userToUpdate
        userToUpdate = {"email":self.updateAccountTxt.text()}
        # print("account",account)
        test = self.userExist(userToUpdate)
        # print(test)
        if(len(test)!=0):
            userToUpdate = test
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
    #* TODO : enlever le champ N SS dans la vue modif (on ne change pas de N SS)
    #* TODO : Ajouter le champ N SS côté admin pour l'ajout
    #* TODO : les deux champs modifiables sont la spécialité et le rôle (comboBox de choix)
    # TODO : présélectionner le role/spé actuel
    #* TODO : change in view1 select role rh = admin and agri = rh
    # TODO : création 4 comptes sur bdd : admin (creation perso), seller(vente électricité, app mobile), rh (modification role et spé), viewer (all and agri)
    # *front with array
    def __init__(self,parent=None):
        super().__init__(parent)
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'updateEmployee.ui'), self)
        # self.validateUpdateAccountBtn.clicked.connect(self.openVue3)
        self.validateUpdateAccountBtn.clicked.connect(self.updateEmployee)
        global userToUpdate,account,alreadyPress
        print("current account",account)
        print("user to update",userToUpdate)
        self.addPeopleAttributes()
        alreadyPress=0
        self.validateDeleteAccountBtn.clicked.connect(self.deleteEmployee)
        

    def openVue3(self):
        self.hide()
        Vue3 = View3(self)
        Vue3.show()

    def addPeopleAttributes(self):
        #* TODO : à décommente :
        self.addRolesList()
        self.comboBoxRoles.clear()
        # print('result',self.addRolesList())
        self.comboBoxRoles.addItems(self.addRolesList())
        self.comboBoxSpec.addItems(self.addSpecList())
        #* TODO: here!!!!
        self.rsltFirstName.setText(userToUpdate[0]['First_name'])
        self.rsltLastName.setText(userToUpdate[0]['Last_name'])
        self.rsltMail.setText(userToUpdate[0]['email'])
    
    #* TODO : à faire une boucle pour faire la liste :
    # * Basique = admin id :1, rh id:2, agriculteur id:3
    def addRolesList(self):
        link = "http://localhost:3001/roles"
        r = requests.get(link)
        # print(r.json())
        r = [r.json()]
        temp=[]
        for element in r[0]:
            # print(element['role'])
            temp.append(element['role'])
        # print("temp",temp)
        return temp
    
    def addSpecList(self):
        link = "http://localhost:3001/spec"
        r = requests.get(link)
        # print(r.json())
        r = r.json()
        print(r)
        temp=[]
        for element in r:
            # print(element['role'])
            temp.append(element['speciality_label'])
        # print("temp",temp)
        global specialities
        specialities=temp
        return temp
    
    def updateEmployee(self):
        role=self.comboBoxRoles.currentText()
        spec=self.comboBoxSpec.currentText()
        global userToUpdate,specialities
        id_target= userToUpdate[0]['Id_employee']
        match role:
            case 'rh':
                Id_Role=2
            case 'agriculteur':
                Id_Role=3
        Id_Speciality=int(specialities.index(spec))+1
        # print("id: ",id_target)
        # print("role: ",Id_Role)
        # print("spec: ",spec)
        # print("speciality target ",specialities.index(spec))

        save = {"Id_Role":str(Id_Role),"Id_Speciality":str(Id_Speciality)}
        print(save)
        self.updateEmployeeEntities(id_target,save)

        self.openVue3()

    #* TODO: en cours 
    def updateEmployeeEntities(self,id_target,new_data):
        print("id: ",id_target)
        print("data: ",new_data)
        link = "http://localhost:3001/update/{}".format(id_target)
        r = requests.put(link,json=new_data)
        # print(r.json())
        r = r.json()
        # print("r ",r)
        # TODO : vérification si l'update est bien faite
        # temp=[]
        # for element in r:
        #     # print(element['role'])
        #     temp.append(element['speciality_label'])
        # # print("temp",temp)
        # return temp
    
    def deleteEmployee(self):
        global userToUpdate, alreadyPress
        id_target= userToUpdate[0]['Id_employee']
        if alreadyPress==1:
            self.deleteEmployeeEntities(id_target)
        if alreadyPress==0:
            self.messageDeleteEmployeeEntities(id_target)
            alreadyPress=1
        
    
    def messageDeleteEmployeeEntities(self, id_emp):
        self.errorZone.setText(f'Etes vous sûr de vouloir le supprimer ? {id_emp}')
        # TODO : mettre en place une vérification de click pour savoir s'il est sûr de la suppression.
    
    def deleteEmployeeEntities(self, id_emp):
        # print("delete ",id_emp)
        link = "http://localhost:3001/delete/{}".format(id_emp)
        r = requests.delete(link)
        # print(r.json())
        r = r.json()
        print(r)
        self.openVue3()

        
    
    
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