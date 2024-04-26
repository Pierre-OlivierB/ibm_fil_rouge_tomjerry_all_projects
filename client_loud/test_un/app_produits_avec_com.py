import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem
from PyQt5.QtCore import QDate, Qt,QTime
import json

class View1(QtWidgets.QMainWindow):
    # cart={}
    save=[]
    # *----------------
    # *Date
    # now = QDate.currentDate()
    # print(now.toString('d.M.yy'))
    # time = QTime.currentTime()
    # print(time.toString('h.m.s'))
    # *----------------

    def calculProductList(self):
        product_list = {'iPhone x':870, 'Galaxy S10': 765, 'Huawei P30': 670} 
        return product_list
    
    def __init__(self):
        super().__init__()
        uic.loadUi('selectionProduit.ui', self)
        self.btnTot.clicked.connect(self.openVue2)

        #Done : display choices
        # self.productChoice=QtWidgets.QComboBox()
        # self.productChoice.setObjectName("productChoice")
        for key,val in self.calculProductList().items():
            # print(val)
            self.productChoice.addItem(str(key))
            
        # *-----------------
        # *Add test
        # self.quantityChoice.currentText()
        # price = self.calculProductList()[self.productChoice.currentText()]

        self.btnAdd.clicked.connect(self.calculPrice)
        self.btnAdd.clicked.connect(self.addToArray)
        # *fin add
        # *-----------------

    def openVue2(self):
        self.hide()
        Vue2 = View2(self)
        Vue2.show()
# * function for current calcule
    def calculPrice(self):
        #target =
        quantity =int(self.quantityChoice.value())
        price = self.calculProductList()[self.productChoice.currentText()]
        priceTot= quantity*price
        self.priceTot.setText(str(priceTot))
    
    def addToArray(self):
        quantity =int(self.quantityChoice.value())
        product =self.productChoice.currentText()
        now = QDate.currentDate()
        # print(now.toString('d.M.yy'))
        time = QTime.currentTime()
        # print(time.toString('h.m.s'))
        # *just current
        #self.save.append([now.toString('d.M.yy'),time.toString('h.m.s'),product,quantity])
        price =int(self.priceTot.toPlainText())
        save = {"date":now.toString('d.M.yy'),"time":time.toString('h.m.s'),"product":product,"quantity":quantity,"price":price}
        #print(self.save)
        print(save)
        self.write_json(save)
        # cart[self.productChoice.currentText()]=quantity

        #with open('bdd_products.json', 'r+', encoding='utf-8') as f:
            #json.dump(save, f, ensure_ascii=False, indent=4)
        # with open('bdd_products.json', 'r') as openfile:
 
        # # Reading from json file
        #     json_save = json.load(openfile)
 
        # print(json_save)
          # First we load existing data into a dict.
          
        # with open('bdd_products.json','r+') as file:
        #   # First we load existing data into a dict.
        #     file_data = json.load(file)
        # # Join new_data with file_data inside emp_details
        #     file_data["bdd_products"].append(save)
        # # Sets file's current position at offset.
        #     file.seek(0)
        # # convert back to json.
        #     json.dump(file_data, file, indent = 4)
    def write_json(self,new_data, filename='bdd_products.json'):
        with open(filename,'r+') as file:
            # First we load existing data into a dict.
            file_data = json.load(file)
            # Join new_data with file_data inside emp_details
            file_data["bdd_products"].append(new_data)
            # Sets file's current position at offset.
            file.seek(0)
            # convert back to json.
            json.dump(file_data, file, indent = 4)


# !--------------------------------------
class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi('viewProduits.ui', self)
        #print(self.save)
        with open('bdd_products.json', 'r') as openfile:
 
        # Reading from json file
            json_save = json.load(openfile)
 
        # print(json_save)
        self.qtableFromArray(json_save,self.tableProducts)
        self.totCommands.setText(str(self.calculPriceTot(json_save)))
        #self.btnRetour.clicked.connect(self.retourVue1)
    # def retourVue1(self):
    #     self.parent().show()
    #     self.close()
    # !----------------------------
    # done : set Object to Array =>
    def qtableFromArray(self, dict, qtable):
        nbRow = len(dict["bdd_products"])
        nbCol = len(dict["bdd_products"][0])
        # print(type(nbRow),type(nbCol))
        qtable.setRowCount(nbRow)
        qtable.setColumnCount(nbCol)
        for i in range(nbRow):
            for j, (key,value) in enumerate(dict["bdd_products"][i].items()):
                # print(i,j,key,value)
                # print(type(j[1]))
                # print(dict["bdd_products"][i].items())
                qtable.setItem(i,j,QTableWidgetItem(str(value)))
                # qtable.setItem(i,j,QTableWidgetItem(str(dict["bdd_products"][j])))
    # !----------------------------
    def calculPriceTot(self,dict):
        price=0
        nbRow = len(dict["bdd_products"])
        for i in range(nbRow):
            for j, (key,value) in enumerate(dict["bdd_products"][i].items()):
                if key=="price":
                    price = price+value
        return price



if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())