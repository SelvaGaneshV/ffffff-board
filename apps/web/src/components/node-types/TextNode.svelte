<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
  import { useSvelteFlow, type NodeProps } from "@xyflow/svelte";
  let { data, id }: NodeProps = $props();
  const { updateNodeData } = useSvelteFlow();
  import { IsFocusWithin } from "runed";

  let formElement = $state<HTMLTextAreaElement>();
  const focusWithinForm = new IsFocusWithin(() => formElement);
</script>

<div class="bg-transparent">
  <Textarea
    bind:this={formElement as any}
    value={(data?.text as string) || ""}
    onchange={(e) => {
      e.stopPropagation();
      const text = e.currentTarget.value;
      updateNodeData(id, { text });
    }}
  />
</div>
