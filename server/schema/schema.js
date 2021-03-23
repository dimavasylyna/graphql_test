const { makeExecutableSchema } =  require('graphql-tools');

const typeDefs = `
    type Folder {
        id: ID
        name: String
        words: [Word]
    }
    type Word {
        id: ID
        word: String
        folder: Folder
        folderId: ID
    }
    input FolderInput {
        name: String
        id: ID   
    }
    type Query {
        getAllFolders: [Folder]
        getFolder(id: ID): Folder
        getAllWords: [Word]
        getWord(id: ID): Word
    }
    type Mutation {
        addFolder(input: FolderInput): Folder
        updateFolder(input: FolderInput): Folder
        removeFolder(id: ID): Folder
    }
`;

const folders = [
    {
        id: '124fasdrt34',
        name: 'folder1',
    },
    {
        id: '124fasdr4325t34',
        name: 'folder2',
    }
];
const words = [
    {
        id: '124gfdsg34tyg346t34t3',
        word: 'Forest',
        folderId: '124fasdrt34',
    },
    {
        id: '124gfd346t34t3',
        word: 'Train',
        folderId: '124fasdrt34',
    },
    {
        id: '12fd346t34t3',
        word: 'School',
        folderId: '124fasdrt34',
    },
    {
        id: '12ft34t3',
        word: 'Wife',
        folderId: '124fasdrt34',
    },
    {
        id: '124gfdsg34tfsdsgdsgxcyg346t34t3',
        word: 'Earth',
        folderId: '124fasdr4325t34',
    }
];

const resolvers = {
    Query: {
        getAllFolders: () => {
            return folders;
        },
        getFolder: (_, { id }) => {
            return folders.find(folder => folder.id == id);
        },
        getAllWords: () => {
            return words;
        },
        getWord: (_, { id }) => {
            return words.find(word => word.id == id);
        },
    },
    Word: {
        folder: (word) => {
            const folder = folders.find(folder => folder.id === word.folderId);
            return {
                ...folder
            }
        }
    },
    Folder: {
        words: (folder) => {
            const wordList = words.filter(word => word.folderId === folder.id);
            return wordList
        }
    },
    Mutation: {
        addFolder(_, {input}) {
            const folder = {id: input.id, name: input.name};
            folders.push(folder);
            return folder;
        },
        updateFolder(_, {input}) {
            const folder = folders.find(folder => folder.id === input.id);
            folder.name = input.name;
            return folder;
        },
        removeFolder(_, { id }) {
            const folderIndex = folders.findIndex(folder => folder.id === id);
            return folders.splice(folderIndex, 1)[0];
        },
    }
}
module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});
