<script lang="ts">
  import { toolBarStore } from "$lib/context/toolbar-store.svelte";
  import { PressedKeys } from "runed";

  const keys = new PressedKeys();

  keys.onKeys("r", () => {
    toolBarStore.shape = "rectangle";
  });
  keys.onKeys("1", () => {
    toolBarStore.shape = "rectangle";
  });
  keys.onKeys("d", () => {
    toolBarStore.shape = "diamond";
  });
  keys.onKeys("2", () => {
    toolBarStore.shape = "diamond";
  });
  keys.onKeys("o", () => {
    toolBarStore.shape = "ellipse";
  });
  keys.onKeys("3", () => {
    toolBarStore.shape = "ellipse";
  });
</script>
