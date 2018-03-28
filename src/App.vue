<template>
    <div id="app">
        <animating-logo/>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Maria';
    src: url('./assets/fonts/Maria.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
}

#app {
    font-family: 'Maria', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
}
</style>
