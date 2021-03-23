import React from 'react';
import Word from "./Word";
import EditableComponent from "./EditableComponent";
import PropTypes from 'prop-types';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client";

const query = gql`
    query($id: ID!) {
        getFolder(id: $id) {
            id
            words {
                word
                id
            }
        }
    }
`;

const Folder = ({name, id, removeFolder, updateFolder}) => {
    // const allWords = [
    //     {
    //         id: '124gfdsg34tyg346t34t3',
    //         word: 'Forest',
    //         folderId: '124fasdrt34',
    //     },
    //     {
    //         id: '124gfd346t34t3',
    //         word: 'Train',
    //         folderId: '124fasdrt34',
    //     },
    //     {
    //         id: '12fd346t34t3',
    //         word: 'School',
    //         folderId: '124fasdrt34',
    //     },
    //     {
    //         id: '12ft34t3',
    //         word: 'Wife',
    //         folderId: '124fasdrt34',
    //     },
    //     {
    //         id: '124gfdsg34tfsdsgdsgxcyg346t34t3',
    //         word: 'Earth',
    //         folderId: '124fasdr4325t34',
    //     }
    // ];

    const { data, loading } = useQuery(query, {
        variables: {
            id: id
        }
    });
    console.log(data, loading, id);

    // const getWordList = (folderId) => {
    //     console.log(folderId)
    //     return allWords.filter(word=>word.folderId === folderId)
    // }
    // const filteredWords = getWordList(id);

    // const [wordList, setWordList] = useState(filteredWords);

    const removeWord = (wordId) => {
        console.log(wordId)
        // removeItemByIdAndUpdate(wordId, wordList, setWordList);
    }
    const addNewWord = () => {
        // setWordList(prev => {
        //     return [
        //         {id: Date.now(), word: '', folderId: id},
        //         ...prev,
        //     ]
        // });
    }
    const updateWord = (id, newValue) => {
        console.log(id, newValue)
        // const targetItem = wordList.find(word => word.id === id);
        // targetItem.word = newValue;
        // const withoutTargetItemList = wordList.filter(word => word.id !== id);
        // setWordList(() => [
        //     ...withoutTargetItemList,
        //         targetItem
        // ]);
    }
    return (
        <div>
            <EditableComponent id={id} initialInputValue={name} updateState={updateFolder} />
            <span>
                <button onClick={addNewWord}>Add word</button>
                <button onClick={() => removeFolder(id)}>X</button>
            </span>
            {
                loading
                    ? <h2>loading...</h2>
                    : (
                        data.getFolder.words.map(wordItem => (
                            <Word
                                removeWord={removeWord}
                                key={wordItem.id}
                                id={wordItem.id}
                                word={wordItem.word}
                                updateWord={updateWord}
                            />
                        ))
                    )
            }
        </div>
    );
};

Folder.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    removeFolder: PropTypes.func.isRequired,
    updateFolder: PropTypes.func.isRequired,
}

export default Folder;
