# Client Lourd :

## Objectif :

L'application sert aux rh pour recruter des nouveaux collaborateurs.

### Node :

#### DONE :

POST = "http://localhost:3001/login",{"email":str(email),"pass":str(password)}
POST = "http://localhost:3001/createaccount", {"First_name":str(firstName),"Last_name":str(lastName),"email":str(email),"pass":str(password)}
POST = "http://localhost:3001/selectone",{"email":self.updateAccountTxt.text()}
GET = "http://localhost:3001/select"
GET = "http://localhost:3001/roles"
GET = "http://localhost:3001/spec"
PUT = "http://localhost:3001/update/{}".format(id_target), {"Id_Role":str(Id_Role),"Id_Speciality":str(Id_Speciality)}
DELETE = "http://localhost:3001/delete/{}".format(id_emp)

#### TODO :

- Faire une vue administrateur

### Résumé :

Un Rh peut créer une fiche pour une personne.
Un administrateur peut créer un compte rh
Un administrateur après s'être connecté il a une vue où il peut créer un nouveau rh
Quand un administrateur se connecte il a une vue où il peut créer les rh
Les rh après s'être connecté, il peut voir la liste du personnel

## Where is folders :

old : back = D:\formation\cours\react\react_mvc_test\server
current : back = D:\formation\ibm_fil_rouge_tomjerry_all_projects\vite_filrouge\backend
front = here

## DOING :

## TO DO :

- mettre en place suite à la vérification des roles une co dif à la bdd (serveur side)
- nettoyage du code
- commenter
- ajouter des informations dans la vue tableau rh (mail, spé et role)
-

## DONE :

- faire que la connexion soit lier au rh, seul les rh ont des mdp, voir où mettre la connexion + faire l'union des tables pour connaître le job de l'employe.
- requete récupération du role et spécialité
- page où modifier (sans certaines infos)
- modifier un utilisateur
- supprimer un utilisateur
- alimenter les espaces
- liste des utilisateurs fonction
- ajouter un utilisateur
- page où ajouter
- backend [root] creation user
- modifier bdd
- page de connexion
-
