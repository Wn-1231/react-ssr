import { useEffect } from "react";
import store from "../store";
export default function (Component) {
  let count = 0;
  const newComponent = function (...props) {
    useEffect(() => {
      // 客户端渲染，则预获取数据
      if (window.isCSR) {
        Component?.getInitData?.(store);
      } else {
        // 服务端渲染，服务端预获取过数据一次，
        // 第二次以后才需获取
        if (count >= 1) {
          Component?.getInitData?.(store);
        } else {
          count++;
        }
      }
      return () => {};
    }, []);

    return <Component props={{ ...props }} />;
  };
  newComponent.getInitData = Component.getInitData;
  return newComponent;
}
