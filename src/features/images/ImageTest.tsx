import axios from "axios";
import React, { useState } from "react";

const ImageTest: React.FC = () => {
    /* ================ IMAGE UPLOAD ===================== */
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])

            /* ========= PREVIEW ========= */
            const file = e.target.files[0]
            console.log(file)
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
            /* ======== PREVIEW ============ */
            
        }
    }
    const handleAvatarUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(!selectedFile) {
            alert('please select an image file')
            return
        }

        const formData = new FormData()
        formData.append('avatar', selectedFile)
        const userId = `668e2ab1aa4fdce67c404230`

        try {
            const res = await axios.post(`http://localhost:8000/uploads/avatars/modify/${userId}`, formData, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log("error uploading file" + error)
            alert(`Error uploading file`)
        }
    }
    /* ================ IMAGE UPLOAD ===================== */





    
    return (
    <div>
        <h1>Multer Image Upload Example</h1>
        <form
            //ref="uploadForm"
            id="uploadForm"
            action="/upload"
            method="post"   
            encType="multipart/form-data"
            onSubmit={handleAvatarUpload}
        >
            <input type="file" name="avatars" onChange={handleFileChange} />
            <input type="submit" value="Upload!" />
        </form>
        <img src={preview!} alt="" className="profile-pic"/>
    </div>
    );
    };

export default ImageTest;
