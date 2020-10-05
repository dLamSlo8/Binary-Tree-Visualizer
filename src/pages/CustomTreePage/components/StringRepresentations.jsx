import React, { useState, useCallback, useEffect } from 'react';
import { nodeToString, preOrderTraversal, inOrderTraversal, postOrderTraversal, levelOrderTraversal } from '../../../functions/tree';
import Dropdown from '../../../components/Dropdown';

export default React.memo(({ rootNode }) => {
    const [selectedType, setSelectedType] = useState('Binarysearch Representation');
    const [stringRepr, setStringRepr] = useState('');
    
    const handleTypeChange = useCallback((e) => {
        setSelectedType(e.target.value);
    }, []);

    const handleCopyClipboard = (e) => {
        navigator.clipboard.writeText(stringRepr);
    }

    useEffect(() => { // Dynamically update string representation based on selected type

        if (rootNode) {
            switch (selectedType) {
                case 'Binarysearch Representation':
                    console.log(nodeToString(rootNode));
                    setStringRepr(nodeToString(rootNode));
                    break;
                case 'Preorder Traversal':
                    setStringRepr(preOrderTraversal(rootNode));
                    break;
                case 'Inorder Traversal':
                    setStringRepr(inOrderTraversal(rootNode));
                    break;
                case 'Postorder Traversal':
                    setStringRepr(postOrderTraversal(rootNode));
                    break;
                case 'Level-order Traversal':
                    setStringRepr(levelOrderTraversal(rootNode));
                    break;
                default:
                    break;
            }
        }
        else {
            setStringRepr('N/A');
        }
    }, [rootNode, selectedType]);

    return (
        <section className="ct-actions__string-section">
            <h4 className="heading heading--center heading--reset">String Representations</h4>
            <Dropdown 
            name="type"
            options={[
                'Binarysearch Representation',
                'Preorder Traversal',
                'Inorder Traversal',
                'Postorder Traversal',
                'Level-order Traversal'
            ]}
            optionTitleEq
            valueRef={selectedType}
            handleChange={handleTypeChange}
            rootClass="dropdown--full dropdown--space-t" />
            <p className="ct-actions__bs-string">{stringRepr}</p>
            <button className={`button button--full ${!rootNode ? 'button--disabled' : ''}`} type="button" disabled={!rootNode} onClick={handleCopyClipboard}>Copy to clipboard</button>
        </section>
    )
});