import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem,QLineEdit
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
        self.connexionBtn.clicked.connect(self.launch)
        # *-----------------------
        self.textPass.setEchoMode(QLineEdit.Password)


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
    # Check if the account role is 'admin'
        if roleAccount == 'admin':
        # Open the admin view
            self.openVue2()
    # Check if the account role is 'rh'
        elif roleAccount == 'rh':
        # Open the HR view
            self.openVue3()
    # For any other role
        else:
        # Display an error message
            self.errorZone.setText("vous n'avez pas les droits")
    
    # * front after connexion test
    def launch(self):
        test = self.addToArray()
        if test ==True :
            self.launchView()
        if test ==False :
            self.errorZone.setText('Mail ou mdp mauvais')

    # * test connexion
    def exist(self, data):
        if 'Error' in data or data['Status'] == "erreur mot de pass" :
            return self.errorZone.setText("mauvais mot de pass et/ou mail")
        if data['Status'] == "Ok":
            # *
            global token, account,roleAccount
            token=data['token']
            account=self.textMail.toPlainText()
            if account !="testnew@mail.fr" :
                roleAccount= data['role']
            else :
                roleAccount= "admin"
            return True
        else:
            return data['message']

    # * send info 
    def addToArray(self):
        email =self.textMail.toPlainText()
        password = self.textPass.text()
        save = {"email":str(email),"pass":str(password)}
        req = self.add_to_bdd(save)
        return self.exist(req)

    #  * connexion to api
    def add_to_bdd(self,new_data):
        link = "http://localhost:3001/login"
        r=requests.post(link,json=new_data)
        r =r.json()   
        return r
class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'createCoToApiPhp.ui'), self)
        self.signupBtn.clicked.connect(self.addToArray)
        
        self.textPass.setEchoMode(QLineEdit.Password)
        self.textPassConfirm.setEchoMode(QLineEdit.Password)
        # TODO : à décommente :
        self.addRolesList()
        self.comboBoxRoles.clear()
        self.comboBoxRoles.addItems(self.addRolesList())


     # TODO : à faire une boucle pour faire la liste :
    # * Basique = admin id :1, rh id:2, agriculteur id:3
    def addRolesList(self):
        link = "http://localhost:3001/roles"
        r = requests.get(link)
        r = [r.json()]
        temp=[]
        for element in r[0]:
            temp.append(element['role'])
        return temp
    
    # *test infos equality

    def addToArray(self):
        firstName =self.textFirstName.toPlainText()
        lastName =self.textLastName.toPlainText()
        nss=self.textNss.toPlainText()
        role=self.comboBoxRoles.currentText()
        email =self.textMail.toPlainText()
        password = self.textPass.text()
        passConfirm=self.textPassConfirm.text()
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
        self.updateAccountBtn.clicked.connect(self.openVue4)

    def openVue4(self):
        global userToUpdate
        userToUpdate = {"email":self.updateAccountTxt.text()}

        if account==userToUpdate['email']:
            return self.errorZone.setText('On ne peut pas se modifier soit même.')
        test = self.userExist(userToUpdate)
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
        return r.json()   
    
    # *fill the array
    def qtableFromArray(self, querry, qtable):
        nbRow = len(querry)
        nbCol = len(querry[0])
        qtable.setRowCount(nbRow)
        qtable.setColumnCount(nbCol)
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
        for row in results :
            product = dict(name = row['First_name'],mail=row['email'],role=row['role'])
            array.append(product)
        product_list = {"data":array}
        return product_list        

class View4(QtWidgets.QMainWindow):
    def __init__(self,parent=None):
        super().__init__(parent)
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'updateEmployee.ui'), self)
        self.validateUpdateAccountBtn.clicked.connect(self.updateEmployee)
        global userToUpdate,account,alreadyPress
        self.addPeopleAttributes()
        alreadyPress=0
        self.validateDeleteAccountBtn.clicked.connect(self.deleteEmployee)
        

    def openVue3(self):
        self.hide()
        Vue3 = View3(self)
        Vue3.show()

    def addPeopleAttributes(self):
        self.addRolesList()
        self.comboBoxRoles.clear()
        self.comboBoxRoles.addItems(self.addRolesList())
        self.comboBoxSpec.addItems(self.addSpecList())

        self.rsltFirstName.setText(userToUpdate[0]['First_name'])
        self.rsltLastName.setText(userToUpdate[0]['Last_name'])
        self.rsltMail.setText(userToUpdate[0]['email'])
    
    def addRolesList(self):
        link = "http://localhost:3001/roles"
        r = requests.get(link)
        r = [r.json()]
        temp=[]
        for element in r[0]:
            temp.append(element['role'])
        return temp
    
    def addSpecList(self):
        link = "http://localhost:3001/spec"
        r = requests.get(link)
        r = r.json()
        temp=[]
        for element in r:
            temp.append(element['speciality_label'])
        global specialities
        specialities=temp
        return temp
    
    def updateEmployee(self):
        role=self.comboBoxRoles.currentText()
        spec=self.comboBoxSpec.currentText()
        global userToUpdate,specialities
        id_target= userToUpdate[0]['Id_employee']
        match role:
            case 'admin':
                Id_Role=1
            case 'rh':
                Id_Role=2
            case 'agriculteur':
                Id_Role=3
        Id_Speciality=int(specialities.index(spec))+1

        save = {"Id_Role":str(Id_Role),"Id_Speciality":str(Id_Speciality)}
        self.updateEmployeeEntities(id_target,save)

        self.openVue3()


    def updateEmployeeEntities(self,id_target,new_data):
        link = "http://localhost:3001/update/{}".format(id_target)
        r = requests.put(link,json=new_data)
        r = r.json()

    
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
    
    def deleteEmployeeEntities(self, id_emp):
        try:
            id_target =int(id_emp)
            link = "http://localhost:3001/delete/{}".format(id_target)
            r = requests.delete(link)
            r = r.json()
            self.openVue3()
        except:
            self.errorZone.setText('Probléme de connexion.')

# *launch the first view 
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())