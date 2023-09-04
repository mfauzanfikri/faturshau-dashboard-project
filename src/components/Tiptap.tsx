"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

const Tiptap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "min-h-[20rem] px-2 py-1",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: any = {
            1: "text-4xl",
            2: "text-2xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
    ],
    content: `<p>Hello World! 🌎️</p>`,
    editable: true,
  });

  return (
    <>
      <button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={editor?.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <EditorContent editor={editor} />
      <div dangerouslySetInnerHTML={{ __html: editor?.getHTML()! }}></div>
      <div>{editor?.getHTML()}</div>
    </>
  );
};

export default Tiptap;
