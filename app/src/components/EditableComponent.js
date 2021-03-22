import React, {useState} from 'react';
import PropTypes from 'prop-types';

const EditableComponent = ({id, updateState, initialInputValue}) => {
    const initialEditMode = !initialInputValue.trim().length > 0
    const [editMode, setEditMode] = useState(initialEditMode);

    const changeEditMode = (value) => {
        if (value.trim().length) {
            setEditMode(prev => !prev);
        }
    }

    return (
        <div onDoubleClick={()=>changeEditMode(initialInputValue)}>
            {
                editMode
                ? <input
                        onChange={(e) => updateState(id, e.target.value)}
                        onBlur={() => changeEditMode(initialInputValue)}
                        autoFocus={true}
                        value={initialInputValue}
                        type="text"
                    />
                : initialInputValue
            }
        </div>
    );
};

EditableComponent.propTypes = {
    id: PropTypes.string.isRequired,
    updateState: PropTypes.func.isRequired,
    initialInputValue: PropTypes.func.isRequired,
}

export default EditableComponent;
