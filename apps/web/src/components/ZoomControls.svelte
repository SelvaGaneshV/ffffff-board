<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
import { ZoomIn, ZoomOut } from "@lucide/svelte";
import { Panel, useSvelteFlow } from "@xyflow/svelte";
const { zoomIn, zoomOut,getZoom } = useSvelteFlow();

</script>

<Panel position="bottom-left" class="w-24 border h-10 flex  rounded-md justify-between items-center">
    <Button onclick={()=>zoomOut()} variant="ghost">

        <ZoomOut  />
    </Button>

    {getZoom()}
    <Button onclick={()=>zoomIn()} variant="ghost">

        <ZoomIn   />
    </Button>
</Panel>