<template>
    <div class="thank-you-container">
      <div class="card">
        <div class="card-body text-center">
          <img src="../../assets/img/gracias.svg" alt="Thank You" class="thank-you-image" />
          <h1 class="card-title">¡Gracias!</h1>
          <p class="card-text">
            Gracias por completar el formulario de actualización de datos.
            Esto es de suma ayuda para poder mejorar el servicio hacia usted.
          </p>
          <button @click="goBackHome" class="btn btn-primary">Volver a Inicio</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBackHome() {
        window.location.href = 'https://ccpll.org/';
      }
    }
  }
  </script>
  
  <style scoped>
  .thank-you-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
  }
  
  .card {
    max-width: 500px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .card-body {
    padding: 30px;
  }
  
  .thank-you-image {
    max-width: 100px;
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .card-text {
    font-size: 1.2rem;
    color: #6c757d;
    margin-bottom: 20px;
  }
  </style>
  