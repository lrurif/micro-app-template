<template>
    <div class="page-wrapper">
        交易数据
        <el-tree
            ref="leftTree"
            :data="leftTreeData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
        />
        <div style="border: 1px solid red;">
            <el-tree
                ref="rightTree"
                :data="rightTreeData"
                show-checkbox
                node-key="id"
                :props="defaultProps"
            />
        </div>
    </div>

    <el-button @click="getNodes">获取所选节点</el-button>
    <el-button @click="moveDataToRight">右移</el-button>
    <el-button>左移</el-button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const defaultProps = {
    children: "children",
    label: "label",
};
const leftTree = ref(null);
const rightTree = ref(null);
const getNodes = () => {
    console.log(leftTree.value.getCheckedKeys());
};
const changeData = () => {
    leftTreeData.value = [
        {
            id: 1,
            label: "Level one 1",
            children: [
                {
                    id: 4,
                    label: "Level two 1-1",
                    children: [
                        {
                            id: 9,
                            label: "Level three 1-1-1",
                        },
                        {
                            id: 10,
                            label: "Level three 1-1-2",
                        },
                    ],
                },
            ],
        },
    ];
};
let originData = [
    {
        id: 1,
        label: "Level one 1",
        children: [
            {
                id: 4,
                label: "Level two 1-1",
                children: [
                    {
                        id: 9,
                        label: "Level three 1-1-1",
                    },
                    {
                        id: 10,
                        label: "Level three 1-1-2",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: "Level one 2",
        children: [
            {
                id: 5,
                label: "Level two 2-1",
            },
            {
                id: 6,
                label: "Level two 2-2",
            },
        ],
    },
    {
        id: 3,
        label: "Level one 3",
        children: [
            {
                id: 7,
                label: "Level two 3-1",
            },
            {
                id: 8,
                label: "Level two 3-2",
            },
            {
                id: 11,
                label: "Level two 3-2",
            },
        ],
    },
];
const leftTreeData = ref([
    {
        id: 1,
        label: "Level one 1",
        children: [
            {
                id: 4,
                label: "Level two 1-1",
                children: [
                    {
                        id: 9,
                        label: "Level three 1-1-1",
                    },
                    {
                        id: 10,
                        label: "Level three 1-1-2",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: "Level one 2",
        children: [
            {
                id: 5,
                label: "Level two 2-1",
            },
            {
                id: 6,
                label: "Level two 2-2",
            },
        ],
    },
    {
        id: 3,
        label: "Level one 3",
        children: [
            {
                id: 7,
                label: "Level two 3-1",
            },
            {
                id: 8,
                label: "Level two 3-2",
            },
            {
                id: 11,
                label: "Level two 3-2",
            },
        ],
    },
]);
const rightTreeData = ref([]);

const getAllNodesKey = (tree, res) => {
    tree.forEach((item) => {
        res.push(item.id);
        item.children && getAllNodesKey(item.children, res);
    });
    return res;
};
let allKeys = getAllNodesKey(originData, []);
// 左右树的所有key
let leftKeys = getAllNodesKey(leftTreeData.value, []);
let rightKeys = getAllNodesKey(rightTreeData.value, []);
function TreeToArr(treeData, result = [], parentId = null) {
    treeData.forEach((treeItem) => {
        treeItem = JSON.parse(JSON.stringify(treeItem));
        treeItem.$parent = parentId;
        result.push(treeItem);
        if (treeItem.children) {
            TreeToArr(treeItem.children, result, treeItem.id);
            delete treeItem.children;
        }
    });
    return result;
}
function ArrToTree(list) {
    const treeList = [],
        map = {};
    list.forEach((item) => {
        item.children = [];
        map[item.id] = item;
    });
    list.forEach((item) => {
        const parent = map[item.$parent];
        if (parent) {
            parent.children.push(item);
        } else {
            treeList.push(item);
        }
    });
    return treeList;
}
// const flatternLeftData = TreeToArr(leftTreeData.value, []);
// const flatternRightData = TreeToArr(rightTreeData.value, []);
let flatternData = TreeToArr(originData, []);
const moveDataToRight = () => {
    let leftSelectKeys = leftTree.value.getCheckedKeys();
    let lastLeftKeys = leftKeys.filter((id) => !leftSelectKeys.includes(id));
    leftKeys = lastLeftKeys;
    let lastLeftNodes = flatternData.filter((item) =>
        lastLeftKeys.includes(item.id)
    );
    let lastLeftTreeTemp = ArrToTree(lastLeftNodes);
    leftTreeData.value = lastLeftTreeTemp;
    // 处理右边树
    rightKeys = [...rightKeys, ...leftSelectKeys];
    let lastRightNodes = flatternData.filter((item) => {
        return rightKeys.includes(item.id);
    });
    debugger;
    let lastRightTreeTemp = ArrToTree(lastRightNodes);
    rightTreeData.value = lastRightTreeTemp;
};
</script>

<style lang="scss"></style>
