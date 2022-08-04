<script lang="ts">
import { defineComponent } from 'vue'
import { Line } from 'vue-chartjs'

export default defineComponent({
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    // this.renderChart(this.data, this.options)
  },
})
</script>
