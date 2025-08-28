# 拖拽功能的思路
1. 使用draggable并设置相应的参数
<draggable
  v-model="fileList"
  item-key="uid"
  class="draggable-list"
  :animation="200"
  ghost-class="ghost"
  @end="onDragEnd"
>

# 关键配置：
• item-key="uid": 指定每个拖拽项的唯一标识符
• :animation="200": 设置拖拽动画时长为200ms
• ghost-class="ghost": 拖拽时的幽灵元素样式类
• @end="onDragEnd": 拖拽结束时的回调函数
2. 拖拽template的整体结构
<template #item="{ element: file }">
  <div class="draggable-item">
    <img
      class="el-upload-list__item-thumbnail"
      :src="file.url"
      alt=""
    />
    <!-- 状态显示层 -->
    <div v-if="file.status === 'uploading'" class="upload-progress">
      <el-progress
        type="circle"
        :percentage="file.percentage || 0"
        :width="60"
      />
    </div>
    <!-- 操作按钮层 -->
    <span class="el-upload-list__item-actions">
      <!-- 预览和删除按钮 -->
    </span>
  </div>
</template>

3. 拖拽事件处理
因为是使用的成熟的第三方库，所以我们不需要关系拖拽的底层逻辑，只需要在应用层做相关的处理。

// 拖拽结束处理函数
const onDragEnd = () => {
  emit("update:modelValue", fileList.value);
};

# 一些注意点
1. 数据的实时更新
const fileList = ref<UploadUserFile[]>(props.initFiles);

// 监听文件列表变化，同步到父组件
watch(fileList, (newVal) => {
  emit("update:modelValue", newVal);
});

2. 删除已上传的文件并且更新
const handleRemove = (
  uploadFile: UploadUserFile,
  uploadFiles?: UploadUserFile[]
) => {
if (uploadFiles) {
    fileList.value = uploadFiles;
  } else {
    // 从拖拽列表中删除
    const index = fileList.value.findIndex(
      (file) => file.uid === uploadFile.uid
    );
    if (index > -1) {
      fileList.value.splice(index, 1);
      emit('update:modelValue', fileList.value);
    }
  }
};

3. 添加上传进度展示
// 上传进度回调
(percent) => {
  const fileIndex = fileList.value.findIndex(
    (f) => f.uid === file.uid
  );
  if (fileIndex !== -1) {
    fileList.value[fileIndex] = {
      ...fileList.value[fileIndex],
      percentage: percent,
    };
  }
}

# CSS 拖拽状态样式
// 添加幽灵效果
.ghost {
  opacity: 0.5;
  transform: scale(0.95);
}