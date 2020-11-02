import React from "react";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import "./index.less";

const renderer = new marked.Renderer();

const option = {
  renderer: renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: "hljs ",
  highlight: function(code: string, lang: string, callback: any) {
    console.log("code", code);
    return hljs.highlightAuto(code).value;
  }
};

marked.setOptions(option);

interface markedProps {
  content: string | any;
}

class Marked extends React.PureComponent<markedProps> {
  static defaultProps = {
    content: ""
  };

  render() {
    const { content } = this.props;
    return (
      <div
        id="mod-article"
        className="marked"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      ></div>
    );
  }
}

export default Marked;
