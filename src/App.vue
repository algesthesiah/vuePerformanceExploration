<template>
  <div id="app">
    <ul class="nav">
      <li>
        <router-link to="/demo-7">Demo7</router-link>
      </li>
      <li>
        <router-link to="/demo-5">Demo5</router-link>
      </li>
      <li>
        <router-link to="/demo-6">Demo6</router-link>
      </li>
      <li>
        <router-link to="/demo-1">Demo1</router-link>
      </li>
      <li>
        <router-link to="/demo-2">Demo2</router-link>
      </li>
      <li>
        <router-link to="/demo-3">Demo3</router-link>
      </li>
      <li>
        <router-link to="/demo-4">Demo4</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  padding: 0;
}

ul.nav {
  text-align: center;
}

ul.nav > li {
  display: inline;
  padding-left: 10px;
}

ul.nav > li::before {
  content: "\2630";
  padding-right: 5px;
}
</style>
