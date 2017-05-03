import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { toggleExpandedForAll } from '../../index';
import styles from './stylesheets/app.scss';
import '../shared/favicon/apple-touch-icon.png';
import '../shared/favicon/favicon-16x16.png';
import '../shared/favicon/favicon-32x32.png';
import '../shared/favicon/favicon.ico';
import '../shared/favicon/safari-pinned-tab.svg';
import {replaceNodeWithNew, walk, map} from '../../utils/tree-data-utils';
import Button from 'react-toolbox/lib/button/Button';
import Dropdown from 'react-simple-dropdown';
import { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const maxDepth = 5;

class App extends Component {
    constructor(props) {
        super(props);

        const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

        this.state = {
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            activeNodeCopied: false,
            actualNodeSelected: false,
            treeData: [
                {
                    id: 1,
                    title: 'Pistoia',
                    subtitle: 'Piccolo Comune',
                    tipo: 'ramo',
                    incomplete: false,
                    notMovable: true,
                    expanded: false,
                    children: [
                        {
                            id: 11,
                            title: 'Chiesina Uzzanese',
                            subtitle: 'Shit',
                        },
                        {
                            id: 12,
                            title: 'Ponte Buggianese',
                            subtitle: (
                                <span>
                                    The tree uses&nbsp;
                                    <a href="https://github.com/bvaughn/react-virtualized">
                                        react-virtualized
                                    </a>
                                    &nbsp;and the relationship lines are more of a visual trick.
                                </span>
                            ),
                        },
                    ],
                },
                {
                    id: 2,
                    expanded: false,
                    incomplete: true,
                    title: 'Prato',
                    children: [
                        {
                            id: 21,
                            expanded: true,
                            title: 'Dupalle',
                            children: [
                                {
                                    id: 211,
                                    title: 'Egg',
                                    complete: false,
                                    expanded: true
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 3,
                    title: 'Button(s) can be added to the node',
                    subtitle: 'Node info is passed when generating so you can use it in your onClick handler',
                },
                {
                    id: 4,
                    title: 'Show node children by setting `expanded`',
                    subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
                    children: [
                        {
                            id: 41,
                            title: 'Bruce',
                            subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
                            children: [
                                {
                                    id: 411,
                                    title: 'Bruce Jr.'
                                },
                                {
                                    id: 412,
                                    title: 'Brucette'
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 5,
                    title: 'Advanced',
                    subtitle: 'Settings, behavior, etc.',
                    expanded: false,
                    children: [
                        {
                            id: 51,
                            title: (
                                <div>
                                    <div
                                        style={{
                                            backgroundColor: 'gray',
                                            display: 'inline-block',
                                            borderRadius: 10,
                                            color: '#FFF',
                                            padding: '0 5px',
                                        }}
                                    >
                                        Any Component
                                    </div>

                                    &nbsp;can be used for `title`
                                </div>
                            ),
                        },
                        {
                            id: 52,
                            expanded: true,
                            title: 'Limit nesting with `maxDepth`',
                            subtitle: `It's set to ${maxDepth} for this example`,
                            children: [
                                {
                                    id: 521,
                                    expanded: true,
                                    title: renderDepthTitle,
                                    children: [
                                        {
                                            id: 5211,
                                            expanded: true,
                                            title: renderDepthTitle,
                                            children: [
                                                {
                                                    id: 52111,
                                                    title: renderDepthTitle
                                                },
                                                {
                                                    id: 52112,
                                                    title: ({ path }) => (path.length >= maxDepth ?
                                                        'This cannot be dragged deeper' :
                                                        'This can be dragged deeper'
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            title: 'Disable dragging on a per-node basis with the `canDrag` prop',
                            subtitle: 'Or set it to false to disable all dragging.',
                            noDragging: true,
                        },
                        {
                            title: 'You cannot give this children',
                            subtitle: 'Dropping is prevented via the `canDrop` API using `nextParent`',
                            noChildren: true,
                        },
                        {
                            title: 'When node contents are really long, it will cause a horizontal scrollbar' +
                                ' to appear. Deeply nested elements will also trigger the scrollbar.',
                        },
                    ],
                },
            ],
        };

        this.updateTreeData = this.updateTreeData.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.getResultTree = this.getResultTree.bind(this);
    }

    updateTreeData(treeData) {
        //  console.log('updateTreeData', treeData);
        this.setState({ treeData });
    }

    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    getResultTree() {
        //this.getResultTree(false);
    }

    replaceChildrenIntoNode(nodeInfo) {
        const tempObj = {
            id: 9999,
            title: (
                <div>
                    <div
                        style={{
                            backgroundColor: 'gray',
                            display: 'inline-block',
                            borderRadius: 10,
                            color: '#FFF',
                            padding: '0 5px',
                        }}
                    >
                        Neww Component
                    </div>
                </div>
            ),
            children: [
                {
                    id: 52113,
                    expanded: true,
                    title: 'Prova',
                    children: [
                        {
                            id: 52111,
                            title: 'Prova 2'
                        }
                    ],
                },{
                    id: 521123,
                    title: ({ path }) => (path.length >= maxDepth ?
                            'This cannot be dragged deeper' :
                            'This can be dragged deeper'
                    ),
                }
            ]
        };

        let key = nodeInfo.path || null;

        if (!nodeInfo.path[nodeInfo.path.length - 2]) {
            key = null;
        } else {
            key = nodeInfo.path[nodeInfo.path.length - 2];
        }

        const newTree = replaceNodeWithNew({
            treeData: this.state.treeData,
            newNode: tempObj,
            parentKey: key,
            expandParent: true,
            getNodeKey: ({ node }) => node.id
        });

        this.setState({
            treeData: newTree.treeData
        });
    }

    recreateTree(newTree) {
        let treeData = newTree.treeData,
            tree = map({
                treeData,
                callback: ({node}) => node.id,
                getNodeKey: ({node}) => {
                    console.log('walk', node);
                    return {...node};
                },
                ignoreCollapsed: false,
            });

        this.setState({
            treeData: newTree.treeData
        });
    }

    /**
     * Setto la proprietà dello stato "activeNodeCopied"
     *
     * @param nodeInfo
     */
    copyNode(nodeInfo) {
        this.setState({
            activeNodeCopied: nodeInfo
        });
    }

    /**
     * Incollo il nodo che si trova in this.state.activeNodeCopied come figlio
     *
     * @param nodeInfo
     */
    pasteNodeAsChild(nodeInfo) {
        const tempObj = this.state.activeNodeCopied;

        let key = nodeInfo.path || null;

        const newTree = replaceNodeWithNew({
                treeData: this.state.treeData,
                newNode: tempObj.node,
                parentKey: nodeInfo.node.id,
                expandParent: true,
                getNodeKey: ({ node }) => node.id
            });

        this.setState({
            treeData: newTree.treeData
        });

        //this.recreateTree(newTree);
    }

    /**
     * Incollo il nodo che si trova in this.state.activeNodeCopied come fratello
     * e quindi allo stesso livello
     *
     * @param nodeInfo
     */
    pasteNodeAsSibling(nodeInfo) {
        const tempObj = this.state.activeNodeCopied;

        let key = nodeInfo.path || null;

        const newTree = replaceNodeWithNew({
            treeData: this.state.treeData,
            newNode: tempObj.node,
            parentKey: nodeInfo.node.id,
            expandParent: true,
            getNodeKey: ({ node }) => node.id
        });

        this.setState({
            treeData: newTree.treeData
        });

        //this.recreateTree(newTree);
    }

    /**
     * Inserisco un nuovo figlio aprendo un modal
     *
     * @param nodeInfo
     */
    insertNodeAsChild(nodeInfo) {
        console.log('insertNodeAsChild');
    }

    /**
     * Inserisco un nuovo fratello aprendo un modal
     *
     * @param nodeInfo
     */
    insertNodeAsSibling(nodeInfo) {
        console.log('insertNodeAsSibling');
    }

    /**
     * Setta nello state il nodo selezionato
     * mettendo dentro "actualNodeSelected" l'oggetto
     * @param nodeInfo
     */
    selectNode(nodeInfo) {
        this.setState({
            actualNodeSelected: nodeInfo
        });
    }

    /**
     * Quando espando un nodo controllo la proprietà incomplete
     * Se non è settata oppure è settata a false carico semplicemente il nodo
     * Se è settata a true devo fare una chiamata ajax
     *
     * @param node
     * @param expanded
     */
    expandNode(node, expanded) {
        let incomplete = node.incomplete || false;

        if( expanded && incomplete ){
            console.log('faccio chiamata ajax');
        }else{
            console.log('apro il pannello e basta');
        }
    }

    render() {
        const projectName = 'React Sortable Tree';
        const authorName = 'Chris Fritz';
        const authorUrl = 'https://github.com/fritz-c';
        const githubUrl = 'https://github.com/fritz-c/react-sortable-tree';

        const {
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount,
        } = this.state;

        const alertNodeInfo = ({
            node,
            path,
            treeIndex
        }) => {
            const objectString = Object.keys(node)
                .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
                .join(',\n   ');

            alert( // eslint-disable-line no-alert
                'Info passed to the button generator:\n\n' +
                `node: {\n   ${objectString}\n},\n` +
                `path: [${path.join(', ')}],\n` +
                `lowerSiblingCounts: [${path.join(', ')}],\n` +
                `treeIndex: ${treeIndex}`
            );
        };

        const selectPrevMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
                searchFoundCount - 1,
        });

        const selectNextMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFocusIndex + 1) % searchFoundCount) :
                0,
        });

        const isVirtualized = true;
        const treeContainerStyle = isVirtualized ? { height: 450 } : {};
        const countries = [
            { value: 'EN-gb', label: 'England' },
            { value: 'ES-es', label: 'Spain'},
            { value: 'TH-th', label: 'Thailand' },
            { value: 'EN-en', label: 'USA'}
        ];

        return (
            <div>
                <section className={styles['page-header']}>
                    <h1 className={styles['project-name']}>{projectName}</h1>

                    <h2 className={styles['project-tagline']}>
                        Drag-and-drop sortable representation of hierarchical data
                    </h2>
                </section>

                <section className={styles['main-content']}>
                    <h3>Demo</h3>

                    <button onClick={this.expandAll}>
                        Expand All
                    </button>

                    <button onClick={this.collapseAll}>
                        Collapse All
                    </button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <form
                        style={{ display: 'inline-block' }}
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <label htmlFor="find-box">
                            Search:&nbsp;

                            <input
                                id="find-box"
                                type="text"
                                value={searchString}
                                onChange={event => this.setState({ searchString: event.target.value })}
                            />
                        </label>

                        <button
                            type="button"
                            disabled={!searchFoundCount}
                            onClick={selectPrevMatch}
                        >
                            &lt;
                        </button>

                        <button
                            type="submit"
                            disabled={!searchFoundCount}
                            onClick={selectNextMatch}
                        >
                            &gt;
                        </button>

                        <span>
                            &nbsp;
                            {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
                            &nbsp;/&nbsp;
                            {searchFoundCount || 0}
                        </span>
                    </form>

                    <div style={treeContainerStyle}>
                        <SortableTree
                            treeData={treeData}
                            onChange={this.updateTreeData}
                            onMoveNode={({ node, treeIndex, path }) =>
                                console.debug( // eslint-disable-line no-console
                                    'onMoveNode',
                                    'node:', node,
                                    'treeIndex:', treeIndex,
                                    'path:', path,
                                )
                            }
                            getNodeKey={({ node }) => {
                                return node.id;
                            }}
                            onVisibilityToggle={({node, expanded}) => {
                                this.expandNode(node, expanded);
                                //  Nel nostro funzionamento: quando clicco e il nodo è "incompleto" faccio
                                //  una chimata ajax che mi riempie il nodo e lo mostro
                                //  console.log('onVisibilityToggle', treeData, node, expanded);
                            }}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            canDrag={({ node }) => !node.noDragging}
                            canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
                            searchFinishCallback={matches =>
                                this.setState({
                                    searchFoundCount: matches.length,
                                    searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                                })
                            }
                            isVirtualized={isVirtualized}
                            generateNodeProps={rowInfo => ({
                                buttons: [
                                    <Dropdown className="account-dropdown">
                                        <DropdownTrigger>Action</DropdownTrigger>
                                        <DropdownContent>
                                            <ul>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.replaceChildrenIntoNode(rowInfo))}
                                                    >
                                                        Replace children
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.copyNode(rowInfo))}
                                                    >
                                                        Copy
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.pasteNodeAsChild(rowInfo))}
                                                    >
                                                        Paste as Child
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.pasteNodeAsSibling(rowInfo))}
                                                    >
                                                        Paste as Sibling
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.insertNodeAsChild(rowInfo))}
                                                    >
                                                        Insert as Child
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => (this.insertNodeAsSibling(rowInfo))}
                                                    >
                                                        insert as Sibling
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        style={{
                                                            verticalAlign: 'middle',
                                                        }}
                                                        onClick={() => alertNodeInfo(rowInfo)}
                                                    >
                                                        ℹ
                                                    </button>
                                                </li>
                                            </ul>
                                        </DropdownContent>
                                    </Dropdown>,
                                    <Dropdown className="account-dropdown">
                                        <DropdownTrigger>Client Links</DropdownTrigger>
                                        <DropdownContent>
                                            <ul>
                                                <li>
                                                    <a href="/profile">Profile</a>
                                                </li>
                                                <li>
                                                    <a href="/favorites">Favorites</a>
                                                </li>
                                                <li>
                                                    <a href="/logout">Log Out</a>
                                                </li>
                                            </ul>
                                        </DropdownContent>
                                    </Dropdown>,
                                    <button
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        onClick={() => this.selectNode(rowInfo)}
                                    >
                                        ℹ
                                    </button>
                                ],
                            })}
                        />
                    </div>

                    <a href={githubUrl}>Documentation on Github</a>

                    <footer className={styles['site-footer']}>
                        <span className={styles['site-footer-owner']}>
                            <a href={githubUrl}>{projectName}</a> is maintained by <a href={authorUrl}>{authorName}</a>.
                        </span>

                        <span className={styles['site-footer-credits']}>
                            This page was generated by <a href="https://pages.github.com">GitHub Pages</a> using the <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by <a href="https://twitter.com/jasonlong">Jason Long</a>.
                        </span>
                    </footer>
                </section>
                </section>

                <a href={githubUrl}>
                    <img
                        style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
                        src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                        alt="Fork me on GitHub"
                        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                    />
                </a>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
