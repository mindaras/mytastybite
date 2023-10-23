"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import inputStyles from "../input/Input.module.scss";
import classNames from "classnames";
import styles from "./TextEditor.module.scss";
import { faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TextArea } from "../textarea/Textarea";
import { Optional } from "@common/components/Optional";

type EditorMode = "text" | "html";

interface Props {
  initialValue: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<Props> = ({
  initialValue,
  fullWidth,
  disabled,
  className,
  onChange,
}) => {
  const [mode, setMode] = useState<EditorMode>("text");

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });
  const [htmlEditorValue, setHtmlEditorValue] = useState<string>();

  const setHtml = (html: string) => {
    editor?.commands.clearContent();
    editor?.commands?.insertContent(html);
  };

  const changeMode = (mode: EditorMode) => {
    if (mode === "html") setHtmlEditorValue(editor?.getHTML());
    setMode(mode);
  };

  const onHtmlChange = (value: string) => {
    setHtml(value);
    setHtmlEditorValue(value);
  };

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.container__fullWidth]: fullWidth,
          [inputStyles.input__disabled]: disabled,
        },
        className
      )}
      onClick={() => editor?.commands.focus()}
    >
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={editor?.commands.toggleBold}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={editor?.commands.toggleItalic}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => editor?.commands.toggleHeading({ level: 1 })}
        >
          H1
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => editor?.commands.toggleHeading({ level: 2 })}
        >
          H2
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => editor?.commands.toggleHeading({ level: 3 })}
        >
          H3
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => editor?.commands.toggleBulletList()}
        >
          UL
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => editor?.commands.toggleOrderedList()}
        >
          OL
        </button>
        <button
          type="button"
          className={classNames(styles.control, {
            [styles.control__active]: mode === "text",
          })}
          onClick={() => changeMode("text")}
        >
          TEXT
        </button>
        <button
          type="button"
          className={classNames(styles.control, {
            [styles.control__active]: mode === "html",
          })}
          onClick={() => changeMode("html")}
        >
          HTML
        </button>
      </div>
      <Optional
        if={mode === "text"}
        then={
          <EditorContent
            className={classNames(
              inputStyles.input,
              styles.textField,
              styles.editor
            )}
            editor={editor}
          />
        }
        else={
          <TextArea
            name="html"
            onChange={onHtmlChange}
            value={htmlEditorValue}
            className={styles.textField}
          />
        }
      />
    </div>
  );
};

export { TextEditor };
