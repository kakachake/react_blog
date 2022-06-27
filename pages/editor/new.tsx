import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import style from "./new.module.scss";
import { Input, Button, message } from "antd";
import axRequest from "request";
import { useStore } from "store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function Editor() {
  const store = useStore();
  const { id: userId } = store.user.userInfo;
  const { push } = useRouter();
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const handlePublish = () => {
    if (!title) {
      message.warning("请输入文章标题");
    }
    axRequest
      .post({
        url: "/api/article/publish",
        data: {
          title,
          content: value,
        },
      })
      .then((res) => {
        if (res.code === 0) {
          // TODO: 跳转
          message.success("发布成功");
          userId && push(`/user/${userId}`);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
    console.log(value);
  };

  useEffect(() => {
    setHeight(window.innerHeight - 30);
    window.onresize = () => {
      setHeight(window.innerHeight - 30);
    };
  }, []);
  return (
    <div className={style.container}>
      <div className={style.operation}>
        <Input
          className={style.title}
          placeholder="请输入文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className={style.submit} type="primary" onClick={handlePublish}>
          发布
        </Button>
      </div>
      <MDEditor
        height={height}
        className={style.editor}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

Editor.layout = null;

export default observer(Editor);
