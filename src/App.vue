<template>

  <div id="app" class="wrapper">
    <div class="content-wrapper">

      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-auto">
            <div class="col-sm-12">
              <h1>Farmacias</h1>
            </div>
          </div>
        </div><!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <!-- left column -->
            <div class="col-md-6">
              <!-- general form elements -->
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Farmacias de turno</h3>
                </div>
                <!-- /.card-header -->
                <!-- /.card-header -->
                <div class="card-body">
                  <!-- form start -->
                  <form role="form">
                    <div class="row">
                      <div class="col-sm-6">
                        <!-- select -->
                        <div class="form-group">
                          <label>Seleccione Región</label>
                          <select class="form-control">
                            <option>Seleccione Regíon</option>
                            <option>Arica y parinacota</option>
                            <option>Tarapaca</option>
                            <option>Antofagasta</option>
                            <option>Atacama</option>
                            <option>Coquimbo</option>
                            <option>Valparaiso</option>
                            <option>Santiago</option>
                            <option>O'Higgins</option>
                            <option>Maule</option>
                            <option>BioBio</option>
                            <option>La Araucanía</option>
                            <option>Los Ríos</option>
                            <option>Los Lagos</option>
                            <option>Aysén</option>
                            <option>Magallanes</option>
                            <option>Ñuble</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <label>Seleccione Comuna</label>
                        <select class="form-control">
                          <option>Recoleta</option>
                          <option>option 1</option>
                          <option>option 2</option>
                          <option>option 3</option>
                          <option>option 4</option>
                          <option>option 5</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label" for="inputSuccess"><i class="fas fa-check"></i>Nombre del local</label>
                      <input type="text" class="form-control" id="inputSuccess" placeholder="Ingrese nombre del local">
                    </div>
                  </form>

                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Buscar</button>
                </div>
              </div>
              <!-- /.card -->



            </div>
            <!--/.col (left) -->

          </div>
          <!-- /.row -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->

      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="card card-primary col-md-12">
              <div class="card-header">
                <h3 class="card-title">Resultados:</h3>
              </div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">nombre</th>
                    <th scope="col">apertura</th>
                    <th scope="col">cierre</th>
                    <th scope="col">direccion</th>
                    <th scope="col">dia</th>
                    <th scope="col">fecha</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="todo in todos" :key="todo">
                    <td>{{todo.id}}</td>
                    <td>{{todo.nombre}}</td>
                    <td>{{todo.funcionamiento.hora_apertura}}</td>
                    <td>{{todo.funcionamiento.hora_cierre}}</td>
                    <td>{{todo.direccion.direccion}}</td>
                    <td>{{todo.funcionamiento.dia}}</td>
                    <td>{{todo.fecha}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </section>


    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
      <div class="float-right d-none d-sm-block">
        <b>Version</b> 1.0.0-pre
      </div>
      <strong>Desarrollado por <b>José David Valladares Cáceres</b>.</strong>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      todos:null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log('Despues de llamar el monted');
    this.getBuscarFarmacias();
  },
  methods:{
    getBuscarFarmacias(){
      console.log('aca va el codigo del get api');
      axios.get('http://127.0.0.1:8080/farmaciaWS/rest/init/get/region/comuna/buscar/farmacia/json?region=7&comuna=RECOLETA&farmacia=AHUMADA').then((response) => {
        this.todos = response.data.data.farmacias;
        console.log(this.todos);
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
