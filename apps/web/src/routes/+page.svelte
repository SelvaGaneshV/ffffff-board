<script lang="ts">
  import {
    Background,
    SvelteFlow,
    useSvelteFlow,
    type Edge,
    type Node,
  } from "@xyflow/svelte";
  import TopBar from "../components/Topbar.svelte";
  import ZoomControls from "../components/ZoomControls.svelte";
  import TextNode from "../components/node-types/TextNode.svelte";
  import RectangleNode from "../components/node-types/RectangleNode.svelte";
  import DrawTool from "../components/DrawTool.svelte";
  import DiamondNode from "../components/node-types/DiamondNode.svelte";
  import EllipseNode from "../components/node-types/EllipseNode.svelte";
  import { toolBarStore } from "$lib/context/toolbar-store.svelte";
  import { isTyping } from "$lib/utils";

  const { screenToFlowPosition } = useSvelteFlow();
  let nodes = $state.raw<Node[]>([]);
  let edges = $state.raw<Edge[]>([]);
  const isDrawTooledEnabled = $derived(!!toolBarStore?.shape);
  const nodeTypes = {
    text: TextNode,
    rectangle: RectangleNode,
    diamond: DiamondNode,
    ellipse: EllipseNode,
  };

  const addTextNodeOnDoubleClick = (e: MouseEvent) => {
    const active = document.activeElement;

    if (active?.tagName !== "BUTTON" && !isTyping()) {
      e.stopPropagation();
      const position = screenToFlowPosition(
        {
          x: e.clientX - 3,
          y: e.clientY - 15,
        },
        {
          snapToGrid: false,
        },
      );
      const id = crypto.randomUUID();
      nodes = [
        ...nodes,
        {
          id: id,
          type: "text",
          data: { text: "" },

          position,
        },
      ];
    }
  };
</script>

<div class="h-full w-full">
  <SvelteFlow
    zoomOnDoubleClick={false}
    {nodeTypes}
    ondblclick={addTextNodeOnDoubleClick}
    bind:nodes
    bind:edges
    style="background-color:transparent;"
  >
    <TopBar />

    <ZoomControls />

    <Background bgColor="transparent" />
    {#if isDrawTooledEnabled}
      <DrawTool />
    {/if}
  </SvelteFlow>
</div>
