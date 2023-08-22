import { useState } from "react"

import FileSubmitter from "./fileSumbitter"

export default function ToDecrypt(props){
    const [formData, setFormData] = useState('')
    console.log(formData)
    return (
        <FileSubmitter data={(formData) => setFormData(formData)}/>
    )
}
