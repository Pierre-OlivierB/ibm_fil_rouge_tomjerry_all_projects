import sys
from PyQt5 import uic, QtWidgets

class View1(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        uic.loadUi('view1.ui', self)
        self.btnValid.clicked.connect(self.openVue2)
    def openVue2(self):
        self.hide()
        Vue2 = View2(self)
        Vue2.show()
class View2(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        uic.loadUi('view2.ui', self)
        self.btnRetour.clicked.connect(self.retourVue1)
    def retourVue1(self):
        self.parent().show()
        self.close()

if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    window = View1()
    window.show()
    sys.exit(app.exec_())