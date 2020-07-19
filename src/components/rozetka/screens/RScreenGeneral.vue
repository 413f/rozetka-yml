<template>
    <div>
        <RScreen>
            <template v-slot:default>
                <RGeneral>

                </RGeneral>
            </template>
        </RScreen>
    </div>
</template>

<script>

  import RScreen from './RScreen';
  import RGeneral from './RGeneral';

  export default {
    name: 'RScreenGeneral',
    comments: {
      RScreen,
      RGeneral,
    },
    data: function() {
      return {
        value: {},
      };
    },
    created() {
      const cloned = this.$store.state.general;
    }
  };
</script>

<style scoped>

</style>