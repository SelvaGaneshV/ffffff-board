<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
  import { cn } from "$lib/utils";
  import { NodeResizer, useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  let { data, id, selected, dragging, width, height }: NodeProps = $props();
  const { updateNodeData, deleteElements } = useSvelteFlow();
  let isEditable = $state(true);
  const textUpdate = (
    e: (Event | FocusEvent) & {
      currentTarget: EventTarget & HTMLTextAreaElement;
    },
  ) => {
    e.stopPropagation();
    const text = e.currentTarget.value;
    if (text) updateNodeData(id, { text });
    else {
      deleteElements({ nodes: [{ id }] });
    }
    isEditable = false;
  };
</script>

<div class={cn(!data?.text && "min-h-[30px] min-w-[60px] cursor-alias")}>
  {#if isEditable}
    <Textarea
      class="w-auto max-w-fit h-full min-w-full  focus-visible:ring-0  outline-none p-0 resize-none dark:bg-transparent rounded-none border-none text-start scrollbar-none"
      value={(data?.text as string) || ""}
      onblur={textUpdate}
      onchange={textUpdate}
    />
  {:else}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      onclick={() => {
        isEditable = true;
      }}
      class="max-w-fit w-auto"
    >
      <NodeResizer isVisible={selected && !dragging} />
      {data?.text}
    </div>
  {/if}
</div>
