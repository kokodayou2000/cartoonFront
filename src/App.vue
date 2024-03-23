<script lang="ts" setup>
import HeaderComp from './components/HeaderComp.vue'
</script>

<template>
  <el-container>
    <el-header>
      <HeaderComp />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
