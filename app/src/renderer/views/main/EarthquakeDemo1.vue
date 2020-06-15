<template>
    <div class="amap-wrapper" :style="{height:clientHeight+'px'}">
        <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button>

        <el-amap vid="amap" :zoom="zoom" :center="center">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible"
                            :draggable="marker.draggable"></el-amap-marker>
        </el-amap>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
      name: 'demoComponent',
      computed: mapState([
        'clientHeight'
      ]),
      data() {
        return {
          zoom: 13,
          center: [117.6503984658, 24.5140214847],
          markers: [
            {
              position: [117.6503984658, 24.5143224887],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false
            }
          ]
        };
      },
      methods: {
        changePosition() {
          let position = this.markers[0].position;
          this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
        },
        chnageDraggle() {
          let draggable = this.markers[0].draggable;
          this.markers[0].draggable = !draggable;
        },
        toggleVisible() {
          let visableVar = this.markers[0].visible;
          this.markers[0].visible = !visableVar;
        },
        addMarker() {
          let marker = {
            position: [117.6503984658 + (Math.random() - 0.5) * 0.15, 24.5140214847 + (Math.random() - 0.5) * 0.15]
          };
          this.markers.push(marker);
        },
        removeMarker() {
          if (!this.markers.length) return;
          this.markers.splice(this.markers.length - 1, 1);
        }
      }
    }

</script>

<style>
    .amap-wrapper {
        width: 100%;
    }
</style>
