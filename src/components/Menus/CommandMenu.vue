<template>
  <div>
    <img src="https://i.ibb.co/pdX9TQY/index.png" alt="">


    <ul v-if="openMenu">
      <li @mouseover="setCurrentCommand(0)" :class="{active: currentItem === 0}" @click="(e) => handleSelect(e, search)">
        {{ search }}
      </li>
      <li v-for="(command, index) in commands"
          @mouseover="setCurrentCommand(index + 1)"
          :class="{active: currentItem === (index + 1)}"
          :key="suggestion.label" @click="(e) => handleSelect(e, suggestion.label)">
        {{ suggestion.label }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts" setup>
/*Refs*/
import { ref } from "vue";

const openMenu = ref(true)
const commands = [
  {
    command: '/list',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/join',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/users',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/nick',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/create',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/delete',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/msg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    command: '/leave',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];
</script>
