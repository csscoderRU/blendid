<template>
  <h4>Hello I'm VUE module</h4>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        showType: null
      }
    },
    methods: {
    
    },
    created(){
      let vm = this;
      
    },
    mounted() {
      console.log('module mounted');
    },
  }
</script>
