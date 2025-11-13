<template>
  <div class="go-project">
    <n-layout has-sider position="absolute">
      <n-layout>
        <n-layout
          id="go-project-content-top"
          class="content-top"
          position="absolute"
          :native-scrollbar="false"
        >
          <n-layout-content>
            <layout-transition-main>
              <router-view></router-view>
            </layout-transition-main>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { LayoutTransitionMain } from '@/layout/components/LayoutTransitionMain/index'
</script>
