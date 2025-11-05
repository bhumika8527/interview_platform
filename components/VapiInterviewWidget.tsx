'use client'

interface Props {
  assistantId: string;
  publicKey: string;
  workflowId: string;
}

export default function VapiInterviewWidget({ assistantId, publicKey, workflowId }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <vapi-widget
            assistant-id="${assistantId}"
            public-key="${publicKey}"
            workflow-id="${workflowId}"
            enable-voice="true"
            mode="voice"
          ></vapi-widget>
          <script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async></script>
        `,
      }}
    />
  );
}
