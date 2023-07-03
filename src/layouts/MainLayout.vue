<template>
  <q-layout view="lHr lpR fFf">

    <!-- 중앙 -->
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          Home
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <!-- 왼쪽 -->
    <q-drawer 
      v-model="leftDrawerOpen" 
      side="left" 
      :width="283"
      bordered 
      show-if-above>
      <!-- 4 방향으로 중간 량의 padding 추가 -> q-pa-md-->
      <q-icon class="q-pa-md"
        name="fas fa-dove"
        size="lg"
        color="primary" />

      <!-- drawer content -->

      <!-- bordered -> 테두리 -->
      <q-list>
      
      <!-- 루트 경로로 지정 => / -->
      <q-item to="/" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="home" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
      </q-item>

      <q-item to="/about" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="help" size="md"/>
        </q-item-section>

        <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
      </q-item>
      
    </q-list>
    </q-drawer>

    <!-- 오른쪽 -->
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>