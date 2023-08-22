import axios from "axios";
import FileSaver from "file-saver";

const URL = 'http://192.168.1.194:3334'

export class ApiDaemon {
    async decrypt(algorithm, file, key) {
        console.log('Yo you need to fill decryption my dawg')
    }
    async encrypt(algorithm, file, key) {
        console.log('You cant encrypt what you cant see')
    }
    async downloader(file, name, algorithm){
        console.log('I aint got nothing to download my guy')
    }
    dataPusher(data) {
        console.log('I apparently set the data to localStorage and apply a cookie')
    }
}
