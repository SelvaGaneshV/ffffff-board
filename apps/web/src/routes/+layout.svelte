<script lang="ts">
import { ModeWatcher, mode } from "mode-watcher";
import "@xyflow/svelte/dist/style.css";
import "../app.css";

let { children } = $props();
</script>

<ModeWatcher defaultMode="system"/>
<div class=" h-svh w-full " >
    {@render children?.()}
</div>


