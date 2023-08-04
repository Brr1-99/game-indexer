<!--
  @component
  ## Image
  Display an image using `background-image` instead of `<img/>`
  @param image - the URL to the image
-->
<script lang="ts">
    export let src: string

    const style = 'background-image: url(' + src + ');'
</script>

<div class="rounded bgimage h-full w-full" {style} />

<style>
    .bgimage {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
