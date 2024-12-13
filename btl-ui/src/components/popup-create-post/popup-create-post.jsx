import React, { useState } from "react";

import "../../styles/popup-create-post/popup-create-post.css";
import { ButtonIcon } from "../button/button-icon";
import { iconXClose } from "../../assets";
import { ButtonAvatar } from "../button/button-avatar";
import { getToken, getUser } from "../../api/axios-client";
import { useForm } from "react-hook-form";
import postAPI from "../../api/post-api";
import { toast, ToastContainer } from "react-toastify";
import generalAPI from "../../api/general-api";

function PopupCreatePost(props) {
    const user = getUser();
    const tokenName = getToken();

    const { setOpen } = props;
    const handleClose = () => {
        setOpen(false);
        console.log("test");
    };

    const form = useForm({
        defaultValues: {
            text: "",
            imageUrl: [],
        },
    });
    const register = form.register;

    const handleSendPost = async () => {
        // console.log(form.getValues('text'));
        try {
            const data = {
                text: form.getValues("text"),
                imageUrl: JSON.stringify(form.getValues("imageUrl")),
            };
            const result = await postAPI.addPost(tokenName, data);
            if (result && result.status && result.status === 201) {
                toast.success("Tao bai viet moi thanh cong", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setOpen(false);
            } else {
                toast.error("Tao bai viet moi that bai", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
        form.reset();
    };

    const [previewSrc, setPreviewSrc] = useState("");

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewSrc(e.target.result);
            };
            reader.readAsDataURL(file);
            const response = await generalAPI.upload(file);
            // console.log(response.data.result.fileUrl);
            const urls = [response.data.result.fileUrl];
            console.log(urls);
            form.setValue("imageUrl", urls);
        }
    };
    // console.log(form.getValues());

    const handleUploadClick = () => {
        document.getElementById("imageUpload").click();
    };

    return (
        <div className="popup-create-post">
            <div className="popup-create-post__header">
                <div className="popup-create-post__header-title">
                    Tạo bài viết
                </div>
                <div className="popup-create-post__header-btn-close">
                    <ButtonIcon
                        onClick={handleClose}
                        icon={iconXClose}
                        size="medium"
                        variant="ghost"
                    />
                </div>
            </div>
            <div className="popup-create-post__user">
                <div className="popup-create-post__user-avatar">
                    <ButtonAvatar size={40} type="image" src={user.avatar} />
                </div>
                <div className="popup-create-post__user-name">
                    {user.first_name + " " + user.last_name}
                </div>
            </div>
            <div className="popup-create-post__content">
                <textarea
                    className="popup-create-post__content-input"
                    placeholder={`${user.last_name} oi, bạn đang nghĩ gì`}
                    form={form}
                    {...register("text")}
                />
                <div className="popup-create-post__content-preview">
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="popup-create-post__content-preview-button"
                    >
                        Thêm ảnh
                    </button>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="popup-create-post__content-preview-input"
                    />
                    {previewSrc && (
                        <img
                            id="preview"
                            src={previewSrc}
                            alt=""
                            className="popup-create-post__content-preview-image"
                        />
                    )}
                </div>
            </div>

            <div className="popup-create-post__footer">
                <div className="popup-create-post__footer-btn">
                    {/* <button className='popup-create-post__footer-btn-cancel'>Huy</button> */}
                    <button
                        className="popup-create-post__footer-btn-submit"
                        onClick={handleSendPost}
                    >
                        Đăng
                    </button>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default PopupCreatePost;
