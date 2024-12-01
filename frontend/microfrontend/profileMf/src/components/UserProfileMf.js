import React from "react";
import Header from "./Header";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

function UserProfileMf() {

    return (
        <>
            <Header></Header>
            <EditAvatarPopup></EditAvatarPopup>
            <EditProfilePopup></EditProfilePopup>
        </>
    );
}

export default UserProfileMf;
