import React, { useState } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import BinarysearchInputPage from '../BinarysearchInputPage/BinarysearchInputPage';
import CustomTreePage from '../CustomTreePage/CustomTreePage';

export default () => {
    const location = useLocation();
    const [usageMode, setUsageMode] = useState(location.pathname.slice(1));
    const [customTreeRootNode, setCustomTreeRootNode] = useState(null);
    const [customTreeActiveNode, setCustomTreeActiveNode] = useState(null);
    const [customTreeSelectedType, setCustomTreeSelectedType] = useState('Binarysearch Representation');

    const [binarysearchString, setBinarysearchString] = useState('[1, [2, [4, null, null], null], [3, null, [5, null, null]]]');

    return (
        <main className="main">
            {
                !usageMode && (
                    <h2 className="heading heading--lg heading--center">Select one of these options to begin</h2>
                )
            }
            <div className="main__options">
                <Link className={`main__option ${usageMode === 'binarysearch-input' ? 'main__option--active' : ''}`} to="/binarysearch-input" onClick={(e) => setUsageMode('binarysearch-input')}>
                    <h3 className="heading heading--sm main__option-heading">Use binarysearch input</h3>
                    <p className="main__option-description">Input the array representation of the tree given by binarysearch</p>
                </Link>
                <Link className={`main__option ${usageMode === 'custom-tree' ? 'main__option--active' : ''}`} to="/custom-tree" onClick={(e) => setUsageMode('custom-tree')}>
                    <h3 className="heading heading--sm main__option-heading">Build custom tree</h3>
                    <p className="main__option-description">Create your own testcase using our UI for tree creation and subsequently copy to your clipboard.</p>
                </Link>
            </div>
            {
                location.pathname !== '' && (
                    <table className="bs__controls">
                        <thead>
                            <tr>
                                <th className="heading heading--lg bs__control-header" colSpan="3">Controls</th>
                            </tr>
                            <tr>
                                <th className="bs__control-cell"></th>
                                <th className="bs__control-cell">Desktop</th>
                                <th className="bs__control-cell">Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="bs__control-cell"><strong>Pan</strong></td>
                                <td className="bs__control-cell">Shift + Click</td>
                                <td className="bs__control-cell">Drag</td>
                            </tr>
                            <tr>
                                <td className="bs__control-cell"><strong>Zoom</strong></td>
                                 <td className="bs__control-cell">Shift + Scroll</td>
                                <td className="bs__control-cell">Pinch/Spread</td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
                <Switch>
                    <Route path="/binarysearch-input">
                        <BinarysearchInputPage treeString={binarysearchString} setTreeString={setBinarysearchString} />
                    </Route>
                    <Route path="/custom-tree">
                        <CustomTreePage 
                        rootNode={customTreeRootNode}
                        setRootNode={setCustomTreeRootNode}
                        activeNode={customTreeActiveNode}
                        setActiveNode={setCustomTreeActiveNode}
                        selectedType={customTreeSelectedType}
                        setSelectedType={setCustomTreeSelectedType} />
                    </Route>
                </Switch>

        </main>
    )
};