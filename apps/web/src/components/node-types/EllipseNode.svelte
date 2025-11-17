<script module>
  import type { Node } from "@xyflow/svelte";
  export type EllipseNodeType = Node<{ color: string }, "ellipse">;
</script>

<script lang="ts">
  import {
    NodeResizer,
    NodeToolbar,
    type NodeProps,
    useSvelteFlow,
    useOnSelectionChange,
  } from "@xyflow/svelte";

  let { id, selected, dragging, data }: NodeProps<EllipseNodeType> = $props();

  const { updateNodeData } = useSvelteFlow();
  let multipleNodesSelected = $state(false);

  const colorOptions = [
    "#f5efe9",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#64748b",
  ];

  useOnSelectionChange(({ nodes }) => {
    multipleNodesSelected = nodes.length > 1;
  });

  function handleColorChange(newColor: string) {
    updateNodeData(id, { color: newColor });
  }
</script>

<NodeResizer isVisible={selected && !dragging} />
<NodeToolbar
  isVisible={selected && !dragging && !multipleNodesSelected}
  class="nopan"
>
  <div class="toolbar">
    {#each colorOptions as colorOption}
      <button
        onclick={() => handleColorChange(colorOption)}
        class="color-button"
        style="background-color: {colorOption}"
        aria-label={"asdas"}
      ></button>
    {/each}
  </div>
</NodeToolbar>

<div class="outer">
  <div
    class="ellipse {selected ? 'selected' : ''}"
    style="background-color: {data.color}"
  ></div>
</div>

<style>
  .toolbar {
    display: flex;
    gap: 0.25rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e5e5;
    background-color: white;
    padding: 0.5rem;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .color-button {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
  }

  .outer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ellipse {
    width: calc(100% - 5px);
    height: calc(100% - 5px);
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .selected {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
