<script lang="ts">
  import { ModeWatcher } from "mode-watcher";

  import { SvelteFlowProvider } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import "../app.css";

  let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<div class=" h-svh w-full">
  <SvelteFlowProvider>
    {@render children?.()}
  </SvelteFlowProvider>
</div>
