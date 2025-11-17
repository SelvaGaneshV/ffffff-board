<script lang="ts">
  import { ZoomIn, ZoomOut } from "@lucide/svelte";
  import { Panel, useSvelteFlow } from "@xyflow/svelte";
  const { zoomIn, zoomOut } = useSvelteFlow();
</script>

<Panel
  position="top-center"
  class="w-2xs border h-10 flex justify-between items-center"
>
  <ZoomIn onclick={() => zoomIn()} />
  <ZoomOut onclick={() => zoomOut()} />
</Panel>
