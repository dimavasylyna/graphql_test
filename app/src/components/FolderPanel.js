import React, {useState} from 'react';
import Folder from "./Folder";
import {removeItemByIdAndUpdate} from "../Utils/RemoveItemById";

const FolderPanel = () => {
    const initialStateFolders = [
        {
            id: '124fasdrt34',
            name: 'folder1',
        },
        {
            id: '124fasdr4325t34',
            name: 'folder2',
        }
    ];

    const [folderList, setFolderList] = useState(initialStateFolders);

    const removeFolder = (folderId) => {
        removeItemByIdAndUpdate(folderId, folderList, setFolderList);
    }
    const addNewFolder = () => {
        setFolderList(prev => {
            return [
                ...prev,
                { id: Date.now(), name: '' },
            ]
        });
    }
    const updateFolder = (id, newValue) => {
        const targetItem = folderList.find(folder => folder.id === id);
        targetItem.name = newValue;
        const withoutTargetItemList = folderList.filter(folder => folder.id !== id);
        setFolderList(() => [
            ...withoutTargetItemList,
            targetItem
        ]);
    }
    return (
        <div>
            {
                folderList.map(folder => (
                    <Folder
                        removeFolder={removeFolder}
                        key={folder.id}
                        id={folder.id}
                        name={folder.name}
                        updateFolder={updateFolder}
                    />
                ))
            }
            <button onClick={addNewFolder}>Create folder</button>
        </div>
    );
};

export default FolderPanel;
