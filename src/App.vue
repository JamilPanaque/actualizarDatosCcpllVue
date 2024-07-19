<template>
  <nav class="navbar navbar-light" style="background-color: #0b3d92">
    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
      <a class="navbar-brand" style="color: #b9c8e0">
        <img src="/assets/img/logoCcpll.png" height="80px" />
      </a>
      <h4 style="color: white">FORMULARIO DE ACTUALIZACIÓN DE DATOS 2024</h4>
    </div>
  </nav>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
