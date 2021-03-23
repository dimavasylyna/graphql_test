import React from 'react';
import Folder from "./Folder";
import {useQuery} from "@apollo/client";
import {gql, useMutation} from '@apollo/client';

const query = gql`
    query {
        getAllFolders {
            id
            name
        }
    }
`;

const ADD_FOLDER = gql`
    mutation ($input: FolderInput) {
        addFolder(input: $input) {
            id
            name
        }
    }
`;
const UPDATE_FOLDER = gql`
    mutation ($input: FolderInput) {
        updateFolder(input: $input) {
            id
            name
        }
    }
`;
const REMOVE_FOLDER = gql`
    mutation ($id: ID) {
        removeFolder(id: $id) {
            id
        }
    }
`;

const FolderPanel = () => {

    const { data, loading } = useQuery(query);

    const [addFolder] = useMutation(ADD_FOLDER);
    const [updateFolder] = useMutation(UPDATE_FOLDER);
    const [removeFolder] = useMutation(REMOVE_FOLDER);

    const removeFolderHandler = (folderId) => {
        console.log(folderId)
        // removeItemByIdAndUpdate(folderId, folderList, setFolderList);
        removeFolder({
            variables: {
                id: folderId
            }
        });
    }
    const addNewFolder = () => {
        addFolder({
            variables: {
                    input: {
                        id: Date.now(),
                        name: ''
                    }
                }
            });
    }
    const updateFolderHandler = (id, newValue) => {
        console.log(id, newValue)
        updateFolder({
            variables: {
                input: {
                    id: id,
                    name: newValue
                }
            }
        });
    }
    return (
        <div>
            {
                loading
                    ? <h2>loading...</h2>
                    : (
                        data.getAllFolders.map(folder => (
                            <Folder
                                removeFolder={removeFolderHandler}
                                key={folder.id}
                                id={folder.id}
                                name={folder.name}
                                updateFolder={updateFolderHandler}
                            />
                        ))
                    )
            }
            <button onClick={addNewFolder}>Create folder</button>
        </div>
    );
};

export default FolderPanel;
