<script module>
  import type { Node } from "@xyflow/svelte";
  export type DiamondNodeType = Node<{ color: string }, "diamond">;
</script>

<script lang="ts">
  import {
    NodeResizer,
    NodeToolbar,
    type NodeProps,
    useSvelteFlow,
    useOnSelectionChange,
  } from "@xyflow/svelte";

  let { id, selected, dragging, data }: NodeProps<DiamondNodeType> = $props();

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

<div class="outer">
  <svg
    class:selected
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <polygon
      points="50,0 100,50 50,100 0,50"
      fill={data.color}
      stroke="#e5e5e5"
      stroke-width="2"
    />
  </svg>
</div>

<style>
  .outer {
    width: 100%;
    height: 100%;
    display: flex;
  }

  svg.selected {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
