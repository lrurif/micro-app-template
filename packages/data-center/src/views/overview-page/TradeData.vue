<template>
    <div class="page-wrapper">
        交易数据
        <div class="tree-wrapper">
            <div class="tree">
                <el-input v-model="leftFilter" @input="filterLeftNode"></el-input>
                <el-tree :filter-node-method="filterLeft" ref="leftTree" :default-expand-all="true" :data="leftTreeData" show-checkbox node-key="id" :props="defaultProps" :default-expanded-keys="leftExpandedKeys" @node-expand="handleLeftNodeExpand" @node-collapse="handleLeftNodeCollapse"/>
            </div>
            <div class="middle">
                <el-button @click="moveDataToRight">右移</el-button>
                <el-button @click="moveDataToLeft">左移</el-button>
            </div>
            <div class="tree">
                <el-input v-model="rightFilter" @input="filterRightNode"></el-input>
                <el-tree :filter-node-method="filterRight" ref="rightTree" :default-expand-all="true" :data="rightTreeData" show-checkbox node-key="id" :props="defaultProps" :default-expanded-keys="rightExpandedKeys" @node-expand="handleRightNodeExpand" @node-collapse="handleRightNodeCollapse"/>
            </div>
        </div>

    </div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import temoOriginData from "./data.js"
const defaultProps = {
    children: "children",
    label: "label",
};
const leftTree = ref(null);
const rightTree = ref(null);
let originData = JSON.parse(JSON.stringify(temoOriginData));
const leftTreeData = ref(JSON.parse(JSON.stringify(temoOriginData)));
const rightTreeData = ref([]);

const getAllNodesKey = (tree, res) => {
    tree.forEach((item) => {
        res.push(item.id);
        item.children && getAllNodesKey(item.children, res);
    });
    return res;
};  
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
let flatternData = TreeToArr(originData, []);
const moveDataToRight = () => {
    let leftSelectKeys = leftTree.value.getCheckedKeys();
    let lastLeftKeys = leftKeys.filter((id) => !leftSelectKeys.includes(id));
    leftKeys = lastLeftKeys;
    let lastLeftNodes = flatternData.filter((item) =>
        lastLeftKeys.includes(item.id)
    );
    let lastLeftTreeTemp = ArrToTree(lastLeftNodes);
    leftTreeData.value = JSON.parse(JSON.stringify(lastLeftTreeTemp));
    // 处理右边树
    let leftHalfKeys = leftTree.value.getHalfCheckedKeys();
    rightKeys = [...new Set([...rightKeys, ...leftSelectKeys, ...leftHalfKeys])];
    let lastRightNodes = flatternData.filter((item) => {
        return rightKeys.includes(item.id);
    });
    let lastRightTreeTemp = ArrToTree(lastRightNodes);
    rightTreeData.value = JSON.parse(JSON.stringify(lastRightTreeTemp));

    
};
const moveDataToLeft = () => {
    let rightSelectKeys = rightTree.value.getCheckedKeys();
    let lastRightKeys = rightKeys.filter((id) => !rightSelectKeys.includes(id));
    rightKeys = lastRightKeys;
    let lastRightNodes = flatternData.filter((item) =>
        lastRightKeys.includes(item.id)
    );
    let lastRightTreeTemp = ArrToTree(lastRightNodes);
    rightTreeData.value = JSON.parse(JSON.stringify(lastRightTreeTemp));
    // 处理左边树
    let rightHalfKeys = rightTree.value.getHalfCheckedKeys();
    leftKeys = [...new Set([...leftKeys, ...rightSelectKeys, ...rightHalfKeys])];
    let lastLeftNodes = flatternData.filter((item) => {
        return leftKeys.includes(item.id);
    });
    let lastLeftTreeTemp = ArrToTree(lastLeftNodes);
    leftTreeData.value = JSON.parse(JSON.stringify(lastLeftTreeTemp));
};

const leftExpandedKeys = ref([])
const handleLeftNodeExpand =(data) => {
    leftExpandedKeys.value.push(data.id)
}

const handleLeftNodeCollapse =(data) => {
    let i = leftExpandedKeys.value.findIndex(item => item == data.id)
    i != -1 && leftExpandedKeys.value.splice(i, 1)

}
const rightExpandedKeys = ref([])
const handleRightNodeExpand =(data) => {
    rightExpandedKeys.value.push(data.id)
}

const handleRightNodeCollapse =(data) => {
    let i = rightExpandedKeys.value.findIndex(item => item == data.id)
    i != -1 && rightExpandedKeys.value.splice(i, 1)

}
// 左树过滤 - start
const leftFilter = ref("");
const filterLeftNode = (value) => {
    leftTree.value.filter(value)
}
const filterLeft = (value, data) => {
    return data.label.includes(value)
}
// 左树过滤 - end
// 右树过滤 - start
const rightFilter = ref("");
const filterRightNode = (value) => {
    rightTree.value.filter(value)
}
const filterRight = (value, data) => {
    return data.label.includes(value)
}
// 左树过滤 - end
</script>

<style lang="scss">
.tree-wrapper {
    display: flex;
    justify-content: space-between;
    .tree {
        width: 40%;
    }
}
</style>
