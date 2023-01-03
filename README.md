# ProjetWeb-Master-2-IWOCS
On cherche à développer une application Web avec des composants graphiques avancés capables d’afficher les données relatives aux ventes immobilières en France.


## installation

1. git clone
2. cd ProjetWeb-Master-2-IWOCS/Back-End/
3. composer install
4. php bin/console doctrine:database:create
5. php bin/console make:migration
6. php bin/console doctrine:database:migrate
	or
	php bin/console doctrine:migrations:migrate
7. mkdir data
8. copy ```valeursfoncieres-2020.txt``` dans le dossier data
9. php bin/console app:landValue:populate
10. Un fichier data.sql est généré. peupler votre base de donnée avec.

### Swagger
localhost:8000/api

### Error 
Si vous avez des erreurs de memoire. Augmenter la limit dans votre php.ini

```memory_limit = 1024M```

Relancer le serveur
# ProjetWeb-Master-2-IWOCS-main
