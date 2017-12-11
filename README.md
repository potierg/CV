# My website

## Installer Node JS
* Windows : http://nodejs.org/download/
* Mac : http://nodejs.org/download/
* Ubuntu 14.04 (pour autre version linux : [Documentation Node Linux](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))

Unix :

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
sudo apt-get install nodejs
```

## Compiler le frontend

### Installation des dependances

```sh
npm install
```

### Semantic option
Vous pouvez choisir l'option proposer par défaut, nous utilisons uniquement le dossier dans `node_module`.

### Lancer le frontend

```sh
gulp init
gulp serve
```

## Compiler le backend (api linkedin)

### Installation des dependance
* Composer : https://getcomposer.org/

```
composer install
```

### Configuration

- Déplacer ".env_config.sample" vers ".env_config"
- Ouvrir le fichier
- Compléter "LINKEDIN_ID" et "LINKEDIN_SECRET"
- Enregister

### Lancer le backend

```sh
gulp backend
```

### NOTE 

N'oubliez pas d'ajouter la ligne ci-dessous dans php.ini
```
curl.cainfo = "%YOUR_PATH%\cacert.pem"
```
Fichier à placer dans le dossier php -> https://curl.haxx.se/ca/cacert.pem
Source -> https://github.com/Happyr/LinkedIn-API-client/issues/139

### Exporter le CV en PDF

Après la commande ci-dessous, le fichier pdf se trouvera dans le dossier "export"
```
gulp export
```