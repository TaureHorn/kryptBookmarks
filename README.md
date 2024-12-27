# kryptBookmarks
A front end webapp for handling web boomkarks from a file, with a small backend server for file encryption/decryption. Upload bookmarks in the form of an encrypted json file, decrypt in the backend and the web app temporarily stores the unencrypted json data in localstorage with a cookie for expiry and displays a series of links.

A small project made mostly for the purposes of learning about:
- Axios and Express
- Local only file storage
- Cookies
- File Uploads
- cryptography e.g. AES encryption/decryption
- Self hosting using Docker
- Fuzzy search (fuse.js)
- Image >> Base64 string converstion

This a complete re-write of an earlier project. One much less stable or polished.
#React #Express #~~M~~ERN Stack

### screenshot
![screenshot](https://raw.githubusercontent.com/TaureHorn/kryptBookmarks/main/krypt-frontend/src/resources/screenshot.jpg)
ymmv with the background. Out of the box it's plain black, but you can upload your own image (~5MB or lower) for the background and it'll stay in localStorage. 

### .env
The site needs a couple of variables in order to function. Add a .env file in the root folder of the frontend and add the following variables
```
REACT_APP_BACKEND_URL= // add the url for the backend --> used when conneting over https
REACT_APP_BACKEND_LOCAL_URL= // add the url for the backend --> used when connecting over http
REACT_APP_COOKIE_EXPIRY= // a number for how many days before a stored cookie expires
```
 
### docker installation
first create a docker image by running the following command from within the frontend/backend directory.
```
docker build -t $IMAGE_NAME .
```
once the build process is complete (and it may take a while) run the following command to launch an instance 
```
docker run -dit -p $HOST_PORT:$CONTAINER_PORT --name $CONTAINTER_NAME $IMAGE_NAME
```
Out of the box, the $CONTAINER_PORT for the frontend is set to 3000, and for the backend set to 3334. Though you can set it to whatever you like.
