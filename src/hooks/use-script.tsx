import { useEffect } from "preact/compat";
import { PickWritable, WritableKeys } from "../utils/types";

const useScript = (
  scriptSrc: string,
  scriptAttributes?: Partial<PickWritable<Omit<HTMLScriptElement, "src">>>
) => {
  useEffect(() => {
    const element = document.createElement("script");
    element.src = scriptSrc;
    if (scriptAttributes) {
      Object.entries(scriptAttributes).forEach(
        ([key, value]) =>
          ((element as any)[key as keyof WritableKeys<HTMLScriptElement>] =
            value)
      );
    }
    document.body.appendChild(element);
    return () => element.remove();
  }, [scriptSrc]);
};

export default useScript;
