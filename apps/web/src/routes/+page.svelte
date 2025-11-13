<script lang="ts">
import { Background, SvelteFlow } from "@xyflow/svelte";
import TopBar from "../components/Topbar.svelte";
import ZoomControls from "../components/ZoomControls.svelte";

let nodes = $state.raw([
	{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
	{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
]);

let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);
</script>


<div class="h-full w-full" >
  <SvelteFlow bind:nodes bind:edges style=background-color:transparent;  >
    <TopBar/>

    <ZoomControls/>
    
   <Background bgColor="transparent" />
  </SvelteFlow>
</div>


