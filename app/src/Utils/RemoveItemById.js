export  const removeItemByIdAndUpdate = (id, list, setState) => {
    const newWordList = list.filter(word => word.id !== id);
    setState(newWordList);
}
