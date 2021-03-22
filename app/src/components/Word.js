import React from 'react';
import EditableComponent from "./EditableComponent";
import PropTypes from 'prop-types';

const Word = ({word, updateWord, removeWord, id}) => {

    return (
        <div style={{marginLeft: '30px'}}>
            <EditableComponent id={id} initialInputValue={word} updateState={updateWord} />
            <span>
                <button onClick={()=>removeWord(id)}>X</button>
            </span>
        </div>
    );
};

Word.propTypes = {
    id: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
    updateWord: PropTypes.func.isRequired,
    removeWord: PropTypes.func.isRequired,
}

export default Word;
