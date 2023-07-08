<template>
  <q-layout view="lHr lpR fFf">

    <!-- 중앙 -->
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon 
            class="header-icon q-pa-md lt-md"
            name="fas fa-dove"
            size="sm"
            color="primary"
          />
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
      <q-item to="/" clickable v-ripple exact>
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
      
        <q-input 
          class="q-ma-md"
          placeholder="Search Twitter"
          outlined
          rounded
          dense
          >
          <template v-slot:prepend>
            <q-icon name="search" size="sm"/>
          </template>
        </q-input>

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline>Get Verified</q-item-label>
            <q-item-label class="text-weight-bold">Subscribe to unlock new features.</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline>Get Verified</q-item-label>
            <q-item-label class="text-weight-bold">Subscribe to unlock new features.</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline>Get Verified</q-item-label>
            <q-item-label class="text-weight-bold">Subscribe to unlock new features.</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <!-- keep-alive => 컴포넌트의 상태를 캐싱하여 재렌더링을 방지 -->
      <!-- 랜더링 시 firebase 모든 문서를 계속해서 가져오지 않게 -->
      <keep-alive>
        <router-view />
      </keep-alive>
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

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>