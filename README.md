# kryptBookmarks
A front end webapp for handling web boomkarks from a file, with a small backend server for file encryption/decryption.

Upload bookmarks in the form of an encrypted json file, decrypt in the backend and the web app temporarily stores the unencrypted json data in localstorage with a cookie for expiry and displays a series of links.

A small project made mostly for the purposes of learning about:
- Axios and Express
- File Uploads
- Cookies
- cryptography e.g. AES encryption/decryption
- Self hosting using Docker

#React #Express #~~M~~ERN Stack

## docker installation
first create a docker image by running the following command from within the frontend/backend directory.
```
docker build -t $IMAGE_NAME .
```
once the build process is complete (and it may take a while) run the following command to launch an instance 
```
docker run -dit -p $HOST_PORT:$CONTAINER_PORT --name $CONTAINTER_NAME $IMAGE_NAME
```
The $CONTAINER_PORT for the frontend is set to 3000, and for the backend set to 3334.
