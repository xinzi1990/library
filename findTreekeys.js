var tree = [
    {
        id: 5,
        name: "root",
        children: [{
            id: 51,
            name: "北京市",
            children: [{
                id: 511,
                name: "西城区",
                children: [{
                    id: 5111,
                    name: "xx居委会"
                }]
            }]
        }]
    },
    {
        id: 6,
        name: "root",
        children: [{
            id: 61,
            name: "北京市",
            children: [{
                id: 611,
                name: "西城区",
                children: [{
                    id: 6111,
                    name: "xx居委会"
                }]
            }]
        }]
    },
    {
        id: 7,
        name: "root",
        children: [{
            id: 71,
            name: "北京市",
            children: [{
                id: 711,
                name: "西城区",
                children: [{
                    id: 7111,
                    name: "xx居委会"
                }]
            }]
        }]
    }
]

function getPathByKey(value, key, arr) {
    let temppath = [];
    try {
        function getNodePath(node){
            temppath.push(node);
            //找到符合条件的节点，通过throw终止掉递归
            if (node[key] === value) {
                throw ("GOT IT!");
            }
            
            if (node.children && node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i]);
                }
                temppath.pop();
            }else{
                temppath.pop();
            }
            
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
        return temppath;
    }
}

let res = getPathByKey(7111, 'id', tree);