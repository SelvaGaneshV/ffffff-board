<script lang="ts">
  import { toolBarStore } from "$lib/context/toolbar-store.svelte";
  import { isTyping } from "$lib/utils";
  import { PressedKeys } from "runed";

  const keys = new PressedKeys();

  const shortcuts = [
    { keys: ["r", "1"], shape: "rectangle" },
    { keys: ["d", "2"], shape: "diamond" },
    { keys: ["o", "3"], shape: "ellipse" },
  ] as const;

  function toggle(shape: any) {
    toolBarStore.shape = toolBarStore.shape === shape ? undefined : shape;
  }

  shortcuts.forEach((s) =>
    s.keys.forEach((k) =>
      keys.onKeys(k, () => {
        if (isTyping()) return;
        toggle(s.shape);
      }),
    ),
  );
</script>
