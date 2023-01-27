<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>ROK 랜덤다이스</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                @click="
                  $router.push(menuItem.route);
                  currentLabel = menuItem.label;
                "
                clickable
                :active="menuItem.label === currentLabel"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const currentLabel = ref('계산기');
const menuList = ref([
  {
    icon: 'calculate',
    label: '계산기',
    separator: false,
    route: '/',
  },
  {
    icon: 'view_timeline',
    label: '필드깔기',
    separator: false,
    route: '/field',
  },
  {
    icon: 'app_registration',
    label: '퀀텀 계산기',
    separator: false,
    route: '/solver',
  },
]);
const drawer = ref(false);
</script>
