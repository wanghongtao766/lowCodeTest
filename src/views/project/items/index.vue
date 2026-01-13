<template>
  <div class="go-project-items">
    <n-space vertical class="go-project-sider-top" style="margin-bottom: 15px;}">
      <project-layout-create></project-layout-create>
    </n-space>
    <project-items-list></project-items-list>
  </div>
</template>

<script setup lang="ts">
import { ProjectItemsList } from './components/ProjectItemsList'
import {ProjectLayoutCreate} from "@/views/project/layout/components/ProjectLayoutCreate/index";
</script>

<style lang="scss" scoped>
@include go(project-items) {
  padding: 20px 20px;
}
</style>
