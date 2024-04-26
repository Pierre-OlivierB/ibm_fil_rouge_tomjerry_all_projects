cd ./Documents/client_lourd/test_un

activate pyqt

python app_produit.py

designer

/------------------------

run api
uvicorn main:app--reload

/------------------------

build exe :
pyinstaller app_produits.py --noconsole --add-data "selectionProduit.ui;." --add-data "viewProduits.ui;." --onefile --name firstapp --noconfirm

Problems encounter:
NEED to add -> for both file joined
os.path.join(os.path.dirname(__file__),...)

uic.loadUi(os.path.join(os.path.dirname(__file__), 'selectionProduit.ui'), self)

