import sys
from PyQt5 import uic, QtWidgets
from PyQt5.QtWidgets import QTableWidgetItem
from PyQt5.QtCore import QDate, Qt,QTime
import requests
import os

class View1(QtWidgets.QMainWindow):
    #* get products from bdd
    def getProducts(self):
        product_list = dict()
        response = requests.get("http://127.0.0.1:8000/products/")
        results = response.json()
        # *get data on format [[1,"xxx",...],...]
        for row in results :
            product_list[row[1]]=row[2]
        return product_list
    
    def __init__(self):
        super().__init__()
        # *target location of the file
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'selectionProduit.ui'), self)
        self.btnTot.clicked.connect(self.openVue2)
        # *add items to combobox from bdd
        for key,val in self.getProducts().items():
            self.productChoice.addItem(str(key))
            
        self.btnAdd.clicked.connect(self.calculPrice)
        self.btnAdd.clicked.connect(self.addToArray)

    def openVue2(self):
        self.hide()
        Vue2 = View2(self)
        Vue2.show()

    def calculPrice(self):
        quantity =int(self.quantityChoice.value())
        price = self.getProducts()[self.productChoice.currentText()]
        priceTot= quantity*price
        self.priceTot.setText(str(priceTot))

    def addToArray(self):
        quantity =int(self.quantityChoice.value())
        product =self.productChoice.currentText()
        now = QDate.currentDate()
        time = QTime.currentTime()
        # *just current
        price =int(self.priceTot.toPlainText())
        # *data to post for bdd
        save = {"date":now.toString('d.M.yy'),"time":time.toString('h.m.s'),"product":product,"quantity":quantity,"price":price}
        self.add_to_bdd(save)

    def add_to_bdd(self,new_data):
        # *send data in json format
        r=requests.post("http://127.0.0.1:8000/addcommand",json=new_data)    

class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi(os.path.join(os.path.dirname(__file__), 'viewProduits.ui'), self)
        # *fill the array with data from api
        self.qtableFromArray(self.getCommands(),self.tableProducts)
        # *extract sum of commands' prices
        self.totCommands.setText(str(self.calculPriceTot(self.getCommands())))

    def getCommands(self):
        response = requests.get("http://127.0.0.1:8000/commands/")
        results = response.json()
        return results
    
    def qtableFromArray(self, querry, qtable):
        nbRow = len(querry)
        # *line 74 and 79 -1 and j+1 to delete index of bdd
        nbCol = len(querry[0])-1
        qtable.setRowCount(nbRow)
        qtable.setColumnCount(nbCol)
        for i in range(nbRow):
            for j in range(nbCol):
                # * fill case by case
                qtable.setItem(i,j,QTableWidgetItem(str(querry[i][j+1])))

    def calculPriceTot(self,dict):
        price=0
        nbRow = len(dict)
        for i in range(nbRow):
            price = price+dict[i][5]
        return price
# *launch the first view 
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())