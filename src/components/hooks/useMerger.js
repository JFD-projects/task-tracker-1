export const useMerger = (parents, children, fieldName, childProp, parentProp) => {
    return parents.map(parent => ({
            ...parent,
            [fieldName]: children.filter(child => child[childProp] === parent[parentProp])
        })
    )
}