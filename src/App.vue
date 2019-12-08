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
                <!-- form start -->
                <form role="form">
                  <div class="card-body">

                      <div class="row">
                        <div class="col-sm-6">
                          <!-- select -->
                          <div class="form-group">
                            <label>Seleccione Región</label>
                            <select class="form-control" @change="onChangeRegion($event)">
                              <option>Elija una Región</option>
                              <option v-for="region in dataRegiones.data" :key="region.id">{{region.nombre}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <label>Seleccione Comuna</label>
                          <!-- v-for="todo in todos" :key="todo"> -->
                          <select class="form-control" @change="onChangeComuna($event)">
                            <option v-for="comuna in dataComunas.data" :key="comuna.id">{{comuna.nombre}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label" for="inputSuccess"><i class="fas fa-check"></i>Nombre del local</label>
                        <input type="text" class="form-control" id="inputSuccess" placeholder="Ingrese nombre del local" v-model="itemFarmacia" v-uppercase>
                      </div>

                  </div>
                  <div class="card-footer">
                    <a href="#" class="btn btn-primary" v-on:click="submit">Buscar</a>
                  </div>
                </form>
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
                    <th scope="col">telefono</th>
                    <th scope="col">apertura</th>
                    <th scope="col">cierre</th>
                    <th scope="col">direccion</th>
                    <th scope="col">dia</th>
                    <th scope="col">fecha</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="farmacia in dataFarmacias.farmacias" :key="farmacia.id">
                    <td>{{farmacia.id}}</td>
                    <td>{{farmacia.nombre}}</td>
                    <td>{{farmacia.telefono}}</td>
                    <td>{{farmacia.funcionamiento.hora_apertura}}</td>
                    <td>{{farmacia.funcionamiento.hora_cierre}}</td>
                    <td>{{farmacia.direccion.direccion}}</td>
                    <td>{{farmacia.funcionamiento.dia}}</td>
                    <td>{{farmacia.fecha}}</td>
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
      dataRegiones:[],
      dataComunas:[],
      dataFarmacias:[],
      itemRegion:null,
      itemComuna:null,
      itemFarmacia:null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.getBuscarRegiones();
  },
  methods:{
    /**
     * Metodo que llama al servicio GET para obtener las regiones
     * */
    getBuscarRegiones(){
      axios.get('http://localhost:8080/farmaciaWS/rest/init/regiones/get/json').then((response) =>{
        this.dataRegiones = response.data;
        console.log(this.dataRegiones);
      })
    },
    /**
     * Metodo que llama al servicio POST para obtener las comunas
     */
    getBuscarComunas(idRegion){
      const formData = new FormData();
      formData.append('id_region',idRegion);
      axios.post('http://localhost:8080/farmaciaWS/rest/init/comunas/post/json',
              formData
              ).then((response)=>{
        this.dataComunas = response.data;
      })
    },
    getBuscarFarmacias(idRegion, comuna, farmacia){
      var myUrl = 'http://127.0.0.1:8080/farmaciaWS/rest/init/get/region/comuna/buscar/farmacia/json?region=' + idRegion + '&comuna=' + comuna + '&farmacia=' + farmacia;
      console.log(myUrl);
      axios.get(myUrl)
              .then((response) => {
        this.dataFarmacias = response.data.data;
        console.log(this.dataFarmacias);
      })
      .catch((e) => {
        console.error(e)
      })
    },
    onChangeRegion(event) {
      this.itemRegion = this.dataRegiones.data[event.target.selectedIndex-1];
      this.getBuscarComunas(this.itemRegion.id);
    },
    onChangeComuna(event) {
      this.itemComuna = this.dataComunas.data[event.target.selectedIndex];
    },
    activarButton:function(){
      if(this.itemRegion == null){
        return false;
      }
      if(this.itemComuna == null){
        return false;
      }
      if(this.itemFarmacia == null || this.itemFarmacia.length < 3){
        return false;
      }
      return true;
    },
    submit : function(){
      console.log("Enviando datos de consulta");
      this.getBuscarFarmacias(this.itemRegion.id, this.itemComuna.nombre,this.itemFarmacia);
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
