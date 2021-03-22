import {useState} from "react";

export const useEditMode = (initialInputValue) => {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(initialInputValue);
    const changeEditMode = () => {
        setEditMode(prev => !prev);
    }

    return {
        editMode,
        inputValue,
        setInputValue,
        changeEditMode
    }
}
